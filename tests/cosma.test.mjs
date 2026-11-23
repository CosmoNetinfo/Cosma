import test from 'node:test';
import assert from 'node:assert/strict';
import {initial,normalize} from '../src/domain.js';
import {selectMessage,messages,tour} from '../src/cosma-messages.js';
import {readFileSync} from 'node:fs';
const day='2026-11-22',when={date:day,hour:12};
test('Cosma: Discreta predefinita, nessun messaggio di notte, durante scrittura o in Silenziosa',()=>{
 const s=initial();assert.equal(s.cosmaPresence,'discreta');assert.equal(selectMessage(s,when),'hello');
 assert.equal(selectMessage(s,{...when,hour:23}),null);assert.equal(selectMessage(s,{...when,typing:true}),null);s.cosmaPresence='silenziosa';assert.equal(selectMessage(s,when),null);
});
test('Cosma: limiti giornalieri 3/1/0, nessun messaggio ripetuto dopo riapertura',()=>{
 const s=initial();s.createdAt='2026-01-01';s.cosmaSeen={backup:day};assert.equal(selectMessage(s,when),null);
 s.cosmaPresence='presente';assert.equal(selectMessage(s,when),'hello');s.cosmaSeen.hello=day;s.cosmaSeen.agenda=day;assert.equal(selectMessage(normalize(s),when),null);
});
test('Cosma: fine del flusso richiesta solo dopo una durata personale registrata, mai inventata',()=>{
 const s=initial();s.periods=[{id:'a',start:'2026-10-01',end:'2026-10-04'},{id:'b',start:'2026-11-15'}];
 assert.equal(selectMessage(s,when),'end');s.periods[0].end=undefined;assert.equal(selectMessage(s,when),'hello');
});
test('Catalogo verificabile e tour di otto passi: tutti i messaggi hanno una motivazione/fonte',()=>{
 const catalog=readFileSync(new URL('../messaggi-cosma.md',import.meta.url),'utf8');
 for(const m of Object.values(messages)){assert.ok(m.source);assert.ok(catalog.includes(m.text));assert.doesNotMatch(m.text,/ovulazione confermata|sei al sicuro|devi|non registri da giorni/i);assert.ok(!m.answers||m.answers.length<=3);}
 assert.equal(tour.length,8);assert.ok(tour.every(t=>t.focus&&t.target));
});
