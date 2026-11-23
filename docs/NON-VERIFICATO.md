# Limiti e verifiche mancanti

## Revisione degli spazi e delle pose, prova.7

Richiesta successiva dell’utente: eliminare i tagli, rendere la Home meno spoglia e dare a Cosma più pose in ogni pagina. La prova.7 conserva le funzioni della fase 2 e sostituisce la fascia fissa dell’assistente con una presenza nel contenuto: intera accanto all’anello nella Home, piccola e intera accanto al titolo nelle altre pagine, fumetti nel contenuto scorrevole. Il tour mantiene uno spazio riservato ai suoi controlli. Le quattro immagini restano identiche; “Cambia posa” nel menu cambia l’immagine solo nella sessione. Le pose contestuali non costituiscono diagnosi o nuove deduzioni. Restano frequenza, orari, modalità di presenza e catalogo esistenti.

Verifiche locali: 65 test Node e controlli dell’interfaccia nei due temi a 360/390/430 px, apertura completa della scheda della stima, titolo visibile dopo il tour, sette comandi della settimana interamente nel viewport e cambio posa manuale nel Diario. La prova Android e la firma dell’APK effettivo si consultano nella Release v1.0.0-prova.7. Nessuna prova su telefono reale è stata effettuata. Le azioni rapide e il pannello di registrazione restano il prossimo passo.


## Delta v1.1, fase 2

La prova.6 aggiunge la settimana su Oggi usando le stesse registrazioni e la stessa fascia descrittiva del calendario. Non prevede la durata del prossimo sanguinamento e non individua giorni fertili. I giorni futuri non accettano registrazioni anticipate. Verificati con dati fittizi cambi di data, stati della fascia, navigazione e dimensioni dei pulsanti nei due temi; scorrimento e lettura TalkBack su telefono fisico richiedono ancora prova. Con nessun ciclo la Home vuota resta invariata. Azioni rapide, nuove interazioni con Cosma, gesto nel calendario, consigli, onboarding a passi e verifica F-Droid restano fasi successive. Le limitazioni della fase 1 e della base restano valide; nessuna nuova fonte clinica o esportazione reale è stata validata.

## Delta v1.1, fase 1

La prova.4 aggiunge soltanto tinte piatte su Oggi. Non certificano una fase ormonale o fertilità e non sono una misura clinica: leggono esclusivamente registrazioni e fascia descrittiva già disponibili. Contrasto del testo verificato con test nei due temi; resa e cambio tema sul telefono fisico restano da provare. Settimana, pannello rapido, nuovi gesti, organizzazione dei consigli, onboarding a passi e verifica F-Droid sono fasi successive, non funzioni dichiarate della prova.4. Nessun export reale o nuova fonte clinica è stato validato in questa fase. Firma, secrets, dati, protezioni e calcoli restano quelli della prova.3.

Consegna preparata il 23 novembre 2026. Il dettaglio delle fonti consultate il 22 novembre è in FONTI.md.

## Mascotte e importazione: nuovo pacchetto

- Nessuna validazione clinica del motore di messaggi. Le regole d’interfaccia e di frequenza sono scelte di prodotto testate, non raccomandazioni mediche. I messaggi di salute rimandano ai criteri già documentati e non formulano diagnosi.
- Nessun export personale reale Clue/Flo/Natural Cycles/Drip provato. Contenitori verificati su documentazione ufficiale, mapping testato su fixture sintetiche. JSON arbitrari, elenchi di stringhe e strutture oltre i limiti richiedono una conversione locale. TXT libero Flo, ZIP con/senza password e PDF non vengono interpretati: estrarre prima gli archivi, richiedere JSON/CSV.
- Nessuna deduzione degli inizi dai giorni di flusso. L’importazione di solo diario non basta ad alimentare le statistiche degli inizi; serve registrarli esplicitamente. I campi sconosciuti non permettono di garantire la distinzione fra registrazioni e previsioni senza il controllo dell’utente.
- La copia di annullamento è locale e singola: non recupera dati dopo disinstallazione o Cancella tutto e viene sostituita dal prossimo import. L’annullamento rimuove anche le modifiche successive. Testati errore di scrittura, riapertura, cifratura PIN e recupero; la durata su anni d’uso non è stata provata.
- TalkBack reale, dimensione del carattere Android elevata, tastiere di più produttori, selettori file reali e migrazione fra telefoni richiedono ancora prove fisiche. Il contenuto scorre in uno spazio separato dall’assistente: nessun elemento viene deliberatamente coperto dal personaggio.
- Nessun Health Connect, OCR, AI online o nuove pose generate. Le immagini restano identiche; sono usate alle dimensioni di visualizzazione necessarie, senza produrre altri file ridimensionati.

