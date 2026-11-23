import * as Platform from "./platform.js";
import * as D from "./domain.js";
import * as Store from "./storage.js";
import { encryptBackup, decryptBackup } from "./crypto.js";
import { articles } from "./education.js";
import { scienceHTML, sourceById } from "./science.js";
import { icon } from "./icons.js";
import {
  reminders,
  notificationHelp,
  requestNotifications,
  notify,
  syncNotifications, requestExact, exactStatus,
} from "./notifications.js";

const $ = (s) => document.querySelector(s),
  app = $("#app"),
  header = $("#header"),
  nav = $("#nav"),
  dialog = $("#dialog");
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, text, cls = "", extra = "") =>
  `<button type="button" data-action="${action}" class="${cls}" ${extra}>${text}</button>`;
const primary = (action, text, extra = "") =>
  button(action, text, "primary", extra);
const submit = (text) =>
  `<button class="primary" type="submit">${text}</button>`;
const field = (name, label, type = "text", value = "", attrs = "") =>
  `<label for="${name}">${label}</label><input id="${name}" name="${name}" type="${type}" value="${esc(value)}" ${attrs}>`;
const check = (name, label, on = false) =>
  `<label class="check-label"><input type="checkbox" name="${name}" ${on ? "checked" : ""}>${label}</label>`;
const select = (name, label, options, value) =>
  `<label for="${name}">${label}</label><select id="${name}" name="${name}">${options
    .map((x) => {
      const [v, t] = Array.isArray(x) ? x : [x, x];
      return `<option value="${esc(v)}" ${v === value ? "selected" : ""}>${esc(t)}</option>`;
    })
    .join("")}</select>`;
const formEnd = (text = "Salva", quiet = false) =>
  `<p class="field-error" role="alert"></p><div class="form-actions">${quiet ? `<button class="secondary" type="submit">${text}</button>` : submit(text)}</div></form>`;
const card = (html) => `<div class="card">${html}</div>`;
const flat = (html) => `<section class="plain-section">${html}</section>`;
const medical =
  '<p class="medical">Cosma non è un dispositivo medico né un metodo contraccettivo. Le previsioni sono stime. Per dubbi, parla con la ginecologa.</p>';
const row = (action, i, title, sub = "", extra = "") =>
  button(
    action,
    `<span class="tile-icon">${icon(i)}</span><span class="row-text"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span>${icon("arrow")}`,
    "row-button",
    extra,
  );
let S = null,
  tab = "oggi",
  sel = D.today(),
  month = sel.slice(0, 7) + "-01",
  locked = false,
  busy = false,
  hideRequested = false,
  dirty = false,
  draft = null,
  restoreCandidate = null,


  toastTimer,
  idle = Date.now(),
  unlockFailures = 0,
  retryAt = 0;
let broadcast=null;
let biometricEnabled=false,restoreText=null,historyTabs=[];
function toast(text) {
  $("#status").textContent = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("#status").textContent = ""), 7000);
}
function applyTheme() {
  document.documentElement.dataset.theme =
    S?.theme === "auto" ? "" : S?.theme || "";
  document.title="Cosma";
  Platform.setAppearance(S?.theme||"auto").catch(()=>{});
}
async function commit(next) {
  const clean = D.normalize(next);
  await Store.persist(clean);
  S = clean;
  applyTheme();
  await Platform.secureScreen(clean.secureScreen);
  try{await syncNotifications(clean);}catch{toast("Dati salvati. Non è stato possibile aggiornare tutti i promemoria: controlla le autorizzazioni.");}
}
async function run(task) {
  if (busy) return;
  busy = true;
  const controls = [...document.querySelectorAll("form button[type=submit]")];
  controls.forEach((e) => (e.disabled = true));
  try {
    await task();
  } catch (e) {
    const error = dialog.open
      ? dialog.querySelector(".field-error")
      : app.querySelector(".field-error");
    if (error) error.textContent = e.message;
    else toast(e.message);
  } finally {
    busy = false;
    controls.forEach((e) => {
      if (e.isConnected) e.disabled = false;
    });
    if (hideRequested) {
      hideRequested = false;
      lockNow();
    }
  }
}
function canLeave() {
  if (
    dirty &&
    !confirm("Ci sono modifiche non salvate. Vuoi lasciarle e continuare?")
  )
    return false;
  dirty = false;
  draft = null;
  return true;
}
function go(next) {
  if (!canLeave()) return;
  if(next!==tab)historyTabs.push(tab);
  tab = next;
  render();
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}
function modal(title, body) {
  $("#dialog-content").innerHTML =
    `<div class="dialog-head"><h2 id="dialog-title">${title}</h2>${button("close", "×", "", 'aria-label="Chiudi"')}</div>${body}`;
  if (!dialog.open) dialog.showModal();
}
function closeModal() {
  dialog.close();
  $("#dialog-content").replaceChildren();
  restoreCandidate = null;
  restoreText=null;
}
function noData(title, text, pose = "cosma-dorme.png") {
  return `<div class="empty"><img class="pose-empty" src="${pose}" alt="Cosma"><h2>${title}</h2><p>${text}</p></div>`;
}
function setupNav() {
  nav.innerHTML = [
    ["oggi", "home", "Oggi"],
    ["cal", "cal", "Calendario"],
    ["diario", "diary", "Diario"],
    ["salute", "health", "Salute"],
  ]
    .map(([id, i, t]) =>
      button(
        "nav",
        icon(i) + `<span>${t}</span>`,
        "",
        `data-tab="${id}" ${tab === id || (id === "salute" && !["oggi", "cal", "diario"].includes(tab)) ? 'aria-current="page"' : ""}`,
      ),
    )
    .join("");
}
function render() {
  applyTheme();
  document.body.classList.toggle("no-nav", !S?.onboarded || locked);
  nav.hidden = !S?.onboarded || locked;
  if (locked) {
    header.innerHTML = "";
    app.innerHTML = lockView();
    return;
  }
  if (!S) {
    return;
  }
  if (!S.onboarded) {
    header.innerHTML = "";
    app.innerHTML = onboarding();
    return;
  }
  const titles = {
    oggi: [
      "Oggi",
      new Date().toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    ],
    cal: ["Calendario", "Ogni giorno, un po’ più di te."],
    diario: ["Diario", "Dai spazio a come stai."],
    salute: ["Salute", "Le tue abitudini, il tuo spazio."],
    stats: ["Statistiche", "Il tuo ciclo nel tempo"],
    periods: ["I tuoi cicli", "Date, correzioni ed esclusioni"],
    visits: ["Visite ed esami", "I tuoi appuntamenti"],
    meds: ["Farmaci e integratori", "Le tue abitudini quotidiane"],
    settings: ["Preferenze", "Scegli cosa tenere in vista"],
    backup: ["Backup e dati", "Una copia che resta tua"],
    security: ["Blocco app", "Proteggi il tuo spazio"],
    pms:["Sintomi quotidiani","Le tue registrazioni nel tempo"], feedback:["La tua prova","Cinque domande, senza invio"],
    learn: ["Conoscere il ciclo", "Piccole letture, quando vuoi."],
    temp: ["I tuoi segnali", "Dati facoltativi, sempre consultabili"],
    notify: ["Promemoria", "Avvisi discreti, sul tuo dispositivo"],
  };
  const [title, sub] = titles[tab] || titles.oggi;
  header.innerHTML = `${!["oggi", "cal", "diario", "salute"].includes(tab) ? button("back", icon("back"), "icon-button", 'aria-label="Torna a Salute"') : ""}<div><h1>${title}</h1><p>${sub}</p></div>${button(Store.isProtected() ? "lock" : "security", icon("lock"), "icon-button", `aria-label="${Store.isProtected() ? "Blocca subito" : "Configura blocco app"}"`)}`;
  if(tab==="oggi")header.innerHTML=`<div><h1>Oggi</h1><p>${S.periods.length?sub:"Un giorno alla volta."}</p></div><img class="header-mascot" src="${S.periods.length?"avatar.png":"cosma-saluta.png"}" alt="Cosma">`;
  setupNav();
  app.innerHTML = (
    {
      oggi: vOggi,
      cal: vCal,
      diario: vDiario,
      salute: vSalute,
      stats: vStats,
      periods: vPeriods,
      visits: vVisits,
      meds: vMeds,
      settings: vSettings,
      backup: vBackup,
      security: vSecurity,
      learn: vLearn,
      temp: vTemp,
      notify: vNotifications, pms:vPms, feedback:vFeedback,
    }[tab] || vOggi
  )();
}
function onboarding() {
  return `<div class="welcome"><div class="brand">Cosma<span>✧</span></div><img class="pose" src="cosma-saluta.png" alt="Cosma ti saluta"><h1>Ciao, sono Cosma.</h1><p class="lead">Uno spazio per conoscere il tuo ciclo, con i tuoi tempi.</p><div class="privacy-card">${icon("shield")}<div><b>Il tuo ciclo, solo tuo.</b><p>Dati nella memoria privata del telefono. Nessun account, nessuna pubblicità. Anche offline.</p></div></div><form data-form="onboarding">${field("start", "Primo giorno dell’ultima mestruazione", "date", "", 'max="' + D.today() + '" required')}<p class="field-error" role="alert"></p><div class="form-actions">${submit("Inizia con Cosma")}</div></form>${button("skip-onboarding", "Non ricordo la data, la aggiungo dopo", "skip")}${medical}</div>`;
}
function lockView() {
  return `<div class="lock-screen"><img src="cosma-dorme.png" alt="Cosma riposa"><h1>Il tuo spazio è protetto.</h1><p class="muted">Inserisci il tuo PIN o la password.</p><form data-form="unlock">${field("password", "PIN o password", "password", "", 'required autocomplete="current-password"')}<p class="field-error" role="alert"></p><div class="form-actions">${submit("Sblocca Cosma")}</div></form>${biometricEnabled?button("biometric-unlock","Sblocca con impronta","secondary"):""}${button("forgot", "Ho dimenticato il PIN", "text-button")}</div>`;
}


