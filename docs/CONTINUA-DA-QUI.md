# Continuare Cosma da un altro computer

## Revisione grafica e nuovo Diario, prova.8

L’utente ha chiesto una resa più curata, parole fuori dall’anello e un Diario organizzato come le immagini di riferimento Flo. Modifiche: dentro l’anello rimane solo il numero, con “Giorno del ciclo” in una riga esterna; tipografia e spazi comuni sono rivisti; il Diario ha fondo neutro, ricerca locale, quattro scorciatoie illustrate, categorie in schede bianche e pulsanti pastello con icone SVG locali. Le quattro pose di Cosma restano originali e intere. Non sono stati copiati gli asset di Flo. La Home presenta prima stima e azione principale, poi la settimana.

Ricerca e scorciatoie usano le categorie già presenti; i valori salvati, le date, il formato dei dati e i calcoli sono conservati. Cercare una voce non elimina i valori nascosti al salvataggio. Il calendario usa già il primo giorno registrato come riferimento e ricalcola la fascia descrittiva quando lo si modifica; un nuovo controllo dell’interfaccia verifica gli estremi dopo una correzione. Non vengono inventati giorni futuri di flusso o localizzazioni fertili.

Verifiche locali: 69 test Node, controlli dell’interfaccia aggiornati, ricerca e persistenza anche dei campi facoltativi, scritte separate nei percorsi provati, due temi e schermi da 360 a 430 px, compilazione dei test Android riuscita. La prova.7 non ha prodotto un APK: il test nativo aspettava ancora l’immagine del volto. Nella prova.8 quel controllo verifica una delle quattro pose originali, descrizione accessibile e immagine caricata; gli altri controlli nativi restano presenti. Per i risultati effettivi sull’emulatore e la firma consultare la Release v1.0.0-prova.8.

Restano a fasi successive: pannelli rapidi dal basso, ulteriori categorie dei riferimenti (rapporti facoltativi, digestione, attività e nuovi sintomi), vista annuale e calendario su più mesi, gesto laterale, organizzazione dei consigli, onboarding a passi e verifica F-Droid. La nuova grafica non certifica la compatibilità su ogni telefono o con ogni impostazione dei caratteri Android.


## Revisione degli spazi e delle pose, prova.7

Richiesta successiva dell’utente: eliminare i tagli, rendere la Home meno spoglia e dare a Cosma più pose in ogni pagina. La prova.7 conserva le funzioni della fase 2 e sostituisce la fascia fissa dell’assistente con una presenza nel contenuto: intera accanto all’anello nella Home, piccola e intera accanto al titolo nelle altre pagine, fumetti nel contenuto scorrevole. Il tour mantiene uno spazio riservato ai suoi controlli. Le quattro immagini restano identiche; “Cambia posa” nel menu cambia l’immagine solo nella sessione. Le pose contestuali non costituiscono diagnosi o nuove deduzioni. Restano frequenza, orari, modalità di presenza e catalogo esistenti.

Verifiche locali: 65 test Node e controlli dell’interfaccia nei due temi a 360/390/430 px, apertura completa della scheda della stima, titolo visibile dopo il tour, sette comandi della settimana interamente nel viewport e cambio posa manuale nel Diario. La prova Android e la firma dell’APK effettivo si consultano nella Release v1.0.0-prova.7. Nessuna prova su telefono reale è stata effettuata. Le azioni rapide e il pannello di registrazione restano il prossimo passo.


## Aggiornamento v1.1, fase 2

Nuovo tag di prova: **v1.0.0-prova.6**. In Oggi compare la striscia di oggi e dei prossimi sei giorni: pieno per mestruazioni registrate, tratteggiato per la fascia descrittiva dell’inizio. Un tocco apre il Calendario nel giorno e mese corretti; le date future restano di sola consultazione. Nessuna localizzazione di fertilità o nuova formula. La Home vuota e le tinte della fase 1 sono conservate. Verifiche locali: 62 test Node e controlli dell’interfaccia aggiornati; l’esito Android e firma si consulta nella Release del tag.

La prova.5 è un riferimento intermedio: dopo un errore intermittente, la ripetizione del test Android è riuscita. Nella prova.6 è stato corretto solo il selettore della finestra nel test nativo, conservando tutti i controlli e lo stesso codice applicativo della fase 2. Non ricreare né spostare i tag esistenti.

La prossima fase comprende **pulsanti di azione rapida e pannello di registrazione**, riusando il diario esistente. Leggi docs/AVANZAMENTO-v1.1.md per distinguere ciò che è già pronto da ciò che manca. I riepiloghi sotto sono riferimenti storici delle consegne precedenti.

## Aggiornamento v1.1, fase 1

Nuovo tag di prova: **v1.0.0-prova.4**. Aggiunte soltanto tinte piatte su Oggi, senza classificare fasi ormonali: rosato per date di mestruazioni realmente registrate, lilla/azzurro tenue negli altri giorni e neutro con dati assenti o fascia descrittiva superata. Contrasto verificato in chiaro/scuro, 57 test Node e controlli dell’interfaccia aggiornati. La compilazione del tag verifica nuovamente anche l’avvio Android prima di distribuire l’APK; l’esito effettivo si consulta nella Release. Non cambiano chiave, secrets, privacy, calcoli, immagini, importazione o tour.

Prima di proseguire leggi **docs/AVANZAMENTO-v1.1.md** e **docs/BRIEF-COSMA-v1.1-DELTA.md**. La striscia della settimana è stata poi aggiunta nella fase 2. Non rifare le parti già completate. Il riepilogo della prova.3 sotto rimane come riferimento verificato della base.

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
