import {parseExport as parseBasic,previewImport as previewBasic,mergeImport as mergeBasic} from './import-data.js';
import {clone,normalize,today,validDate,uid,diff,FLUSSI,UMORI,SINTOMI} from './domain.js';
import {importDate} from './import-data.js';
export const sources=['CSV generico','Clue','Flo','Natural Cycles','Drip','Cosma'];
const fail=m=>{throw Error(m);};
const unsafe=/sex|intercourse|sessual|rapport|desiderio|contracept|predict|forecast|previs|fertil|ovulat/i;
export const fields={flusso:FLUSSI,umore:UMORI,sint:SINTOMI,mucus:['Non osservato','Secco','Appiccicoso','Cremoso','Acquoso','Trasparente e filante'],lh:['Non eseguito','Negativo','Positivo','Non interpretabile'],temp:null,note:null};
export function tablesIn(raw){
 const tables=[];
 function visit(v,path,depth){if(depth>8)return;if(Array.isArray(v)){if(v.length&&v.every(r=>r&&typeof r==='object'&&!Array.isArray(r)))tables.push({path,label:path.length?path.join(' → '):'Elenco principale'});return;}if(v&&typeof v==='object')for(const [k,value] of Object.entries(v))visit(value,[...path,k],depth+1);}
 visit(raw,[],0);return tables;
}
function flatten(row,prefix='',out={}){for(const [k,v] of Object.entries(row)){const key=prefix?prefix+'.'+k:k;if(key.length>180)fail('JSON troppo annidato.');if(v&&typeof v==='object'&&!Array.isArray(v))flatten(v,key,out);else if(v==null||typeof v!=='object')out[key]=v;else out[key]=JSON.stringify(v);}return out;}
export function parseExport(text,index){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>2*1024*1024)fail('Scegli un file fino a 2 MB.');
 text=text.replace(/^\uFEFF/,'').trim();
 if(text[0]==='{'||text[0]==='['){let raw;try{raw=JSON.parse(text);}catch{fail('JSON non valido.');}
  if(raw?.formato==='cosma-portabile'){if(raw.versione!==1||!Array.isArray(raw.registrazioni)||raw.registrazioni.length>5000)fail('Formato Cosma non valido o versione non supportata.');return{format:'Cosma JSON v1',portable:raw,rows:[],columns:[]};}
  if(raw?.format==='cosma-encrypted')return parseBasic(text);
  const tables=tablesIn(raw);if(tables.length>1&&index===undefined)return{format:'JSON',tables,text};
  const chosen=tables[index??0];if(!chosen)fail('Non trovo un elenco tabellare nel JSON.');let rows=raw;for(const key of chosen.path)rows=rows[key];
  return{...parseBasic(JSON.stringify(rows.map(r=>flatten(r)))),format:'JSON · '+chosen.label};
 }
 const table=parseBasic(text);
 if(table.columns.join('|')==='versione|tipo|data|fine|escluso|provenienza|dati_json'){
  const registrazioni=table.rows.map(r=>{if(r.values[0]!=='1')fail('Versione CSV Cosma non supportata.');try{return JSON.parse(r.values[6]);}catch{fail('Riga CSV Cosma corrotta.');}});
  return{...table,portable:{formato:'cosma-portabile',versione:1,registrazioni},format:'Cosma CSV v1'};
 }
 return table;
}
export function previewImport(state,table,o,asOf=today()){
 const source=sources.includes(o.source)?o.source:'CSV generico',mode=o.mode==='replace'?'replace':'merge',conflict=o.conflict==='incoming'?'incoming':'existing';
 const base=clone(state);if(mode==='replace'){base.periods=[];base.log={};base.visits=[];base.meds=[];}
 if(table.portable)return portablePlan(base,table.portable,{source,mode,conflict,asOf,includeIntimacy:o.includeIntimacy===true});
 const dc=Number(o.dateColumn);if(unsafe.test(table.columns[dc]||''))fail('Scegli una data registrata: questa colonna sembra predittiva o non supportata.');
 const used=new Set([dc]);if(o.kind==='cycles'&&Number(o.endColumn)>=0)used.add(Number(o.endColumn));if(o.kind==='daily')for(const k of Object.keys(fields))if(Number(o[k+'Column']??-1)>=0)used.add(Number(o[k+'Column']));if(o.kind==='notes'){if(o.noteColumn==='all')table.columns.forEach((_,i)=>used.add(i));else used.add(Number(o.noteColumn));}const ignored=table.columns.filter((name,i)=>unsafe.test(name)||!used.has(i));
 const skipped=[],rows=table.rows.filter(r=>{if(table.columns.some((c,i)=>/^(type|kind|status|tipo|stato)$/i.test(c)&&/predict|forecast|previs|stimat/i.test(r.values[i]||''))){skipped.push({line:r.line,reason:'Previsione dell’altra app: ignorata.'});return false;}return true;});
 let plan;
 if(o.kind==='daily'){
  if(!Number.isInteger(dc)||dc<0||dc>=table.columns.length)fail('Scegli la colonna della data.');
  plan={kind:'daily',items:[],skipped:[],warnings:[],duplicates:0};const work=clone(base);
  for(const row of rows){
   const date=importDate(row.values[dc],o.dateFormat),data={};
   if(!date||date>asOf){plan.skipped.push({line:row.line,reason:'Data non valida o futura.'});continue;}
   let bad=false;
   for(const [key,allowed] of Object.entries(fields)){
    const col=Number(o[key+'Column']??-1);if(col<0)continue;
    if(col>=table.columns.length||col===dc||unsafe.test(table.columns[col]))fail('Campo non consentito: '+key+'.');
    const raw=String(row.values[col]??'').trim();if(!raw)continue;
    const dict=o.values?.[key]||{},v=Object.hasOwn(dict,raw)?dict[raw]:raw;if(v==='__ignore__')continue;
    if(key==='temp'){const n=Number(v.replace(',','.'));if(!Number.isFinite(n)||n<34||n>42){bad=true;break;}data.temp=n;}
    else if(key==='note'){if(v.length>10000){bad=true;break;}data.note=v;}
    else if(key==='sint'){const list=v.split('|').map(x=>x.trim());if(!list.every(x=>allowed.includes(x))){bad=true;break;}data.sint=list;}
    else if(!allowed.includes(v)){bad=true;break;}else data[key]=v;
   }
   const old=work.log[date]||{};
   if(conflict==='existing')for(const k of Object.keys(data))if(old[k]!==undefined&&old[k]!==null&&old[k]!==''&&(!Array.isArray(old[k])||old[k].length))delete data[k];
   if(bad||!Object.keys(data).length){if(!bad&&Object.keys(old).length)plan.duplicates++;plan.skipped.push({line:row.line,reason:bad?'Valori non riconosciuti: correggi la mappatura.':'Nessun nuovo campo: dati già presenti o vuoti.'});continue;}
   work.log[date]={...old,...data,source};plan.items.push({line:row.line,date,data,source});
  }
 }else{
  // Per le annotazioni libere non copiare di nascosto campi intimi o previsioni.
  const safeTable={...table,rows:rows.map(r=>({...r,values:r.values.map((v,i)=>unsafe.test(table.columns[i])?'':v)}))};
  const filtered=clone(base);if(o.kind==='cycles'&&conflict==='incoming'){const starts=new Set(rows.map(r=>importDate(r.values[dc],o.dateFormat)));filtered.periods=filtered.periods.filter(p=>!starts.has(p.start));}
  if(o.kind==='notes'&&conflict==='incoming')for(const row of rows){const date=importDate(row.values[dc],o.dateFormat);if(filtered.log[date])filtered.log[date].note='';}
  plan=previewBasic(filtered,safeTable,o,asOf);
  for(const item of plan.items)item.source=source;
 }
 Object.assign(plan,{source,mode,conflict,ignored,recognized:table.columns.filter(c=>!ignored.includes(c)),format:table.format,skipped:[...skipped,...plan.skipped]});
 if(plan.kind==='cycles'){
  const all=[...base.periods.filter(p=>!plan.items.some(x=>x.start===p.start)),...plan.items].sort((a,b)=>a.start.localeCompare(b.start));
  for(let i=0;i<all.length-1;i++){const days=diff(all[i].start,all[i+1].start);if(days<15||days>100){plan.warnings.push('Intervallo '+all[i].start+' → '+all[i+1].start+': '+days+' giorni. Controlla se sono veri inizi.');if(o.unusual==='exclude'){const item=plan.items.find(x=>x.start===all[i].start);if(item)item.exclude=true;else plan.warnings.push('L’intervallo parte da un tuo dato esistente: puoi escluderlo da Gestisci i cicli.');}}}
 }
 const dates=plan.items.map(x=>x.start||x.date).sort();plan.range=dates.length?[dates[0],dates.at(-1)]:null;
 return plan;
}
export function mergeImport(state,plan){
 if(!plan?.items?.length)fail('Nessuna registrazione da importare.');
 if(plan.kind==='portable')return normalize(plan.next);
 let n=clone(state);if(plan.mode==='replace'){n.periods=[];n.log={};n.visits=[];n.meds=[];}
 if(plan.kind==='daily'){for(const x of plan.items)n.log[x.date]={...(n.log[x.date]||{}),...x.data,source:plan.source};n.onboarded=true;return normalize(n);}
 if(plan.kind==='cycles'&&plan.conflict==='incoming')n.periods=n.periods.filter(p=>!plan.items.some(x=>x.start===p.start));
 if(plan.kind==='notes'&&plan.conflict==='incoming')for(const x of plan.items)if(n.log[x.date])n.log[x.date].note='';
 n=mergeBasic(n,plan);if(plan.kind==='notes')for(const x of plan.items)n.log[x.date].source=plan.source;return normalize(n);
}
export function exportPortable(s){return{formato:'cosma-portabile',versione:1,registrazioni:[...s.periods.map(p=>({tipo:'ciclo',data:p.start,fine:p.end||'',escluso:p.exclude,provenienza:p.source||'Cosma'})),...Object.entries(s.log).map(([data,l])=>({tipo:'diario',data,...clone(l),provenienza:l.source||'Cosma'})),...s.visits.map(v=>({tipo:'visita',data:v.date,...clone(v),provenienza:'Cosma'})),...s.meds.map(m=>({tipo:'farmaco',...clone(m),provenienza:'Cosma'}))]};}
export function exportCSV(s){const cell=v=>{let text=String(v??'');if(/^[=+@\-\t\r]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"';};return '\uFEFF'+[['versione','tipo','data','fine','escluso','provenienza','dati_json'],...exportPortable(s).registrazioni.map(r=>[1,r.tipo,r.data,r.fine||'',r.escluso??'',r.provenienza,JSON.stringify(r)])].map(r=>r.map(cell).join(';')).join('\r\n');}
function portablePlan(state,raw,{source,mode,conflict,asOf,includeIntimacy=false}){
 const n=clone(state),plan={kind:'portable',items:[],skipped:[],warnings:[],duplicates:0,source,mode,conflict,ignored:[]};
 for(const [i,r] of raw.registrazioni.entries()){
  if(r?.tipo==='farmaco'){
   if(n.meds.some(m=>m.name===r.name&&m.time===r.time)){if(conflict==='existing'){plan.duplicates++;plan.skipped.push({line:i+1,reason:'Farmaco già presente.'});continue;}n.meds=n.meds.filter(m=>m.name!==r.name||m.time!==r.time);}
   n.meds.push({...r,id:uid()});plan.items.push({text:r.name});continue;
  }
  if(r?.tipo==='visita'){
   if(!validDate(r.data)){plan.skipped.push({line:i+1,reason:'Data visita non valida.'});continue;}
   if(n.visits.some(v=>v.title===r.title&&v.date===r.data&&v.time===r.time)){if(conflict==='existing'){plan.duplicates++;plan.skipped.push({line:i+1,reason:'Visita già presente.'});continue;}n.visits=n.visits.filter(v=>v.title!==r.title||v.date!==r.data||v.time!==r.time);}
   n.visits.push({...r,id:uid(),date:r.data});plan.items.push({date:r.data,text:r.title});continue;
  }
  if(!validDate(r?.data)||r.data>asOf){plan.skipped.push({line:i+1,reason:'Data non valida o futura.'});continue;}
  if(r.tipo==='ciclo'){
   if(n.periods.some(p=>p.start===r.data)){if(conflict==='existing'){plan.duplicates++;plan.skipped.push({line:i+1,reason:'Inizio già presente.'});continue;}n.periods=n.periods.filter(p=>p.start!==r.data);}
   n.periods.push({id:uid(),start:r.data,...(r.fine?{end:r.fine}:{}),exclude:r.escluso===true,source:r.provenienza||source});
  }else if(r.tipo==='diario'){
   if(n.log[r.data]&&conflict==='existing'){plan.duplicates++;plan.skipped.push({line:i+1,reason:'Giorno già presente.'});continue;}if(!includeIntimacy&&Array.isArray(r.rapporti)&&r.rapporti.length&&!plan.ignored.includes('Rapporti e desiderio: esclusi senza consenso'))plan.ignored.push('Rapporti e desiderio: esclusi senza consenso');n.log[r.data]={...r,rapporti:includeIntimacy?r.rapporti:(n.log[r.data]?.rapporti||[]),source:r.provenienza||source};
  }else{plan.skipped.push({line:i+1,reason:'Tipo non supportato.'});continue;}
  plan.items.push({date:r.data});
 }
 n.onboarded=true;plan.next=normalize(n);const dates=plan.items.map(x=>x.date).filter(Boolean).sort();plan.range=dates.length?[dates[0],dates.at(-1)]:null;return plan;
}