function ring(a){const r=a.record,count=Math.max(18,Math.min(60,a.cycle)),index=Math.min(r.day-1,count-1),angle=(index/count*360-90)*Math.PI/180,x=96+84*Math.cos(angle),y=96+84*Math.sin(angle);return `<div class="cycle-ring" role="img" aria-label="Giorno ${r.day} dal primo giorno registrato. L’anello non identifica una fase ormonale."><svg viewBox="0 0 192 192" aria-hidden="true"><defs><linearGradient id="arc"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#c026d3"/></linearGradient></defs><circle cx="96" cy="96" r="84" fill="none" stroke="var(--ring)" stroke-width="8"/><path d="M96 12 A84 84 0 ${index/count>.5?1:0} 1 ${x} ${y}" fill="none" stroke="url(#arc)" stroke-width="8" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/></svg><div class="ring-label" aria-hidden="true"><strong>${r.day}</strong><span>Giorno del ciclo</span></div></div>`;}


function vOggi(){const a=D.analysis(S),pr=a.prediction,visit=S.visits.filter(v=>v.date>=D.today()).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))[0],rs=reminders(S).filter(r=>r.date===D.today());if(!a.record)return `<div class="empty-home"><h2>Iniziamo da una data.</h2><p>Registra il primo giorno dell’ultima mestruazione per iniziare il tuo diario.</p>${primary('new-period','Aggiungi il primo ciclo')}</div>`;return `<div class="home-minimal">${ring(a)}<section class="prediction"><h2>Prossime mestruazioni</h2><p class="estimated-date">${pr?D.fmt(pr.low)+'–'+D.fmt(pr.high):'Dati ancora pochi'}</p><p class="secondary-text">${pr?'Basata sui tuoi ultimi cicli':a.used.length+' intervalli completi registrati'}</p>${button('calculation','Come l’ho calcolato?','method-link')}</section>${primary('new-period','Inizio mestruazioni')}<button type="button" data-action="agenda" class="agenda-minimal"><span>${visit?'Visita '+D.fmt(visit.date)+', '+visit.time:'Visite da aggiungere'}</span><span aria-hidden="true">·</span><span>${rs.length?'Promemoria '+rs[0].time:'Nessun promemoria'}</span></button></div>`;}

function vCal() {
  const [y, m] = month.split("-").map(Number),
    first = new Date(y, m - 1, 1),
    off = (first.getDay() + 6) % 7,
    start = D.addD(month, -off),
    daysInMonth = new Date(y, m, 0).getDate(),
    n = Math.ceil((off + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: n }, (_, i) => {
    const d = D.addD(start, i),
      v = D.dayInfo(S, d),
      c = [
        d.slice(0, 7) !== month.slice(0, 7) ? "other" : "",
        v.per
          ? "period"
          : v.pred
            ? "pred"
            : "",
        d === D.today() ? "today" : "",
        d === sel ? "selected" : "",
      ].join(" "),
      label = [
        D.fmt(d, true),
        v.per ? "mestruazioni registrate" : "",
        v.pred ? "mestruazioni previste" : "",

        v.log ? "diario compilato" : "",
      ]
        .filter(Boolean)
        .join(", ");
    return button(
      "pick-day",
      `${+d.slice(8)}${v.log ? '<i class="diary-dot"></i>' : ""}`,
      "day " + c,
      `data-date="${d}" aria-label="${label}" aria-pressed="${d === sel}"`,
    );
  }).join("");
  const v = D.dayInfo(S, sel);
  return `<div class="month">${button("prev-month", icon("back"), "icon-button", 'aria-label="Mese precedente"')}<h2>${first.toLocaleDateString("it-IT", { month: "long", year: "numeric" })}</h2>${button("next-month", icon("arrow"), "icon-button", 'aria-label="Mese successivo"')}</div><div class="calendar-scroll"><div class="week" aria-hidden="true">${["L", "M", "M", "G", "V", "S", "D"].map((d) => `<span>${d}</span>`).join("")}</div><div class="days">${cells}</div></div><div class="legend"><span><i class="period"></i>Mestruazioni</span><span><i class="pred"></i>Stima inizio</span><span><i class="dot"></i>Diario compilato</span><span>Fascia descrittiva</span></div><div class="card selected-day"><div class="split"><h2>${D.fmt(sel, true)}</h2>${sel === D.today() ? '<span class="tag">Oggi</span>' : ""}</div><p>${v.per ? "Mestruazioni registrate" : v.pred ? "Stima mestruazioni" : "Nessun evento del ciclo"}</p>${sel <= D.today() ? button("selected-diary", S.log[sel] ? "Modifica il diario" : "Apri il diario", "secondary") + button("new-period", "Registra mestruazioni qui", "text-button", `data-date="${sel}"`) : '<p class="hint">Puoi compilare il diario e registrare cicli fino a oggi.</p>'}</div><p class="hint">Stima basata sui tuoi cicli passati. Può cambiare, non è una previsione medica.</p>${button("calculation","Come l’ho calcolato?","text-button")}${row("periods", "cal", "Gestisci i cicli", "Modifica, elimina o escludi dalle medie")}`;
}
function blankLog() {
  return {
    flusso: "",
    umore: "",
    sint: [],
    dolore: 0,
    note: "",
    temp: null,
    tempDisturbed: false, mucus:"", lh:"", pregnancy:"", weight:null, sleep:null,
  };
}
function chips(name, items, current, multiple = false) {
  return `<div class="chips" role="group" aria-label="${name === "sint" ? "Sintomi" : name === "umore" ? "Umore" : "Flusso"}">${items.map((v) => button("chip", esc(v), "", `data-field="${name}" data-value="${esc(v)}" data-multi="${multiple}" aria-pressed="${multiple ? current.includes(v) : current === v}"`)).join("")}</div>`;
}
function vDiario() {
  if (!draft) draft = D.clone(S.log[sel] || blankLog());
  const l = draft,
    c = S.categories;
  return `<div class="day-picker">${button("prev-day", icon("back"), "icon-button", 'aria-label="Giorno precedente"')}<div>${field("diary-date", "Data del diario", "date", sel, `max="${D.today()}"`)}</div>${button("next-day", icon("arrow"), "icon-button", `aria-label="Giorno successivo" ${sel >= D.today() ? "disabled" : ""}`)}</div><form data-form="diary">${c.flusso ? `<fieldset class="form-group"><legend>Flusso</legend>${chips("flusso", D.FLUSSI, l.flusso)}</fieldset>` : ""}${c.umore ? `<fieldset class="form-group"><legend>Umore</legend>${chips("umore", D.UMORI, l.umore)}</fieldset>` : ""}${c.sint ? `<fieldset class="form-group"><legend>Sintomi</legend>${chips("sint", D.SINTOMI, l.sint, true)}</fieldset>` : ""}${c.dolore ? `<div class="form-group"><div class="split"><label for="dolore">Dolore</label><output class="pain-value" id="pain-output" for="dolore">${l.dolore}/10</output></div><input id="dolore" name="dolore" type="range" min="0" max="10" value="${l.dolore}"><div class="split muted small"><span>Nessuno</span><span>Molto intenso</span></div></div>` : ""}${c.note ? `<label for="note">Note facoltative</label><textarea id="note" name="note" maxlength="10000" rows="3">${esc(l.note)}</textarea>` : ""}${c.temp ? field("temp", "Temperatura basale (°C), facoltativa", "number", l.temp ?? "", 'min="34" max="42" step="0.01" inputmode="decimal"') + check("tempDisturbed", "Misura disturbata (febbre, sonno o altro)", l.tempDisturbed) : ""}${c.mucus?select('mucus','Muco cervicale osservato',[['','Non registrato'],'Non osservato','Secco','Appiccicoso','Cremoso','Acquoso','Trasparente e filante'],l.mucus||''):''}${c.lh?select('lh','Test LH: risultato registrato',[['','Non registrato'],'Non eseguito','Negativo','Positivo','Non interpretabile'],l.lh||''):''}${c.pregnancy?select('pregnancy','Test di gravidanza: risultato registrato',[['','Non registrato'],'Non eseguito','Negativo','Positivo','Non interpretabile'],l.pregnancy||''):''}${c.weight?field('weight','Peso (kg), facoltativo','number',l.weight??'','min="1" max="500" step="0.1"'):''}${c.sleep?field('sleep','Sonno (ore), facoltativo','number',l.sleep??'','min="0" max="24" step="0.25"'):''}${c.pms?`<fieldset class="form-group"><legend>Sintomi quotidiani · scala personale</legend><p class="hint">0: non presente; 1: lieve; 2: moderato; 3: intenso. Non è un questionario DRSP validato.</p>${Object.entries({mood:'Umore basso',irritability:'Irritabilità',anxiety:'Tensione',fatigue:'Stanchezza',sleep:'Sonno',interference:'Impatto sulle attività'}).map(([k,t])=>select('pms-'+k,t,[['0','0 · Non presente'],['1','1 · Lieve'],['2','2 · Moderato'],['3','3 · Intenso']],String(l.pms?.[k]||0))).join('')}</fieldset>`:''}<p class="hint">Salva le modifiche prima di cambiare schermata o mettere l’app in secondo piano.</p>${formEnd("Salva il diario")}${S.log[sel] ? button("delete-log", "Elimina questa registrazione", "danger") : ""}${button("settings", "Personalizza le categorie", "text-button")}`;
}

