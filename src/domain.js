import {EXTRA_SYMPTOMS,EXTRA_MOODS,MUCUS,INTIMACY,ACTIVITY,CONTEXT,picks,intimacyPicks,moodValues} from './diary-catalog.js';
// Evoluzione delle funzioni iso, addD, diff, avgCycle e predict della v0.2.
// Le date civili si contano in UTC per evitare errori nei cambi di ora legale.
export const SINTOMI = [
  ...EXTRA_SYMPTOMS,
  "Crampi",
  "Mal di testa",
  "Gonfiore",
  "Mal di schiena",
  "Nausea",
  "Seno dolente",
  "Acne",
  "Stanchezza",
  "Voglia di dolci",
];
export const UMORI = [
  ...EXTRA_MOODS,
  "Felice",
  "Calma",
  "Neutro",
  "Triste",
  "Irritabile",
  "Ansia",
];
export const FLUSSI = ["Nessuno", "Spotting", "Leggero", "Medio", "Abbondante"];
export const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const today = () => iso(new Date());
export function validDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const x = new Date(Date.UTC(y, m - 1, d));
  return y >= 1900 && y <= 2200 && x.toISOString().slice(0, 10) === s;
}
const utc = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
export const addD = (s, n) =>
  new Date(utc(s) + n * 86400000).toISOString().slice(0, 10);
export const diff = (a, b) => Math.round((utc(b) - utc(a)) / 86400000);
export const fmt = (s, year = false) =>
  validDate(s)
    ? new Date(utc(s)).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "short",
        ...(year ? { year: "numeric" } : {}),
        timeZone: "UTC",
      })
    : "—";
