import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,clone,analysis,dayInfo} from '../src/domain.js';
import {menstrualPlan,menstrualDayInfo,menstrualPlanHTML} from '../src/menstrual-days.js';
import {fertilityGuideHTML} from '../src/fertility-guide.js';

const sample=()=>({...initial(),periods:[{id:'a',start:'2026-11-25',exclude:false}]});
test('Fertilità: fonti visibili, segnali e limiti senza una data personale',()=>{
 const html=fertilityGuideHTML({button:(a,t,c,attrs)=>`<button data-action="${a}" ${attrs||''}>${t}</button>`});assert.match(html,/data-sources="S19,S01"/);assert.match(html,/non conferma/);assert.match(html,/due giorni prima/);assert.match(html,/Apri il diario/);assert.doesNotMatch(html,/\d{4}-\d{2}-\d{2}|ovulerai|giorno sicuro/);
});
test('Durata indicativa inclusiva: primo giorno pieno, quattro successivi tratteggiati',()=>{
 const s=sample(),before=clone(s);assert.deepEqual(menstrualPlan(s,'2026-11-25'),{id:'a',start:'2026-11-25',end:'2026-11-29',days:5});
 assert.equal(menstrualDayInfo(s,'2026-11-25','2026-11-25').per,true);
 for(const d of ['2026-11-26','2026-11-27','2026-11-28','2026-11-29']){const x=menstrualDayInfo(s,d,'2026-11-25');assert.equal(x.planned,true);assert.equal(x.per,false);}
 assert.equal(menstrualDayInfo(s,'2026-11-30','2026-11-25').planned,false);assert.deepEqual(s,before);
});
test('Il tempo non conferma il sanguinamento né sposta il termine indicativo',()=>{
 const s=sample();for(const asOf of ['2026-11-27','2026-12-20']){assert.equal(menstrualDayInfo(s,'2026-11-26',asOf).per,false);assert.equal(menstrualPlan(s,asOf).end,'2026-11-29');assert.equal(s.periods[0].end,undefined);}
});
test('Sei giorni, uno solo, bisestile e cambio anno non aggiungono giorni in più',()=>{
 for(const [start,days,end] of [['2026-11-25',6,'2026-11-30'],['2026-11-25',1,'2026-11-25'],['2024-02-27',5,'2024-03-02'],['2026-12-29',6,'2027-01-03']]){const s=sample();s.periods[0].start=start;s.periodLen=days;assert.equal(menstrualPlan(s,start).end,end);}
});
test('Fine confermata rimuove tutti i tratteggi e non registra giorni futuri',()=>{
 const s=sample();s.periods[0].end='2026-11-27';assert.equal(menstrualPlan(s,'2026-11-27'),null);assert.equal(menstrualDayInfo(s,'2026-11-27','2026-11-27').per,true);assert.equal(menstrualDayInfo(s,'2026-11-28','2026-11-27').per,false);assert.equal(menstrualDayInfo(s,'2026-11-28','2026-11-27').planned,false);
});
test('Solo l’ultimo inizio può avere una durata aperta; nessun dato mancante ricostruito',()=>{
 const s=sample();s.periods.push({id:'b',start:'2026-12-22',end:'2026-12-24'});assert.equal(menstrualPlan(s,'2026-12-25'),null);assert.equal(menstrualDayInfo(s,'2026-11-26','2026-12-25').planned,false);assert.equal(menstrualPlan(initial(),'2026-11-25'),null);
});
test('Visualizzazione e modifica della durata non cambiano stime degli inizi o dati grezzi',()=>{
 const s=sample();s.periods.unshift(...['2026-08-28','2026-09-27','2026-10-26'].map(start=>({id:start,start})));const a=analysis(s,'2026-11-25'),raw=dayInfo(s,'2026-11-27','2026-11-25');s.periodLen=6;menstrualDayInfo(s,'2026-11-27','2026-11-25');assert.deepEqual(analysis(s,'2026-11-25'),a);assert.deepEqual(dayInfo(s,'2026-11-27','2026-11-25'),raw);
 const html=menstrualPlanHTML(s,{button:(a,t)=>`<button data-action="${a}">${t}</button>`},'2026-11-25');assert.match(html,/Fine mestruazioni/);assert.match(html,/non conferma/);assert.match(html,/Come l’ho calcolato/);
});
