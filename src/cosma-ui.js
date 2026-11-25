import {moodValues} from './diary-catalog.js';
import {messages,tour,selectMessage} from './cosma-messages.js';
import {clone,today} from './domain.js';
import {cosmaPoses,contextPose,manualReply} from './cosma-pose.js';

export function createCosma(ui){
 let message=null,minimized=false,timer,expiry;
 const chosenPoses=new Map(),manualCounts=new Map();
 const figure=(pose,large)=>`<img src="${pose}" alt="Cosma a figura intera" width="${large?88:48}" height="${large?144:72}">`;
 function clear(){clearTimeout(timer);clearTimeout(expiry);document.querySelector('#cosma-stage')?.remove();document.querySelectorAll('.coach-target').forEach(e=>e.classList.remove('coach-target'));}
 function paint(page){
  clear();const s=ui.state();if(!s?.onboarded||ui.locked())return;
  const touring=s.cosmaTour>=0,step=tour[s.cosmaTour],night=new Date().getHours()<8||new Date().getHours()>=22;
  const m=touring?{...step,pose:'cosma-saluta-intera.png'}:message?messages[message]:null;
  const stage=document.createElement('section');stage.id='cosma-stage';stage.className='cosma-stage '+(page==='oggi'&&!minimized?'cosma-home':'cosma-small');
  stage.setAttribute('aria-label','Assistente Cosma');
  stage.dataset.tour=String(s.cosmaTour);
  const bubble=m?`<div class="cosma-bubble"><div aria-live="polite"><p>${touring?'<b>'+ui.esc(step.title)+'</b><br>':''}${ui.esc(m.text)}</p></div>${m.answers?'<div class="cosma-answers">'+m.answers.map((a,i)=>ui.button('cosma-answer',a,'',`data-mood="${i}"`)).join('')+'</div>':''}${m.action?ui.button(m.action,m.label,'text-button'):''}${touring?`<div class="tour-controls">${ui.button('cosma-tour-next',s.cosmaTour===7?'Termina':'Avanti','secondary')}${ui.button('cosma-tour-pause','Salta per ora','text-button')}<span class="hint">${s.cosmaTour+1} di 8</span></div>`:'<div class="cosma-bubble-actions">'+ui.button('cosma-toggle','Opzioni','text-button')+ui.button('cosma-dismiss','Chiudi','text-button')+'</div>'}</div>`:'';
  const difficult=moodValues(s.log[today()]).includes('Triste')||s.log[today()]?.dolore>=7;
  const pose=touring?'cosma-saluta-intera.png':chosenPoses.get(page)||contextPose(page,{night:night||s.cosmaPresence==='silenziosa',messagePose:m?.pose,difficult});
  stage.innerHTML=bubble+ui.button(touring?'cosma-toggle':'cosma-touch',figure(pose,page==='oggi'&&!minimized),'cosma-figure',touring?'aria-label="Apri il menu di Cosma"':'aria-label="Parla con Cosma"');
  const summary=page==='oggi'&&!touring?document.querySelector('.cycle-summary'):null;
  if(summary)summary.append(stage);
  else if(!touring&&page!=='oggi'&&!m)document.querySelector('#header .screen-heading').after(stage);
  else if(!touring)document.querySelector('#app').prepend(stage);
  else document.querySelector('#app').after(stage);
  if(touring){const target=document.querySelector(step.focus);target?.classList.add('coach-target');target?.scrollIntoView({block:'nearest',behavior:'instant'});}
  if(m&&!touring&&!m.answers&&!m.action)expiry=setTimeout(()=>{message=null;paint(page);},12000);
  if(page==='oggi'&&!message&&!touring)timer=setTimeout(()=>ui.run(async()=>{
   if(ui.typing()||ui.modalOpen())return;
   const id=selectMessage(ui.state(),{typing:ui.typing()});if(!id)return;
   const n=clone(ui.state());n.cosmaSeen[id]=today();await ui.commit(n);message=id;paint(ui.page());
  }),1800);
  // Coach mark: una volta per scheda, senza interrompere la scrittura.
  if(!touring&&['cal','diario','salute'].includes(page)&&!s.dismissed['coach-'+page])timer=setTimeout(()=>ui.run(async()=>{
   if(ui.typing()||ui.modalOpen())return;
   const n=clone(ui.state());n.dismissed['coach-'+page]=true;await ui.commit(n);message=page;paint(page);
  }),1200);
 }
 async function action(act,el){
  if(act==='cosma-touch'){
   const page=ui.page(),index=manualCounts.get(page)||0,current=document.querySelector('#cosma-stage img')?.getAttribute('src');
   chosenPoses.set(page,cosmaPoses[(cosmaPoses.indexOf(current)+1)%cosmaPoses.length]);
   message=manualReply(page,index);if(message==='hello'&&!ui.state().categories.umore)message='general';manualCounts.set(page,index+1);minimized=false;paint(page);return;
  }
  if(act==='cosma-toggle'){
   message=null;minimized=true;paint(ui.page());
   ui.modal('Cosma ti accompagna',`<p>${ui.esc((messages[ui.page()]||messages.general).text)}</p>${ui.button('today-diary','Cosa posso registrare oggi?','secondary')}${ui.button('cosma-tour','Rifai il tour','text-button')}${ui.button('cosma-less','Parla meno','text-button')}${ui.button('cosma-silent','Silenzio','text-button')}${ui.button('cosma-pose','Cambia posa','text-button')}${ui.button('cosma-expand','Mostra Cosma','text-button')}`);return;
  }
  if(act==='cosma-pose'){minimized=false;const page=ui.page(),current=document.querySelector('#cosma-stage img')?.getAttribute('src'),index=cosmaPoses.indexOf(current);chosenPoses.set(page,cosmaPoses[(index+1)%cosmaPoses.length]);ui.close();paint(page);return;}
  if(act==='cosma-expand'){minimized=false;ui.close();paint(ui.page());return;}
  if(act==='cosma-dismiss'){message=null;paint(ui.page());return;}
  if(act==='cosma-answer'){
   const mood=['Calma','Neutro','Triste'][Number(el.dataset.mood)];if(!mood)return;
   if(!confirm('Registrare nel diario di oggi l’umore “'+mood+'”? Puoi correggerlo nel Diario.'))return;
   const n=clone(ui.state());const previous=n.log[today()]||{},umori=[...new Set([...moodValues(previous),mood])];n.log[today()]={...previous,umori,umore:umori[0]||''};await ui.commit(n);message=mood==='Triste'?'comfort':null;paint(ui.page());return;
  }
  const n=clone(ui.state());
  if(act==='cosma-less'||act==='cosma-silent'){n.cosmaPresence=act==='cosma-less'?'discreta':'silenziosa';message=null;}
  if(act==='cosma-tour'){n.cosmaTour=0;n.cosmaTourDone=false;n.cosmaTourResume=0;}
  if(act==='cosma-tour-resume'){n.cosmaTour=n.cosmaTourResume;n.cosmaTourDone=false;}
  if(act==='cosma-tour-next'){n.cosmaTour++;if(n.cosmaTour>7){n.cosmaTour=-1;n.cosmaTourDone=true;}}
  if(act==='cosma-tour-pause'){n.cosmaTourResume=n.cosmaTour;n.cosmaTour=-1;}
  await ui.commit(n);ui.close();ui.go(n.cosmaTour>=0?tour[n.cosmaTour].target:ui.page());
 }
 return {paint,clear,action};
}