function vSalute(){const notices=D.healthNotices(S);return `<div class="plain-list">${row('visits','cal','Visite ed esami',S.visits.length+' registrazioni')}${row('meds','pill','Farmaci e integratori',S.meds.length+' elementi')}${row('method','health','Metodo contraccettivo',S.method)}${row('stats','chart','Statistiche','Durate e sintomi registrati')}${row('temp','chart','I tuoi segnali','Temperatura, muco e test facoltativi')}${row('pms','diary','Sintomi quotidiani','Registrazione personale, senza diagnosi')}${row('periods','cal','Gestisci i cicli','Date, fine ed esclusioni')}${row('notify','bell','Promemoria','Notifiche locali Android')}${row('settings','settings','Impostazioni','Aspetto e categorie')}${row('security','lock','Blocco app',Store.isProtected()?'PIN attivo':'Configura PIN e impronta')}${row('backup','download','Backup e dati',S.lastBackup?'Ultimo backup '+D.fmt(S.lastBackup):'Nessun backup manuale registrato')}${row('science','diary','Fonti e metodo','Dati, formule e limiti scientifici')}${row('learn','star','Conoscere il ciclo','Schede informative con fonti')}${row('feedback','diary','Feedback per chi prova','Cinque domande, senza invio')}</div>${notices.length?card('<h2>Da portare a un colloquio</h2>'+notices.map(n=>'<p class="hint">'+esc(n.text)+'</p>'+button('article-source','Criterio e fonte '+n.source,'text-button',`data-sources="${n.source}"`)).join('')):''}`;}

function cycleChart(a) {
  if (!a.used.length)
    return '<p class="hint">Registra almeno due inizi di ciclo per vedere il primo intervallo.</p>';
  const max = Math.max(...a.used.map((x) => x.days)) + 2,
    min = Math.min(18, ...a.used.map((x) => x.days)) - 2,
    range = max - min;
  const bars = a.used
    .map((x, i) => {
      const x0 = 35 + i * 44,
        h = ((x.days - min) / range) * 95;
      return `<rect x="${x0}" y="${110 - h}" width="25" height="${h}" rx="6" fill="${i === a.used.length - 1 ? "#7c3aed" : "#c9a1ec"}"/><text x="${x0 + 12}" y="${103 - h}" text-anchor="middle">${x.days}</text><text x="${x0 + 12}" y="130" text-anchor="middle">${i+1}</text>`;
    })
    .join("");
  return `<svg class="chart" viewBox="0 0 310 144" role="img" aria-label="Durate degli ultimi cicli: ${a.used.map((x) => x.days + " giorni").join(", ")}"><path class="grid-line" d="M25 45H305M25 80H305M25 110H305"/>${bars}</svg><p class="hint">Cicli in ordine cronologico, dal più vecchio al più recente.</p>`;
}
function vStats() {
  const a = D.analysis(S),
    included = new Set(a.used.map((x) => x.start)),
    counts = D.SINTOMI.map((name) => {
      let n = 0;
      for (const x of a.used) {
        if (
          Object.entries(S.log).some(
            ([d, l]) => d >= x.start && d < x.end && l.sint.includes(name),
          )
        )
          n++;
      }
      return { name, n };
    })
      .filter((x) => x.n)
      .sort((a, b) => b.n - a.n);
  return `<p class="small muted">${a.used.length ? "Ultimi " + a.used.length + " cicli utilizzabili" : "In attesa di intervalli completi"}</p><div class="metrics"><div class="metric"><strong>${a.used.length ? a.cycle : "—"}<small>giorni</small></strong><p>Durata media ciclo</p></div><div class="metric"><strong>${a.periodMean ?? "—"}<small>giorni</small></strong><p>Durata mestruazioni</p></div></div>${card(`<div class="split"><h2>Durata del ciclo</h2>${a.used.length ? `<span class="tag">${Math.min(...a.used.map((x) => x.days))}–${Math.max(...a.used.map((x) => x.days))} gg</span>` : ""}</div>${cycleChart(a)}<p class="hint">${a.used.length?"Differenza tra più breve e più lungo: "+a.spread+" giorni. Deviazione standard campionaria: "+(a.sd==null?"non disponibile":a.sd.toFixed(2).replace(".",",")+" giorni")+".":"Nessun intervallo completo."} ${a.used.length<3?"Dati pochi. ":""}Descrive le registrazioni, non l’errore della proiezione. Fonte matematica: NIST, S16.</p>`)}${flat(`<h2>Sintomi ricorrenti</h2>${counts.length ? counts.map((x) => `<div class="symptom"><div class="split"><span>${x.name}</span><small>${x.n} cicli su ${a.used.length}</small></div><div class="bar"><i style="width:${(x.n / a.used.length) * 100}%"></i></div></div>`).join("") : '<p class="hint">Servono sintomi annotati negli intervalli inclusi.</p>'}<p class="hint">Un ciclo senza annotazioni non prova l’assenza di sintomi.</p>`)}${row("periods", "cal", "Gestisci cicli ed esclusioni", a.intervals.filter((x) => x.reason).length + " intervalli esclusi")}${row("temp", "chart", "Temperatura basale", "Facoltativa")}${row("report", "download", "Riepilogo per una visita", "Scegli le date e salva in PDF")}${button("science","Fonti e metodo","text-button")}`;
}
function vPeriods() {
  const a = D.analysis(S);
  return (
    primary("new-period", icon("plus") + "Aggiungi un ciclo") +
    (S.periods.length
      ? card(
          S.periods
            .slice()
            .sort((a, b) => b.start.localeCompare(a.start))
            .map((p) => {
              const interval = a.intervals.find((x) => x.id === p.id);
              return `<div class="list-entry"><b>${D.fmt(p.start, true)}</b><p>${p.end ? "Fine: " + D.fmt(p.end, true) : "Fine non registrata"}${interval ? " · Ciclo di " + interval.days + " giorni" : ""}</p>${p.exclude || interval?.reason ? `<p>${esc(interval?.reason || "Escluso da te")}</p>` : ""}<div class="actions">${button("edit-period", "Modifica", "", `data-id="${esc(p.id)}"`)}${button("delete-period", "Elimina", "danger", `data-id="${esc(p.id)}"`)}</div></div>`;
            })
            .join(""),
        )
      : noData(
          "Ancora nessun ciclo",
          "Aggiungi un inizio reale, anche se non ricordi la data di fine.",
        )) +
    '<p class="hint">L’esclusione riguarda l’intervallo che inizia in quella data. La registrazione resta nel calendario e nel riepilogo. Le soglie tecniche non sono soglie mediche.</p>'
  );
}
function vVisits() {
  return (
    primary("new-visit", icon("plus") + "Aggiungi una visita") +
    (S.visits.length
      ? card(
          S.visits
            .slice()
            .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
            .map(
              (v) =>
                `<div class="list-entry"><b>${esc(v.title)}</b><p>${D.fmt(v.date, true)} · ${v.time}</p>${v.notes ? `<p>${esc(v.notes)}</p>` : ""}<div class="actions">${button("edit-visit", "Modifica", "", `data-id="${esc(v.id)}"`)}${button("delete-visit", "Elimina", "danger", `data-id="${esc(v.id)}"`)}</div></div>`,
            )
            .join(""),
        )
      : noData(
          "Nessuna visita in programma",
          "Quando vuoi, aggiungi un appuntamento.",
        ))
  );
}
function vMeds() {
  return (
    primary("new-med", icon("plus") + "Aggiungi farmaco o integratore") +
    (S.meds.length
      ? card(
          S.meds
            .map(
              (m) =>
                `<div class="list-entry"><b>${esc(m.name)}</b><p>${m.time || "Orario da impostare"}${m.instructions ? " · " + esc(m.instructions) : ""}</p><div class="actions">${button("edit-med", "Modifica", "", `data-id="${esc(m.id)}"`)}${button("delete-med", "Elimina", "danger", `data-id="${esc(m.id)}"`)}</div></div>`,
            )
            .join(""),
        )
      : noData(
          "Nessun elemento registrato",
          "Aggiungi soltanto ciò che ti è utile ricordare.",
        )) +
    '<p class="hint">Cosma registra le tue indicazioni, senza suggerire dosaggi o modifiche alla terapia.</p>'
  );
}
function vSettings() {
  const labels = {
    flusso: "Flusso",
    umore: "Umore",
    sint: "Sintomi",
    dolore: "Dolore",
    note: "Note",
    pms:"Scala personale dei sintomi quotidiani", temp: "Temperatura basale", mucus:"Muco cervicale", lh:"Test LH", pregnancy:"Test di gravidanza", weight:"Peso", sleep:"Sonno",
  };
  return `<form data-form="settings">${select(
    "theme",
    "Aspetto",
    [
      ["auto", "Segue il telefono"],
      ["light", "Chiaro"],
      ["dark", "Scuro"],
    ],
    S.theme,
  )}${check("secureScreen","Nascondi il contenuto nelle app recenti e impedisci gli screenshot",S.secureScreen)}${select("ageGroup","Fascia per i riferimenti del ciclo",[["non-indicata","Preferisco non indicarla"],["adolescente","Adolescenza"],["18-25","18–25 anni"],["26-41","26–41 anni"],["42-45","42–45 anni"],["oltre45","Oltre 45 anni"]],S.ageGroup)}<h2 class="block-title">Categorie del diario</h2>${Object.entries(
    labels,
  )
    .map(([k, t]) => check(k, t, S.categories[k]))
    .join(
      "",
    )}<p class="hint">Nascondere una categoria conserva le registrazioni già fatte.</p>${field("cycleLen", "Durata iniziale del ciclo (giorni)", "number", S.cycleLen, 'min="18" max="60" required')}${field("periodLen", "Durata iniziale mestruazioni (giorni)", "number", S.periodLen, 'min="1" max="15" required')}${formEnd("Salva le preferenze")}${row("life-mode", "moon", "Modalità di vita", S.mode === "ciclo" ? "Ciclo" : "Conoscere la mia fertilità")}`;
}


