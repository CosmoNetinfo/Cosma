# Continuare Cosma da qui

## Aggiornamento 25 novembre 2026 · v1.1.0-prova.3

Icona Android corretta: rimosso il bordo viola apparente, più margine per le maschere del launcher, risorse alternative Capacitor sostituite. Avatar originale identico; composizione XML e PNG tecnicamente scalati, senza ritoccare o ridisegnare il personaggio. Anteprima in docs/ICONA-ANTEPRIMA.png, parametri e hash in ICONA-ANDROID.json. Riproduzione: COSMA_BROWSER impostato a Chrome, node scripts/icone-android.mjs. La resa sul telefono Huawei dell’utente richiede una prova reale.

Umore a selezione multipla nel Diario e nel pannello rapido: ogni voce è indipendente, senza esclusioni automatiche. Nuovo elenco umori; il precedente umore singolo viene convertito e resta anche nel campo compatibile umore come prima voce. Un elenco vuoto esplicito non fa riapparire una scelta rimossa. Le risposte di Cosma aggiungono senza cancellare gli altri umori. PDF, backup cifrato, esportazioni JSON/CSV Cosma e importazione conservano le voci; un vecchio Cosma può leggere solo il campo singolo.

103 test Node superati; nuove prove su migrazione, rimozione, esportazioni e backup. Test dell’interfaccia con due umori, riapertura e rimozione indipendente. Formule scientifiche conservate byte per byte dalla base; domain.js cambia solo nella normalizzazione degli umori. Firma, secrets, cifratura, permessi e notifiche invariati. Le risorse Android sono state compilate localmente; l’assemblaggio debug locale è stato bloccato dall’accesso al file di blocco della chiave debug del computer, distinta dalla firma definitiva. La compilazione ufficiale e i due test nativi sono eseguiti da GitHub prima della consegna.


## Aggiornamento precedente · v1.1.0-prova.2

Aggiunta la durata indicativa dell’ultima mestruazione senza fine: valore iniziale cinque giorni, modificabile a sei o ad altra durata 1–15 nelle preferenze o nel modulo. Dal primo giorno, i giorni successivi sono tratteggiati rosa in mese/anno e settimana. Non diventano sanguinamento confermato con il passare del tempo e non si sposta il termine perché manca la fine. Il pulsante **Fine mestruazioni**, visibile su Oggi e Calendario, apre l’ultimo giorno reale precompilato a oggi ma correggibile: il salvataggio sostituisce tutta la durata tratteggiata. Date di fine già presenti rispettate. Il metodo e la fonte NHS S18 sono consultabili.

Fertilità: l’utente ha confermato segnali e spiegazioni senza giorno personale certo. Nuova scheda in Salute → I tuoi segnali con informazioni ASRM 2022 ricontrollate (S19), limiti NICE, accesso al diario e alle categorie facoltative. Nessuna data fertile ricavata dal primo giorno, né previsione retrospettiva o conferma clinica dai segnali.

99 test Node e prove dell’interfaccia locali superati, inclusi durata inclusiva, cambio mese/anno/bisestile, distinzione stima/registrazioni, nessun avanzamento automatico, chiusura retrodatata, rimozione tratteggi e riapertura. domain.js, protezioni native, workflow e firma non modificati. La nuova visualizzazione è separata in menstrual-days.js; non altera le formule della prossima mestruazione. I due test nativi devono passare nel workflow prima della firma. Restano le prove fisiche della checklist e i limiti precedenti.


Stato: **v1.1.0-prova.3**, completamento funzionale del delta v1.1 e revisione grafica richiesta. Repository https://github.com/CosmoNetinfo/Cosma, ramo main. Leggi README.md, docs/NON-VERIFICATO.md, FONTI.md, messaggi-cosma.md e docs/BRIEF-COSMA-v1.1-DELTA.md; controlla prima eventuali commit e Release successivi.

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

103 test Node e controlli browser superati nei due temi a 360/390/430 px, undici pagine secondarie, altezze ridotte e conteggi lunghi. Il browser usa un archivio sostitutivo. Il workflow deve superare anche i due test nativi API35 prima di firmare. Il test della conferma Android usa il vero pulsante positivo tramite UiAutomation, evitando l’attesa instabile del focus Espresso; nessun aggiramento della conferma nell’app.

Per l’esito effettivo dell’APK consulta la Release del tag, VERIFICA-APK.json e risultati XML nel pacchetto completo. Chiave, appId, versione crescente, assenza INTERNET, allowBackup e immagini vanno verificati sull’APK scaricato. Non chiamare riuscita una compilazione rossa; non riutilizzare tag esistenti.

## Riprendere il lavoro

Su un nuovo PC clona il repository, esegui npm ci e npm test. Per il browser npm run test:ui (COSMA_BROWSER può indicare Chrome). npm run android:sync conserva il progetto nativo, da non rigenerare; compilazione locale con JDK21 e SDK36. La compilazione ufficiale avviene su GitHub con la chiave esistente. Un APK debug locale ha firma diversa.

Non restano schermate promesse vuote del delta. Prossimo lavoro: raccogliere il riscontro dell’utente sul telefono e correggere problemi concreti con test mirati. Restano prove fisiche di notifiche/riavvio, biometria, file/PDF, backup, accessibilità e aggiornamento mantenendo i dati; export reali di altre app; revisione clinica e di sicurezza indipendenti; scelta licenza e verifica F-Droid. Checklist in PROVA-SUL-TELEFONO.md, limiti in NON-VERIFICATO.md. Non caricare dati sanitari reali in chat o nel repository.

Storico delle piccole fasi: AVANZAMENTO-v1.1.md e tag prova.4–11. Codice canonico su GitHub; pagina di continuità dell’account: https://chatgpt.com/space/page_6b04222afab48191bfb142279f50f342.
