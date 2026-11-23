import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {initial} from '../src/domain.js';

// Si verifica lo storage vero sostituendo soltanto il confine Android/SQLite.
// Le transazioni SQLite reali sono verificate separatamente da database.test.mjs.
const bundled=await build({entryPoints:['src/storage.js'],bundle:true,write:false,platform:'node',format:'esm',plugins:[{name:'confini-di-prova',setup(b){
 b.onLoad({filter:/[\\/]database\.js$/},()=>({contents:`export async function openDatabase(){return globalThis.__COSMA_DB;}`}));
 b.onLoad({filter:/[\\/]platform\.js$/},()=>({contents:'export async function clearBiometric(){}'}));
}}]});
const store=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));
let record=null,fail=false;
globalThis.__COSMA_DB={read:async()=>structuredClone(record),write:async(r,revision)=>{if(fail)throw Error('Spazio insufficiente');assert.equal(revision,record?.revision||0);record={...structuredClone(r),revision:revision+1};}};
test('Copia automatica e salvataggio atomico: errore preserva dati e precedente annullamento',async()=>{
 const {state}=await store.boot(),next=initial();next.periods=[{id:'x',start:'2026-01-01',exclude:false}];
 fail=true;await assert.rejects(()=>store.persistImport(state,next),/Spazio/);fail=false;assert.equal(store.canUndoImport(),false);assert.equal((await store.boot()).state.periods.length,0);
 await store.persistImport(state,next);assert.equal(store.canUndoImport(),true);assert.equal((await store.boot()).state.periods.length,1);
 const restored=await store.undoImport();assert.equal(restored.periods.length,0);assert.equal(store.canUndoImport(),false);
});
test('Annullamento cifrato dal PIN: riapertura, PIN errato, cambio protezione e recupero della copia',async()=>{
 const before=initial();before.log['2026-01-01']={note:'Dato precedente privato'};await store.persist(before);
 const after=structuredClone(before);after.periods=[{id:'y',start:'2026-02-01',exclude:false}];await store.persistImport(before,after);await store.enableProtection(after,'12345678');
 assert.equal(JSON.stringify(record).includes('Dato precedente privato'),false);store.forgetKey();assert.equal((await store.boot()).locked,true);await assert.rejects(()=>store.unlock('87654321'));
 await store.unlock('12345678');assert.equal(store.canUndoImport(),true);const restored=await store.undoImport();assert.equal(restored.log['2026-01-01'].note,'Dato precedente privato');assert.equal(restored.periods.length,0);
 await store.disableProtection(restored);await store.erase();assert.equal(store.canUndoImport(),false);assert.equal((await store.boot()).state.periods.length,0);
});