function vPms(){const names={mood:'Umore basso',irritability:'Irritabilità',anxiety:'Tensione',fatigue:'Stanchezza',sleep:'Disturbi del sonno',interference:'Impatto sulle attività'};return `<p class="hint">Scala personale 0–3, non un test diagnostico o un questionario DRSP validato. Attivala nelle categorie del diario; osserva i giorni senza attribuire automaticamente una causa al ciclo.</p>${primary('today-diary','Registra nel diario di oggi')}<div class="card"><h2>Ultime registrazioni quotidiane</h2>${Object.entries(names).map(([key,label])=>{const rows=Object.entries(S.log).filter(([,l])=>l.pmsRecorded).sort(([a],[b])=>a.localeCompare(b)).slice(-60);if(!rows.length)return '';const first=rows[0][0],span=Math.max(1,D.diff(first,rows.at(-1)[0]));let paths='',prev=null;for(const [date,l] of rows){const x=24+D.diff(first,date)/span*280,y=88-(l.pms?.[key]||0)*22;if(prev&&D.diff(prev.date,date)===1)paths+=`<path d="M${prev.x} ${prev.y} L${x} ${y}" fill="none" stroke="var(--accent)" stroke-width="2"/>`;paths+=`<circle cx="${x}" cy="${y}" r="3" fill="var(--accent)"/>`;prev={date,x,y};}return `<h3>${label}</h3><svg class="chart" viewBox="0 0 320 122" role="img" aria-label="${label}: registrazioni quotidiane, scala 0–3"><text x="4" y="26">3</text><text x="4" y="91">0</text>${paths}<text x="24" y="115">${D.fmt(first)}</text><text x="304" y="115" text-anchor="end">${D.fmt(rows.at(-1)[0])}</text></svg>`;}).join('')||'<p class="hint">Nessuna scala quotidiana registrata. Le giornate mancanti non sono considerate zero.</p>'}${button('report','Scegli date per il riepilogo PDF','text-button')}${button('science','Fonti e limiti','text-button')}</div>`;}
function vFeedback(){return `<p class="hint">Nessun invio automatico. Puoi copiare queste domande e inviare a mano le tue risposte, evitando dati personali o sanitari che non vuoi condividere.</p><label for="feedback-text">Le cinque domande</label><textarea id="feedback-text" rows="15">1. Sei riuscita ad aggiungere e correggere un ciclo?\n\n2. La stima e i suoi limiti sono chiari?\n\n3. Il diario e il calendario sono facili da usare?\n\n4. Notifiche, PIN, impronta e backup hanno funzionato? Indica la versione Android, se la conosci.\n\n5. Che cosa cambieresti per prima cosa?</textarea>${primary('copy-feedback','Copia le domande')}<p class="hint">Il testo di questa pagina non viene salvato nel database.</p>`;}

function vSecurity(){return `<div class="card"><h2>${Store.isProtected()?'Il PIN è attivo':'Proteggi l’accesso'}</h2><p class="hint">I dati sono cifrati nella memoria privata del telefono. Il PIN aggiunge la protezione dell’accesso. Cosma si blocca quando passa in secondo piano e dopo 5 minuti senza attività.</p><p class="hint">Se perdi il PIN, puoi ripartire da un backup cifrato con la sua password. Non possiamo recuperare il PIN per te.</p>${!Store.isProtected()?`<form data-form="enable-pin">${field('password','Nuovo PIN o password, almeno 8 caratteri','password','','required minlength="8" autocomplete="new-password"')}${field('repeat','Ripeti PIN o password','password','','required minlength="8" autocomplete="new-password"')}${formEnd('Attiva il PIN')}`:`${primary('lock','Blocca subito')}<form data-form="biometric">${field('password','PIN attuale per associare l’impronta','password','','required autocomplete="current-password"')}${formEnd(biometricEnabled?'Riassocia l’impronta':'Attiva lo sblocco biometrico',true)}${biometricEnabled?button('remove-biometric','Disattiva la biometria','text-button'):''}<form data-form="disable-pin">${field('password-disable','PIN attuale per disattivare il blocco','password','','required autocomplete="current-password"')}${formEnd('Disattiva il PIN',true)}`}</div><p class="hint">Se la biometria sicura non è disponibile, il PIN funziona comunque. La chiave biometrica non viene esportata nel backup.</p>`;}


function vBackup(){const due=!S.lastBackup||D.diff(S.lastBackup,D.today())>=28;return `<div class="card"><h2>Una copia che scegli tu</h2><p class="hint">Disinstallare Cosma elimina i dati. Il backup automatico di Android è disattivato: conserva un file cifrato in una cartella sicura.</p>${due?'<p class="hint">È il momento di fare un backup. Se abiliti le notifiche, ti ricordiamo di farlo ogni quattro settimane.</p>':'<p class="hint">Ultimo file salvato: '+D.fmt(S.lastBackup,true)+'.</p>'}${primary('export-backup','Salva backup cifrato')}${button('share-backup','Condividi backup cifrato','text-button')}${button('import-backup','Ripristina un backup cifrato','text-button')}${button('report','Riepilogo per una visita · PDF','text-button')}</div>${button('wipe','Cancella tutti i dati','danger')}<p class="hint">Se scegli un servizio cloud dal selettore file o dalla condivisione Android, sarà una tua scelta esplicita. Cosma non invia il backup da sola.</p>`;}

