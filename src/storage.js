import {initial,normalize} from './domain.js';
import {randomSalt,derive,seal,unseal} from './crypto.js';
import {openDatabase} from './database.js';
import {clearBiometric} from './platform.js';
let db,key=null,salt=null,revision=0,protectedStore=false;
export const isProtected=()=>protectedStore;
async function write(record){await db.write(record,revision);revision++;}
export async function boot(){db=await openDatabase();const r=await db.read();revision=r?.revision||0;protectedStore=!!r?.encrypted;if(r){if(r.encrypted)return{locked:true};return{state:normalize(r.data)};}const state=initial();await write({encrypted:false,data:state});return{state};}
export async function unlock(password){const r=await db.read();if(!r?.encrypted)throw Error('La protezione è cambiata. Chiudi e riapri Cosma.');const candidate=await derive(password,r.data.salt),state=normalize(await unseal(r.data,candidate));key=candidate;salt=r.data.salt;revision=r.revision;protectedStore=true;return state;}
export async function persist(state){if(protectedStore&&!key)throw Error('Sblocca Cosma prima di salvare.');await write({encrypted:protectedStore,data:protectedStore?await seal(state,key,salt):state});}
export async function enableProtection(state,password){if(password.length<8)throw Error('Usa almeno 8 cifre o caratteri.');const newSalt=randomSalt(),newKey=await derive(password,newSalt);await write({encrypted:true,data:await seal(state,newKey,newSalt)});key=newKey;salt=newSalt;protectedStore=true;await clearBiometric();}
export async function disableProtection(state){await write({encrypted:false,data:state});key=null;salt=null;protectedStore=false;await clearBiometric();}
export function forgetKey(){key=null;salt=null;}
export async function erase(){const r=await db.read();revision=r?.revision||0;await write({encrypted:false,data:initial()});key=null;salt=null;protectedStore=false;await clearBiometric();}
