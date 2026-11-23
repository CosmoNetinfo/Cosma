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
