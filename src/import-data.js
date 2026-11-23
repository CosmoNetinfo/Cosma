import {clone,normalize,validDate,today,uid,diff} from './domain.js';
const MAX_TEXT=2*1024*1024,MAX_ROWS=5000,MAX_COLUMNS=64;
const fail=message=>{throw Error(message);};

function delimiter(text){
 let quoted=false,counts={',':0,';':0,'\t':0};
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"')i++;else quoted=!quoted;}else if(!quoted){if(c==='\r'||c==='\n')break;if(c in counts)counts[c]++;}}
 return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
}
function csv(text){
 const sep=delimiter(text),rows=[];let row=[],field='',quoted=false,closed=false;
 function cell(){row.push(field.trim());field='';closed=false;if(row.length>MAX_COLUMNS)fail('Il file contiene troppe colonne (massimo 64).');}
 function line(){cell();if(row.some(v=>v!==''))rows.push(row);row=[];if(rows.length>MAX_ROWS+1)fail('Il file contiene più di 5000 righe.');}
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else{field+=c==='\r'?'\n':c;if(c==='\r'&&text[i+1]==='\n')i++;}continue;}
  if(c===sep){cell();continue;}
  if(c==='\r'||c==='\n'){line();if(c==='\r'&&text[i+1]==='\n')i++;continue;}
  if(c==='"'&&!field&&!closed){quoted=true;continue;}
  if(closed&&c.trim())fail('CSV non valido: caratteri dopo la chiusura delle virgolette.');
  if(!closed)field+=c;
 }
 if(quoted)fail('CSV incompleto: manca la chiusura delle virgolette.');
 if(field||row.length||closed)line();
 if(rows.length<2)fail('Servono una riga di intestazione e almeno una riga di dati.');
 const columns=rows.shift().map((name,i)=>name||'Colonna '+(i+1));
 if(new Set(columns).size!==columns.length)fail('Intestazioni duplicate: assegna nomi distinti alle colonne.');
 if(rows.some(r=>r.length>columns.length))fail('Una riga contiene più celle delle intestazioni: controlla separatori e virgolette.');
 return {columns,rows:rows.map((values,i)=>({line:i+2,values}))};
}
function jsonTable(raw){
 let list=raw;
 if(raw?.format==='cosma-encrypted')fail('Questo è un backup cifrato Cosma: usa Ripristina un backup cifrato.');
 if(!Array.isArray(list)){
  if(!raw||typeof raw!=='object')fail('JSON non tabellare: serve un elenco di oggetti.');
  const arrays=Object.entries(raw).filter(([,value])=>Array.isArray(value));
  if(arrays.length!==1)fail('Il JSON contiene più elenchi o una struttura specifica dell’app. Serve un adattatore per quel formato; puoi usare un’esportazione CSV.');
  list=arrays[0][1];
 }
 if(!list.length||list.length>MAX_ROWS)fail('Il JSON deve contenere da 1 a 5000 righe.');
 if(!list.every(row=>row&&typeof row==='object'&&!Array.isArray(row)))fail('Il JSON deve contenere oggetti con campi semplici.');
 const columns=[...new Set(list.flatMap(row=>Object.keys(row)))];
 if(!columns.length||columns.length>MAX_COLUMNS)fail('Il file deve contenere da 1 a 64 colonne.');
 const rows=list.map((row,i)=>({line:i+1,values:columns.map(key=>{const v=row[key];if(v==null)return '';if(typeof v==='object')fail('Il JSON contiene campi annidati: serve un adattatore per il formato specifico.');return String(v);})}));
 return {columns,rows};
}
export function parseExport(text){
 if(typeof text!=='string'||text.length>MAX_TEXT||new TextEncoder().encode(text).length>MAX_TEXT)fail('Scegli un file CSV o JSON fino a 2 MB.');
 text=text.replace(/^\uFEFF/,'').trim();
 if(!text)fail('Il file è vuoto.');
 if(text.includes('\0')||text.startsWith('PK')||text.startsWith('%PDF'))fail('ZIP, PDF e archivi proprietari non sono supportati: serve il formato specifico oppure un’esportazione CSV/JSON.');
 if(text.startsWith('{')||text.startsWith('[')){let raw;try{raw=JSON.parse(text);}catch{fail('Il file JSON non è valido.');}return{...jsonTable(raw),format:'JSON'};}
 return {...csv(text),format:'CSV'};
}
export function importDate(value,format){
 const text=String(value??'').trim();let date;
 if(format==='iso')date=text;
 else{
  const m=/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(text);if(!m)return null;
  const day=format==='dmy'?m[1]:m[2],month=format==='dmy'?m[2]:m[1];
  if(!['dmy','mdy'].includes(format))return null;
  date=m[3]+'-'+month.padStart(2,'0')+'-'+day.padStart(2,'0');
 }
 return validDate(date)?date:null;
}
function columnsValid(table,index){return Number.isInteger(index)&&index>=0&&index<table.columns.length;}