function vLearn(){return button('science','Fonti e metodo','secondary')+'<p class="hint">Informazioni generali con fonti consultabili offline. Nessuna revisione clinica indipendente; non una valutazione personale.</p>'+articles.map(a=>`<details class="article"><summary>${esc(a.title)}</summary><p>${esc(a.text)}</p>${button('article-source','Fonti: '+a.sources.join(', '),'text-button',`data-sources="${a.sources.join(',')}"`)}</details>`).join('');}
function tempChart() {
  const entries = Object.entries(S.log)
    .filter(([, l]) => l.temp != null)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-60);
  if (!entries.length)
    return '<p class="hint">Nessuna temperatura registrata.</p>';
  const first = entries[0][0],
    span = Math.max(1, D.diff(first, entries.at(-1)[0])),
    temps = entries.map(([, l]) => l.temp),
    min = Math.floor((Math.min(...temps) - 0.1) * 10) / 10,
    max = Math.ceil((Math.max(...temps) + 0.1) * 10) / 10,
    range = max - min;
  const coords = entries.map(([d, l]) => ({
    d,
    l,
    x: 35 + (D.diff(first, d) / span) * 260,
    y: 125 - ((l.temp - min) / range) * 100,
  }));
  let segments = "";
  for (let i = 1; i < coords.length; i++) {
    const a = coords[i - 1],
      b = coords[i];
    if (D.diff(a.d, b.d) === 1 && !a.l.tempDisturbed && !b.l.tempDisturbed)
      segments += `<path d="M${a.x} ${a.y}L${b.x} ${b.y}" stroke="var(--accent)" fill="none" stroke-width="2"/>`;
  }
  return `<svg class="chart" viewBox="0 0 320 160" role="img" aria-label="Temperature basali: ${entries.length} misure, da ${Math.min(...temps)} a ${Math.max(...temps)} gradi"><path class="grid-line" d="M30 25H305M30 75H305M30 125H305"/><text x="0" y="28">${max.toFixed(1)}</text><text x="0" y="128">${min.toFixed(1)}</text>${segments}${coords.map(({ x, y, l }) => `<circle cx="${x}" cy="${y}" r="4" fill="${l.tempDisturbed ? "var(--surface)" : "#7c3aed"}" stroke="${l.tempDisturbed ? "var(--muted)" : "#7c3aed"}"/>`).join("")}<text x="35" y="151">${D.fmt(first)}</text><text x="295" y="151" text-anchor="end">${D.fmt(entries.at(-1)[0])}</text></svg><p class="temp-legend">Pieno: misura confrontabile · Vuoto: misura disturbata</p><details><summary class="text-button">Leggi le misure</summary><table><thead><tr><th>Data</th><th>°C</th><th>Disturbata</th></tr></thead><tbody>${entries.map(([d, l]) => `<tr><td>${D.fmt(d, true)}</td><td>${l.temp.toFixed(2)}</td><td>${l.tempDisturbed ? "Sì" : "No"}</td></tr>`).join("")}</tbody></table></details>`;
}

function vTemp(){
 const records=Object.entries(S.log).filter(([,l])=>l.mucus||l.lh||l.pregnancy||l.temp!=null).sort(([a],[b])=>b.localeCompare(a)).slice(0,90);
 return `${card('<h2>Temperatura: misure registrate</h2>'+tempChart())}${primary('record-temp','Registra una temperatura')}${flat('<h2>Lettura dei segnali</h2><p class="hint">Intervallo non stimabile. Questa versione mostra i dati grezzi e non interpreta automaticamente la combinazione di temperatura, muco e test LH.</p><p class="hint">Eventuali “segnali compatibili con un’ovulazione già avvenuta” richiedono un metodo documentato: nessuna data certa, nessuna conferma clinica. NICE NG257 §1.18.9 sconsiglia di usare i grafici BBT per confermare l’ovulazione; LH è un segnale indiretto (ASRM 2026).</p>'+button('science','Metodo, limiti e fonti','text-button'))}<h2 class="block-title">Dati grezzi del diario</h2>${records.length?flat(records.map(([d,l])=>`<div class="list-entry"><b>${D.fmt(d,true)}</b><p>${[l.temp!=null?'Temperatura '+l.temp.toFixed(2)+' °C'+(l.tempDisturbed?' · disturbata':''):'',l.mucus?'Muco: '+esc(l.mucus):'',l.lh?'LH: '+esc(l.lh):'',l.pregnancy?'Test gravidanza: '+esc(l.pregnancy):''].filter(Boolean).join('<br>')}</p></div>`).join('')):'<p class="hint">Nessun segnale registrato. Le categorie sono facoltative, attivabili da Preferenze.</p>'}${button('settings','Scegli i dati da registrare','secondary')}<p class="hint">Import da dispositivi indossabili e interpretazione numerica retrospettiva non disponibili in questa versione di prova.</p>`;
}


function vNotifications(){const rs=reminders(S);return `<div class="card"><h2>Promemoria discreti</h2><p class="hint">${notificationHelp}</p><p class="preview"><b>Promemoria Cosma</b><br>Apri Cosma per consultare il promemoria.</p>${primary('enable-notifications',S.notifications?'Verifica autorizzazione':'Attiva le notifiche')}${button('test-notification','Prova un avviso fra 10 secondi','text-button')}${button('exact-alarms','Gestisci gli allarmi esatti','text-button')}${S.notifications?button('disable-notifications','Disattiva i promemoria','text-button'):''}<form data-form="notification-settings">${check('cycleReminder','Promemoria quando inizia la fascia descrittiva delle mestruazioni',S.cycleReminder)}${formEnd('Salva preferenza',true)}</div>${rs.length?'<h2 class="block-title">Prossimi promemoria nell’app</h2><div class="plain-list">'+rs.map(r=>'<div class="list-entry"><b>'+esc(r.label)+'</b><p>'+D.fmt(r.date)+' · '+r.time+'</p></div>').join(''):'<p class="hint">Aggiungi un orario a un farmaco o a una visita per programmare un promemoria.</p>'}`;}

function periodModal(id = "", date = D.today()) {
  const p = S.periods.find((p) => p.id === id) || { start: date };
  modal(
    id ? "Modifica ciclo" : "Registra mestruazioni",
    `<form data-form="period" data-id="${esc(id)}">${field("start", "Primo giorno", "date", p.start, `max="${D.today()}" required`)}${field("end", "Ultimo giorno (facoltativo)", "date", p.end || "", `max="${D.today()}"`)}${check("exclude", "Escludi questo ciclo dalle statistiche e dalle previsioni", p.exclude)}<p class="hint">La registrazione rimane visibile anche se esclusa. La data di fine può essere aggiunta più tardi.</p>${formEnd("Salva il ciclo")}`,
  );
}
function visitModal(id = "") {
  const v = S.visits.find((v) => v.id === id) || {
    date: D.today(),
    time: "09:00",
    remind: true,
  };
  modal(
    id ? "Modifica visita" : "Aggiungi visita",
    `<form data-form="visit" data-id="${esc(id)}">${field("title", "Nome della visita o dell’esame", "text", v.title, 'required maxlength="300"')}${field("date", "Data", "date", v.date, "required")}${field("time", "Ora", "time", v.time, "required")}<label for="notes">Note facoltative</label><textarea id="notes" name="notes" maxlength="3000">${esc(v.notes)}</textarea>${check("remind", "Aggiungi ai promemoria", v.remind)}${formEnd("Salva la visita")}`,
  );
}
function medModal(id = "") {
  const m = S.meds.find((m) => m.id === id) || { remind: true };
  modal(
    id ? "Modifica elemento" : "Farmaco o integratore",
    `<form data-form="med" data-id="${esc(id)}">${field("name", "Nome", "text", m.name, 'required maxlength="300"')}${field("time", "Ora quotidiana (facoltativa)", "time", m.time)}<label for="instructions">Indicazioni personali</label><textarea id="instructions" name="instructions" maxlength="2000">${esc(m.instructions)}</textarea>${check("remind", "Aggiungi ai promemoria quotidiani", m.remind)}${formEnd("Salva elemento")}`,
  );
}

function calculateModal(){
 const a=D.analysis(S),p=a.prediction;
 modal('Come l’ho calcolato?',`<span class="tag">Calendario · descrittivo</span><p class="hint">Stima basata sui tuoi cicli passati. Può cambiare, non è una previsione medica.</p><h3>Dati inclusi</h3>${a.used.length?`<ul>${a.used.map(x=>`<li>${D.fmt(x.start,true)}–${D.fmt(x.end,true)}: ${x.days} giorni</li>`).join('')}</ul><p>Media: ${a.mean.toFixed(2).replace('.',',')} giorni. Minimo/massimo: ${a.min}–${a.max}. Deviazione standard campionaria: ${a.sd==null?'non disponibile':a.sd.toFixed(2).replace('.',',')+' giorni'}.</p>`:'<p>Nessun intervallo completo: non mostriamo una previsione numerica.</p>'}<h3>Formula e limiti</h3>${p?`<p>${D.fmt(p.ls)} + ${a.min}–${a.max} giorni osservati = ${D.fmt(p.low)}–${D.fmt(p.high)}.</p>`:'<p>Meno di 3 intervalli completi: dati pochi per la proiezione descrittiva.</p>'}<p class="hint">Usiamo gli ultimi sei intervalli non esclusi da te. Il prossimo ciclo può cadere fuori dalla fascia. Il margine di errore clinico non è validato; non è un intervallo di confidenza o una percentuale di affidabilità. La soglia di tre intervalli è una scelta prudenziale di prodotto.</p><h3>Esclusioni trasparenti</h3>${a.intervals.filter(x=>x.reason).map(x=>`<p>${D.fmt(x.start)}: ${x.days} giorni · ${x.reason}</p>`).join('')||'<p>Nessuna esclusione.</p>'}<p class="hint">Non scartiamo automaticamente cicli molto lunghi o brevi come se fossero errori. Puoi correggere le date o escludere un intervallo, conservando lo storico.</p><h3>Fonti e ruolo</h3><p class="hint">NIST: strumenti statistici descrittivi. Bull et al., 2019: variabilità e limiti delle medie. Nessuno dei due valida la proiezione di Cosma. Non deduciamo ovulazione o finestra fertile sottraendo 14 giorni.</p>${button('manage-periods','Gestisci esclusioni','secondary')}${button('science','Fonti e metodo','text-button')}`);
}


