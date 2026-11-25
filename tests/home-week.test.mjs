import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,analysis,clone} from '../src/domain.js';
import {homeWeek,homeWeekHTML} from '../src/home-week.js';

test('Sette date civili da oggi: cambio mese, anno, bisestile e ora legale',()=>{
 for(const [start,last]of [['2026-11-28','2026-12-04'],['2026-12-29','2027-01-04'],['2024-02-26','2024-03-03'],['2026-03-27','2026-04-02']]){
  const days=homeWeek(initial(),start);assert.equal(days.length,7);assert.equal(days[0].date,start);assert.equal(days[6].date,last);assert.equal(new Set(days.map(d=>d.date)).size,7);assert.deepEqual(days.map(d=>d.isToday),[true,false,false,false,false,false,false]);
 }
});
test('Pieno soltanto per mestruazioni registrate: nessun flusso futuro o fine inventata',()=>{
 const s=initial();s.periods=[{id:'a',start:'2026-11-22',exclude:false}];
 assert.deepEqual(homeWeek(s,'2026-11-22').map(d=>d.kind),['registered','planned','planned','planned','planned','none','none']);
 assert.deepEqual(homeWeek(s,'2026-11-23').map(d=>d.kind),['planned','planned','planned','planned','none','none','none']);
 assert.equal(s.periods[0].end,undefined);
});
test('Tratteggio per tutti i giorni nella fascia descrittiva, senza ridurla al centro',()=>{
 const s=initial();s.periods=['2026-07-01','2026-07-27','2026-08-24','2026-09-23'].map(start=>({id:start,start,exclude:false}));
 const date='2026-10-18',before=clone(s),a=analysis(s,date),days=homeWeek(s,date);
 assert.equal(a.prediction.low,'2026-10-19');assert.equal(a.prediction.high,'2026-10-23');
 assert.deepEqual(days.map(d=>d.kind),['none','estimated','estimated','estimated','estimated','estimated','none']);
 assert.deepEqual(s,before);assert.deepEqual(analysis(s,date),a);
});
test('Dati pochi o fascia passata: niente tratteggio spostato e niente giorni fertili dedotti dai segnali',()=>{
 const s=initial();s.periods=[{id:'a',start:'2026-11-01',exclude:false}];s.mode='concepimento';s.log['2026-11-22']={lh:'Positivo',temp:37,mucus:'Trasparente e filante'};
 assert.ok(homeWeek(s,'2026-11-22').every(d=>d.kind==='none'));
 s.periods=['2026-07-01','2026-07-29','2026-08-26','2026-09-23'].map(start=>({id:start,start,exclude:false}));
 assert.ok(homeWeek(s,'2026-11-22').every(d=>d.kind==='none'));
});
test('Una fascia con estremi coincidenti rimane una stima tratteggiata, mai una data certa',()=>{
 const s=initial();s.periods=['2026-07-01','2026-07-29','2026-08-26','2026-09-23'].map(start=>({id:start,start,exclude:false}));
 const date='2026-10-19';assert.equal(homeWeek(s,date).filter(d=>d.kind==='estimated').length,1);
 const html=homeWeekHTML(s,{esc:String,button:(action,text,cls,attrs)=>`<button class="${cls}" ${attrs}>${text}</button>`},date);
 assert.equal((html.match(/class="home-week-day estimated"/g)||[]).length,1);assert.match(html,/fascia stimata dell’inizio, non una data certa/);assert.equal((html.match(/data-date=/g)||[]).length,7);
});
