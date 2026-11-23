import {clone,validDate,today,uid,normalize} from './domain.js';
export const onboardingSteps=Object.freeze(['Benvenuto','La tua data','Un riferimento iniziale','Il tuo storico','La presenza di Cosma','È tutto pronto']);
export function advanceOnboarding(step,answers,values={}){
 if(!Number.isInteger(step)||step<0||step>=onboardingSteps.length)throw Error('Passo non valido.');
 const out={...answers};
 if(step===1){const start=String(values.start||'');if(start&&(!validDate(start)||start>today()))throw Error('Scegli una data valida, fino a oggi, oppure lascia vuoto.');out.start=start;}
 if(step===2){const value=String(values.cycleLen||'');if(value&&(!Number.isInteger(+value)||+value<18||+value>60))throw Error('Il riferimento iniziale può essere tra 18 e 60 giorni. Puoi lasciarlo vuoto.');out.cycleLen=value?+value:null;}
 if(step===4){if(!['presente','discreta','silenziosa'].includes(values.cosmaPresence))throw Error('Scegli come vuoi che Cosma ti accompagni.');out.cosmaPresence=values.cosmaPresence;}
 return{step:Math.min(step+1,onboardingSteps.length-1),answers:out};
}
export function completeOnboarding(state,answers){const n=clone(state);if(answers.start){if(!validDate(answers.start)||answers.start>today())throw Error('Controlla la data iniziale.');if(!n.periods.some(p=>p.start===answers.start))n.periods.push({id:uid(),start:answers.start,exclude:false});}if(answers.cycleLen!=null){if(!Number.isInteger(answers.cycleLen)||answers.cycleLen<18||answers.cycleLen>60)throw Error('Controlla il riferimento iniziale.');n.cycleLen=answers.cycleLen;}if(['presente','discreta','silenziosa'].includes(answers.cosmaPresence))n.cosmaPresence=answers.cosmaPresence;n.setupPending=false;n.onboarded=true;if(!n.cosmaTourDone)n.cosmaTour=0;return normalize(n);}