// La preview contiene solo candidati normalizzati, mai dati salvati in anticipo.
// Ogni scarto e ogni duplicato viene riportato; nessun filtro biologico nascosto.
export function previewImport(state,table,options,asOf=today()){
 const kind=options.kind,dateColumn=Number(options.dateColumn),endColumn=Number(options.endColumn),noteColumn=options.noteColumn==='all'?'all':Number(options.noteColumn);
 if(!['cycles','notes'].includes(kind)||options.dateColumn==null||options.dateColumn===''||!columnsValid(table,dateColumn))fail('Scegli il tipo di dati e la colonna della data.');
 if(kind==='cycles'&&endColumn>=0&&(!columnsValid(table,endColumn)||endColumn===dateColumn))fail('Inizio e fine devono usare colonne diverse.');
 if(kind==='notes'&&noteColumn!=='all'&&!columnsValid(table,noteColumn))fail('Scegli la colonna delle note.');
 const plan={kind,items:[],skipped:[],duplicates:0,warnings:[]},seen=new Set(),candidates=[];
 const skip=(line,reason)=>plan.skipped.push({line,reason});
 for(const row of table.rows){
  const date=importDate(row.values[dateColumn],options.dateFormat);
  if(!date||date>asOf){skip(row.line,date?'Data futura: non importata come registrazione.':'Data assente o diversa dal formato scelto.');continue;}
  if(kind==='cycles'){
   const rawEnd=endColumn>=0?row.values[endColumn]:'';const end=rawEnd?importDate(rawEnd,options.dateFormat):null;
   if(rawEnd&&(!end||end<date||end>asOf)){skip(row.line,'Fine del ciclo non valida rispetto all’inizio o a oggi.');continue;}
   if(seen.has(date)||state.periods.some(p=>p.start===date)){plan.duplicates++;skip(row.line,'Inizio già presente: non sovrascritto.');continue;}
   seen.add(date);candidates.push({line:row.line,start:date,...(end?{end}:{})});
  }else{
   const note=noteColumn==='all'?row.values.map((value,i)=>i!==dateColumn&&value?table.columns[i]+': '+value:'').filter(Boolean).join('\n'):row.values[noteColumn]?.trim();
   if(!note){skip(row.line,'Nessuna annotazione oltre alla data.');continue;}
   const text='Importato da '+(options.source||'altra app')+'\n'+note;
   if(text.length>10000){skip(row.line,'Annotazione troppo lunga: massimo 10000 caratteri.');continue;}
   candidates.push({line:row.line,date,text});
  }
 }
 const working=clone(state);
 for(const candidate of candidates.sort((a,b)=>(a.start||a.date).localeCompare(b.start||b.date))){
  if(kind==='cycles'){
   const p={id:uid(),start:candidate.start,exclude:false,...(candidate.end?{end:candidate.end}:{})};
   if(working.periods.length>=5000){skip(candidate.line,'Limite di 5000 cicli raggiunto.');continue;}
   const overlap=working.periods.some(old=>(p.end||p.start)>=old.start&&(old.end||old.start)>=p.start);
   if(overlap){skip(candidate.line,'Date sovrapposte a un ciclo già registrato o importato.');continue;}
   working.periods.push(p);plan.items.push({...p,line:candidate.line});
  }else{
   const old=working.log[candidate.date]||{},existing=old.note||'';
   if(existing.includes(candidate.text)){plan.duplicates++;skip(candidate.line,'Annotazione già presente: non duplicata.');continue;}
   const note=existing?existing+'\n\n'+candidate.text:candidate.text;
   if(note.length>10000){skip(candidate.line,'Unendo le annotazioni si superano 10000 caratteri: dati esistenti conservati.');continue;}
   working.log[candidate.date]={...old,note};plan.items.push(candidate);
  }
 }
 if(kind==='cycles'&&plan.items.some((p,i)=>i&&diff(plan.items[i-1].start,p.start)===1))plan.warnings.push('Ci sono inizi in giorni consecutivi: controlla che il file non contenga righe giornaliere del diario. Per quelle puoi scegliere Note del diario.');
 return plan;
}
export function mergeImport(state,plan){
 if(!plan?.items?.length)fail('Non ci sono dati validi da importare.');
 const next=clone(state);
 if(plan.kind==='cycles'){
  for(const {line,...item} of plan.items){if(next.periods.some(p=>p.start===item.start))fail('Le date sono cambiate: ricontrolla l’anteprima.');next.periods.push(item);}
 }else if(plan.kind==='notes'){
  for(const item of plan.items){const old=next.log[item.date]||{};if(old.note?.includes(item.text))continue;const note=old.note?old.note+'\n\n'+item.text:item.text;if(note.length>10000)fail('Le note sono cambiate: ricontrolla l’anteprima.');next.log[item.date]={...old,note};}
 }else fail('Tipo di importazione non valido.');
 next.onboarded=true;
 return normalize(next);
}
