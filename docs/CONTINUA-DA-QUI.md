# Continuare Cosma da un altro computer

## Funzioni del delta completate, prova.11

Completati consigli, primo avvio e verifica F-Droid. Le 29 letture hanno fonti locali e filtri per argomento, comprese schede generali sulle fasi; non identificano la fase personale. Le fonti del primo giorno includono anche ISSalute, verificata alla fonte. Il primo avvio ha sei passi, progressione, Indietro, Salta sempre accessibile e conclusione È tutto pronto. Se si importa durante il primo avvio, i dati si conservano subito e il percorso conclusivo riprende anche dopo riapertura. Il tour precedente rimane saltabile e ripetibile.

Nel calendario sono espliciti primo giorno usato e intervallo descrittivo; una fascia passata non viene spostata. Le parole sono fuori dall’anello e la dimensione del numero si adatta ai conteggi lunghi. Chiave, secrets, cifratura, permessi e formule sono conservati.

92 test Node e controlli dell’interfaccia locali superati, inclusi percorsi di primo avvio completi con e senza importazione, fonti, licenze e conteggi lunghi. La compilazione del tag ripete anche i due test nativi prima di firmare. Rimangono prove su telefono reale e validazioni esterne, non funzioni software promesse ma lasciate vuote.

F-Droid: esame delle dipendenze completato in docs/FDROID.md; dieci componenti diretti MIT, inventario npm e 78 coordinate Android con licenze POM dove disponibili. Nessuna compatibilità certificata né invio: licenza del progetto e delle immagini da definire dal titolare, binari nativi e riproducibilità da verificare sulla loro infrastruttura. La Release GitHub di prova non è bloccata da questo obiettivo facoltativo.

La prossima consegna è la Release complessiva v1.1.0-prova.1, con APK e unico ZIP completo. I riepiloghi sotto sono lo storico delle fasi.


## Fase 5–6 e vista annuale, prova.10

Toccando Cosma si cambia posa e si apre un messaggio contestuale del catalogo locale; dal fumetto, Opzioni apre i controlli della presenza e del tour. I messaggi automatici conservano limiti, pausa notturna e modalità Silenziosa. Quelli richiesti con un tocco non attribuiscono fasi personali né modificano registrazioni.

Il Calendario ha Mese/Anno, dodici mesi consultabili nell’anno e un gesto laterale per cambiare mese o anno, oltre alle frecce. Toccare un mese apre la vista dettagliata. Nella vista annuale ogni mese è un unico comando ampio: i numeri piccoli non sono pulsanti separati. Sono riportate soltanto registrazioni e la fascia del prossimo inizio già calcolata, senza reiterare una previsione per i mesi futuri o localizzare fertilità. La vista di dettaglio continua a ricalcolare dal primo giorno registrato.

81 test Node e verifiche dell’interfaccia locali superati: mesi bisestili e date civili, direzione del gesto, distinzione dallo scorrimento verticale, dodici mesi, apertura e cambio anno, tocco della mascotte. I test dell’interfaccia usano una data iniziale fissa con orologio che avanza, per non dipendere dal giorno di esecuzione; nell’app reale l’orologio non è cambiato. Prove reali di touch, TalkBack e caratteri grandi rimangono nella checklist. Le funzioni scientifiche e la firma sono conservate.

Restano per la Release complessiva: consigli organizzati, primo avvio a passi e verifica F-Droid, seguiti dalle verifiche finali dell’APK.


## Fase 3–4 e icone richieste, prova.9

Completati i tre pulsanti tondi su Oggi e il pannello dal basso: le selezioni di flusso, umore e sintomi si salvano al tocco; le note hanno il loro comando di salvataggio. Il Diario ha categorie e pulsanti illustrati sul modello dei riferimenti forniti. Le figure umane sono sostituite da sette nuove varianti di Cosma, generate su richiesta esplicita dell’utente, conservando intatte le nove immagini originali. Master e prompt sono in design/mascotte-sintomi; icone a 160/320 px in src/; provenienza e hash in docs/POSE-SINTOMI.json.

Aggiunte registrazioni facoltative di attività e contesto, nuove etichette di sintomi e umore, perdite vaginali e rapporti/desiderio. Questi ultimi sono spenti all’inizio, attivabili nelle categorie e assenti dai pulsanti di base: compaiono soltanto dopo la scelta esplicita. L’importazione aperta Cosma richiede un consenso separato per includerli, mentre il backup cifrato conserva l’intero archivio. Nessuna etichetta è una diagnosi o una scala validata. La ricerca non cancella i valori temporaneamente nascosti. Vecchi valori e nuove categorie convivono; JSON/CSV mantengono le registrazioni.

76 test Node e controlli dell’interfaccia locali superati, incluse nuove prove del pannello, consenso, categorie e risoluzioni delle immagini. I calcoli da analysis fino a healthNotices sono identici alla prova.8, verificati in FORMULE-CONSERVATE.json. Le modifiche a domain.js riguardano solo cataloghi e normalizzazione delle registrazioni. Chiave, secrets, plugin, permessi, cifratura e notifiche non sono modificati.

Prossime parti da completare prima della Release complessiva richiesta: tocco diretto su Cosma, calendario a scorrimento e vista annuale, consigli organizzati, primo avvio a passi e verifica F-Droid. Restano necessarie le prove fisiche descritte nella checklist.


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
