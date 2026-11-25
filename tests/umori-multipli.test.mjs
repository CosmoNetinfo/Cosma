import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,normalize,today} from '../src/domain.js';
import {quickChange} from '../src/quick-entry.js';
import {moodValues} from '../src/diary-catalog.js';
import {exportPortable,exportCSV,parseExport,previewImport,mergeImport} from '../src/import-v2.js';
import {encryptBackup,decryptBackup} from '../src/crypto.js';
test('Vecchi umori convertiti senza perdita, lista vuota esplicita non ripristina una scelta rimossa',()=>{
 const s=initial(),d=today();s.log[d]={umore:'Calma'};const n=normalize(s);assert.deepEqual(n.log[d].umori,['Calma']);assert.equal(n.log[d].umore,'Calma');n.log[d].umori=[];assert.deepEqual(normalize(n).log[d].umori,[]);assert.deepEqual(moodValues({umore:'🙂 Neutra'}),['Neutro']);
});
test('Più umori e rimozione indipendente, in entrambi gli ingressi rapidi',()=>{
 const d=today();let s=quickChange(initial(),d,'umori','Calma');s=quickChange(s,d,'umori','Con energia');assert.deepEqual(s.log[d].umori,['Calma','Con energia']);s=quickChange(s,d,'umore','Calma');assert.deepEqual(s.log[d].umori,['Con energia']);assert.equal(s.log[d].umore,'Con energia');s=quickChange(s,d,'umori','Con energia');assert.deepEqual(s.log[d].umori,[]);assert.equal(s.log[d].umore,'');
});
test('Normalizzazione filtra sconosciuti e duplicati; JSON e CSV conservano tutti gli umori',()=>{
 const d=today(),s=initial();s.log[d]={umori:['Calma','Felice','Calma','inventato'],note:'da conservare'};const n=normalize(s);assert.deepEqual(n.log[d].umori,['Calma','Felice']);for(const text of [JSON.stringify(exportPortable(n)),exportCSV(n)]){const restored=mergeImport(initial(),previewImport(initial(),parseExport(text),{source:'Cosma',mode:'merge',conflict:'existing'}));assert.deepEqual(restored.log[d].umori,['Calma','Felice']);assert.equal(restored.log[d].note,'da conservare');}
});
test('Backup cifrato conserva la selezione multipla',async()=>{
 const d=today();let s=quickChange(initial(),d,'umori','Calma');s=quickChange(s,d,'umori','Felice');const encrypted=await encryptBackup(s,'prova-backup-umori-2026');const restored=normalize(await decryptBackup(encrypted,'prova-backup-umori-2026'));assert.deepEqual(restored.log[d].umori,['Calma','Felice']);
});
