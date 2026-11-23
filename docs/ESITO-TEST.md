# Verifiche della versione con assistente e importazione

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
