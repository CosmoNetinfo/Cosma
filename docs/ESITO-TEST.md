# Verifiche della versione con assistente e importazione

**Release prova.3 completata**: [workflow riuscito](https://github.com/CosmoNetinfo/Cosma/actions/runs/45140763437), versionCode 10010. Firma definitiva identica a prova.2, INTERNET assente, allowBackup=false e nove immagini identiche anche nell’APK scaricato. Ricevuta in VERIFICA-APK-PROVA3.json. Il progetto estratto dallo ZIP è stato installato separatamente con npm ci e ha superato 53 test e android:sync.

23 novembre 2026. Node locale 26.13.1; workflow Node 24 LTS, JDK 21, SDK 36. Nessun telefono fisico collegato.

- **53 test automatici passati, 0 falliti**: formule, date/ora legale e cinque fusi, esclusioni, modifica/eliminazione inizi, convenzione biologica relativa −5/0, crittografia, SQLite reale e schema incompleto, regole/frequenza/notte di Cosma, importazione difensiva e fixture sintetiche, round trip JSON/CSV di cicli/diario/visite/farmaci, copia di annullamento con errore di scrittura e riapertura PIN. Risultati in RISULTATI-FORMULE.txt.
- Interfaccia Chrome verificata a 360/390/430 px chiaro/scuro e undici pagine secondarie a 360/430 nei due temi: tour otto passi, date, screenshot opzionali, persistenza del diario, visite/farmaci, backup cifrato, importazione con anteprima/cancellazione/conferma, PIN errato/corretto, annullamento importazione dopo attivazione PIN e riapertura. Nessun errore JavaScript nei percorsi provati. ESITO-INTERFACCIA.json e schermate/ contengono il dettaglio. È un archivio di test sostitutivo, non la memoria Android. Verificate anche aree separate di contenuto, assistente e navigazione, senza sovrapposizioni nei viewport provati.
- Compilazione locale e **due test strumentati Android API35 superati**: contesto dell’app; avvio dallo schema incompleto, salvataggio e riapertura, gestione delle date, preferenza screenshot persistente e FLAG_SECURE sul PIN, blocco/sblocco. [Prova nativa del nuovo codice](https://github.com/CosmoNetinfo/Cosma/actions/runs/45140628051). L’emulatore non sostituisce un telefono fisico.
- Nove immagini originali identiche byte per byte, SHA-256 verificati; IMMAGINI-ORIGINALI.json.
- Controllo statico del manifest unito: INTERNET assente; allowBackup=false; esclusioni cloud/trasferimento presenti. Il workflow controlla di nuovo l’APK firmato effettivo.

Prova.2 aveva già verificato lo schema incompleto, salvataggio e riapertura nativi su API35: https://github.com/CosmoNetinfo/Cosma/actions/runs/45127704178 . La firma definitiva è in FIRMA-DEFINITIVA.md. La nuova versione deve conservare la stessa firma e un versionCode maggiore.

Non sono prove di validità clinica, compatibilità universale degli export commerciali, sicurezza indipendente o funzionamento su tutti i telefoni. Vedi NON-VERIFICATO.md e PROVA-SUL-TELEFONO.md.
