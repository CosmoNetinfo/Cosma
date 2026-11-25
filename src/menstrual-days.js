import {addD,dayInfo,fmt,today,validDate} from './domain.js';

// Pianificazione visiva scelta dall'utente, separata dai dati confermati e
// dalle formule della prossima mestruazione. Non scrive date di fine.
export function menstrualPlan(state,asOf=today()){
 const latest=state.periods.filter(p=>validDate(p.start)&&p.start<=asOf).slice().sort((a,b)=>a.start.localeCompare(b.start)).at(-1);
 if(!latest||latest.end)return null;
 const days=Number.isInteger(state.periodLen)&&state.periodLen>=1&&state.periodLen<=15?state.periodLen:5;
 return {id:latest.id,start:latest.start,end:addD(latest.start,days-1),days};
}
export function menstrualDayInfo(state,date,asOf=today()){
 const info=dayInfo(state,date,asOf),plan=menstrualPlan(state,asOf);
 return {...info,planned:!!plan&&!info.per&&date>=plan.start&&date<=plan.end};
}
export function menstrualPlanHTML(state,{button},asOf=today()){
 const plan=menstrualPlan(state,asOf);if(!plan)return '';
 return `<section class="menstrual-plan" aria-label="Durata indicativa delle mestruazioni"><p><b>Fine non ancora registrata</b></p><p class="hint">Durata indicativa: ${plan.days} ${plan.days===1?'giorno':'giorni'}, ${fmt(plan.start)}–${fmt(plan.end)}. Il tratteggio non conferma il sanguinamento.</p><div class="actions">${button('end-period','Fine mestruazioni','secondary')}${button('duration-method','Come l’ho calcolato?','text-button')}</div></section>`;
}
