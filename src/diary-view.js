// Presentazione del diario: nessuna nuova categoria o interpretazione sanitaria.
export function normalizeDiarySearch(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it-IT').trim();}
const svg=body=>`<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">${body}</svg>`;
export function diaryGlyph(field,value){
 const ink='#48344f',skin='#e7b69b',rose='#e9588b',purple='#9c70c6';
 if(field==='flusso'){
  if(value==='Nessuno')return svg('<circle cx="24" cy="24" r="17" fill="#edb4c7"/><path d="M15 24h18" stroke="white" stroke-width="4" stroke-linecap="round"/>');
  const drop='<path d="M24 8C21 14 14 22 14 29a10 10 0 0 0 20 0C34 22 27 14 24 8Z" fill="'+rose+'"/><path d="M19 29q0 5 4 6" stroke="#ffbfd4" stroke-width="3" fill="none" stroke-linecap="round"/>';
  return svg(value==='Medio'?'<g transform="translate(-7 2) scale(.9)">'+drop+'</g><path d="M36 13s-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11Z" fill="#f692b1"/>':value==='Abbondante'?'<g transform="translate(-5 -1) scale(.88)">'+drop+'</g><path d="M37 18s-5 7-5 11a5 5 0 0 0 10 0c0-4-5-11-5-11Z" fill="#f692b1"/><path d="M8 14s-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z" fill="#f692b1"/>':drop);
 }
 if(field==='umore'){
  const mouth={Felice:'M15 28q9 15 18 0',Calma:'M17 31q7 4 14 0',Neutro:'M17 31h14',Triste:'M16 34q8-10 16 0',Irritabile:'M17 33h14M12 15l8 3M28 18l8-3',Ansia:'M20 32q4-6 8 0M12 15l8 3M28 18l8-3'}[value]||'M17 31h14';
  return svg('<circle cx="24" cy="24" r="20" fill="#ffc16c"/><circle cx="24" cy="22" r="18" fill="#ffd38e"/><path d="M16 23h.1M32 23h.1" stroke="'+ink+'" stroke-width="4" stroke-linecap="round"/><path d="'+mouth+'" stroke="'+ink+'" stroke-width="2.5" stroke-linecap="round" fill="none"/>');
 }
 const target='<circle cx="25" cy="26" r="8" fill="#ed749c"/><circle cx="25" cy="26" r="5" fill="#fff4f4"/><circle cx="25" cy="26" r="2.5" fill="'+rose+'"/>';
 const torso='<path d="M14 9q10-7 20 0l-3 12 6 19H11l6-19Z" fill="'+skin+'"/><path d="M11 32q13 9 26 0l-3 10H14Z" fill="'+purple+'"/>';
 if(value==='Crampi'||value==='Gonfiore'||value==='Mal di schiena'||value==='Seno dolente')return svg(torso+target);
 if(value==='Stanchezza')return svg('<rect x="7" y="13" width="31" height="23" rx="4" fill="#c78abe"/><rect x="11" y="17" width="23" height="15" rx="2" fill="#fff4fa"/><path d="M40 20h3v10h-3Z" fill="#c78abe"/><rect x="13" y="19" width="6" height="11" rx="1" fill="'+rose+'"/>');
 if(value==='Mal di testa'||value==='Acne'||value==='Nausea')return svg('<path d="M13 42q-7-10-3-23C12 2 36 3 38 19l-3 17-4 6Z" fill="#45536a"/><path d="M18 14q12-6 15 7l4 8-5 2v7H21l-2-7q-7-5-1-17Z" fill="'+skin+'"/>'+target);
 if(value==='Voglia di dolci')return svg('<rect x="11" y="6" width="26" height="36" rx="4" fill="#91654f"/><path d="M24 7v34M12 18h24M12 30h24" stroke="#6a473a" stroke-width="2"/><path d="M8 28h32v16H8Z" fill="#d6a1cf"/>');
 return svg('<path d="M18 7q6-4 12 0l5 16-4 19H17l-4-19Z" fill="'+purple+'"/><circle cx="24" cy="9" r="6" fill="'+skin+'"/><path d="M18 24h12" stroke="#e2c2ef" stroke-width="4" stroke-linecap="round"/>');
}
export function diaryChoices(name,items,current,multiple,{button,esc},quick=false){
 return `<div class="diary-choices ${quick?'quick-symptoms':''}" role="group" aria-label="${name==='sint'?'Sintomi':name==='umore'?'Umore':'Flusso'}">${items.map(v=>button('chip',`<span class="diary-glyph" aria-hidden="true">${diaryGlyph(name,v)}</span><span class="diary-choice-label">${esc(v)}</span>`,'diary-choice',`data-field="${name}" data-value="${esc(v)}" data-multi="${multiple}" aria-pressed="${multiple?current.includes(v):current===v}"`)).join('')}</div>`;
}
export function filterDiary(root,query){
 const q=normalizeDiarySearch(query);let found=0;
 for(const group of root.querySelectorAll('[data-diary-group]')){
  const title=normalizeDiarySearch(group.dataset.diaryGroup),choices=[...group.querySelectorAll('[data-action=chip]')];
  if(choices.length){let count=0;for(const b of choices){b.hidden=!!q&&!title.includes(q)&&!normalizeDiarySearch(b.dataset.value).includes(q);if(!b.hidden)count++;}group.hidden=!count;}
  else group.hidden=!!q&&!normalizeDiarySearch(group.textContent).includes(q);
  if(!group.hidden)found++;
 }
 const empty=root.querySelector('.diary-search-empty');if(empty)empty.hidden=found>0;
}
