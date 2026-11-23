// Presentazione del diario: nessuna nuova categoria o interpretazione sanitaria.
export function normalizeDiarySearch(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it-IT').trim();}
const svg=body=>`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">${body}</svg>`;
export function diaryGlyph(field,value){
 const ink='#48344f',skin='#e7b69b',rose='#e9588b',purple='#9c70c6';
 const poses={'Crampi':'crampi','Gonfiore':'gonfiore','Mal di testa':'testa','Mal di schiena':'schiena','Seno dolente':'crampi','Acne':'acne','Sudorazione notturna':'sudore','Confusione mentale':'confusione','Dolori articolari':'schiena','Dolore addominale':'gonfiore','Prurito vaginale':'crampi','Secchezza vaginale':'crampi','Nausea':'gonfiore'};
 if(field==='sint'&&poses[value])return `<img src="cosma-sintomo-${poses[value]}-160.png" srcset="cosma-sintomo-${poses[value]}-320.png 2x" alt="" width="40" height="40" decoding="async">`;
 if(field==='rapporti')return svg('<path d="M24 40 7 23C-2 9 16 3 24 15 32 3 50 9 41 23Z" fill="#d35e99"/><path d="M16 18q-6 1-4 7" stroke="#f8cadf" stroke-width="3" fill="none" stroke-linecap="round"/>');
 if(field==='mucus')return svg('<path d="M24 6S9 23 9 32a15 15 0 0 0 30 0C39 23 24 6 24 6Z" fill="#ad8bd5"/><path d="M16 31q-1 7 6 8" stroke="#dfcdf2" stroke-width="4" fill="none" stroke-linecap="round"/>');
 if(field==='lh'||field==='pregnancy')return svg('<rect x="6" y="16" width="36" height="17" rx="7" fill="#d9c9e9"/><rect x="10" y="19" width="19" height="10" rx="3" fill="#fff"/><path d="M16 21v6'+(value==='Positivo'?'M23 21v6':'')+'" stroke="#a55caa" stroke-width="3"/><path d="M33 20v9" stroke="#ac7ac7" stroke-width="4"/>');
 if(field==='activity')return svg('<path d="M7 29q10 3 12-13l10 7q0 5 12 8v9H6Z" fill="#9b79c8"/><path d="m22 23 7 3M20 27l7 3M7 35h34" stroke="#dfc9ed" stroke-width="3" fill="none"/>');
 if(field==='context')return svg('<path d="M24 42c-20-8-19-30-16-30 8 0 16 10 16 10S32 12 40 12c3 0 4 22-16 30Z" fill="#b88ecb"/><path d="M24 21v21" stroke="#e7d5ed" stroke-width="3"/>');
 if(value==='Insonnia')return svg('<path d="M33 5a19 19 0 1 0 10 29A19 19 0 0 1 33 5Z" fill="#aa80ca"/><path d="M21 9h12v8H21Z" fill="#4d405e"/><path d="M27 8v10M22 13h10" stroke="#fff" stroke-width="3"/>');
 if(value==='Vampate di calore'||value==='Bruciore alla bocca')return svg('<path d="M24 4c6 13 17 16 17 28a17 17 0 1 1-34 0c0-10 8-14 10-21l6 11Z" fill="#bb77bb"/><path d="M26 22c7 7 8 16 0 18-8-1-8-10 0-18Z" fill="#eac8eb"/>');
 if(value==='Va tutto bene')return svg('<path d="M18 24 26 9q8 0 3 14h10q5 0 2 9l-4 10H18Z" fill="#d0a2df"/><rect x="7" y="23" width="10" height="20" rx="3" fill="#7d64a7"/>');

 if(field==='flusso'){
  if(value==='Nessuno')return svg('<circle cx="24" cy="24" r="17" fill="#edb4c7"/><path d="M15 24h18" stroke="white" stroke-width="4" stroke-linecap="round"/>');
  const drop='<path d="M24 8C21 14 14 22 14 29a10 10 0 0 0 20 0C34 22 27 14 24 8Z" fill="'+rose+'"/><path d="M19 29q0 5 4 6" stroke="#ffbfd4" stroke-width="3" fill="none" stroke-linecap="round"/>';
  return svg(value==='Medio'?'<g transform="translate(-7 2) scale(.9)">'+drop+'</g><path d="M36 13s-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11Z" fill="#f692b1"/>':value==='Abbondante'?'<g transform="translate(-5 -1) scale(.88)">'+drop+'</g><path d="M37 18s-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11Z" fill="#f692b1"/><path d="M8 14s-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z" fill="#f692b1"/>':drop);
 }
 if(field==='umore'){
  const mouth={Felice:'M15 28q9 15 18 0',Calma:'M17 31q7 4 14 0',Neutro:'M17 31h14',Triste:'M16 34q8-10 16 0',Irritabile:'M17 33h14M12 15l8 3M28 18l8-3',Ansia:'M20 32q4-6 8 0M12 15l8 3M28 18l8-3'}[value]||'M17 31h14';
  return svg('<circle cx="24" cy="24" r="20" fill="#ffc16c"/><circle cx="24" cy="22" r="18" fill="#ffd38e"/><path d="M16 23h.1M32 23h.1" stroke="'+ink+'" stroke-width="4" stroke-linecap="round"/><path d="'+mouth+'" stroke="'+ink+'" stroke-width="2.5" stroke-linecap="round" fill="none"/>');
 }
 if(value==='Stanchezza')return svg('<rect x="7" y="13" width="31" height="23" rx="4" fill="#c78abe"/><rect x="11" y="17" width="23" height="15" rx="2" fill="#fff4fa"/><path d="M40 20h3v10h-3Z" fill="#c78abe"/><rect x="13" y="19" width="6" height="11" rx="1" fill="'+rose+'"/>');
 if(value==='Voglia di dolci')return svg('<rect x="11" y="6" width="26" height="36" rx="4" fill="#91654f"/><path d="M24 7v34M12 18h24M12 30h24" stroke="#6a473a" stroke-width="2"/><path d="M8 28h32v16H8Z" fill="#d6a1cf"/>');
 return svg('<circle cx="24" cy="24" r="18" fill="#ccb2e2"/><path d="M14 24h20M24 14v20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>');
}
export function diaryChoices(name,items,current,multiple,{button,esc},quick=false){
 return `<div class="diary-choices ${quick?'quick-symptoms':''}" role="group" aria-label="${({sint:'Sintomi',umore:'Umore',flusso:'Flusso',rapporti:'Rapporti e desiderio',activity:'Attività fisica',context:'Altro',mucus:'Perdite vaginali',lh:'Test LH',pregnancy:'Test di gravidanza'})[name]||name}">${items.map(v=>button('chip',`<span class="diary-glyph" aria-hidden="true">${diaryGlyph(name,v)}</span><span class="diary-choice-label">${esc(({'Seno dolente':'Tensione al seno','Voglia di dolci':'Voglie','Cremoso':'Cremose','Acquoso':'Liquide','Appiccicoso':'Appiccicose','Trasparente e filante':'Ad albume d’uovo'})[v]||v)}</span>`,'diary-choice',`data-field="${name}" data-value="${esc(v)}" data-multi="${multiple}" aria-pressed="${multiple?current.includes(v):current===v}"`)).join('')}</div>`;
}
export function filterDiary(root,query){
 const q=normalizeDiarySearch(query);let found=0;
 for(const group of root.querySelectorAll('[data-diary-group]')){
  const title=normalizeDiarySearch(group.dataset.diaryGroup),choices=[...group.querySelectorAll('[data-action=chip]')];
  if(choices.length){let count=0;for(const b of choices){b.hidden=!!q&&!title.includes(q)&&!normalizeDiarySearch(b.dataset.value+' '+b.textContent).includes(q);if(!b.hidden)count++;}group.hidden=!count;}
  else group.hidden=!!q&&!normalizeDiarySearch(group.textContent).includes(q);
  if(!group.hidden)found++;
 }
 const empty=root.querySelector('.diary-search-empty');if(empty)empty.hidden=found>0;
}
