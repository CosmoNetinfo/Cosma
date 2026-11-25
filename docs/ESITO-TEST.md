# Verifiche della versione con assistente e importazione

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


## v1.1 fase 2

La prova.5 ha superato i due test Android alla seconda esecuzione, dopo un errore intermittente di selezione della finestra di conferma. La prova.6 conserva lo stesso codice applicativo e corregge soltanto il test: `inRoot(isDialog())` seleziona esplicitamente l’AlertDialog creato da Capacitor prima di premere OK. Nessun controllo è rimosso o indebolito. Riferimenti tecnici: [Android, selezione della finestra nei test](https://developer.android.com/training/testing/espresso/recipes) e `BridgeWebChromeClient.onJsConfirm` nella dipendenza Capacitor locale. Il nuovo tag ripete tutti i controlli prima della firma.

62 test Node superati, più controlli della settimana nell’interfaccia: sette date e sette pulsanti da almeno 48 px, registrazioni distinte dalla fascia stimata, apertura del mese/giorno nel Calendario, diario di oggi e date future di sola consultazione. Casi di cambio mese/anno, bisestile e ora legale, dati pochi, fascia passata ed estremi coincidenti. Nessuna formula nuova e nessuna localizzazione fertile. Il rapporto FASE2-INVARIANTI.json confronta 31 file protetti con prova.4, incluse le tinte della fase 1. I risultati nativi e la firma della prova.6 si consultano nella Release del tag. I rapporti delle versioni precedenti restano come documentazione storica.


## v1.1 fase 1

57 test Node superati, più controlli dell’interfaccia aggiornati: tinte reali in tema chiaro/scuro automatico, registrazione/eliminazione di una data, neutralità dopo la fascia descrittiva e nessuna tinta di Oggi nelle altre pagine. Le quattro nuove prove non cambiano le formule. Trenta file dei calcoli, della protezione, dei plugin, del workflow, delle fonti e delle immagini risultano identici a prova.3: FASE1-INVARIANTI.json. L’esito della compilazione e dei test nativi della prova.4 è disponibile nel workflow del tag. I risultati sotto descrivono anche la base prova.3.


**Release prova.3 completata**: [workflow riuscito](https://github.com/CosmoNetinfo/Cosma/actions/runs/45140763437), versionCode 10010. Firma definitiva identica a prova.2, INTERNET assente, allowBackup=false e nove immagini identiche anche nell’APK scaricato. Ricevuta in VERIFICA-APK-PROVA3.json. Il progetto estratto dallo ZIP è stato installato separatamente con npm ci e ha superato 53 test e android:sync.

23 novembre 2026. Node locale 26.13.1; workflow Node 24 LTS, JDK 21, SDK 36. Nessun telefono fisico collegato.

- **53 test automatici passati, 0 falliti**: formule, date/ora legale e cinque fusi, esclusioni, modifica/eliminazione inizi, convenzione biologica relativa −5/0, crittografia, SQLite reale e schema incompleto, regole/frequenza/notte di Cosma, importazione difensiva e fixture sintetiche, round trip JSON/CSV di cicli/diario/visite/farmaci, copia di annullamento con errore di scrittura e riapertura PIN. Risultati in RISULTATI-FORMULE.txt.
- Interfaccia Chrome verificata a 360/390/430 px chiaro/scuro e undici pagine secondarie a 360/430 nei due temi: tour otto passi, date, screenshot opzionali, persistenza del diario, visite/farmaci, backup cifrato, importazione con anteprima/cancellazione/conferma, PIN errato/corretto, annullamento importazione dopo attivazione PIN e riapertura. Nessun errore JavaScript nei percorsi provati. ESITO-INTERFACCIA.json e schermate/ contengono il dettaglio. È un archivio di test sostitutivo, non la memoria Android. Verificate anche aree separate di contenuto, assistente e navigazione, senza sovrapposizioni nei viewport provati.
- Compilazione locale e **due test strumentati Android API35 superati**: contesto dell’app; avvio dallo schema incompleto, salvataggio e riapertura, gestione delle date, preferenza screenshot persistente e FLAG_SECURE sul PIN, blocco/sblocco. [Prova nativa del nuovo codice](https://github.com/CosmoNetinfo/Cosma/actions/runs/45140628051). L’emulatore non sostituisce un telefono fisico.
- Nove immagini originali identiche byte per byte, SHA-256 verificati; IMMAGINI-ORIGINALI.json.
- Controllo statico del manifest unito: INTERNET assente; allowBackup=false; esclusioni cloud/trasferimento presenti. Il workflow controlla di nuovo l’APK firmato effettivo.

Prova.2 aveva già verificato lo schema incompleto, salvataggio e riapertura nativi su API35: https://github.com/CosmoNetinfo/Cosma/actions/runs/45127704178 . La firma definitiva è in FIRMA-DEFINITIVA.md. La nuova versione deve conservare la stessa firma e un versionCode maggiore.

Non sono prove di validità clinica, compatibilità universale degli export commerciali, sicurezza indipendente o funzionamento su tutti i telefoni. Vedi NON-VERIFICATO.md e PROVA-SUL-TELEFONO.md.
