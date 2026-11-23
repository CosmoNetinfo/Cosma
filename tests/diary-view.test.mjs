import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDiarySearch,diaryChoices,diaryGlyph} from '../src/diary-view.js';
import {UMORI,FLUSSI,SINTOMI} from '../src/domain.js';
const esc=v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const ui={esc,button:(action,html,cls,attrs)=>`<button type="button" data-action="${action}" class="${cls}" ${attrs}>${html}</button>`};
test('Ricerca italiana: accenti e maiuscole non escludono i risultati',()=>{assert.equal(normalizeDiarySearch('  INTENSITÀ '),'intensita');assert.equal(normalizeDiarySearch('.*[]'),'.*[]');});
test('Diario grafico: i valori sanitari e la selezione multipla restano quelli esistenti',()=>{
 const selected=['Crampi','Nausea'];const before=JSON.stringify(selected);const html=diaryChoices('sint',SINTOMI,selected,true,ui);
 assert.equal((html.match(/aria-pressed="true"/g)||[]).length,2);assert.equal((html.match(/data-field="sint"/g)||[]).length,SINTOMI.length);assert.equal(JSON.stringify(selected),before);
});
test('Ogni valore storico ha un’icona locale e una sola selezione per umore o flusso',()=>{
 for(const [field,items] of [['umore',UMORI],['flusso',FLUSSI]]){const html=diaryChoices(field,items,items[0],false,ui);assert.equal((html.match(/aria-pressed="true"/g)||[]).length,1);for(const value of items){assert.match(diaryGlyph(field,value),/viewBox="0 0 48 48"/);assert.doesNotMatch(diaryGlyph(field,value),/https?:|<image/);}}
});
test('Le etichette importate vengono trattate come testo e non codice',()=>{const html=diaryChoices('sint',['<script>"'],[],true,ui);assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;&quot;/);});
