# Checklist prima della prova con dati reali

Compila usando inizialmente **dati fittizi**. Non segnare una casella finché non hai realmente eseguito il passaggio.

Telefono/modello: __________ · Android: __________ · WebView: __________

Versione Cosma: __________ · versionCode: __________ · data: __________

## Installazione, schermate e dati

- [ ] Installa l’APK firmato dal workflow; controlla che sia `info.cosmonet.cosma`, nome Cosma.
- [ ] Avvia in modalità aereo: tutte le schermate e fonti si aprono senza connessione.
- [ ] Prova primo avvio con e senza data. Nessuna sovrapposizione, notch e barra Android rispettati.
- [ ] Aggiungi almeno quattro inizi, correggi una data, escludi un intervallo; verifica dati usati in “Come l’ho calcolato?”.
- [ ] Verifica nessuna proiezione prima di tre intervalli completi. La stima non identifica una fase ormonale.
- [ ] Compila il diario, chiudi e riapri: le voci restano. Controlla i dati grezzi facoltativi e il grafico con giorni mancanti.
- [ ] Prova tema chiaro, scuro e automatico, tastiera aperta, caratteri grandi, scorrimento fino all’ultimo elemento. Nessun controllo coperto dalla navigazione.
- [ ] Indietro Android chiude prima i pannelli, poi torna alla schermata precedente; da Oggi esce. Avvisa delle modifiche al diario non salvate.

## Promemoria

- [ ] Rifiuta inizialmente POST_NOTIFICATIONS: l’app resta utilizzabile e spiega come riattivarlo.
- [ ] Abilita notifiche e prova l’avviso fra 10 secondi con app aperta, in secondo piano e tolta dall’elenco recenti.
- [ ] Registra un farmaco con orario tra pochi minuti e una visita di prova: la notifica contiene solo “Promemoria Cosma” e il testo generico, anche nel blocco schermo.
- [ ] Nega gli allarmi esatti, ripeti: nessun errore irreversibile, possibile ritardo dichiarato. Poi autorizzali e riprova.
- [ ] Riavvia il telefono dopo aver programmato un avviso futuro; sblocca Android e attendi senza aprire Cosma. Verifica ricezione. Ripeti con PIN Cosma attivo.
- [ ] Modifica ed elimina visita/farmaco: nessun vecchio avviso residuo. Disattiva notifiche: i promemoria programmati vengono annullati.
- [ ] Prova con risparmio energetico e dopo alcune ore di inattività. Annota ritardo e impostazioni del produttore.
- [ ] Arresto forzato da Impostazioni Android: documenta che non ci si deve aspettare notifiche finché non si riapre l’app. Dopo riapertura riprova.
- [ ] Cambio ora/fuso e autorizzazione allarmi revocata/riattivata: apri Cosma e controlla gli orari riprogrammati.
- [ ] Per il backup a quattro settimane usa un dispositivo di test con data controllata e annota il risultato; non modificare la data del telefono usato per altre attività importanti.

## PIN, impronta e schermata protetta

- [ ] Attiva PIN/password; un PIN errato non apre l’archivio e impone un’attesa progressiva.
- [ ] Torna alla Home Android e riapri: chiede di sbloccare. Ripeti dopo cinque minuti senza attività e dopo riavvio del processo.
- [ ] Attiva biometria forte verificando il PIN. Prova impronta corretta, errata, annullamento e fallback PIN.
- [ ] Aggiungi/rimuovi un’impronta nelle impostazioni del dispositivo: il PIN resta funzionante; se necessario riassocia la biometria.
- [ ] Con FLAG_SECURE attivo: recenti senza contenuto leggibile e screenshot impedito. Disattiva l’opzione e controlla il comportamento scelto.
- [ ] Apri selettore file, condivisione e stampa con PIN attivo: l’azione termina senza perdere i dati e il blocco torna a funzionare dopo.

## Backup, PDF e ripristino

- [ ] Salva il backup cifrato in una cartella locale scelta; ritrova il file. Non è testo sanitario leggibile.
- [ ] Annulla il selettore: nessun falso messaggio “salvato”, data ultimo backup invariata.
- [ ] Condividi il file con una destinazione scelta; verifica che il contenuto sia cifrato. Un servizio cloud è una tua scelta, non un invio automatico.
- [ ] Password sbagliata o file alterato: ripristino rifiutato, archivio attuale intatto.
- [ ] Backup valido: mostra conteggi e chiede una seconda conferma; annulla e controlla che i dati siano intatti. Poi conferma e confronta cicli, diario, visite e farmaci.
- [ ] Dopo ripristino le notifiche sono disattivate finché non le riattivi; il PIN locale mantiene lo stato precedente.
- [ ] Genera un PDF con intervallo scelto e verifica dati, accenti e pagine nella stampa Android. Conservare il PDF in chiaro è una tua scelta.
- [ ] Con dati fittizi e backup verificato, prova disinstallazione/reinstallazione e ripristino manuale. Il backup automatico non deve riportare l’archivio. Verifica separatamente eventuali strumenti di trasferimento del produttore.

