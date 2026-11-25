// Composizione deterministica delle risorse del launcher: il PNG originale
// viene soltanto posizionato e scalato. Nessun ritocco o ridisegno della mascotte.
import {chromium} from '@playwright/test';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const res=path.join(root,'android/app/src/main/res'),original=await readFile(path.join(root,'src/avatar.png'));
const uri='data:image/png;base64,'+original.toString('base64');
const background='#fbedff';
const svg=(adaptive=false)=>`<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108">${adaptive?'':`<rect width="108" height="108" fill="${background}"/>`}<image href="${uri}" x="${adaptive?27:15.12}" y="${adaptive?27:15.12}" width="${adaptive?54:77.76}" height="${adaptive?54:77.76}" preserveAspectRatio="xMidYMid meet"/></svg>`;
const browser=await chromium.launch({executablePath:process.env.COSMA_BROWSER||undefined,headless:true});
try{
 const page=await browser.newPage({deviceScaleFactor:1});
 for(const [density,icon,foreground] of [['mdpi',48,108],['hdpi',72,162],['xhdpi',96,216],['xxhdpi',144,324],['xxxhdpi',192,432]]){
  const folder=path.join(res,'mipmap-'+density);await mkdir(folder,{recursive:true});
  for(const [name,size,adaptive] of [['ic_launcher.png',icon,false],['ic_launcher_round.png',icon,false],['ic_launcher_foreground.png',foreground,true]]){
   await page.setViewportSize({width:size,height:size});await page.setContent('<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style>'+svg(adaptive));await page.screenshot({path:path.join(folder,name),omitBackground:true});
  }
 }
 await page.setViewportSize({width:512,height:512});await page.setContent('<style>html,body{margin:0}svg{display:block;width:100vw;height:100vh}</style>'+svg());await page.screenshot({path:path.join(root,'fastlane/metadata/android/it-IT/images/icon.png')});
 const previews=[['Quadrata','inset(0 round 22%)'],['Tonda','circle(50%)'],['Quadrata arrotondata','inset(0 round 12%)']];
 const cards=previews.map(([name,mask])=>`<section><h2>${name}</h2><div class="pair">${[96,48].map(size=>`<div class="icon" style="width:${size}px;height:${size}px;clip-path:${mask}">${svg()}</div>`).join('')}</div></section>`).join('');
 await page.setViewportSize({width:960,height:420});await page.setContent(`<style>body{margin:0;padding:40px;background:#f4f1f5;color:#3b0a45;font-family:system-ui}h1{font-size:24px;margin:0 0 32px}main{display:flex;gap:48px}h2{font-size:16px;font-weight:500;margin:0 0 24px}.pair{display:flex;align-items:center;gap:20px}.icon svg{display:block;width:100%;height:100%}</style><h1>Cosma · anteprima dell’icona corretta</h1><main>${cards}</main>`);await page.screenshot({path:path.join(root,'docs/ICONA-ANTEPRIMA.png')});
 await writeFile(path.join(root,'docs/ICONA-ANDROID.json'),JSON.stringify({originale:'src/avatar.png',sha256_originale:createHash('sha256').update(original).digest('hex'),sfondo:background,adaptive:{livello_dp:108,immagine_dp:54,margine_dp:27,area_sicura_dp:66},legacy:{margine_percento:14},maschere_anteprima:previews.map(x=>x[0]),originale_ritoccato:false},null,2)+'\n');
}finally{await browser.close();}
console.log('Risorse Android e anteprima generate dalla mascotte originale, senza ritocchi.');
