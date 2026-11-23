import test from 'node:test';
import assert from 'node:assert/strict';
import {cosmaPoses,contextPose} from '../src/cosma-pose.js';
test('Pose solo originali: pagine diverse mantengono un aiuto contestuale',()=>{
 assert.notEqual(contextPose('diario'),contextPose('settings'));
 for(const page of ['oggi','cal','diario','salute','settings','backup','security','temp','visits','notify','sconosciuta'])assert.ok(cosmaPoses.includes(contextPose(page)));
});
test('Notte e silenzio visivo usano il sonno; disagio usa abbraccio senza diagnosi',()=>{
 assert.equal(contextPose('oggi',{night:true,messagePose:'cosma-saluta-intera.png',difficult:true}),'cosma-dorme-intera.png');
 assert.equal(contextPose('oggi',{difficult:true}),'cosma-abbraccio.png');
});
test('Il messaggio può scegliere soltanto una delle quattro immagini originali',()=>{
 assert.equal(contextPose('cal',{messagePose:'cosma-saluta-intera.png'}),'cosma-saluta-intera.png');
 for(const bad of ['https://esempio.it/posa.png','nuova-posa.png',null])assert.equal(contextPose('cal',{messagePose:bad}),'cosma-in-piedi.png');
});
