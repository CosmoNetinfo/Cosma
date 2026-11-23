package info.cosmonet.cosma;

import static org.junit.Assert.*;
import android.os.SystemClock;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.view.WindowManager;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.atomic.AtomicBoolean;
import org.json.JSONTokener;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Avvio reale: WebView, bridge Capacitor, SQLite e cifratura Android Keystore. */
@RunWith(AndroidJUnit4.class)
public class DatabaseStartupTest {
    private void awaitSecure(ActivityScenario<MainActivity> scenario,boolean expected) throws Exception {
        long end=SystemClock.elapsedRealtime()+5000;
        while(SystemClock.elapsedRealtime()<end){
            AtomicBoolean secure=new AtomicBoolean();
            scenario.onActivity(a->secure.set((a.getWindow().getAttributes().flags & WindowManager.LayoutParams.FLAG_SECURE)!=0));
            if(secure.get()==expected)return;
            SystemClock.sleep(100);
        }
        fail("Protezione screenshot diversa dalla preferenza scelta");
    }
    private String js(ActivityScenario<MainActivity> scenario,String expression) throws Exception {
        CountDownLatch latch=new CountDownLatch(1);
        AtomicReference<String> value=new AtomicReference<>("");
        scenario.onActivity(activity->activity.getBridge().getWebView().evaluateJavascript(expression,result->{
            try {Object decoded=new JSONTokener(result).nextValue();value.set(String.valueOf(decoded));}
            catch(Exception e){value.set(result);}
            latch.countDown();
        }));
        assertTrue("La WebView non ha risposto",latch.await(10,TimeUnit.SECONDS));
        return value.get();
    }
    private void awaitBody(ActivityScenario<MainActivity> scenario,String expected) throws Exception {
        long end=SystemClock.elapsedRealtime()+45000;String body="";
        while(SystemClock.elapsedRealtime()<end){
            body=js(scenario,"document.body ? document.body.innerText : ''");
            if(body.contains(expected))return;
            assertFalse("Errore avvio nativo: "+body,body.contains("Non riesco ad aprire l’archivio"));
            SystemClock.sleep(250);
        }
        fail("Testo atteso: "+expected+". Schermata effettiva: "+body);
    }
    @Test public void firstStartSaveAndReloadUseNativeDatabase() throws Exception {
        // Stessa situazione segnalata: vault esiste, vault_parts manca.
        // Si rifiuta di modificare un archivio preesistente: solo emulatore vuoto.
        Context context=InstrumentationRegistry.getInstrumentation().getTargetContext();
        File file=context.getDatabasePath("cosmaSQLite.db");
        assertFalse("Questo test richiede un dispositivo di prova senza dati Cosma",file.exists());
        file.getParentFile().mkdirs();
        try(SQLiteDatabase db=SQLiteDatabase.openOrCreateDatabase(file,null)){
            db.execSQL("CREATE TABLE vault (id INTEGER PRIMARY KEY CHECK (id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL)");
            db.setVersion(1);
        }
        try(ActivityScenario<MainActivity> scenario=ActivityScenario.launch(MainActivity.class)){
            awaitBody(scenario,"Ciao, sono Cosma.");
            js(scenario,"document.querySelector('[data-action=\"skip-onboarding\"]').click()");
            awaitBody(scenario,"Iniziamo da una data.");
            js(scenario,"document.querySelector('[data-action=\"cosma-tour-pause\"]')?.click()");
            js(scenario,"document.querySelector('[data-action=\"new-period\"]').click()");
            awaitBody(scenario,"Primo giorno");
            js(scenario,"const d=new Date();d.setDate(d.getDate()-2);document.querySelector('#start').value=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');document.querySelector('form[data-form=\"period\"]').requestSubmit()");
            awaitBody(scenario,"Ciclo salvato.");
            js(scenario,"document.querySelector('[data-tab=\"diario\"]').click()");
            awaitBody(scenario,"Note facoltative");
            js(scenario,"const note=document.querySelector('#note');note.value='Prova nativa senza dati reali';note.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('form[data-form=\"diary\"]').requestSubmit()");
            awaitBody(scenario,"Diario salvato.");
            scenario.recreate();
            awaitBody(scenario,"Prossime mestruazioni");
            js(scenario,"document.querySelector('[data-tab=\"diario\"]').click()");
            awaitBody(scenario,"Note facoltative");
            assertEquals("Prova nativa senza dati reali",js(scenario,"document.querySelector('#note').value"));
            js(scenario,"document.querySelector('#header [data-action=\"settings\"]').click()");
            awaitBody(scenario,"Screenshot e privacy");
            assertEquals("avatar.png",js(scenario,"document.querySelector('#cosma-stage img').getAttribute('src')"));
            awaitSecure(scenario,true);
            js(scenario,"document.querySelector('main [data-action=\"privacy\"]').click()");
            awaitBody(scenario,"Consenti screenshot e anteprima");
            js(scenario,"document.querySelector('[name=\"allowScreenshots\"]').checked=true;document.querySelector('form[data-form=\"privacy\"]').requestSubmit()");
            awaitBody(scenario,"Screenshot consentiti");
            awaitSecure(scenario,false);
            scenario.recreate();
            awaitBody(scenario,"Prossime mestruazioni");
            awaitSecure(scenario,false);
            assertEquals("Cosma a figura intera",js(scenario,"document.querySelector('#cosma-stage img').alt"));
            js(scenario,"document.querySelector('.cycle-start-link').click()");
            awaitBody(scenario,"Modifica inizio ciclo");
            js(scenario,"const changed=new Date();changed.setDate(changed.getDate()-4);document.querySelector('#start').value=changed.getFullYear()+'-'+String(changed.getMonth()+1).padStart(2,'0')+'-'+String(changed.getDate()).padStart(2,'0');document.querySelector('form[data-form=\"period\"]').requestSubmit()");
            awaitBody(scenario,"Ciclo salvato.");
            assertEquals("5",js(scenario,"document.querySelector('.ring-label strong').innerText"));
            js(scenario,"document.querySelector('.cycle-start-link').click()");
            awaitBody(scenario,"Elimina questo inizio ciclo");
            js(scenario,"setTimeout(()=>document.querySelector('dialog [data-action=\"delete-period\"]').click(),0);true");
            androidx.test.espresso.Espresso.onView(androidx.test.espresso.matcher.ViewMatchers.withId(android.R.id.button1)).perform(androidx.test.espresso.action.ViewActions.click());
            awaitBody(scenario,"Iniziamo da una data.");
            js(scenario,"document.querySelector('[data-tab=\"diario\"]').click()");
            awaitBody(scenario,"Note facoltative");
            assertEquals("Prova nativa senza dati reali",js(scenario,"document.querySelector('#note').value"));
            js(scenario,"document.querySelector('#header [data-action=\"settings\"]').click()");
            awaitBody(scenario,"Screenshot e privacy");
            js(scenario,"document.querySelector('main [data-action=\"security\"]').click()");
            awaitBody(scenario,"Nuovo PIN o password");
            js(scenario,"document.querySelector('[data-form=\"enable-pin\"] #password').value='12345678';document.querySelector('[data-form=\"enable-pin\"] #repeat').value='12345678';document.querySelector('[data-form=\"enable-pin\"]').requestSubmit()");
            awaitBody(scenario,"Blocca subito");
            js(scenario,"document.querySelector('main [data-action=\"lock\"]').click()");
            awaitBody(scenario,"Il tuo spazio è protetto.");
            awaitSecure(scenario,true);
            js(scenario,"document.querySelector('[data-form=\"unlock\"] #password').value='12345678';document.querySelector('[data-form=\"unlock\"]').requestSubmit()");
            awaitBody(scenario,"Blocca subito");
            awaitSecure(scenario,false);
        }
    }
}
