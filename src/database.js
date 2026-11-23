import { native,Device } from './platform.js';
import { CapacitorSQLite,SQLiteConnection } from '@capacitor-community/sqlite';
import {createNativeVault} from './native-vault.js';
// Un documento cifrato e revisionato in SQLite: transazioni atomiche, nessuna copia in chiaro.
export async function openDatabase(){
 if(!native){if(__COSMA_TEST__)return openTestDatabase();throw Error('Archivio disponibile solo nellâ€™app Android.');}
 const sqlite=new SQLiteConnection(CapacitorSQLite),db=await sqlite.createConnection('cosma',false,'no-encryption',1,false);
 await db.open();
 return createNativeVault(db,Device);
}
// Adattatore escluso dal percorso di produzione: non Ã¨ la memoria Android.
async function openTestDatabase(){const d=await new Promise((resolve,reject)=>{const r=indexedDB.open('cosma-test',1);r.onupgradeneeded=()=>r.result.createObjectStore('vault');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return{read:()=>new Promise((resolve,reject)=>{const r=d.transaction('vault').objectStore('vault').get('state');r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error);}),write:(value,expected)=>new Promise((resolve,reject)=>{const tx=d.transaction('vault','readwrite'),store=tx.objectStore('vault'),r=store.get('state');r.onsuccess=()=>{if((r.result?.revision||0)!==expected){tx.abort();return;}store.put({...value,revision:expected+1},'state');};tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error('Conflitto durante il salvataggio.'));})};}
