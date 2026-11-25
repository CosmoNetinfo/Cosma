import {menstrualDayInfo} from './menstrual-days.js';
import {today,addD,fmt} from './domain.js';

// Riusa il calendario esistente: nessuna nuova previsione o fase personale.
export function homeWeek(state,asOf=today()){
 return Array.from({length:7},(_,index)=>{
  const date=addD(asOf,index),info=menstrualDayInfo(state,date,asOf);
  return {date,isToday:index===0,kind:info.per?'registered':info.planned?'planned':info.pred?'estimated':'none'};
 });
}
export function homeWeekHTML(state,{button,esc},asOf=today()){
 const days=homeWeek(state,asOf);
 const cells=days.map(day=>{
  const weekday=new Date(day.date+'T12:00:00Z').toLocaleDateString('it-IT',{weekday:'short',timeZone:'UTC'});
  const description=day.kind==='registered'?'mestruazioni registrate':day.kind==='planned'?'durata indicativa, sanguinamento non confermato':day.kind==='estimated'?'fascia stimata dell’inizio, non una data certa':'nessun evento del ciclo registrato';
  return button('week-day',`<span class="home-week-label">${day.isToday?'Oggi':weekday}</span><span class="home-week-number">${Number(day.date.slice(8))}</span>`,'home-week-day '+day.kind,`data-date="${day.date}" ${day.isToday?'aria-current="date"':''} aria-label="${esc(fmt(day.date,true)+', '+description+'. Apri nel Calendario.')}"`);
 }).join('');
 return `<section class="home-week" aria-labelledby="home-week-title"><h2 id="home-week-title">I prossimi sette giorni</h2><div class="home-week-scroll"><div class="home-week-grid" role="group" aria-label="Da oggi ai prossimi sei giorni">${cells}</div></div><div class="home-week-legend"><span><i class="registered" aria-hidden="true"></i>Registrate</span><span><i class="planned" aria-hidden="true"></i>Durata indicativa</span><span><i class="estimated" aria-hidden="true"></i>Stima inizio</span></div></section>`;
}
