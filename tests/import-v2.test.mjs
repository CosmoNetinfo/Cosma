import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,normalize} from '../src/domain.js';
import {readFileSync} from 'node:fs';
import {parseExport,previewImport,mergeImport,exportPortable,exportCSV} from '../src/import-v2.js';
const opts={kind:'cycles',dateColumn:'0',endColumn:'-1',dateFormat:'iso',source:'Clue',mode:'merge',conflict:'existing'};
test('Fixtures per le cinque provenienze: contenitori sintetici esplicitamente dichiarati',()=>{
 for(const name of ['clue-SINTETICO.json','flo-SINTETICO.json','natural-cycles-SINTETICO.csv','drip-SINTETICO.csv','generico-SINTETICO.csv']){
  const t=parseExport(readFileSync(new URL('./fixtures/importazione/'+name,import.meta.url),'utf8'));assert.ok(t.tables?.length||t.rows.length,name);
 }
});
test('JSON eterogenei: scelta esplicita elenco, campi annidati senza supporre schemi Flo o Clue',()=>{
 const text=JSON.stringify({a:[{giorno:{data:'2026-01-01'}}],b:[{x:1}]});const pick=parseExport(text);assert.equal(pick.tables.length,2);assert.deepEqual(parseExport(text,0).columns,['giorno.data']);
});
test('Previsioni e dati sessuali esclusi, campi ignorati riportati',()=>{
 const t=parseExport('date,type,sex,forecast\n2026-01-01,predicted,yes,2027-01-01\n2026-02-01,recorded,no,2027-01-02');
 const p=previewImport(initial(),t,opts,'2026-11-22');assert.equal(p.items.length,1);assert.equal(p.skipped.length,1);assert.ok(p.ignored.includes('sex'));assert.throws(()=>previewImport(initial(),t,{...opts,dateColumn:'3'}),/predittiva/);
});
test('Unisci conserva i miei; scelta esplicita Tieni importati e Sostituisci tutto',()=>{
 const s=initial();s.periods=[{id:'x',start:'2026-01-01',end:'2026-01-03'}];const t=parseExport('date,end\n2026-01-01,2026-01-05');
 assert.equal(previewImport(s,t,opts).items.length,0);
 const p=previewImport(s,t,{...opts,endColumn:'1',conflict:'incoming'});assert.equal(mergeImport(s,p).periods[0].end,'2026-01-05');
 s.log['2026-02-01']={note:'Mia nota'};const r=mergeImport(s,previewImport(s,t,{...opts,mode:'replace'}));assert.equal(Object.keys(r.log).length,0);assert.equal(s.log['2026-02-01'].note,'Mia nota');
});
test('Drip sintetico: nessuna deduzione degli inizi da giorni di flusso, mappatura esplicita dei valori',()=>{
 const t=parseExport('date;bleeding.value;temperature.value\n2026-01-01;1;36,5\n2026-01-02;2;36,6');
 const o={...opts,source:'Drip',kind:'daily',flussoColumn:'1',tempColumn:'2',values:{flusso:{1:'Leggero',2:'Medio'}}};
 const n=mergeImport(initial(),previewImport(initial(),t,o));assert.equal(n.periods.length,0);assert.equal(n.log['2026-01-01'].temp,36.5);assert.equal(n.log['2026-01-02'].flusso,'Medio');assert.equal(n.log['2026-01-01'].source,'Drip');
});
test('Intervalli estremi segnalati: esclusione solo per scelta esplicita',()=>{
 const t=parseExport('date\n2026-01-01\n2026-01-02\n2026-06-01');
 const keep=previewImport(initial(),t,opts);assert.ok(keep.warnings.length);assert.equal(keep.items[0].exclude,false);
 const exclude=previewImport(initial(),t,{...opts,unusual:'exclude'});assert.equal(exclude.items[0].exclude,true);
});
test('Esportazione Cosma JSON e CSV: andata e ritorno di cicli, esclusioni, segnali e note',()=>{
 const s=initial();s.periods=[{id:'x',start:'2026-01-01',end:'2026-01-05',exclude:true,source:'Clue'}];s.log['2026-01-01']={note:'virgola, punto; e "test"\na capo',temp:36.6,mucus:'Cremoso',lh:'Negativo'};const expected=normalize(s);
 for(const text of [JSON.stringify(exportPortable(s)),exportCSV(s)]){const t=parseExport(text),n=mergeImport(initial(),previewImport(initial(),t,opts));assert.equal(n.periods[0].start,expected.periods[0].start);assert.equal(n.periods[0].exclude,true);assert.equal(n.periods[0].source,'Clue');assert.equal(n.log['2026-01-01'].note,expected.log['2026-01-01'].note);assert.equal(n.log['2026-01-01'].temp,36.6);}
});
test('Parsing difensivo: ZIP e percorsi malevoli non vengono estratti; file corrotti e troppo grandi rifiutati',()=>{
 assert.throws(()=>parseExport('PK../x'),/ZIP/);assert.throws(()=>parseExport('{oops'),/JSON/);assert.throws(()=>parseExport('x'.repeat(2*1024*1024+1)),/2 MB/);assert.throws(()=>parseExport('a;b\n1;2;3'),/celle/);assert.throws(()=>parseExport('a;a\n1;2'),/duplicate/);
});
test('Portabilità di visite e farmaci, nessuna attivazione automatica delle notifiche',()=>{
 const s=initial();s.visits=[{id:'v',title:'Controllo fittizio',date:'2027-01-01',time:'10:00',notes:'Nota',remind:true}];s.meds=[{id:'m',name:'Nome fittizio',time:'21:00',instructions:'Test',remind:true}];
 for(const text of [JSON.stringify(exportPortable(s)),exportCSV(s)]){const n=mergeImport(initial(),previewImport(initial(),parseExport(text),opts));assert.equal(n.visits[0].title,s.visits[0].title);assert.equal(n.meds[0].name,s.meds[0].name);assert.equal(n.notifications,false);}
});
test('Annotazioni: provenienza nel testo, Tieni importati sostituisce solo le note, doppioni Cosma conteggiati',()=>{
 const s=initial();s.log['2026-01-01']={note:'Prima',umore:'Calma'};const t=parseExport('date,note\n2026-01-01,Dopo');
 const plan=previewImport(s,t,{...opts,kind:'notes',noteColumn:'1',conflict:'incoming',source:'Flo'});const n=mergeImport(s,plan);assert.equal(n.log['2026-01-01'].note,'Importato da Flo\nDopo');assert.equal(n.log['2026-01-01'].umore,'Calma');
 const dup=previewImport(n,parseExport(JSON.stringify(exportPortable(n))),opts);assert.equal(dup.duplicates,1);assert.equal(dup.skipped.length,1);
});
