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
