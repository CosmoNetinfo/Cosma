# Limiti e verifiche mancanti

## Aggiornamento 25 novembre 2026 · v1.1.0-prova.3

Icona Android corretta: rimosso il bordo viola apparente, più margine per le maschere del launcher, risorse alternative Capacitor sostituite. Avatar originale identico; composizione XML e PNG tecnicamente scalati, senza ritoccare o ridisegnare il personaggio. Anteprima in docs/ICONA-ANTEPRIMA.png, parametri e hash in ICONA-ANDROID.json. Riproduzione: COSMA_BROWSER impostato a Chrome, node scripts/icone-android.mjs. La resa sul telefono Huawei dell’utente richiede una prova reale.

Umore a selezione multipla nel Diario e nel pannello rapido: ogni voce è indipendente, senza esclusioni automatiche. Nuovo elenco umori; il precedente umore singolo viene convertito e resta anche nel campo compatibile umore come prima voce. Un elenco vuoto esplicito non fa riapparire una scelta rimossa. Le risposte di Cosma aggiungono senza cancellare gli altri umori. PDF, backup cifrato, esportazioni JSON/CSV Cosma e importazione conservano le voci; un vecchio Cosma può leggere solo il campo singolo.

103 test Node superati; nuove prove su migrazione, rimozione, esportazioni e backup. Test dell’interfaccia con due umori, riapertura e rimozione indipendente. Formule scientifiche conservate byte per byte dalla base; domain.js cambia solo nella normalizzazione degli umori. Firma, secrets, cifratura, permessi e notifiche invariati. Le risorse Android sono state compilate localmente; l’assemblaggio debug locale è stato bloccato dall’accesso al file di blocco della chiave debug del computer, distinta dalla firma definitiva. La compilazione ufficiale e i due test nativi sono eseguiti da GitHub prima della consegna.


## Aggiornamento 25 novembre 2026 · v1.1.0-prova.2

Aggiunta la durata indicativa dell’ultima mestruazione senza fine: valore iniziale cinque giorni, modificabile a sei o ad altra durata 1–15 nelle preferenze o nel modulo. Dal primo giorno, i giorni successivi sono tratteggiati rosa in mese/anno e settimana. Non diventano sanguinamento confermato con il passare del tempo e non si sposta il termine perché manca la fine. Il pulsante **Fine mestruazioni**, visibile su Oggi e Calendario, apre l’ultimo giorno reale precompilato a oggi ma correggibile: il salvataggio sostituisce tutta la durata tratteggiata. Date di fine già presenti rispettate. Il metodo e la fonte NHS S18 sono consultabili.

Fertilità: l’utente ha confermato segnali e spiegazioni senza giorno personale certo. Nuova scheda in Salute → I tuoi segnali con informazioni ASRM 2022 ricontrollate (S19), limiti NICE, accesso al diario e alle categorie facoltative. Nessuna data fertile ricavata dal primo giorno, né previsione retrospettiva o conferma clinica dai segnali.

99 test Node e prove dell’interfaccia locali superati, inclusi durata inclusiva, cambio mese/anno/bisestile, distinzione stima/registrazioni, nessun avanzamento automatico, chiusura retrodatata, rimozione tratteggi e riapertura. domain.js, protezioni native, workflow e firma non modificati. La nuova visualizzazione è separata in menstrual-days.js; non altera le formule della prossima mestruazione. I due test nativi devono passare nel workflow prima della firma. Restano le prove fisiche della checklist e i limiti precedenti.


## Consegna complessiva v1.1.0-prova.1

Tutte le dieci voci funzionali del delta sono implementate: tinte piatte, settimana, azioni rapide, pannelli di registrazione, tocco su Cosma, gesto calendario, letture con fonti, primo avvio a passi, linguaggio inclusivo e audit dei componenti per F-Droid. Aggiunte richieste successive: Diario illustrato, sette varianti di Cosma separate dagli originali, vista annuale e numero nell’anello senza parole sul bordo. README riscritto per un principiante, con guida dettagliata e configurazione iniziale chiaramente separata dal repository già pronto.

92 test Node e prove browser locali superati. Il workflow del tag ripete due test nativi prima della firma; i risultati effettivi e la verifica dell’APK sono allegati alla Release. Il test della conferma è stato corretto dopo un’attesa del focus fallita sull’emulatore: preme il pulsante Android reale tramite accessibilità, senza modificare l’app o saltare il controllo di eliminazione.

Audit F-Droid completato come valutazione, non pubblicazione: scelta della licenza, ricostruzione dei binari e ammissione esterna restano aperte. Prove su telefono reale, export personali e validazioni indipendenti non sono state eseguite. Lo storico sotto descrive risultati e parti mancanti delle fasi precedenti, non lo stato attuale.


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
- Nessun Health Connect, OCR o AI online nell’app. Le nove immagini originali restano identiche; sette nuove varianti dei sintomi, autorizzate successivamente, sono documentate con master, prompt e risoluzioni 160/320 px in NUOVE-POSE.md.

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

## Dettagli del controllo delle licenze

L’inventario npm di produzione comprende anche strumenti transitori o componenti web non attivi nell’APK. Il pacchetto Windows Rollup dichiarato MIT non includeva un testo locale della licenza: è segnalato nell’inventario e non è un binario Android distribuito nell’app. I POM Android sono metadati dichiarativi, non un’analisi legale o una ricompilazione indipendente. Non sono state verificate tutte le licenze dei componenti crittografici integrati nei binari SQLCipher. Il rapporto F-Droid esplicita i limiti e non è una certificazione.
