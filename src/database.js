import { native,Device } from './platform.js';
import { CapacitorSQLite,SQLiteConnection } from '@capacitor-community/sqlite';
import {splitCiphertext,joinCiphertext} from './chunks.js';
// Un documento cifrato e revisionato in SQLite: transazioni atomiche, nessuna copia in chiaro.
export async function openDatabase(){
 if(!native){if(__COSMA_TEST__)return openTestDatabase();throw Error('Archivio disponibile solo nell’app Android.');}
 const sqlite=new SQLiteConnection(CapacitorSQLite),db=await sqlite.createConnection('cosma',false,'no-encryption',1,false);
 await db.open();await db.execute('CREATE TABLE IF NOT EXISTS vault (id INTEGER PRIMARY KEY CHECK (id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL); CREATE TABLE IF NOT EXISTS vault_parts (part INTEGER PRIMARY KEY, payload TEXT NOT NULL);');
 return {
  async read(){
   const r=await db.query('SELECT revision,payload FROM vault WHERE id=1'),v=r.values?.[0];if(!v)return null;
   const data=v.payload==='chunks-v1'?joinCiphertext((await db.query('SELECT part,payload FROM vault_parts ORDER BY part')).values||[]):v.payload;
   const opened=await Device.open({data});return{...JSON.parse(opened.text),revision:v.revision};
  },
  async write(record,expected){
   const sealed=await Device.seal({text:JSON.stringify(record)}),parts=splitCiphertext(sealed.data);
   await db.beginTransaction();
   try{
    const r=await db.query('SELECT revision FROM vault WHERE id=1');
    if((r.values?.[0]?.revision||0)!==expected)throw Error('L’archivio è cambiato. Chiudi e riapri Cosma prima di salvare.');
    await db.executeSet([
     {statement:'DELETE FROM vault_parts',values:[]},
     ...parts.map(x=>({statement:'INSERT INTO vault_parts(part,payload) VALUES(?,?)',values:[x.part,x.payload]})),
     {statement:'INSERT OR REPLACE INTO vault(id,revision,payload) VALUES(1,?,?)',values:[expected+1,'chunks-v1']}
    ],false);
    await db.commitTransaction();
   }catch(e){await db.rollbackTransaction();throw e;}
  }
 };
}
// Adattatore escluso dal percorso di produzione: non è la memoria Android.
async function openTestDatabase(){const d=await new Promise((resolve,reject)=>{const r=indexedDB.open('cosma-test',1);r.onupgradeneeded=()=>r.result.createObjectStore('vault');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return{read:()=>new Promise((resolve,reject)=>{const r=d.transaction('vault').objectStore('vault').get('state');r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error);}),write:(value,expected)=>new Promise((resolve,reject)=>{const tx=d.transaction('vault','readwrite'),store=tx.objectStore('vault'),r=store.get('state');r.onsuccess=()=>{if((r.result?.revision||0)!==expected){tx.abort();return;}store.put({...value,revision:expected+1},'state');};tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error('Conflitto durante il salvataggio.'));})};}
