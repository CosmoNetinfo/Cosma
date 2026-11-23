package info.cosmonet.cosma;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.print.PrintManager;
import android.print.PrintDocumentAdapter;
import android.print.PrintAttributes;
import android.print.PageRange;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import android.view.WindowManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.util.Arrays;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

/** Servizi locali: cifratura Keystore, file scelti dalla persona e schermo protetto.
 * Nessun URL remoto, connessione di rete, password nei log o chiave esportabile. */
@CapacitorPlugin(name="CosmaDevice")
public class CosmaDevicePlugin extends Plugin {
    private static final String DEVICE_KEY="cosma.device.v1", BIO_KEY="cosma.biometry.v1";
    private static final int MAX_DOCUMENT=30_000_000;
    private KeyStore store() throws Exception {KeyStore ks=KeyStore.getInstance("AndroidKeyStore");ks.load(null);return ks;}
    private SecretKey key(String alias,boolean biometric) throws Exception {
        KeyStore ks=store();if(ks.containsAlias(alias))return (SecretKey)ks.getKey(alias,null);
        KeyGenerator gen=KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
        KeyGenParameterSpec.Builder builder=new KeyGenParameterSpec.Builder(alias,KeyProperties.PURPOSE_ENCRYPT|KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).setRandomizedEncryptionRequired(true);
        if(biometric){
            // Finestra breve autorizzata esclusivamente da biometria forte Android.
            // Il PIN dell'app rimane sempre un percorso alternativo indipendente.
            builder.setUserAuthenticationRequired(true).setInvalidatedByBiometricEnrollment(true);
            if(Build.VERSION.SDK_INT>=30)builder.setUserAuthenticationParameters(15,KeyProperties.AUTH_BIOMETRIC_STRONG);
            else builder.setUserAuthenticationValidityDurationSeconds(15);
        }
        gen.init(builder.build());return gen.generateKey();
    }
    private String encrypt(String text,String alias,boolean biometric) throws Exception {
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.ENCRYPT_MODE,key(alias,biometric));
        byte[] encrypted=cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
        JSObject result=new JSObject();result.put("iv",Base64.encodeToString(cipher.getIV(),Base64.NO_WRAP));result.put("body",Base64.encodeToString(encrypted,Base64.NO_WRAP));return result.toString();
    }
    private String decrypt(String data,String alias,boolean biometric) throws Exception {
        JSObject obj=new JSObject(data);byte[] iv=Base64.decode(obj.getString("iv"),Base64.NO_WRAP),body=Base64.decode(obj.getString("body"),Base64.NO_WRAP);
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.DECRYPT_MODE,key(alias,biometric),new GCMParameterSpec(128,iv));return new String(cipher.doFinal(body),StandardCharsets.UTF_8);
    }
    @PluginMethod public void seal(PluginCall call){try{String text=call.getString("text");if(text==null||text.length()>MAX_DOCUMENT)throw new Exception();JSObject out=new JSObject();out.put("data",encrypt(text,DEVICE_KEY,false));call.resolve(out);}catch(Exception e){call.reject("Impossibile cifrare l’archivio sul telefono.");}}
    @PluginMethod public void open(PluginCall call){try{JSObject out=new JSObject();out.put("text",decrypt(call.getString("data"),DEVICE_KEY,false));call.resolve(out);}catch(Exception e){call.reject("Chiave del telefono non disponibile o archivio danneggiato. Conserva il backup per il ripristino.");}}
    @PluginMethod public void prepareBiometricKey(PluginCall call){try{key(BIO_KEY,true);call.resolve();}catch(Exception e){call.reject("Biometria sicura non disponibile: usa il PIN.");}}
    @PluginMethod public void saveBiometricSecret(PluginCall call){try{String secret=call.getString("secret");if(secret==null||secret.length()<8)throw new Exception();getContext().getSharedPreferences("cosma-biometry",0).edit().putString("wrapped",encrypt(secret,BIO_KEY,true)).apply();call.resolve();}catch(Exception e){call.reject("Attivazione biometrica non riuscita. Il PIN resta disponibile.");}}
    @PluginMethod public void getBiometricSecret(PluginCall call){try{String wrapped=getContext().getSharedPreferences("cosma-biometry",0).getString("wrapped",null);if(wrapped==null)throw new Exception();JSObject out=new JSObject();out.put("secret",decrypt(wrapped,BIO_KEY,true));call.resolve(out);}catch(Exception e){call.reject("Sblocco biometrico non riuscito. Inserisci il PIN e, se necessario, riattiva l’impronta.");}}
    @PluginMethod public void hasBiometricSecret(PluginCall call){JSObject out=new JSObject();out.put("enabled",getContext().getSharedPreferences("cosma-biometry",0).contains("wrapped"));call.resolve(out);}
    @PluginMethod public void clearBiometricSecret(PluginCall call){try{getContext().getSharedPreferences("cosma-biometry",0).edit().clear().apply();KeyStore ks=store();if(ks.containsAlias(BIO_KEY))ks.deleteEntry(BIO_KEY);call.resolve();}catch(Exception e){call.reject("Impossibile rimuovere l’associazione biometrica.");}}
    @PluginMethod public void setSecureScreen(PluginCall call){boolean enabled=call.getBoolean("enabled",true);getActivity().runOnUiThread(()->{if(enabled)getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);else getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);getContext().getSharedPreferences("cosma-device",0).edit().putBoolean("secure",enabled).apply();call.resolve();});}
    @PluginMethod public void setBars(PluginCall call){boolean dark=call.getBoolean("dark",false);getActivity().runOnUiThread(()->{int color=Color.parseColor(dark?"#17101f":"#fdf4ff");getActivity().getWindow().setStatusBarColor(color);getActivity().getWindow().setNavigationBarColor(color);getActivity().getWindow().getDecorView().setBackgroundColor(color);call.resolve();});}
    @PluginMethod public void saveDocument(PluginCall call){String text=call.getString("text");if(text==null||text.length()>MAX_DOCUMENT){call.reject("File non valido.");return;}Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT);intent.addCategory(Intent.CATEGORY_OPENABLE);intent.setType("application/json");intent.putExtra(Intent.EXTRA_TITLE,call.getString("name","cosma-backup.json"));startActivityForResult(call,intent,"saveResult");}
    @ActivityCallback private void saveResult(PluginCall call,ActivityResult result){if(call==null)return;JSObject out=new JSObject();if(result.getResultCode()!=Activity.RESULT_OK||result.getData()==null||result.getData().getData()==null){out.put("saved",false);call.resolve(out);return;}try(OutputStream stream=getContext().getContentResolver().openOutputStream(result.getData().getData(),"wt")){if(stream==null)throw new Exception();stream.write(call.getString("text").getBytes(StandardCharsets.UTF_8));stream.flush();out.put("saved",true);call.resolve(out);}catch(Exception e){call.reject("Non è stato possibile salvare il file. Riprova scegliendo una cartella.");}}
    @PluginMethod public void openDocument(PluginCall call){Intent intent=new Intent(Intent.ACTION_OPEN_DOCUMENT);intent.addCategory(Intent.CATEGORY_OPENABLE);intent.setType("*/*");startActivityForResult(call,intent,"openResult");}
    @ActivityCallback private void openResult(PluginCall call,ActivityResult result){if(call==null)return;JSObject out=new JSObject();if(result.getResultCode()!=Activity.RESULT_OK||result.getData()==null||result.getData().getData()==null){out.put("cancelled",true);call.resolve(out);return;}try(InputStream stream=getContext().getContentResolver().openInputStream(result.getData().getData());ByteArrayOutputStream buffer=new ByteArrayOutputStream()){if(stream==null)throw new Exception();byte[] data=new byte[8192];int count;while((count=stream.read(data))!=-1){if(buffer.size()+count>MAX_DOCUMENT)throw new Exception();buffer.write(data,0,count);}out.put("text",buffer.toString(StandardCharsets.UTF_8.name()));call.resolve(out);}catch(Exception e){call.reject("File non leggibile o più grande di 30 MB.");}}
    @PluginMethod public void printReport(PluginCall call){String html=call.getString("html");if(html==null||html.length()>MAX_DOCUMENT){call.reject("Riepilogo non valido.");return;}getActivity().runOnUiThread(()->{WebView view=new WebView(getContext());view.getSettings().setJavaScriptEnabled(false);view.getSettings().setBlockNetworkLoads(true);view.getSettings().setAllowFileAccess(false);view.getSettings().setAllowContentAccess(false);view.setWebViewClient(new WebViewClient(){@Override public void onPageFinished(WebView v,String url){PrintManager pm=(PrintManager)getActivity().getSystemService(Activity.PRINT_SERVICE);PrintDocumentAdapter original=v.createPrintDocumentAdapter("Riepilogo Cosma");PrintDocumentAdapter adapter=new PrintDocumentAdapter(){@Override public void onLayout(PrintAttributes o,PrintAttributes n,CancellationSignal c,LayoutResultCallback r,Bundle e){original.onLayout(o,n,c,r,e);}@Override public void onWrite(PageRange[] p,ParcelFileDescriptor d,CancellationSignal c,WriteResultCallback r){original.onWrite(p,d,c,r);}@Override public void onStart(){original.onStart();}@Override public void onFinish(){original.onFinish();v.destroy();}};pm.print("Riepilogo Cosma",adapter,new PrintAttributes.Builder().build());call.resolve();}});view.loadDataWithBaseURL(null,html,"text/html","UTF-8",null);});}
}
