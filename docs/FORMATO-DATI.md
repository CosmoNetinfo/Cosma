# Formato aperto Cosma, versione 1

Esportazioni JSON e CSV non cifrate, facoltative, da Backup e dati. Un avviso chiede conferma prima di salvare. Non contengono PIN, chiavi, copia di annullamento, previsioni o statistiche derivate. Per copiare anche tutte le preferenze usa il **backup cifrato**.

JSON: oggetto con `formato: "cosma-portabile"`, `versione: 1`, `registrazioni: []`. Ogni registrazione ha `tipo` e `provenienza`. Tipi:

- `ciclo`: `data` (inizio ISO YYYY-MM-DD), `fine` (ISO o stringa vuota), `escluso` (booleano). L’esclusione riguarda l’intervallo che inizia in quella data.
- `diario`: `data` ISO; campi `flusso`, `umore`, `sint` (elenco), `dolore` 0–10, `note`, `temp` in °C o null, `tempDisturbed`, `mucus`, `lh`, `pregnancy`, `weight` in kg, `sleep` in ore, `pmsRecorded`, `pms` (scala personale 0–3). Valori ammessi e limiti sono in `src/domain.js`; nessuna scala clinicamente validata implicita.
- `visita`: `data`/`date` ISO, `title`, `time` HH:mm, `notes`, `remind`.
- `farmaco`: `name`, `time`, `instructions`, `remind`, secondo il modello dell’app. Non implica che sia stato assunto.

Gli ID tecnici vengono ricreati importando. Le preferenze di notifica e il PIN del telefono di destinazione non vengono attivati automaticamente da questo file.

CSV UTF-8 con BOM, separatore `;`, tutte le celle fra virgolette, virgolette interne raddoppiate. Intestazione esatta:

```csv
versione;tipo;data;fine;escluso;provenienza;dati_json
```

Ogni riga ha `versione` uguale a `1`. `dati_json` conserva la registrazione JSON completa: è la rappresentazione autorevole per l’importazione, così elenchi, booleane e note multilinea non perdono struttura. Le altre colonne facilitano la lettura. Il file è importabile da Cosma senza mappatura delle colonne. I test verificano entrambi i percorsi. Limite attuale del selettore d’importazione: 2 MB/5.000 registrazioni, anche per questi file. Per archivi più grandi usare backup cifrato o suddividere l’esportazione esternamente mantenendo lo schema; l’app segnala il limite e non tronca.

## Estensione compatibile delle registrazioni, prova.9

Il diario conserva i vecchi valori. Le nuove proprietà sono elenchi di etichette: rapporti (attività/desiderio), activity (attività fisica), context (contesto). Sono normalizzate su cataloghi locali, senza proprietà arbitrarie. Il desiderio è distinto dall’assenza di rapporti. Va tutto bene e Nessuna attività sono scelte esplicite che non convivono con altre voci dello stesso gruppo. Nuove etichette ampliano sint, umore e mucus senza ricodificare quelle vecchie.

JSON/CSV Cosma v1 conservano tutti i campi del diario in dati_json o nelle registrazioni; per importare rapporti è necessario selezionare la casella dedicata nell’anteprima del formato Cosma. In assenza di consenso vengono esclusi e segnalati. I formati commerciali non importano automaticamente dati sessuali. I backup cifrati ripristinano l’intero stato, comprese categorie nascoste e registrazioni facoltative.

## Umori multipli, dalla prova.3

Le registrazioni del diario possono avere `umori`, elenco di etichette supportate (esempio: `["Calma", "Felice"]`). Il vecchio campo `umore` rimane la prima voce, oppure stringa vuota. All’importazione un elenco presente, anche vuoto, prevale sul campo singolo; vecchi archivi con solo `umore` sono convertiti senza perdere la scelta. Backup, JSON e colonna dati_json del CSV conservano l’elenco; le versioni precedenti di Cosma supportano soltanto la voce singola.
