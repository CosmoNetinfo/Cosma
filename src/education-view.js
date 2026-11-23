import {articles} from './education.js';
export const educationGroups=Object.freeze([
 {id:'mestruazioni',title:'Le mestruazioni',ids:[0,1,2,5,18]},
 {id:'follicolare',title:'Fase follicolare',ids:[26]},
 {id:'luteale',title:'Fase luteale',ids:[27]},
 {id:'ciclo',title:'Tra un ciclo e l’altro',ids:[3,4,7,8,9,16,17,19]},
 {id:'segnali',title:'Intorno all’ovulazione',ids:[28,10,11,12,13,14,15,21]},
 {id:'diario',title:'Capire i tuoi dati',ids:[6,20,22,23,24,25]}
]);
export function articlesForGroup(id){const g=educationGroups.find(g=>g.id===id);return g?g.ids.map(id=>articles.find(a=>a.id===id)).filter(Boolean):articles;}
export function homeReadingsHTML({button,esc,icon}){return `<section class="reading-section" aria-labelledby="reading-title"><div class="split"><h2 id="reading-title">Piccole letture</h2>${button('learn','Vedi tutte','text-button')}</div><div class="reading-strip">${[0,26,28,27].map((id,i)=>{const a=articles.find(a=>a.id===id);return button('read-article',`<span class="reading-icon" aria-hidden="true">${icon(i===1?'cal':'diary')}</span><strong>${esc(a.title)}</strong><span class="reading-source">Fonti ${a.sources.join(', ')}</span>`,'reading-card reading-'+i,`data-id="${id}"`);}).join('')}</div></section>`;}
export function educationHTML(group,{button,esc}){return `<p class="hint">Letture generali, da scegliere con calma. Le sezioni non identificano la tua fase personale.</p><div class="education-filters" role="group" aria-label="Argomenti delle letture">${[{id:'all',title:'Tutte'},...educationGroups].map(g=>button('education-group',esc(g.title),'',`data-group="${g.id}" aria-pressed="${g.id===group}"`)).join('')}</div>${articlesForGroup(group).map(a=>`<article class="education-card"><h2>${esc(a.title)}</h2><p>${esc(a.text)}</p>${button('article-source','Fonti: '+a.sources.join(', '),'text-button',`data-sources="${a.sources.join(',')}"`)}</article>`).join('')}`;}