export const uid = () => crypto.randomUUID();
export const clone = (s) => structuredClone(s);
export function initial() {
  return {
    version: 1,
    onboarded: false,
    setupPending: false,
    createdAt: today(), lastBackup: null, secureScreen: true, ageGroup: "non-indicata",
    periods: [],
    log: {},
    visits: [],
    meds: [],
    cycleLen: 28,
    periodLen: 5,
    mode: "ciclo",
    method: "Nessuno",
    methodTime: "21:00",
    methodRemind: false,
    theme: "auto",
    discreet: false,
    notifications: false,
    cycleReminder: true,
    categories: {
      flusso: true,
      umore: true,
      sint: true,
      dolore: true,
      note: true,
      temp: false,
      mucus: false, lh: false, pregnancy: false, weight: false, sleep: false, pms:false, rapporti:false, activity:true, context:true, digestion:true,
    },
    dismissed: {},
    cosmaPresence: 'discreta', cosmaSeen: {}, cosmaTour: -1, cosmaTourResume:0, cosmaTourDone: false,
  };
}
const str = (v, max = 300) => (typeof v === "string" ? v.slice(0, max) : "");
const time = (v) => (/^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : "");
// Backup e migrazione condividono una validazione esplicita, senza assegnare proprietà arbitrarie.
export function normalize(raw, { legacy = false } = {}) {
  if (
    !raw ||
    typeof raw !== "object" ||
    !Array.isArray(raw.periods) ||
    !raw.log ||
    typeof raw.log !== "object" ||
    Array.isArray(raw.log)
  )
    throw Error("Archivio non valido: mancano cicli o diario.");
  const s = initial(),
    date = today();
  if (raw.periods.length > 5000 || Object.keys(raw.log).length > 100000)
    throw Error("Archivio troppo grande.");
  const known = new Set();
  s.periods = raw.periods
    .map((p) => {
      if (
        !p ||
        !validDate(p.start) ||
        p.start > date ||
        known.has(p.start) ||
        (p.end && (!validDate(p.end) || p.end < p.start || p.end > date))
      )
        throw Error("Date dei cicli non valide o duplicate.");
      known.add(p.start);
      return {
        id: str(p.id) || uid(),
        start: p.start,
        ...(p.end ? { end: p.end } : {}),
        exclude: !!p.exclude,
        ...(p.source ? {source: str(p.source,80)} : {}),
      };
    })
    .sort((a, b) => a.start.localeCompare(b.start));
  s.periods.forEach((p, i) => {
    if (p.end && s.periods[i + 1] && p.end >= s.periods[i + 1].start)
      throw Error("Le mestruazioni registrate si sovrappongono.");
  });
  for (const [d, l] of Object.entries(raw.log)) {
    if (!validDate(d) || d > date || !l || typeof l !== "object")
      throw Error("Una data del diario non è valida.");
    const moods=picks(moodValues(l),UMORI);
    s.log[d] = {
      flusso: FLUSSI.includes(l.flusso) ? l.flusso : "",
      umore:moods[0]||"",
      umori:moods,
      sint: picks(l.sint,SINTOMI,'Va tutto bene'),
      rapporti:intimacyPicks(l.rapporti),
      activity:picks(l.activity,ACTIVITY,'Nessuna attività'),
      context:picks(l.context,CONTEXT),
      dolore: Number.isFinite(+l.dolore)
        ? Math.max(0, Math.min(10, Math.round(+l.dolore)))
        : 0,
      note: str(l.note, 10000),
      ...(l.source ? {source: str(l.source,80)} : {}),
      temp:
        l.temp !== "" &&
        l.temp != null &&
        Number.isFinite(+l.temp) &&
        +l.temp >= 34 &&
        +l.temp <= 42
          ? +l.temp
          : null,
      tempDisturbed: !!l.tempDisturbed, pmsRecorded:!!l.pmsRecorded,
      pms:Object.fromEntries(['mood','irritability','anxiety','fatigue','sleep','interference'].map(k=>[k,Math.max(0,Math.min(3,Math.round(+l.pms?.[k]||0)))])),
      mucus: MUCUS.includes(l.mucus)?l.mucus:'',
      lh: ['Non eseguito','Negativo','Positivo','Non interpretabile'].includes(l.lh)?l.lh:'',
      pregnancy: ['Non eseguito','Negativo','Positivo','Non interpretabile'].includes(l.pregnancy)?l.pregnancy:'',
      weight: l.weight!==''&&l.weight!=null&&Number.isFinite(+l.weight)&&+l.weight>0&&+l.weight<=500?+l.weight:null,
      sleep: l.sleep!==''&&l.sleep!=null&&Number.isFinite(+l.sleep)&&+l.sleep>=0&&+l.sleep<=24?+l.sleep:null,
    };
  }
  for (const key of ["visits", "meds"]) {
    if (raw[key] != null && !Array.isArray(raw[key]))
      throw Error("Elenco salute non valido.");
    if ((raw[key] || []).length > 10000) throw Error("Troppi elementi salute.");
  }
  s.visits = (raw.visits || []).map((v) => {
    if (!validDate(v.date) || !str(v.title).trim())
      throw Error("Visita non valida.");
    return {
      id: str(v.id) || uid(),
      title: str(v.title),
      date: v.date,
      time: time(v.time) || "09:00",
      notes: str(v.notes, 3000),
      remind: v.remind !== false,
    };
  });
  s.meds = (raw.meds || []).map((m) => {
    if (!str(m.name).trim()) throw Error("Farmaco non valido.");
    const oldTime = str(m.time),
      extracted = legacy
        ? oldTime
            .match(/(?:[01]?\d|2[0-3])[:.]\d{2}/)?.[0]
            ?.replace(".", ":")
            .padStart(5, "0")
        : "";
    return {
      id: str(m.id) || uid(),
      name: str(m.name),
      time: time(oldTime) || time(extracted) || "",
      instructions: str(
        m.instructions || (!time(oldTime) ? oldTime : ""),
        2000,
      ),
      remind: m.remind !== false,
    };
  });
  s.cycleLen =
    Number.isInteger(+raw.cycleLen) &&
    +raw.cycleLen >= 18 &&
    +raw.cycleLen <= 60
      ? +raw.cycleLen
      : 28;
  s.periodLen =
    Number.isInteger(+raw.periodLen) &&
    +raw.periodLen >= 1 &&
    +raw.periodLen <= 15
      ? +raw.periodLen
      : 5;
  for (const k of [
    "setupPending",
    "discreet",
    "notifications",
    "cycleReminder",
    "methodRemind",
  ])
    if (typeof raw[k] === "boolean") s[k] = raw[k];
  if (["ciclo", "concepimento"].includes(raw.mode)) s.mode = raw.mode;
  if (["auto", "light", "dark"].includes(raw.theme)) s.theme = raw.theme;
  if (
    ["Nessuno", "Pillola", "Anello", "Cerotto", "Spirale", "Altro"].includes(
      raw.method,
    )
  )
    s.method = raw.method;
  s.methodTime = time(raw.methodTime) || "21:00";
  for (const k of Object.keys(s.categories))
    if (typeof raw.categories?.[k] === "boolean")
      s.categories[k] = raw.categories[k];
  for (const [k, v] of Object.entries(raw.dismissed || {}).slice(-500))
    if (typeof v === "boolean") s.dismissed[str(k, 150)] = v;
  s.createdAt=validDate(raw.createdAt)&&raw.createdAt<=date?raw.createdAt:date;
  s.lastBackup=validDate(raw.lastBackup)&&raw.lastBackup<=date?raw.lastBackup:null;
  s.secureScreen=raw.secureScreen!==false;
  if(['presente','discreta','silenziosa'].includes(raw.cosmaPresence))s.cosmaPresence=raw.cosmaPresence;
  s.cosmaTour=Number.isInteger(raw.cosmaTour)&&raw.cosmaTour>=0&&raw.cosmaTour<8?raw.cosmaTour:-1;
  s.cosmaTourDone=raw.cosmaTourDone===true;
  s.cosmaTourResume=Number.isInteger(raw.cosmaTourResume)&&raw.cosmaTourResume>=0&&raw.cosmaTourResume<8?raw.cosmaTourResume:0;
  for(const [k,v] of Object.entries(raw.cosmaSeen||{}).slice(-100))if(validDate(v)&&v<=date)s.cosmaSeen[str(k,80)]=v;
  if(['non-indicata','adolescente','18-25','26-41','42-45','oltre45'].includes(raw.ageGroup))s.ageGroup=raw.ageGroup;
  s.onboarded = legacy || raw.onboarded === true || s.periods.length > 0;
  return s;
}

