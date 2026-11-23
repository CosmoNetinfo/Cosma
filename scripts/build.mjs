// Copia gli asset locali e incorpora i moduli Capacitor, senza framework o CDN.
import { build } from 'esbuild';
import { mkdir, readdir, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const test=process.argv.includes('--test');
const out=path.join(root,test?'www-test':'www');
await mkdir(out,{recursive:true});
for(const name of await readdir(path.join(root,'src'))){
 if(/\.(png|svg|css|html)$/.test(name))await copyFile(path.join(root,'src',name),path.join(out,name));
}
await build({entryPoints:[path.join(root,'src/app.js')],bundle:true,format:'esm',target:'es2022',outfile:path.join(out,'app.js'),minify:false,define:{__COSMA_TEST__:JSON.stringify(test)},logLevel:'warning'});
const html=await readFile(path.join(out,'index.html'),'utf8');
if(/https?:\/\//i.test(html))throw Error('HTML con risorse remote non consentite.');
await copyFile(path.join(root,'FONTI.md'),path.join(out,'FONTI.md'));
console.log(test?'Interfaccia di test generata.':'Interfaccia Android generata in www/. Nessuna rete a runtime.');
