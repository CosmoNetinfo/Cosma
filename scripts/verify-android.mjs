import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const manifest=read('android/app/src/main/AndroidManifest.xml');
assert.match(manifest,/allowBackup="false"/);assert.match(manifest,/dataExtractionRules=/);assert.match(manifest,/android.permission.INTERNET" tools:node="remove"/);
for(const p of ['xml/backup_rules.xml','xml/data_extraction_rules.xml']){const x=read('android/app/src/main/res/'+p);for(const d of ['root','file','database','sharedpref','external'])assert.ok(x.includes(`domain="${d}" path="."`));}
const config=read('capacitor.config.ts');assert.match(config,/info.cosmonet.cosma/);assert.match(config,/webContentsDebuggingEnabled:\s*false/);
const db=read('src/database.js');assert.match(db,/Device.seal/);assert.match(db,/beginTransaction/);assert.match(db,/commitTransaction/);
const java=read('android/app/src/main/java/info/cosmonet/cosma/CosmaDevicePlugin.java');for(const text of ['AndroidKeyStore','AES/GCM/NoPadding','setUserAuthenticationRequired','ACTION_CREATE_DOCUMENT','FLAG_SECURE'])assert.ok(java.includes(text),text);
const notifications=readFileSync(new URL('../node_modules/@capacitor/local-notifications/android/src/main/AndroidManifest.xml',import.meta.url),'utf8');assert.match(notifications,/BOOT_COMPLETED/);assert.match(notifications,/LocalNotificationRestoreReceiver/);
const app=read('src/app.js');assert.ok(!/export-calendar|serviceWorker|calendarFile|localStorage/.test(app));
assert.ok(!/https?:\/\//.test(read('src/index.html')));assert.match(read('src/index.html'),/connect-src 'none'/);
const gradle=read('android/app/build.gradle');for(const name of ['COSMA_VERSION_CODE','COSMA_VERSION_NAME','COSMA_KEYSTORE_PATH','ANDROID_KEYSTORE_PASSWORD','ANDROID_KEY_ALIAS','ANDROID_KEY_PASSWORD'])assert.ok(gradle.includes(name));
const merged='android/app/build/intermediates/merged_manifests/debug/processDebugManifest/AndroidManifest.xml';if(existsSync(new URL('../'+merged,import.meta.url))){const text=read(merged);assert.ok(!text.includes('android.permission.INTERNET'));assert.match(text,/allowBackup="false"/);console.log('Manifest unito: INTERNET assente; backup automatico disattivato.');}
console.log('Controlli statici Android superati. Non sostituiscono una prova su telefono.');
