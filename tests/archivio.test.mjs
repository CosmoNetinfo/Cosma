import test from 'node:test';
import assert from 'node:assert/strict';
import {splitCiphertext,joinCiphertext} from '../src/chunks.js';
test('Archivio cifrato grande: righe limitate e ricostruzione senza perdita',()=>{const input='0123456789abcdef'.repeat(250000);const parts=splitCiphertext(input);assert.ok(parts.length>80);assert.ok(parts.every(p=>p.payload.length<=48000));assert.equal(joinCiphertext(parts),input);});
test('Archivio incompleto o pezzi fuori ordine: rifiuto prima della decifratura',()=>{const parts=splitCiphertext('x'.repeat(120000));assert.throws(()=>joinCiphertext(parts.slice(1)));assert.throws(()=>joinCiphertext([...parts].reverse()));assert.throws(()=>joinCiphertext([]));});
