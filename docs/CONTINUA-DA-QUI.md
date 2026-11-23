# Continuare Cosma da un altro computer

## Aggiornamento v1.1, fase 1

Nuovo tag di prova: **v1.0.0-prova.4**. Aggiunte soltanto tinte piatte su Oggi, senza classificare fasi ormonali: rosato per date di mestruazioni realmente registrate, lilla/azzurro tenue negli altri giorni e neutro con dati assenti o fascia descrittiva superata. Contrasto verificato in chiaro/scuro, 57 test Node e controlli dell’interfaccia aggiornati. La compilazione del tag verifica nuovamente anche l’avvio Android prima di distribuire l’APK; l’esito effettivo si consulta nella Release. Non cambiano chiave, secrets, privacy, calcoli, immagini, importazione o tour.

Prima di proseguire leggi **docs/AVANZAMENTO-v1.1.md** e **docs/BRIEF-COSMA-v1.1-DELTA.md**. La prossima fase è la striscia della settimana su Oggi. Non rifare le parti già completate. Il riepilogo della prova.3 sotto rimane come riferimento verificato della base.

Il codice aggiornato è nel repository [CosmoNetinfo/Cosma](https://github.com/CosmoNetinfo/Cosma). Non serve recuperare una cartella con percorso V: dal vecchio PC: da un altro computer si può scaricare o clonare il repository e lavorare su quello. Il repository è il riferimento per il codice; lo spazio Cosma in ChatGPT raccoglie il riepilogo e i collegamenti. Una chat nuova deve leggere questi riferimenti per recuperare il contesto.

## Stato verificato il 23 novembre 2026

Versione **1.0.0-prova.3**, codice Android **10010**, appId `info.cosmonet.cosma`. [Release](https://github.com/CosmoNetinfo/Cosma/releases/tag/v1.0.0-prova.3), [APK](https://github.com/CosmoNetinfo/Cosma/releases/download/v1.0.0-prova.3/Cosma.apk), [workflow riuscito](https://github.com/CosmoNetinfo/Cosma/actions/runs/45140763437). Prima di modificare controllare se ci sono commit o versioni successivi.

- 53 test Node, test dell’interfaccia e due test nativi su emulatore Android API35 superati. Risultati e verifica APK in questa cartella.
- Impostazioni dall’ingranaggio; modifica/eliminazione degli inizi con ricalcolo di giorno, statistiche, stima e promemoria; screenshot consentiti solo per scelta dell’utente, schermata PIN sempre protetta.
- Cosma intera su Oggi, volto altrove, fumetti con conferma per l’umore, tre livelli di presenza e tour di otto passi. Quattro nuove pose fornite e cinque immagini precedenti mantenute identiche.
- Importazione locale CSV/JSON con mappatura di campi/valori, controlli, provenienza, Unisci/Sostituisci, copia protetta e annullamento persistente. Esportazione aperta JSON/CSV, backup cifrato e PDF.
- Firma definitiva invariata rispetto a prova.2, INTERNET assente, allowBackup=false. Aggiornare installando sopra Cosma, senza disinstallare.

## Documenti da leggere prima di intervenire

README.md; FONTI.md; messaggi-cosma.md; VALORI-DESIGN.md; docs/IMPORTAZIONE.md; docs/FORMATO-DATI.md; docs/NON-VERIFICATO.md; docs/PROVA-SUL-TELEFONO.md. Il codice è in src/, il progetto Android in android/, i controlli in tests/ e il workflow in .github/workflows/android.yml.

## Decisioni da conservare

Solo Android con Capacitor e HTML/CSS/JavaScript, italiano, dati sul telefono. Non reintrodurre PWA, iPhone, server, AI online o calendario esterno. Stile minimale approvato; presenza di Cosma secondo la sezione 13 del brief più recente. Non ridisegnare o ritoccare le immagini.

Nessuna conferma clinica dell’ovulazione da temperatura, muco o LH. Nessun −14 fisso e nessuna finestra fertile individuale ricavata dal calendario. La convenzione biologica relativa è −5/0, senza localizzarla automaticamente. Le prossime mestruazioni sono una proiezione descrittiva dal minimo/massimo degli ultimi sei intervalli completi non esclusi, almeno tre intervalli; nessuna percentuale o confidenza clinica. Ogni stima ha dati e fonti nel metodo. Non inventare citazioni o schemi delle app concorrenti.

Il repository ha già i quattro secrets di firma. **Non creare una nuova keystore e non sostituire i secrets**: il nuovo PC può usare GitHub Actions senza possedere la chiave localmente. Non caricare chiavi, password o dati sanitari reali nel repository o nella pagina ChatGPT. La copia privata della chiave resta da conservare separatamente dal progetto.

## Cosa rimane da provare

Un telefono fisico: notifiche ad app chiusa/riavvio, biometria, selettori file, backup/ripristino, importazione, TalkBack, tastiere e aggiornamento conservando i dati. Nessun export personale reale Clue/Flo/Natural Cycles/Drip verificato: le fixture sono sintetiche. Health Connect, ZIP, PDF in ingresso e TXT libero non sono implementati. Nessuna validazione clinica indipendente delle previsioni.

## Testo per riprendere in una nuova chat

> Continua il progetto Cosma dal repository https://github.com/CosmoNetinfo/Cosma. Leggi prima docs/CONTINUA-DA-QUI.md e controlla lo stato attuale del codice e delle Release. Rispondi sempre in italiano. Conserva le decisioni scientifiche, le immagini originali e la firma Android già configurata. Dimmi cosa è già pronto e prosegui sulle modifiche che ti chiederò, senza rifare le domande già risolte.