function backupModal(importing=false,legacy=false,share=false){restoreText=null;modal(importing?'Ripristina un backup cifrato':'Crea un backup cifrato',`<form data-form="${importing?'restore':'export'}" data-share="${share}">${importing?(__COSMA_TEST__?field('file','Scegli il file di test','file','','required accept=".json"'):button('choose-backup','Scegli un file dal telefono','secondary')+'<p id="chosen-backup" class="hint">Nessun file scelto.</p>'):''}${field('password',importing?'Password del backup':'Password del backup, almeno 10 caratteri','password','','required autocomplete="'+(importing?'current-password':'new-password')+'" '+(importing?'':'minlength="10"'))}${!importing?field('repeat','Ripeti la password','password','','required autocomplete="new-password"'):''}<p class="hint">La password del backup è distinta dal PIN. Non possiamo recuperarla. ${importing?'Il ripristino sostituirà i dati attuali dopo un’altra conferma.':''}</p>${formEnd(importing?'Controlla il backup':share?'Crea e condividi il file':'Crea e salva il file')}`);}

function reportModal() {
  modal(
    "Riepilogo per una visita",
    `<p>Scegli le date. Il riepilogo include cicli, diario e farmaci; resterà sul dispositivo finché non lo condividi.</p><form data-form="report">${field("from", "Dal", "date", D.addD(D.today(), -180), `max="${D.today()}" required`)}${field("to", "Al", "date", D.today(), `max="${D.today()}" required`)}${formEnd("Apri stampa / Salva come PDF")}`,
  );
}
async function report(from, to) {
  document.querySelector(".report")?.remove();
  const a = D.analysis(S),
    entries = Object.entries(S.log)
      .filter(([d]) => d >= from && d <= to)
      .sort(([a], [b]) => a.localeCompare(b)),
    periods = S.periods.filter(
      (p) => p.start <= to && (p.end || p.start) >= from,
    );
  const el = document.createElement("article");
  el.className = "report";
  el.innerHTML = `<h1>Cosma · Riepilogo personale</h1><p>Dal ${D.fmt(from, true)} al ${D.fmt(to, true)} · Creato il ${D.fmt(D.today(), true)}</p><p>Dati registrati dalla persona, non verificati clinicamente. Nessuna diagnosi.</p><h2>Mestruazioni registrate nel periodo</h2><table><thead><tr><th>Inizio</th><th>Fine</th><th>Esclusioni dalla stima</th></tr></thead><tbody>${periods.map((p) => `<tr><td>${D.fmt(p.start, true)}</td><td>${p.end ? D.fmt(p.end, true) : "Non registrata"}</td><td>${esc(a.intervals.find((x) => x.id === p.id)?.reason || (p.exclude ? "Escluso da te" : "No"))}</td></tr>`).join("") || '<tr><td colspan="3">Nessun ciclo nel periodo.</td></tr>'}</tbody></table><h2>Diario nel periodo</h2><table><thead><tr><th>Data</th><th>Flusso / umore</th><th>Sintomi / dolore</th><th>Temperatura</th><th>Note</th></tr></thead><tbody>${entries.map(([d, l]) => `<tr><td>${D.fmt(d, true)}</td><td>${esc(l.flusso)}<br>${esc(l.umore)}</td><td>${esc(l.sint.join(", "))}<br>${l.dolore}/10</td><td>${l.temp ?? "—"}${l.tempDisturbed ? " (disturbata)" : ""}</td><td>${esc(l.note)}${l.mucus?"<br>Muco: "+esc(l.mucus):""}${l.lh?"<br>LH: "+esc(l.lh):""}${l.pregnancy?"<br>Test gravidanza: "+esc(l.pregnancy):""}${l.weight!=null?"<br>Peso: "+l.weight+" kg":""}${l.sleep!=null?"<br>Sonno: "+l.sleep+" ore":""}${l.pmsRecorded?"<br>Scala personale 0–3: "+esc(Object.entries(l.pms||{}).map(([k,v])=>({mood:"umore",irritability:"irritabilità",anxiety:"tensione",fatigue:"stanchezza",sleep:"sonno",interference:"attività"})[k]+" "+v).join(", ")):""}</td></tr>`).join("") || '<tr><td colspan="5">Nessuna annotazione nel periodo.</td></tr>'}</tbody></table><h2>Farmaci e integratori attualmente registrati</h2><p>Elenco attuale: non ricostruisce le terapie passate né certifica l’assunzione.</p><table><thead><tr><th>Nome</th><th>Ora</th><th>Indicazioni personali</th></tr></thead><tbody>${S.meds.map((m) => `<tr><td>${esc(m.name)}</td><td>${m.time || "—"}</td><td>${esc(m.instructions)}</td></tr>`).join("") || '<tr><td colspan="3">Nessun elemento registrato.</td></tr>'}</tbody></table><p class="page-note">Riepilogo generato localmente, da condividere soltanto per scelta.</p>`;
  document.body.append(el);
  closeModal();
  const html=`<!doctype html><html lang="it"><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;font-size:11pt;color:#222}h1{font-size:20pt}h2{font-size:14pt;margin-top:24px}table{width:100%;border-collapse:collapse;font-size:9pt}td,th{padding:6px;border-bottom:1px solid #ddd;text-align:left;overflow-wrap:anywhere}tr{break-inside:avoid}</style><body>${el.innerHTML}</body></html>`;
  await Platform.printReport(html);el.remove();
}
function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type })),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function lockNow() {
  if (!Store.isProtected() || locked || !S) return;
  S = null;
  draft = null;
  dirty = false;
  locked = true;
  Store.forgetKey();
  closeModal();
  document.querySelector(".report")?.remove();
  $("#status").textContent = "";
  render();
}
function enablePinCheck(password, repeat) {
  if (password !== repeat) throw Error("Le due password o PIN non coincidono.");
}
function removeConfirm(collection, id, label) {
  if (!confirm(`Eliminare ${label}? Questa operazione non si può annullare.`))
    return;
  return run(async () => {
    const n = D.clone(S);
    n[collection] = n[collection].filter((x) => x.id !== id);
    await commit(n);
    render();
    toast("Elemento eliminato.");
  });
}
const routes = ["pms","feedback",
  "salute",
  "stats",
  "periods",
  "visits",
  "meds",
  "settings",
  "backup",
  "security",
  "learn",
  "temp",
  "notify",
];
document.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-action]");
  if (!b) return;
  idle = Date.now();
  const act = b.dataset.action;
  if (act === "close") {
    closeModal();
    return;
  }
  if (locked) {
    if(act==="biometric-unlock"){run(async()=>{const secret=await Platform.loadBiometricPin();S=await Store.unlock(secret);locked=false;idle=Date.now();render();});return;}
    if (act === "forgot")
      modal(
        "PIN dimenticato",
        `<p>Non possiamo recuperare il PIN. Puoi cancellare l’archivio per ricominciare e poi importare un backup con la sua password.</p><p class="security-note">Senza backup perderai le registrazioni.</p>${button("wipe", "Cancella l’archivio per ricominciare", "danger")}`,
      );
    else if (act === "wipe") wipe();
    return;
  }
  if (!S || busy) return;
  if (routes.includes(act)) {
    go(act);
    return;
  }
  switch (act) {
    case 'agenda':go('notify');break;
    case 'choose-backup':run(async()=>{const text=await Platform.pickBackup();if(text!==null){restoreText=text;$('#chosen-backup').textContent='File selezionato sul telefono.';}});break;
    case 'share-backup':backupModal(false,false,true);break;
    case 'remove-biometric':run(async()=>{await Platform.clearBiometric();biometricEnabled=false;render();});break;
    case 'exact-alarms':run(async()=>{await Platform.withNativeUi(()=>requestExact());const status=await exactStatus();await syncNotifications(S);toast(status==='granted'?'Allarmi esatti autorizzati.':'Senza allarmi esatti Android può ritardare i promemoria.');});break;
    case 'copy-feedback':run(async()=>{try{await navigator.clipboard.writeText($('#feedback-text').value);toast('Domande copiate. Le puoi inviare a mano.');}catch{$('#feedback-text').select();toast('Tieni premuto il testo e scegli Copia.');}});break;
    case "nav":
      go(b.dataset.tab);
      break;
    case "back":
      androidBack();
      break;
    case "skip-onboarding":
      run(async () => {
        const n = D.clone(S);
        n.onboarded = true;
        await commit(n);
        render();
      });
      break;
    case "new-period":
      periodModal("", b.dataset.date || D.today());
      break;
    case "edit-period":
      periodModal(b.dataset.id);
      break;
    case "delete-period":
      removeConfirm("periods", b.dataset.id, "questa registrazione del ciclo");
      break;
    case "end-period": {
      const p = S.periods.find(
        (p) =>
          !p.end &&
          D.diff(p.start, D.today()) >= 0 &&
          D.diff(p.start, D.today()) < 15,
      );
      if (p) {
        periodModal(p.id);
        $("#end").value = D.today();
      }
      break;
    }
    case "today-diary":
      if (canLeave()) {
        sel = D.today();
        go("diario");
      }
      break;
    case "selected-diary":
      go("diario");
      break;
    case "pick-day":
      sel = b.dataset.date;
      render();
      break;
    case "prev-month":
    case "next-month": {
      const dt = new Date(month + "T12:00:00");
      dt.setMonth(dt.getMonth() + (act === "next-month" ? 1 : -1));
      if (dt.getFullYear() < 1900 || dt.getFullYear() > 2200) return;
      month = D.iso(dt);
      render();
      break;
    }
    case "prev-day":
    case "next-day":
      if (canLeave()) {
        sel = D.addD(sel, act === "next-day" ? 1 : -1);
        if (sel > D.today()) sel = D.today();
        render();
      }
      break;
    case "chip": {
      const k = b.dataset.field,
        v = b.dataset.value,
        multi = b.dataset.multi === "true";
      if (!draft) return;
      if (multi)
        draft[k] = draft[k].includes(v)
          ? draft[k].filter((x) => x !== v)
          : [...draft[k], v];
      else draft[k] = draft[k] === v ? "" : v;
      for (const item of document.querySelectorAll(
        `[data-action=chip][data-field="${k}"]`,
      ))
        item.setAttribute(
          "aria-pressed",
          multi
            ? draft[k].includes(item.dataset.value)
            : draft[k] === item.dataset.value,
        );
      dirty = true;
      break;
    }
    case "delete-log":
      if (confirm("Eliminare questa registrazione del diario?"))
        run(async () => {
          const n = D.clone(S);
          delete n.log[sel];
          await commit(n);
          draft = null;
          dirty = false;
          render();
          toast("Registrazione eliminata.");
        });
      break;
    case "new-visit":
      visitModal();
      break;
    case "edit-visit":
      visitModal(b.dataset.id);
      break;
    case "delete-visit":
      removeConfirm("visits", b.dataset.id, "questa visita");
      break;
    case "new-med":
      medModal();
      break;
    case "edit-med":
      medModal(b.dataset.id);
      break;
    case "delete-med":
      removeConfirm("meds", b.dataset.id, "questo elemento");
      break;
    case "calculation":
      calculateModal();
      break;
    case "article-source":
      modal("Fonte della scheda",b.dataset.sources.split(",").map(id=>sourceById[id]||"Fonte non disponibile").join(""));
      break;
    case "science":
      modal("Fonti e limiti scientifici", scienceHTML + medical);
      break;
    case "manage-periods":
      closeModal();
      go("periods");
      break;
    case "late-info":
      modal(
        "Quando il ciclo si fa attendere",
        `<p>${articles.find((a) => a.title === "Un ritardo").text}</p><p>${articles.find((a) => a.title === "Cambiamenti che continuano").text}</p>`,
      );
      break;
    case "life-mode":
      modal(
        "La tua modalità",
        `<form data-form="mode">${select(
          "mode",
          "Modalità",
          [
            ["ciclo", "Ciclo"],
            ["concepimento", "Conoscere la mia fertilità"],
          ],
          S.mode,
        )}<p class="hint">Conoscere la mia fertilità attiva i campi dei segnali facoltativi. La versione di prova non interpreta automaticamente l’ovulazione e non mostra una finestra fertile personale non validata. Non è un trattamento né una valutazione della fertilità.</p><p class="hint">Gravidanza e perimenopausa: in arrivo, non attivabili nella 1.0.</p>${formEnd("Salva modalità")}`,
      );
      break;
    case "method":
      modal(
        "Metodo contraccettivo",
        `<form data-form="method">${select("method", "Metodo", ["Nessuno", "Pillola", "Anello", "Cerotto", "Spirale", "Altro"], S.method)}${check("methodRemind", "Promemoria quotidiano personalizzato", S.methodRemind)}${field("methodTime", "Ora del promemoria quotidiano", "time", S.methodTime, "required")}<p class="hint">Imposta solo un’abitudine che hai concordato: questo orario non definisce quando assumere o sostituire il metodo e non offre protezione da una gravidanza.</p>${formEnd("Salva metodo")}`,
      );
      break;
    case "lock":
      if (canLeave()) lockNow();
      break;
    case "export-backup":
      backupModal();
      break;
    case "import-backup":
      backupModal(true);
      break;
    case "import-legacy":
      backupModal(true, true);
      break;
    case "confirm-restore":
      if (restoreCandidate)
        run(async () => {
          await commit(restoreCandidate);
          restoreCandidate = null;
          dirty = false;
          draft = null;
          closeModal();
          tab = "oggi";
          render();
          toast("Backup ripristinato.");
        });
      break;
    case "wipe":
      wipe();
      break;
    case "report":
      reportModal();
      break;
    case "record-temp":
      modal(
        "Registra temperatura",
        `<form data-form="temperature">${field("date", "Data della misura", "date", D.today(), `max="${D.today()}" required`)}${field("temp", "Temperatura basale (°C)", "number", "", 'min="34" max="42" step="0.01" required inputmode="decimal"')}${check("tempDisturbed", "Misura disturbata (febbre, sonno o altro)")}${formEnd("Salva temperatura")}`,
      );
      break;
    case "enable-notifications":
      run(async () => {
        await requestNotifications();
        const n = D.clone(S);
        n.notifications = true;
        await commit(n);
        render();
        toast("Promemoria programmati sul telefono. Prova anche con Cosma chiusa.");
      });
      break;
    case "disable-notifications":
      run(async () => {
        const n = D.clone(S);
        n.notifications = false;
        await commit(n);
        render();
      });
      break;
    case "test-notification":
      run(async () => {
        if (!S.notifications) throw Error("Attiva prima le notifiche locali.");
        toast(
          (await notify())
            ? "Notifica inviata al sistema."
            : "Non è stato possibile programmare la notifica. Controlla i permessi Android.",
        );
      });
      break;
  }
});
function wipe() {
  modal(
    "Cancella tutti i dati",
    `<p>Verranno eliminate le registrazioni private di Cosma su questo telefono. I file di backup già salvati restano nelle cartelle che hai scelto.</p><form data-form="wipe">${field("confirm", "Scrivi CANCELLA per confermare", "text", "", 'required autocomplete="off"')}${formEnd("Cancella definitivamente")}`,
  );
}
document.addEventListener("input", (e) => {
  idle = Date.now();
  if (e.target.closest("form[data-form=diary]")) {
    dirty = true;
    if (e.target.id === "dolore") {
      $("#pain-output").textContent = e.target.value + "/10";
      draft.dolore = +e.target.value;
    }
    if (e.target.id === "note") draft.note = e.target.value;
    if (e.target.id === "temp")
      draft.temp = e.target.value === "" ? null : +e.target.value;
    if (e.target.name === "tempDisturbed")
      draft.tempDisturbed = e.target.checked;
  }
});
document.addEventListener("change", (e) => {
  if (e.target.id === "diary-date") {
    const value = e.target.value;
    if (!D.validDate(value) || value > D.today()) {
      e.target.value = sel;
      toast("Scegli una data valida, fino a oggi.");
      return;
    }
    if (canLeave()) {
      sel = value;
      render();
    } else e.target.value = sel;
  }
});
document.addEventListener("submit", (e) => {
  const form = e.target.closest("form[data-form]");
  if (!form) return;
  e.preventDefault();
  const f = new FormData(form),
    type = form.dataset.form,
    value = (n) => String(f.get(n) || ""),
    on = (n) => f.has(n);
  form.querySelector(".field-error")?.replaceChildren();
  run(async () => {
    switch (type) {
      case "onboarding": {
        const n = D.clone(S),
          date = value("start");
        if (!D.validDate(date) || date > D.today())
          throw Error("Scegli una data valida, fino a oggi.");
        n.periods.push({ id: D.uid(), start: date, exclude: false });
        n.onboarded = true;
        await commit(n);
        render();
        break;
      }
      case "unlock": {
        if (Date.now() < retryAt)
          throw Error("Attendi qualche secondo prima di riprovare.");
        try {
          S = await Store.unlock(value("password"));
          locked = false;
          unlockFailures = 0;
          idle = Date.now();
          render();
        } catch (e) {
          unlockFailures++;
          retryAt =
            Date.now() +
            Math.min(30000, 1000 * 2 ** Math.min(unlockFailures, 5));
          throw e;
        }
        break;
      }
      case "diary": {
        const n = D.clone(S),
          l = D.clone(draft || blankLog());
        if (S.categories.note) l.note = value("note");
        if (S.categories.dolore) l.dolore = +value("dolore");
        if (S.categories.temp) {
          l.temp = value("temp") === "" ? null : +value("temp");
          l.tempDisturbed = on("tempDisturbed");
        }
        for(const k of ['mucus','lh','pregnancy'])if(S.categories[k])l[k]=value(k);
        for(const k of ['weight','sleep'])if(S.categories[k])l[k]=value(k)===''?null:+value(k);
        if(S.categories.pms){l.pms=Object.fromEntries(["mood","irritability","anxiety","fatigue","sleep","interference"].map(k=>[k,+value("pms-"+k)]));l.pmsRecorded=true;}
        n.log[sel] = l;
        await commit(n);
        dirty = false;
        draft = null;
        render();
        toast("Diario salvato.");
        break;
      }
      case "period": {
        const n = D.clone(S),
          id = form.dataset.id || D.uid(),
          p = { id, start: value("start"), exclude: on("exclude") };
        if (value("end")) p.end = value("end");
        n.periods = n.periods.filter((x) => x.id !== id);
        n.periods.push(p);
        await commit(n);
        closeModal();
        render();
        toast("Ciclo salvato.");
        break;
      }
      case "visit": {
        const n = D.clone(S),
          id = form.dataset.id || D.uid(),
          v = {
            id,
            title: value("title").trim(),
            date: value("date"),
            time: value("time"),
            notes: value("notes"),
            remind: on("remind"),
          };
        n.visits = n.visits.filter((x) => x.id !== id);
        n.visits.push(v);
        await commit(n);
        closeModal();
        render();
        toast("Visita salvata.");
        break;
      }
      case "med": {
        const n = D.clone(S),
          id = form.dataset.id || D.uid(),
          m = {
            id,
            name: value("name").trim(),
            time: value("time"),
            instructions: value("instructions"),
            remind: on("remind"),
          };
        n.meds = n.meds.filter((x) => x.id !== id);
        n.meds.push(m);
        await commit(n);
        closeModal();
        render();
        toast("Elemento salvato.");
        break;
      }
      case "settings": {
        const n = D.clone(S);
        n.theme = value("theme");
        n.secureScreen=on("secureScreen");n.ageGroup=value("ageGroup");
        n.cycleLen = +value("cycleLen");
        n.periodLen = +value("periodLen");
        for (const k of Object.keys(n.categories)) n.categories[k] = on(k);
        await commit(n);
        draft = null;
        render();
        toast("Preferenze salvate.");
        break;
      }
      case "mode": {
        const n = D.clone(S);
        n.mode = value("mode");
        if(n.mode==="concepimento"){n.categories.temp=true;n.categories.mucus=true;n.categories.lh=true;}
        await commit(n);
        closeModal();
        render();
        break;
      }
      case "method": {
        const n = D.clone(S);
        n.method = value("method");
        n.methodTime = value("methodTime");
        n.methodRemind = on("methodRemind");
        await commit(n);
        closeModal();
        render();
        break;
      }
      case "biometric": {
        await Store.unlock(value("password"));await Platform.saveBiometricPin(value("password"));biometricEnabled=true;render();toast("Impronta associata. Il PIN resta disponibile.");break;
      }
      case "enable-pin": {
        enablePinCheck(value("password"), value("repeat"));
        await Store.enableProtection(S, value("password"));biometricEnabled=false;
        broadcast?.postMessage("changed");
        render();
        toast("Blocco con PIN attivo. Puoi associare la biometria come alternativa.");
        break;
      }
      case "disable-pin": {
        const fresh = await Store.unlock(value("password-disable"));
        await Store.disableProtection(fresh);biometricEnabled=false;
        S = fresh;
        broadcast?.postMessage("changed");
        render();
        toast("Blocco con PIN disattivato. L’archivio resta cifrato sul telefono.");
        break;
      }
      case "export": {
        enablePinCheck(value("password"), value("repeat"));
        const archive = await encryptBackup(S, value("password"));
        const text=JSON.stringify(archive),name='cosma-backup-'+D.today()+'.json';
        if(form.dataset.share==='true')await Platform.shareBackup(text,name);
        else{await Platform.saveBackup(text,name);const n=D.clone(S);n.lastBackup=D.today();await commit(n);}
        closeModal();
        toast("Backup cifrato creato. Conserva la password separatamente.");
        break;
      }
      case "restore": {
        let text=restoreText;
        if(__COSMA_TEST__){const file=f.get('file');if(!file?.size||file.size>30000000)throw Error('Scegli un file valido sotto 30 MB.');text=await file.text();}
        if(!text)throw Error('Scegli prima un file dal telefono.');
        let raw;try{raw=JSON.parse(text);}catch{throw Error('Il file non contiene JSON valido.');}
        const legacy = form.dataset.legacy === "true";
        if (!legacy) raw = await decryptBackup(raw, value("password"));
        restoreCandidate = D.normalize(raw, { legacy });
        restoreCandidate.notifications = false;
        restoreCandidate.dismissed = {};
        const c = restoreCandidate;
        modal(
          "Conferma il ripristino",
          `<p>Archivio valido: ${c.periods.length} inizi di ciclo, ${Object.keys(c.log).length} voci di diario, ${c.visits.length} visite e ${c.meds.length} farmaci/integratori.</p><p class="security-note">Sostituirà tutte le registrazioni attuali. ${Store.isProtected() ? "Il PIN attuale continuerà a proteggere i dati." : "Il blocco attuale resterà disattivato: puoi attivarlo da Salute."}</p>${primary("confirm-restore", "Sostituisci i dati con questo backup")}`,
        );
        break;
      }
      case "temperature": {
        const d = value("date");
        if (!D.validDate(d) || d > D.today())
          throw Error("La temperatura richiede una data valida, fino a oggi.");
        const t = +value("temp");
        if (!Number.isFinite(t) || t < 34 || t > 42)
          throw Error("Inserisci una temperatura tra 34 e 42 °C.");
        const n = D.clone(S);
        n.log[d] = {
          ...(n.log[d] || blankLog()),
          temp: t,
          tempDisturbed: on("tempDisturbed"),
        };
        await commit(n);
        closeModal();
        render();
        toast("Temperatura salvata.");
        break;
      }
      case "notification-settings": {
        const n = D.clone(S);
        n.cycleReminder = on("cycleReminder");
        await commit(n);
        render();
        toast("Preferenza salvata.");
        break;
      }
      case "report": {
        const from = value("from"),
          to = value("to");
        if (
          !D.validDate(from) ||
          !D.validDate(to) ||
          from > to ||
          to > D.today()
        )
          throw Error("Scegli un intervallo valido, fino a oggi.");
        await report(from, to);
        break;
      }
      case "wipe": {
        if (value("confirm") !== "CANCELLA")
          throw Error("Scrivi esattamente CANCELLA per confermare.");
        await Store.erase();
        S = D.initial();biometricEnabled=false;await syncNotifications(S);
        locked = false;
        dirty = false;
        draft = null;
        sel = D.today();
        tab = "oggi";
        broadcast?.postMessage("changed");
        closeModal();
        render();
        toast("Archivio locale cancellato.");
        break;
      }
    }
  });
});
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeModal();
});
window.addEventListener("beforeunload", (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});
["pointerdown", "keydown"].forEach((evt) =>
  document.addEventListener(evt, () => (idle = Date.now()), { passive: true }),
);
window.addEventListener("afterprint", () =>
  document.querySelector(".report")?.remove(),
);
let lastDay = D.today();
function renderIfDayChanged() {
  const t = D.today();
  if (t !== lastDay) {
    lastDay = t;
    if (!dirty) render();
  }
}