## Aggiornamento senza perdere dati

- [ ] Fai un backup verificato prima dell’aggiornamento.
- [ ] Genera un secondo APK con la **stessa keystore**, stesso appId e versionCode superiore.
- [ ] Installalo sopra Cosma senza disinstallare. Verifica cicli, diario, PIN, biometria e promemoria.
- [ ] Conserva certificato/impronta SHA-256 della firma e copia sicura della chiave. Non distribuire APK di debug come aggiornamenti.

Esito complessivo: __________

Problemi osservati, passaggi per riprodurli e impostazioni: __________

Per il feedback usa Salute → Feedback per chi prova. Non inviare dati sanitari reali che non vuoi condividere.
# Prove aggiunte: assistente, date e importazione

Usa prima dati finti e conserva un backup cifrato. Installa l’aggiornamento sopra Cosma, senza disinstallare: la firma deve restare identica.

- [ ] Apri l’ingranaggio, modifica l’ultimo inizio e controlla giorno nell’anello, calendario, statistiche, date della stima e promemoria; riapri. Elimina l’ultimo inizio e verifica che i calcoli usino quello precedente e il diario resti.
- [ ] Consenti gli screenshot, acquisisci la schermata, chiudi/riapri. Blocca con PIN: la schermata di sblocco deve restare protetta. Sblocca: torna la preferenza scelta. Disattiva di nuovo gli screenshot se desideri.
- [ ] Verifica Cosma intera su Oggi e il volto nelle altre schede, senza coprire dati o pulsanti, anche con tastiera aperta. Prova tema scuro, Riduci animazioni e TalkBack.
- [ ] Salta il tour, riprendilo, completa gli otto passi e rifallo dalle Impostazioni. Controlla Presente/Discreta/Silenziosa, pausa notturna e mancati interventi mentre scrivi.
- [ ] Scegli una risposta rapida: annulla la conferma e verifica che non sia salvata; ripeti confermando e verifica l’umore nel diario.
- [ ] Importa ogni fixture sintetica seguendo la mappatura; controlla date italiane, provenienza, anomalie, campi ignorati, doppioni e valori. Non importare previsioni o dati sessuali.
- [ ] Annulla l’anteprima: nessun dato cambia. Conferma Unisci: ritrova i dati tuoi e quelli nuovi. Chiudi, riapri e scegli Annulla importazione: ritrova la copia precedente. Ripeti con PIN e dopo un aggiornamento APK.
- [ ] Prova Sostituisci tutto soltanto con dati finti; verifica conferma ulteriore e recupero della copia precedente. Un secondo import deve sostituire la copia del primo.
- [ ] Esporta JSON e CSV, importali su un’installazione di prova separata e confronta cicli, diario, visite e farmaci. Verifica anche backup cifrato e ripristino con password corretta/errata.
- [ ] Verifica i selettori Android con un file locale e con un file molto grande; dopo l’import elimina dal Download solo i file di prova che non servono più.

## Revisione prova.7: spazi e pose

- [ ] Su Oggi, anello e Cosma affiancati, scheda della stima leggibile per intero e pulsante raggiungibile, senza fasce fisse vuote.
- [ ] Scorrendo con caratteri Android grandi e con schermo basso, ogni comando resta raggiungibile e la navigazione non si sposta.
- [ ] In ogni pagina Cosma è intera; toccala e scegli Cambia posa, controllando tutte e quattro le immagini.
- [ ] Cambiare posa non modifica diario o date; tornando dopo la chiusura completa la scelta temporanea può azzerarsi.
- [ ] Prova fumetti, modalità Silenziosa, tastiera e tour completo; nessun controllo coperto.

## Diario e leggibilità, prova.8

- [ ] Cerca un sintomo, selezionalo dalle scorciatoie, cancella la ricerca: la selezione compare anche nella categoria Sintomi.
- [ ] Registra flusso, umore, due sintomi, una nota e dati facoltativi attivati nelle Impostazioni; salva con una ricerca attiva e riapri. Nessun dato nascosto deve sparire.
- [ ] Prova caratteri e dimensioni schermo Android grandi, orientamento e tastiera: scritte, icone e pulsanti non si coprono.
- [ ] Correggi il primo giorno di un ciclo e verifica il giorno del ciclo e gli estremi della fascia nel calendario; la fine del flusso non deve spostare l’inizio usato per la stima.
- [ ] Il numero è dentro l’anello, “Giorno del ciclo” fuori e distante dal bordo.

## Calendario e assistente, prova.10

- [ ] Tocca Cosma in tutte le schede: cambia posa, risponde dal catalogo e Opzioni apre il menu. In Silenziosa non avvia messaggi da sola.
- [ ] Nel calendario scorri in orizzontale: cambia il mese; lo scorrimento verticale non deve cambiare data. Le frecce continuano a funzionare.
- [ ] Passa ad Anno, apri un mese e cambia anno; nessuna previsione aggiuntiva viene prolungata nei mesi futuri.
- [ ] Con TalkBack apri un mese usando il suo comando completo; verifica la leggibilità con caratteri grandi.
