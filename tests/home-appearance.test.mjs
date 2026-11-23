import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,clone,analysis,addD} from '../src/domain.js';
import {homeTone,homePalettes} from '../src/home-appearance.js';

test('Sfondo rosato soltanto per date di mestruazioni esplicitamente registrate',()=>{
 const s=initial();s.periods=[{id:'a',start:'2026-11-10',end:'2026-11-13',exclude:false}];
 assert.equal(homeTone(s,'2026-11-10'),'mestruazioni');assert.equal(homeTone(s,'2026-11-13'),'mestruazioni');
 assert.equal(homeTone(s,'2026-11-14'),'quotidiano');delete s.periods[0].end;
 assert.equal(homeTone(s,'2026-11-11'),'quotidiano'); // Non inventa la durata dal valore iniziale.
});
test('Fascia descrittiva superata: colore neutro senza spostare o modificare la previsione',()=>{
 const s=initial();s.periods=['2026-07-01','2026-07-29','2026-08-26','2026-09-23'].map(start=>({id:start,start,exclude:false}));
 const original=clone(s),date='2026-11-22',before=analysis(s,date);
 assert.equal(homeTone(s,before.prediction.high),'quotidiano');assert.equal(homeTone(s,addD(before.prediction.high,1)),'neutro');
 assert.deepEqual(s,original);assert.deepEqual(analysis(s,date),before);
});
test('Nessun dato: neutro; temperatura, LH e muco non assegnano una fase o un colore fertile',()=>{
 const s=initial();assert.equal(homeTone(s,'2026-11-22'),'neutro');s.periods=[{id:'a',start:'2026-11-01',exclude:false}];
 const tone=homeTone(s,'2026-11-22');s.mode='concepimento';s.log['2026-11-22']={temp:37,lh:'Positivo',mucus:'Trasparente e filante'};
 assert.equal(homeTone(s,'2026-11-22'),tone);assert.equal(tone,'quotidiano');
});
test('Tutte le tinte di Oggi mantengono contrasto almeno 4,5:1 per testo primario, secondario e link',()=>{
 const lum=h=>h.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
 for(const [theme,palette]of Object.entries(homePalettes))for(const bg of Object.values(palette))for(const fg of theme==='light'?['#3b0a45','#74597c','#7c3aed']:['#f8f0fc','#b9a7c6','#d5b4ff']){
  const a=lum(bg),b=lum(fg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,fg+' su '+bg+': '+ratio);
 }
});