## Android e distribuzione

- Nessun telefono reale collegato. Notifiche con app chiusa, riavvio, Doze, arresto forzato, spazio privato e impostazioni dei produttori non sono stati provati sul dispositivo.
- Aggiornamento prova.3: inizializzazione da schema incompleto, salvataggio e riapertura SQLite con cifratura Keystore, modifica/eliminazione delle date, consenso screenshot persistente e protezione effettiva del PIN verificati su emulatore Android API 35. Restano da provare invalidazione della chiave biometrica quando cambia l’impronta, selettori file nativi, condivisione, PDF e tasto Indietro. I test browser non dimostrano questi comportamenti; l’emulatore non sostituisce il telefono reale.
- Esclusioni dei backup automatici verificate nei file e nel manifest; non è stato eseguito un trasferimento fra telefoni o un ripristino cloud di un produttore.
- Nessuna verifica su tutte le WebView, versioni Android, impostazioni di accessibilità, ingrandimento caratteri, tastiere e dimensioni fisiche. L’interfaccia è stata controllata nelle condizioni elencate in ESITO-TEST.md.
- Aggiornamento 23 novembre 2026: workflow remoto eseguito con successo con i quattro secrets e la firma definitiva; [esecuzione verificata](https://github.com/CosmoNetinfo/Cosma/actions/runs/45124315508). L’aggiornamento di un’installazione reale conservando i dati deve ancora essere provato sul telefono. Le versioni numerate sono distribuite attraverso la [pagina Releases](https://github.com/CosmoNetinfo/Cosma/releases).
- Il cambio nome/icona per una modalità camuffata non è implementato. Rimane l’opzione FLAG_SECURE.
- Le scadenze di backup sono predisposte per circa un anno e rinnovate all’apertura. Non si promettono notifiche perpetue dopo anni senza aprire l’app. Non sono garantiti allarmi puntuali in ogni condizione.
- Non è stata svolta una revisione indipendente della sicurezza o una certificazione sanitaria. La protezione hardware Keystore dipende dal dispositivo. Un telefono compromesso o sbloccato con credenziali note non è reso invulnerabile dall’app.

## Scienza e funzioni volutamente non automatiche

- Nessun modello clinicamente validato del prossimo ciclo. Il minimo/massimo è descrittivo, non un intervallo con una probabilità nota. I prossimi dati possono cadere fuori dalla fascia.
- Nessun algoritmo combinato validato personale per temperatura, muco e LH: niente data certa né intervallo retrospettivo numerico. I segnali grezzi restano disponibili. Non è stata inventata una regola “3 su 6”.
- Nessuna finestra fertile personale, neanche attivando la modalità fertilità; è stata corretta la convenzione biologica −5/0 nei testi e nei test, senza usarla per localizzare giorni individuali.
- Nessuna diagnosi da scale premestruali. La scala 0–3 è personale, non una traduzione validata del DRSP. Nessuna attribuzione causale dei sintomi al ciclo.
- Avvisi di salute: i riferimenti pubblicati e le regole di comparsa scelte dal prodotto sono distinti in FONTI.md. Contesto di gravidanza/puerperio e terapie non completamente classificato. Gravidanza e perimenopausa non sono modalità dedicate nella 1.0.
- Dossier: accesso integrale non completato per Flo/PMC7381001, protocolli completi Fertility UK e candidati elencati in FONTI.md; non ne vengono usati scoring o percentuali. Nessuna validazione di Cosma attribuita a ISS, OMS o altre istituzioni.
- Nessuna integrazione con dispositivi indossabili, ricostruzione delle terapie passate o verifica dell’assunzione dei farmaci.

Queste limitazioni sono mostrate anche in Fonti e metodo. Le prove matematiche garantiscono soltanto che le formule implementate producano i risultati attesi negli scenari testati.