async function tick(){if(!S||locked||busy)return;if(Store.isProtected()&&Date.now()-idle>300000){lockNow();return;}renderIfDayChanged();}
setInterval(tick,30000);
async function androidBack(){if(dialog.open){closeModal();return;}if(locked){await Platform.exit();return;}if(!canLeave())return;if(historyTabs.length){tab=historyTabs.pop();render();}else if(tab!=='oggi'){tab='oggi';render();}else await Platform.exit();}
try{
 await Platform.initPlatform(()=>{if(Store.isProtected()){if(busy)hideRequested=true;else lockNow();}},androidBack);
 if(!crypto.subtle)throw Error('Questa versione di Android WebView non rende disponibile la cifratura. Aggiorna Android System WebView.');
 const result=await Store.boot();locked=!!result.locked;S=result.state||null;biometricEnabled=await Platform.hasBiometric();render();
 if(S){await Platform.secureScreen(S.secureScreen);syncNotifications(S).catch(()=>toast('Controlla i permessi per aggiornare i promemoria.'));}
 matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>applyTheme());
}catch(e){header.innerHTML='<h1>Cosma</h1>';app.innerHTML=`<div class="warning"><h2>Non riesco ad aprire l’archivio</h2><p>${esc(e.message)}</p><p class="hint">Non cancellare i dati se non hai un backup. Chiudi e riapri Cosma dopo aver controllato lo spazio disponibile.</p></div>`;}
