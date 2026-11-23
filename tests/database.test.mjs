import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {randomBytes,createCipheriv,createDecipheriv} from 'node:crypto';
import {createNativeVault} from '../src/native-vault.js';

// SQLite reale; execute riproduce il contratto Android: un'istruzione per chiamata.
// La chiave di test sostituisce soltanto Android Keystore, non il motore SQL.
function fixture(){
 const sql=new DatabaseSync(':memory:');let failAt=null;
 const db={
  execute:async s=>sql.prepare(s).run(),
  query:async(s,v=[])=>({values:sql.prepare(s).all(...v)}),
  beginTransaction:async()=>sql.exec('BEGIN'),commitTransaction:async()=>sql.exec('COMMIT'),rollbackTransaction:async()=>sql.exec('ROLLBACK'),
  executeSet:async set=>{for(let i=0;i<set.length;i++){if(i===failAt)throw Error('Interruzione simulata');sql.prepare(set[i].statement).run(...set[i].values);}},
 };
 const key=randomBytes(32),cipher={
  seal:async({text})=>{const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',key,iv),body=Buffer.concat([c.update(text,'utf8'),c.final()]);return{data:JSON.stringify({iv:iv.toString('base64'),body:Buffer.concat([body,c.getAuthTag()]).toString('base64')})};},
  open:async({data})=>{const v=JSON.parse(data),body=Buffer.from(v.body,'base64'),c=createDecipheriv('aes-256-gcm',key,Buffer.from(v.iv,'base64'));c.setAuthTag(body.subarray(-16));return{text:Buffer.concat([c.update(body.subarray(0,-16)),c.final()]).toString('utf8')};},
 };
 return{sql,db,cipher,interruptAt:i=>failAt=i};
}
test('Regressione Android: due CREATE sulla stessa riga creavano solo vault',()=>{const f=fixture();try{f.sql.prepare('CREATE TABLE vault(id INTEGER); CREATE TABLE vault_parts(part INTEGER);').run();assert.throws(()=>f.sql.prepare('DELETE FROM vault_parts').run(),/no such table/);}finally{f.sql.close();}});
test('Primo avvio: entrambe le tabelle esistono e il primo salvataggio si rilegge',async()=>{const f=fixture();try{const vault=await createNativeVault(f.db,f.cipher);assert.equal(await vault.read(),null);const record={encrypted:false,data:{periods:[],note:'Dato fittizio'}};await vault.write(record,0);assert.deepEqual(await vault.read(),{...record,revision:1});}finally{f.sql.close();}});
test('Aggiornamento dalla configurazione incompleta: crea vault_parts e conserva il record esistente',async()=>{const f=fixture();try{f.sql.exec('CREATE TABLE vault(id INTEGER PRIMARY KEY,revision INTEGER,payload TEXT)');const record={encrypted:false,data:{note:'Da conservare'}};const sealed=await f.cipher.seal({text:JSON.stringify(record)});f.sql.prepare('INSERT INTO vault VALUES(1,7,?)').run(sealed.data);const vault=await createNativeVault(f.db,f.cipher);assert.deepEqual(await vault.read(),{...record,revision:7});await vault.write(record,7);assert.deepEqual(await vault.read(),{...record,revision:8});}finally{f.sql.close();}});
test('Riapertura e inizializzazione ripetuta non cancellano righe o revisioni',async()=>{const f=fixture();try{let vault=await createNativeVault(f.db,f.cipher);const record={encrypted:true,data:{ciphertext:'Esempio fittizio'}};await vault.write(record,0);vault=await createNativeVault(f.db,f.cipher);assert.deepEqual(await vault.read(),{...record,revision:1});}finally{f.sql.close();}});
test('Interruzione del salvataggio: transazione annullata e archivio precedente intatto',async()=>{const f=fixture();try{const vault=await createNativeVault(f.db,f.cipher),old={encrypted:false,data:{note:'Prima'}};await vault.write(old,0);f.interruptAt(2);await assert.rejects(vault.write({encrypted:false,data:{note:'Dopo'}},1),/Interruzione/);assert.deepEqual(await vault.read(),{...old,revision:1});f.interruptAt(null);await assert.rejects(vault.write(old,0),/cambiato/);assert.deepEqual(await vault.read(),{...old,revision:1});}finally{f.sql.close();}});
test('Documento oltre quattro MB: righe piccole, cifratura e lettura SQLite completa',async()=>{const f=fixture();try{const vault=await createNativeVault(f.db,f.cipher),record={encrypted:false,data:{note:'dato-di-prova-'.repeat(320000)}};await vault.write(record,0);const rows=f.sql.prepare('SELECT payload FROM vault_parts').all();assert.ok(rows.length>80);assert.ok(rows.every(r=>r.payload.length<=48000&&!r.payload.includes('dato-di-prova-')));assert.deepEqual(await vault.read(),{...record,revision:1});}finally{f.sql.close();}});
