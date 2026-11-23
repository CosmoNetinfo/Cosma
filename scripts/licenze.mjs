// Inventario ripetibile delle dipendenze installate e avvisi leggibili offline.
import {readFile,writeFile,readdir} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {execSync} from 'node:child_process';
const root=fileURLToPath(new URL('..',import.meta.url));
const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8')),lock=JSON.parse(await readFile(path.join(root,'package-lock.json'),'utf8'));
const production=JSON.parse(execSync('npm ls --omit=dev --all --json',{cwd:root,encoding:'utf8'})),needed=new Set();
function collect(node){for(const [name,dep] of Object.entries(node.dependencies||{})){needed.add(name+'@'+dep.version);collect(dep);}}collect(production);
const included=new Set();
const records=[],sections=['Cosma · componenti e licenze','Inventario dei pacchetti npm di produzione effettivamente installati. Può comprendere strumenti o componenti web non attivi nell’APK Android.','La licenza del progetto e delle immagini deve essere definita dal titolare. Le licenze seguenti riguardano software di terzi. I testi legali sono riportati nella lingua originale.'];
for(const [rel,meta] of Object.entries(lock.packages||{})){
 if(!rel.startsWith('node_modules/'))continue;
 const dir=path.join(root,rel);let data;try{data=JSON.parse(await readFile(path.join(dir,'package.json'),'utf8'));}catch{continue;}
 const key=data.name+'@'+data.version;if(!needed.has(key)||included.has(key))continue;included.add(key);
 const files=(await readdir(dir)).filter(n=>/^(licen[sc]e|copying|notice)(\.|$)/i.test(n)),texts=[];
 for(const file of files){try{const text=await readFile(path.join(dir,file),'utf8');if(text.length<100000)texts.push({file,text});}catch{}}
 if(!texts.length){for(const file of ['README.md','readme.md']){try{const readme=await readFile(path.join(dir,file),'utf8'),at=readme.search(/^##? License/m);if(at>=0)texts.push({file:file+'#License',text:readme.slice(at).replaceAll('&lt;','<').replaceAll('&gt;','>')});}catch{}}}
 const repo=typeof data.repository==='string'?data.repository:data.repository?.url;
 records.push({pacchetto:data.name,versione:data.version,licenza:data.license||meta.license||'Non dichiarata',diretta:Object.hasOwn(pkg.dependencies||{},data.name),repository:repo||null,testi_locali:texts.map(t=>t.file)});
 sections.push('\n=== '+data.name+' '+data.version+' · '+(data.license||meta.license||'Licenza non dichiarata')+' ===\n'+(texts.length?texts.map(t=>t.text).join('\n'):'Testo locale non trovato; verificare il repository ufficiale.'));
}
for(const name of ['SQLCIPHER-COMMUNITY.txt','SQLCIPHER-ANDROID.txt','APACHE-2.0.txt'])sections.push('\n=== '+name+' ===\n'+await readFile(path.join(root,'legal',name),'utf8'));
const text=sections.join('\n\n');await writeFile(path.join(root,'docs/LICENZE-COMPONENTI.txt'),text);await writeFile(path.join(root,'docs/LICENZE-RUNTIME.json'),JSON.stringify(records,null,2));await writeFile(path.join(root,'src/licenses.js'),'// Generato da scripts/licenze.mjs; testi legali locali.\nexport const licensesText='+JSON.stringify(text)+';\n');
console.log(records.length+' componenti npm di produzione inventariati; testi offline aggiornati.');
