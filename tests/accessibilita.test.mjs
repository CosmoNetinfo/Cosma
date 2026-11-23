import test from 'node:test';
import assert from 'node:assert/strict';
const rgb=h=>h.replace('#','').match(/../g).map(x=>parseInt(x,16));
const luminance=c=>c.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
test('Palette approvata: contrasto del testo normale almeno 4,5:1',()=>{for(const [fg,bg] of [['#3b0a45','#fdf4ff'],['#74597c','#fdf4ff'],['#74597c','#ffffff'],['#f8f0fc','#17101f'],['#b9a7c6','#17101f'],['#b9a7c6','#241a2c'],['#7c3aed','#ffffff'],['#d5b4ff','#241a2c']])assert.ok(contrast(rgb(fg),rgb(bg))>=4.5,fg+' su '+bg);});
test('Testo bianco sul gradiente principale: contrasto almeno 4,5:1',()=>{const a=rgb('#7c3aed'),b=rgb('#c026d3');for(let i=0;i<=100;i++)assert.ok(contrast([255,255,255],a.map((x,j)=>x+(b[j]-x)*i/100))>=4.5);});
