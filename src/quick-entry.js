import {clone,normalize,today,validDate,FLUSSI,UMORI,SINTOMI} from './domain.js';
import {togglePick,toggleIntimacy,INTIMACY} from './diary-catalog.js';
import {diaryChoices} from './diary-view.js';
const allowed={rapporti:INTIMACY,flusso:FLUSSI,umore:UMORI,sint:SINTOMI,lh:['Non eseguito','Negativo','Positivo','Non interpretabile'],pregnancy:['Non eseguito','Negativo','Positivo','Non interpretabile']};
export function quickChange(state,date,field,value){
 if(!validDate(date)||date>today())throw Error('Scegli una data registrabile, fino a oggi.');
 if(!allowed[field]?.includes(value)||!state.categories[field])throw Error('Questa voce non è attiva nel diario.');
 const n=clone(state),old=n.log[date]||{};
 n.log[date]={...old,[field]:field==='rapporti'?toggleIntimacy(old[field],value):togglePick(old[field],value,field==='sint',field==='sint'?'Va tutto bene':undefined)};
 return normalize(n);
}
export function quickNote(state,date,note){if(!validDate(date)||date>today()||typeof note!=='string'||note.length>10000||!state.categories.note)throw Error('Controlla data e lunghezza della nota.');const n=clone(state);n.log[date]={...(n.log[date]||{}),note};return normalize(n);}
export function createQuickEntry(ui){
 let date=today();
 function open(kind='symptoms'){
  date=today();const s=ui.state(),l=s.log[date]||{},c=s.categories,parts=[];
  const choice=(field,items,multi=false)=>diaryChoices(field,items,l[field]||(multi?[]:''),multi,ui);
  if(['flow','symptoms'].includes(kind)&&c.flusso)parts.push('<section class="diary-section diary-flusso"><h3>Flusso mestruale</h3>'+choice('flusso',FLUSSI)+'</section>');
  if(kind==='symptoms'){
   if(c.umore)parts.push('<section class="diary-section diary-umore"><h3>Come ti senti?</h3>'+choice('umore',UMORI)+'</section>');
   if(c.sint)parts.push('<section class="diary-section diary-sint"><h3>Sintomi</h3>'+choice('sint',SINTOMI,true)+'</section>');
  }
  if(kind==='rapporti'&&c.rapporti)parts.push('<section class="diary-section diary-rapporti"><h3>Rapporti e desiderio</h3>'+choice('rapporti',INTIMACY,true)+'</section>');
  if(kind==='notes'){
   if(c.note)parts.push('<form data-form="quick-note"><label for="quick-note">La tua nota di oggi</label><textarea id="quick-note" name="quick-note" maxlength="10000" rows="3">'+ui.esc(l.note||'')+'</textarea><button type="submit" class="primary">Salva nota</button></form>');
   for(const field of ['lh','pregnancy'])if(c[field])parts.push('<section class="diary-section"><h3>'+(field==='lh'?'Test LH':'Test di gravidanza')+'</h3>'+choice(field,allowed[field])+'</section>');
  }
  ui.modal(kind==='flow'?'Flusso di oggi':kind==='notes'?'Note e test':'La tua giornata',`<div data-quick-entry><p class="hint">${ui.fmt(date,true)} · Le selezioni si salvano al tocco.</p>${parts.join('')||'<p>Puoi attivare le categorie dalle Impostazioni.</p>'}<p class="field-error" role="alert"></p>${ui.button('finish-quick','Fatto','secondary')}${ui.button('quick-diary','Apri il diario completo','text-button')}</div>`,{sheet:true});
 }
 async function pick(field,value){if(field==='rapporti'&&!confirm('Registrare “'+value+'” nel diario di oggi?'))return;const n=quickChange(ui.state(),date,field,value);await ui.commit(n);const l=n.log[date];for(const b of document.querySelectorAll('[data-quick-entry] [data-action=chip]')){const v=l[b.dataset.field];b.setAttribute('aria-pressed',String(Array.isArray(v)?v.includes(b.dataset.value):v===b.dataset.value));}ui.toast('Registrato nel diario di oggi.');}
 async function note(text){await ui.commit(quickNote(ui.state(),date,text));ui.close();ui.render();ui.toast('Nota salvata.');}
 return{open,pick,note};
}