// Statistica descrittiva dei cicli completi. Nessun filtro biologico silenzioso:
// l'utente sceglie le esclusioni, che rimangono visibili nello storico (FONTI S03/S16).
export function analysis(s, asOf = today()) {
  const p=s.periods.filter(p=>p.start<=asOf).slice().sort((a,b)=>a.start.localeCompare(b.start));
  const intervals=p.slice(0,-1).map((v,i)=>({id:v.id,start:v.start,end:p[i+1].start,days:diff(v.start,p[i+1].start),reason:v.exclude?'Escluso da te':''}));
  const used=intervals.filter(x=>!x.reason).slice(-6);
  const mean=used.length?used.reduce((n,x)=>n+x.days,0)/used.length:null;
  const cycle=mean==null?s.cycleLen:Math.round(mean);
  const min=used.length?Math.min(...used.map(x=>x.days)):null;
  const max=used.length?Math.max(...used.map(x=>x.days)):null;
  const sd=used.length>1?Math.sqrt(used.reduce((n,x)=>n+(x.days-mean)**2,0)/(used.length-1)):null;
  const lengths=p.filter(x=>x.end&&!x.exclude).slice(-6).map(x=>diff(x.start,x.end)+1);
  const periodMean=lengths.length?Math.round(lengths.reduce((a,b)=>a+b,0)/lengths.length):null;
  const out={intervals,used,mean,cycle,min,max,sd,spread:used.length?max-min:null,periodMean,record:p.length?{ls:p.at(-1).start,day:diff(p.at(-1).start,asOf)+1}:null,prediction:null};
  // Tre intervalli è una soglia prudenziale di prodotto, non validazione clinica.
  // Il rango osservato NON è un intervallo di confidenza o di previsione calibrato.
  if(used.length>=3&&out.record){
    const ls=out.record.ls,low=addD(ls,min),high=addD(ls,max);
    out.prediction={...out.record,next:addD(ls,cycle),low,high,late:Math.max(0,diff(high,asOf))};
  }
  return out;
}
export function dayInfo(s,date,asOf=today()){
  const out={per:s.periods.some(p=>date>=p.start&&date<=(p.end||p.start)&&date<=asOf),log:!!s.log[date]};
  const pr=analysis(s,asOf).prediction;
  // Una sola proiezione dell'inizio: niente giorni di flusso inventati né slittamenti.
  out.pred=!!pr&&!out.per&&date>=asOf&&date>=pr.low&&date<=pr.high;
  return out;
}
// Convenzione biologica relativa a un giorno di riferimento GIÀ fornito.
// S05: −5/0, sei giorni inclusivi. Non localizza l'ovulazione di una persona.
// La UI di questa versione non la usa per generare giorni fertili dal calendario.
export function relativeFertileWindow(reference){
  if(!validDate(reference))throw Error('Data di riferimento non valida.');
  return {start:addD(reference,-5),end:reference};
}

export function healthNotices(s,asOf=today()){
 const out=[],a=analysis(s,asOf),adult=['18-25','26-41','42-45'].includes(s.ageGroup),teen=s.ageGroup==='adolescente';
 if(s.method==='Nessuno'&&(adult||teen)){
  const lo=adult?24:21,hi=adult?38:45,last=a.intervals.slice(-3),outside=last.filter(x=>x.days<lo||x.days>hi);
  if(outside.length>=2)out.push({source:adult?'S03':'S04',text:`${outside.length} degli ultimi ${last.length} intervalli registrati sono fuori dal riferimento ${lo}–${hi} giorni. Se il cambiamento continua o ti preoccupa, parlane con la ginecologa. Non è una diagnosi.`});
  const long=s.periods.some(p=>p.end&&diff(p.start,p.end)+1>(adult?8:7));
  if(long)out.push({source:adult?'S03':'S04',text:'Hai registrato un sanguinamento più lungo del riferimento per la fascia indicata. Puoi portare le date a un colloquio sanitario.'});
 }
 if(a.record&&diff(a.record.ls,asOf)>=90)out.push({source:'S12',text:'Non hai registrato un nuovo inizio da almeno 90 giorni. Potrebbero mancare registrazioni: se le mestruazioni sono assenti, chiedi consiglio a un professionista sanitario.'});
 if(Object.values(s.log).some(l=>l.pms?.interference>=2))out.push({source:'S13',text:'Hai segnalato un impatto importante sulle attività. Il diario può aiutarti a parlarne con la ginecologa, senza stabilirne la causa.'});
 return out;
}
