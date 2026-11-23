import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
test('Le cinque immagini della mascotte rimangono identiche agli originali forniti',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../docs/IMMAGINI-ORIGINALI.json',import.meta.url),'utf8'));
 for(const entry of manifest){const bytes=readFileSync(new URL('../src/'+entry.immagine,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256_originale_e_consegna,entry.immagine);}
});
