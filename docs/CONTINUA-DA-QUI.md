# Continuare Cosma da qui

Stato: **v1.1.0-prova.1**, completamento funzionale del delta v1.1 e revisione grafica richiesta. Repository https://github.com/CosmoNetinfo/Cosma, ramo main. Leggi README.md, docs/NON-VERIFICATO.md, FONTI.md, messaggi-cosma.md e docs/BRIEF-COSMA-v1.1-DELTA.md; controlla prima eventuali commit e Release successivi.

## Già fatto, da conservare

- Android Capacitor, appId info.cosmonet.cosma, firma definitiva e quattro secrets già configurati. **Mai rigenerare chiave, cambiare secrets o disinstallare per aggiornare.** Non leggere né pubblicare chiavi private.
- Privacy invariata: INTERNET assente, allowBackup=false, esclusioni dei backup, SQLite/Keystore, PIN/biometria, backup manuale cifrato, PDF ed esportazioni.
- Formule invariate dalla base: primo giorno reale, fascia minimo/massimo ultimi sei intervalli non esclusi, almeno tre intervalli, metodo e fonti; niente meno 14, niente conferma ovulazione né finestra fertile individuale dal calendario. FORMULE-CONSERVATE.json confronta la parte scientifica, non l’intero file domain.js: cataloghi e normalizzazione dei nuovi dati sono stati estesi.
- Grafica chiaro/scuro: numero solo nell’anello e didascalia esterna, dimensione adattiva, Cosma accanto, colori piatti, settimana e tre azioni rapide. Diario ricostruito con ricerca, schede e pulsanti pastello illustrati. Calendario Mese/Anno, frecce e gesto laterale; non si reiterano stime per tutti i mesi futuri.
- Pannelli rapidi: scelte salvate al tocco, nota esplicita. Nuove categorie, rapporti/desiderio spenti inizialmente e consenso separato nell’importazione. Valori nascosti conservati.
- Cosma locale: tocco cambia posa e apre messaggio; tre modalità, limiti e pausa notturna; tour di otto passi. Nove immagini originali identiche. L’utente ha successivamente autorizzato sette nuove pose di sintomi: file separati, master e prompt in design/mascotte-sintomi. Non sostituire gli originali.
- 29 letture con fonti locali e argomenti, senza dedurre la fase personale. S17 ISSalute verificata per definizioni qualitative.
- Primo avvio a sei passi: Indietro, Salta sempre, importazione facoltativa, conclusione. setupPending permette di completare il percorso dopo importazione e riapertura senza perdere dati.
- Importazione con mappatura, anteprima, qualità, copia di sicurezza e annullamento; nessun export personale commerciale reale provato.
- Licenze locali e audit F-Droid documentato: licenza del progetto ancora al titolare, nessun invio o promessa di compatibilità certificata.

## Verifiche e distribuzione

92 test Node e controlli browser superati nei due temi a 360/390/430 px, undici pagine secondarie, altezze ridotte e conteggi lunghi. Il browser usa un archivio sostitutivo. Il workflow deve superare anche i due test nativi API35 prima di firmare. Il test della conferma Android usa il vero pulsante positivo tramite UiAutomation, evitando l’attesa instabile del focus Espresso; nessun aggiramento della conferma nell’app.

Per l’esito effettivo dell’APK consulta la Release del tag, VERIFICA-APK.json e risultati XML nel pacchetto completo. Chiave, appId, versione crescente, assenza INTERNET, allowBackup e immagini vanno verificati sull’APK scaricato. Non chiamare riuscita una compilazione rossa; non riutilizzare tag esistenti.

## Riprendere il lavoro

Su un nuovo PC clona il repository, esegui npm ci e npm test. Per il browser npm run test:ui (COSMA_BROWSER può indicare Chrome). npm run android:sync conserva il progetto nativo, da non rigenerare; compilazione locale con JDK21 e SDK36. La compilazione ufficiale avviene su GitHub con la chiave esistente. Un APK debug locale ha firma diversa.

Non restano schermate promesse vuote del delta. Prossimo lavoro: raccogliere il riscontro dell’utente sul telefono e correggere problemi concreti con test mirati. Restano prove fisiche di notifiche/riavvio, biometria, file/PDF, backup, accessibilità e aggiornamento mantenendo i dati; export reali di altre app; revisione clinica e di sicurezza indipendenti; scelta licenza e verifica F-Droid. Checklist in PROVA-SUL-TELEFONO.md, limiti in NON-VERIFICATO.md. Non caricare dati sanitari reali in chat o nel repository.

Storico delle piccole fasi: AVANZAMENTO-v1.1.md e tag prova.4–11. Codice canonico su GitHub; pagina di continuità dell’account: https://chatgpt.com/space/page_6b04222afab48191bfb142279f50f342.
