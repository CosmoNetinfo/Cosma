// Rigenera le stesse fonti locali leggibili nell’app, senza dipendenze o rete.
import {readFile,writeFile} from 'node:fs/promises';
const md=await readFile(new URL('../FONTI.md',import.meta.url),'utf8');
function html(text){return text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'$1 ($2)').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').split('\n').filter(l=>l.trim()).map(l=>l.startsWith('#')?'<h3>'+l.replace(/^#+\s*/,'')+'</h3>':'<p>'+l.replace(/^- /,'')+'</p>').join('');}
const sourceById={};for(const part of md.split(/(?=### S\d\d —)/)){const m=part.match(/^### (S\d\d) —/);if(m)sourceById[m[1]]=html(part.split('\n## ')[0]);}
sourceById.S00=html(md.split('## S00 —')[1].split('\n## ')[0]);
await writeFile(new URL('../src/science.js',import.meta.url),`export const scienceHTML=${JSON.stringify(html(md))};\nexport const sourceById=${JSON.stringify(sourceById)};\n`);
console.log('Fonti offline aggiornate da FONTI.md.');
