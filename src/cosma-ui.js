import {messages,tour,selectMessage} from './cosma-messages.js';
import {clone,today} from './domain.js';

export function createCosma(ui){
 let message=null,minimized=false,timer,expiry;
 const face=()=>'<img src="avatar.png" alt="Cosma" width="48" height="48">';
 function clear(){clearTimeout(timer);clearTimeout(expiry);document.querySelector('#cosma-stage')?.remove();document.querySelectorAll('.coach-target').forEach(e=>e.classList.remove('coach-target'));}
 function paint(page){
  clear();const s=ui.state();if(!s?.onboarded||ui.locked())return;
  const touring=s.cosmaTour>=0,step=tour[s.cosmaTour],night=new Date().getHours()<8||new Date().getHours()>=22;
  const m=touring?{...step,pose:'cosma-saluta-intera.png'}:message?messages[message]:null;
  const stage=document.createElement('section');stage.id='cosma-stage';stage.className='cosma-stage '+(page==='oggi'&&!minimized?'cosma-home':'cosma-small');
  stage.setAttribute('aria-label','Assistente Cosma');
  stage.dataset.tour=String(s.cosmaTour);
  const bubble=m?`<div class="cosma-bubble"><div aria-live="polite"><p>${touring?'<b>'+ui.esc(step.title)+'</b><br>':''}${ui.esc(m.text)}</p></div>${m.answers?'<div class="cosma-answers">'+m.answers.map((a,i)=>ui.button('cosma-answer',a,'',`data-mood="${i}"`)).join('')+'</div>':''}${m.action?ui.button(m.action,m.label,'text-button'):''}${touring?`<div class="tour-controls">${ui.button('cosma-tour-next',s.cosmaTour===7?'Termina':'Avanti','secondary')}${ui.button('cosma-tour-pause','Salta per ora','text-button')}<span class="hint">${s.cosmaTour+1} di 8</span></div>`:ui.button('cosma-dismiss','Chiudi','text-button')}</div>`:'';
  const difficult=s.log[today()]?.umore==='Triste'||s.log[today()]?.dolore>=7;
  const pose=night||s.cosmaPresence==='silenziosa'?'cosma-dorme-intera.png':m?.pose||(difficult?'cosma-abbraccio.png':'cosma-in-piedi.png');
  stage.innerHTML=bubble+ui.button('cosma-toggle',page==='oggi'&&!minimized?`<img src="${pose}" alt="Cosma a figura intera" width="88" height="144">`:face(),'cosma-figure','aria-label="Apri il menu di Cosma"');
  document.querySelector('#app').after(stage);
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
  if(act==='cosma-toggle'){
   message=null;minimized=true;paint(ui.page());
   ui.modal('Cosma ti accompagna',`<p>${ui.esc((messages[ui.page()]||messages.general).text)}</p>${ui.button('today-diary','Cosa posso registrare oggi?','secondary')}${ui.button('cosma-tour','Rifai il tour','text-button')}${ui.button('cosma-less','Parla meno','text-button')}${ui.button('cosma-silent','Silenzio','text-button')}${ui.button('cosma-expand','Mostra Cosma','text-button')}`);return;
  }
  if(act==='cosma-expand'){minimized=false;ui.close();paint(ui.page());return;}
  if(act==='cosma-dismiss'){message=null;paint(ui.page());return;}
  if(act==='cosma-answer'){
   const mood=['Calma','Neutro','Triste'][Number(el.dataset.mood)];if(!mood)return;
   if(!confirm('Registrare nel diario di oggi l’umore “'+mood+'”? Puoi correggerlo nel Diario.'))return;
   const n=clone(ui.state());n.log[today()]={...(n.log[today()]||{}),umore:mood};await ui.commit(n);message=mood==='Triste'?'comfort':null;paint(ui.page());return;
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
