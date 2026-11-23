// Unico confine fra interfaccia e Android. Il browser è ammesso soltanto nei test.
import { Capacitor, registerPlugin, SystemBars, SystemBarsStyle } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { BiometricAuth, AndroidBiometryStrength } from '@aparajita/capacitor-biometric-auth';
export const native=Capacitor.isNativePlatform();
export const Device=registerPlugin('CosmaDevice');
let external=0;
export const externalActivity=()=>external>0;
export async function withNativeUi(fn){external++;try{return await fn();}finally{setTimeout(()=>external=Math.max(0,external-1),700);}}
export async function initPlatform(onPause,onBack){if(!native){if(__COSMA_TEST__)return;throw Error('Questa versione di Cosma si apre installando l’APK Android.');}await Device.setSecureScreen({enabled:true});await App.addListener('appStateChange',({isActive})=>{if(!isActive&&!externalActivity())onPause();});await App.addListener('backButton',()=>{if(!externalActivity())onBack();});}
export async function setAppearance(theme){if(!native)return;const dark=theme==='dark'||theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches;await SystemBars.setStyle({style:dark?SystemBarsStyle.Dark:SystemBarsStyle.Light});await Device.setBars({dark});}
export async function secureScreen(enabled){if(native)await Device.setSecureScreen({enabled});}
export async function biometricAvailable(){if(!native)return false;return(await BiometricAuth.checkBiometry()).strongBiometryIsAvailable;}
export async function authenticate(){if(!native)throw Error('La biometria richiede Android.');try{await BiometricAuth.authenticate({reason:'Sblocca il tuo spazio Cosma',cancelTitle:'Usa il PIN',allowDeviceCredential:false,androidTitle:'Sblocca Cosma',androidSubtitle:'Usa l’impronta o la biometria sicura del telefono',androidConfirmationRequired:true,androidBiometryStrength:AndroidBiometryStrength.strong});}catch{throw Error('Autenticazione biometrica annullata o non disponibile. Puoi usare il PIN.');}}
export async function saveBiometricPin(pin){return withNativeUi(async()=>{if(!await biometricAvailable())throw Error('Non è disponibile una biometria sicura. Puoi usare il PIN.');await Device.prepareBiometricKey();await authenticate();await Device.saveBiometricSecret({secret:pin});});}
export async function loadBiometricPin(){return withNativeUi(async()=>{await authenticate();return(await Device.getBiometricSecret()).secret;});}
export async function clearBiometric(){if(native)await Device.clearBiometricSecret();}
export async function hasBiometric(){return native&&(await Device.hasBiometricSecret()).enabled;}
export async function saveBackup(text,name){if(!native){if(__COSMA_TEST__){downloadForTest(text,name);return true;}throw Error('Salvataggio disponibile nell’app Android.');}return withNativeUi(async()=>{const r=await Device.saveDocument({text,name,mime:'application/json'});if(!r.saved)throw Error('Salvataggio annullato: il backup precedente resta invariato.');return true;});}
export async function shareBackup(text,name){if(!native)throw Error('La condivisione richiede Android.');await withNativeUi(async()=>{const r=await Filesystem.writeFile({path:name,data:text,directory:Directory.Cache,encoding:Encoding.UTF8});await Share.share({title:'Backup Cosma',dialogTitle:'Condividi il backup cifrato',files:[r.uri]});});}
export async function pickBackup(){if(!native)throw Error('Apri Cosma su Android per scegliere il backup.');return withNativeUi(async()=>{const r=await Device.openDocument();if(r.cancelled)return null;return r.text;});}
export async function printReport(html){if(native)await withNativeUi(()=>Device.printReport({html}));else if(__COSMA_TEST__)window.print();}
export async function exit(){if(native)await App.exitApp();}
function downloadForTest(text,name){const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
