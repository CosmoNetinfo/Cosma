# Correzione dell’avvio Android · prova.2

La prima versione poteva mostrare `ExecuteSet: no such table: vault_parts` invece dell’onboarding. È un errore del programma, non dello spazio disponibile sul telefono.

La creazione delle tabelle conteneva due istruzioni sulla stessa riga. Il plugin SQLite Android 8.1.1 separa i batch tramite punto e virgola seguito da un ritorno a capo; veniva così creata solo `vault`. Ora ciascuna tabella viene creata con una chiamata separata e la presenza di entrambe viene verificata prima di leggere o salvare.

Non vengono cancellati database, record o chiavi. Il controllo `IF NOT EXISTS` ripara anche un’installazione con la sola tabella `vault`. Gli archivi esistenti mantengono le revisioni e il formato cifrato. Un documento davvero danneggiato non viene sostituito silenziosamente con uno vuoto.

## Verifiche

- Sei nuovi test con un motore SQLite reale: riproduzione della mancata tabella, primo avvio, aggiornamento da schema incompleto conservando un record, riapertura, annullamento di una scrittura interrotta e documento cifrato oltre quattro MB.
- Totale test Node: 25, senza errori nell’esecuzione locale documentata in RISULTATI-FORMULE.txt.
- Nuovo controllo GitHub su emulatore Android API 35: prepara lo schema incompleto, apre la WebView e i plugin nativi, aggiunge un ciclo e una nota, ricrea l’attività e controlla la conservazione del diario. La compilazione dell’APK richiede anche il successo di questo controllo; l’esito effettivo è consultabile in Actions.

## Come aggiornare

Scarica l’APK della nuova Release e installalo **sopra Cosma**, senza disinstallare e senza cancellare i dati nelle impostazioni Android. La firma definitiva e l’identificativo dell’app rimangono gli stessi; il versionCode aumenta automaticamente.

La prova su emulatore non sostituisce le verifiche sul telefono per notifiche, biometria, backup e aggiornamento.
