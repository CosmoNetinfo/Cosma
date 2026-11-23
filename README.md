# Cosma · Android 1.0 di prova

**Versione pronta da provare: [scarica l’APK 1.0.0-prova.4](https://github.com/CosmoNetinfo/Cosma/releases/download/v1.0.0-prova.4/Cosma.apk).** Installalo sopra Cosma, senza disinstallare e senza cancellare i dati. Per continuare il lavoro da un altro PC leggi [Continua da qui](docs/CONTINUA-DA-QUI.md).

Cosma è un diario del ciclo in italiano, senza account e senza servizi esterni. **Questo repository è già configurato con una chiave di firma definitiva e i quattro secrets Android. Non ricreare la chiave.** GitHub Actions costruisce e firma l’APK automaticamente: i file prodotti sono nella pagina [Actions](https://github.com/CosmoNetinfo/Cosma/actions), le versioni numerate nella pagina [Releases](https://github.com/CosmoNetinfo/Cosma/releases).

Aggiornamento con il nuovo pacchetto: sezioni 12, 13 e 14 applicate in quest’ordine. Cosma a figura intera ha uno spazio riservato sopra la navigazione di Oggi; nelle altre schede compare il volto piccolo. Tocca Cosma per l’aiuto, per ridurla o riaprirla. In **Impostazioni → La presenza di Cosma** scegli Presente (massimo 3 messaggi al giorno), Discreta (1, predefinita) o Silenziosa (0). Pausa fra le 22 e le 8, nessun messaggio mentre scrivi, nessuna AI online. Le risposte rapide chiedono conferma prima di registrare l’umore. Il tour di otto passi è saltabile, riprendibile e ripetibile dalle Impostazioni. Testi e motivazioni sono in [messaggi-cosma.md](messaggi-cosma.md).

L’**ingranaggio in alto** apre le Impostazioni da ogni pagina. Sotto l’anello puoi modificare l’ultimo inizio; **Impostazioni → Inizi del ciclo** permette di modificare o eliminare qualsiasi data. Giorno, statistiche, fascia stimata e promemoria vengono ricalcolati. Il diario resta quando elimini un inizio. Per mostrare una schermata: **Impostazioni → Screenshot e privacy → Consenti screenshot**; il PIN resta protetto.

Per importare: **Impostazioni → Importa da un’altra app**. [Guida e ricerca sui formati](docs/IMPORTAZIONE.md), [formato aperto JSON/CSV di Cosma](docs/FORMATO-DATI.md). Clue/Flo/Natural Cycles/Drip hanno istruzioni dedicate, selezione degli elenchi e mappatura manuale; **nessun export personale reale di queste app è stato provato**. Le fixture sono sintetiche, non schemi commerciali inventati. Prima di importare viene conservata una copia locale protetta. **Annulla importazione** ripristina l’intera copia precedente, comprese le modifiche successive: resta disponibile in Backup e dati, anche dopo riapertura. Un nuovo import sostituisce questa copia. Fai comunque un backup cifrato su file.

Le quattro immagini di `mascotte-intera/` sono copiate identiche in `src/`: verifica SHA-256 automatica insieme alle cinque immagini precedenti. Le risoluzioni originali bastano alle visualizzazioni da 128 px; non sono state ritoccate o ridisegnate. Pose aggiuntive eventualmente utili, **non disponibili e non inventate**: indica un elemento, pensa, festeggia. Per ora si usano solo in piedi, saluto, abbraccio e sonno. Animazione di ingresso breve, disattivata con Riduci animazioni, senza cicli continui.

I risultati delle verifiche locali sono in [docs/ESITO-TEST.md](docs/ESITO-TEST.md); le prove ancora necessarie sul telefono sono in [docs/PROVA-SUL-TELEFONO.md](docs/PROVA-SUL-TELEFONO.md). Le istruzioni per creare la chiave più avanti servono soltanto alla prima configurazione di un nuovo repository: per Cosma è già stata eseguita.

La sezione 12 del brief prevale sulle precedenti: niente PWA, iPhone, GitHub Pages, esportazione nel calendario o migrazione da vecchi archivi browser. L’interfaccia deriva dalla v0.2 e conserva le immagini originali di Cosma. Lo stile minimalista approvato è esteso a Calendario, Diario, Salute, Preferenze, PIN, backup e primo avvio.

## v1.1, prima fase

La prova.4 aggiunge solo sfondi piatti e delicati su Oggi, con contrasto verificato nei due temi. Il rosato accompagna date di mestruazioni realmente registrate; gli altri giorni hanno una tinta lilla/azzurra, neutra con dati assenti o fascia descrittiva passata. Il colore non identifica una fase ormonale e non modifica i calcoli. [Stato delle fasi e parti ancora mancanti](docs/AVANZAMENTO-v1.1.md). La prossima fase è la striscia della settimana.

## Cosa puoi provare

- Aggiungere, correggere, eliminare e scegliere quali cicli escludere dalle statistiche. La fine del sanguinamento è facoltativa e non viene inventata.
- Consultare Oggi, Calendario e proiezione descrittiva delle prossime mestruazioni; aprire “Come l’ho calcolato?” con i dati effettivamente utilizzati.
- Compilare il diario: flusso, umore, sintomi, dolore e note; attivare facoltativamente temperatura, muco, LH, test di gravidanza, peso, sonno e scala personale dei sintomi quotidiani.
- Leggere statistiche e dati grezzi, annotare visite e farmaci, impostare promemoria e un orario personale per il metodo contraccettivo. L’app non consiglia terapie o dosaggi.
- Usare PIN/password, biometria forte se disponibile, tema automatico/chiaro/scuro, schermata protetta nelle app recenti.
- Salvare o condividere un backup cifrato, ripristinarlo dopo conferma, scegliere le date di un riepilogo PDF tramite la stampa Android.
- Leggere fonti offline e copiare cinque domande per dare un feedback, senza invio automatico.

## Prima di usare dati reali

È una **versione di prova, senza validazione clinica indipendente**. La proiezione non ha una probabilità di accuratezza nota. I segnali non certificano un’ovulazione; non viene generata una finestra fertile personale da una regola del calendario. Leggi [FONTI.md](FONTI.md) e [docs/NON-VERIFICATO.md](docs/NON-VERIFICATO.md). Non utilizzare Cosma per decidere giorni “sicuri” o modificare una terapia.

Disinstallare Cosma o cancellarne i dati nelle impostazioni Android elimina l’archivio. **Fai un backup manuale e conserva la sua password separatamente.** La password del backup può essere diversa dal PIN. Non possiamo recuperare né l’una né l’altro.

## Ottenere il tuo primo APK con GitHub

Il repository indicato è `https://github.com/CosmoNetinfo/Cosma`. Le operazioni seguenti si fanno una volta. Non inviare mai le chiavi in chat e non caricarle nei file pubblici del repository.

### 1. Preparare il computer

Per creare la chiave installa un **JDK 21** da un distributore ufficiale, per esempio [Microsoft](https://learn.microsoft.com/java/openjdk/download). Il JDK contiene `keytool`. Apri PowerShell e verifica:

```powershell
keytool -help
```

Se il comando non viene trovato, apri PowerShell nella cartella `bin` del JDK e scrivi `./keytool.exe` al posto di `keytool` nei comandi seguenti. Per il solo download dell’APK da GitHub non occorre installare Android Studio.

Il brief menzionava Java 17: i pacchetti Capacitor 8.6.2 effettivamente controllati richiedono Java 21; il workflow usa Java 21, Node 24, SDK Android 36. Android minimo: 7.0/API 24. Una WebView aggiornata è necessaria per la cifratura WebCrypto.

### 2. Creare la chiave fissa, una volta sola

Scegli una cartella privata **fuori dal progetto**, per esempio `C:\Chiavi-Cosma`. Crea una password lunga e conservala in un gestore password. In PowerShell:

```powershell
New-Item -ItemType Directory -Path C:\Chiavi-Cosma
Set-Location C:\Chiavi-Cosma
keytool -genkeypair -v -keystore cosma-release.jks -storetype PKCS12 -alias cosma -keyalg RSA -keysize 3072 -validity 10000
```

Rispondi alle domande del comando. I dati identificativi entrano nel certificato pubblico: non inserire informazioni private non necessarie. Con PKCS12 usa la stessa password per archivio e chiave. Il suffisso `.jks` è soltanto il nome del file; il formato scelto qui è PKCS12.

**Fai una seconda copia sicura di `cosma-release.jks` e conserva password e alias `cosma`.** Per ogni versione successiva usa esattamente questo file. Una chiave diversa impedisce ad Android di aggiornare l’installazione esistente. Non rigenerarla per risolvere un errore del workflow.

### 3. Convertire il file in base64

Base64 è una rappresentazione testuale del file, **non una cifratura**. In PowerShell:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('C:\Chiavi-Cosma\cosma-release.jks')) | Set-Clipboard
```

Il contenuto viene copiato negli appunti senza stamparlo nel terminale. Incollalo direttamente nel segreto GitHub descritto sotto. Dopo averlo salvato, svuota gli appunti:

```powershell
Set-Clipboard -Value ''
```

Non creare un file base64 dentro il progetto.

### 4. Inserire i quattro segreti nel repository

Apri il repository su GitHub. Scegli **Settings** (Impostazioni), **Secrets and variables** (Segreti e variabili), **Actions**, **New repository secret** (Nuovo segreto del repository).

| Nome esatto | Contenuto da inserire |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | Il testo base64 copiato al punto 3 |
| `ANDROID_KEYSTORE_PASSWORD` | La password dell’archivio |
| `ANDROID_KEY_ALIAS` | `cosma`, se hai seguito il comando sopra |
| `ANDROID_KEY_PASSWORD` | La password della chiave, uguale a quella dell’archivio con la procedura sopra |

Questi sono **segreti**, non variabili normali. I nomi devono essere identici. Non mettere password in `build.gradle`, nel README o nei messaggi dei commit.

### 5. Caricare il progetto

Estrai lo ZIP. Devi caricare **il contenuto della cartella `Cosma`**, in modo che `package.json`, `android` e `.github` siano alla radice del repository, senza una cartella intermedia. La cartella `.github` può essere nascosta da alcuni programmi: deve esserci.

Se usi Git e hai un repository locale vuoto, dalla cartella del progetto:

```powershell
git init -b main
git add .
git commit -m "Cosma Android 1.0 di prova"
git remote add origin https://github.com/CosmoNetinfo/Cosma.git
git push -u origin main
```

Questi comandi presuppongono un repository remoto vuoto. Se contiene già modifiche, scaricalo prima e integra il progetto senza cancellare il lavoro esistente. `.gitignore` esclude chiavi, password locali, APK e dipendenze. Controlla sempre i file proposti prima di caricarli.

### 6. Avviare la compilazione e scaricare l’APK

Ogni caricamento sul ramo `main` avvia il workflow. Per avviarlo a mano apri **Actions**, seleziona **Costruisci Cosma Android**, poi **Run workflow** (Avvia workflow), ramo `main`, e conferma.

Prima girano i test e una prova strumentata di avvio, salvataggio e riapertura su emulatore Android: se falliscono l’APK non viene costruito. Poi GitHub ricostruisce i file, usa temporaneamente la chiave segreta, firma l’APK e controlla che non ci sia il permesso Internet. La chiave viene eliminata dal computer temporaneo anche in caso di errore.

Attendi il segno verde. Apri l’esecuzione e, in **Artifacts** (File prodotti), scarica `Cosma-Android-...`. Estrai lo ZIP ottenuto: contiene `Cosma.apk`, il controllo SHA-256 e l’elenco dei permessi. La prima compilazione può richiedere diversi minuti.

Se il workflow è rosso, apri il passaggio rosso. I casi comuni sono un segreto mancante, una password/alias errati o base64 incompleto. **Non sostituire la chiave fissa.** Il progetto non attiva servizi Google, Firebase o notifiche push.

### 7. Pubblicare una versione scaricabile dalle Release

Quando vuoi una versione numerata, sul commit già verificato:

```powershell
git tag v1.0.0-prova.1
git push origin v1.0.0-prova.1
```

Il tag avvia una nuova compilazione e pubblica `Cosma.apk` nella sezione **Releases** del repository. Per la successiva usa un nuovo tag, per esempio `v1.0.0-prova.2`. Non spostare un tag già distribuito.

`versionName` deriva dal tag. Per ramo/avvio manuale è `1.0.0-prova.N`. `versionCode` è `10000 + github.run_number`, quindi aumenta a ogni **nuova esecuzione** di questo stesso workflow. Il pulsante per ripetere un’esecuzione già esistente mantiene il numero precedente: per una nuova distribuzione usa un nuovo avvio. Non cancellare/ricreare il workflow o trasferirlo a un nuovo repository senza conservare un contatore superiore all’ultimo APK distribuito.

## Installare sul telefono di chi prova

1. Invia l’APK prodotto dal tuo workflow o il collegamento alla tua Release. Scaricalo sul telefono.
2. Apri il file. Android può chiedere di consentire a quel browser o gestore file di installare app sconosciute. Concedi l’autorizzazione soltanto all’app che stai usando; puoi revocarla dopo.
3. Installa Cosma. Non è sul Play Store: Android/Play Protect può mostrare un avviso. Verifica la provenienza; non disattivare indiscriminatamente le protezioni del telefono.
4. Apri Cosma, aggiungi una data o scegli di farlo dopo. In Salute → Blocco app configura un PIN/password di almeno otto caratteri. L’impronta è facoltativa e richiede biometria forte disponibile sul dispositivo.
5. In Salute → Promemoria abilita le notifiche. Se vuoi maggiore puntualità, apri “Gestisci gli allarmi esatti” e concedi l’accesso Android. Puoi negarlo: i promemoria possono arrivare in ritardo. Prova l’avviso fra dieci secondi anche mettendo l’app in secondo piano.
6. In Salute → Backup e dati salva il primo backup cifrato, con password di almeno dieci caratteri, in una cartella che sai ritrovare. Verifica il ripristino con dati fittizi prima della prova reale.
7. Segui la [checklist sul telefono](docs/PROVA-SUL-TELEFONO.md). Per aggiornare, apri il nuovo APK sopra la vecchia installazione: **non disinstallare prima**. Firma, identificativo e contatore devono restare coerenti.

## Dati, blocco e notifiche

L’APK usa SQLite nella memoria privata dell’app. Prima di arrivare a SQLite, tutto il documento è cifrato con AES-GCM usando una chiave Android Keystore non esportata. Il documento cifrato viene diviso in righe piccole e salvato in una singola transazione, per evitare una riga troppo grande nella lettura Android. SQLCipher è disabilitato: **il documento è cifrato, non l’intero contenitore SQLite**; schema e revisione restano leggibili. Attivando il PIN si aggiunge uno strato AES-GCM derivato con PBKDF2-SHA256, 600.000 iterazioni, sale casuale e nonce casuale. La chiave del PIN rimane in memoria mentre l’app è sbloccata.

Con la biometria, una copia del segreto di accesso è avvolta da una chiave Keystore che richiede biometria forte Android, con finestra di autorizzazione di 15 secondi. Non viene salvata in chiaro né inclusa nei backup. Il PIN resta utilizzabile se l’impronta fallisce. Non promettiamo che ogni telefono conservi le chiavi in hardware. Dopo cinque minuti senza attività e al passaggio in secondo piano, l’app protetta si blocca; selettori file, stampa e prompt biometrici richiedono eccezioni temporanee per completare l’azione scelta.

`FLAG_SECURE` è attivo inizialmente: nasconde il contenuto nelle app recenti e impedisce gli screenshot. Puoi disattivarlo in Preferenze. Il cambio automatico di nome e icona non è implementato: il nome rimane Cosma.

Il manifest finale non richiede Internet. Risorse, caratteri, calcoli e fonti sono locali; nessun CDN, analitica o account. Il nome `https://localhost` nella configurazione Capacitor serve a caricare i file intercettati internamente dalla WebView: non è un server remoto e non invia i dati. I test dell’interfaccia hanno un archivio sostitutivo solo per il browser; il percorso di produzione lo rifiuta e usa SQLite.

Backup automatici Android e trasferimento dispositivo sono esclusi nel manifest e nei file XML. Un produttore può avere comportamenti propri: la checklist ne richiede la verifica. Se scegli tu un servizio cloud nel selettore file o nel menu Condividi, il file cifrato può finire lì. L’app non lo carica autonomamente. Nella cache privata possono restare copie cifrate dei file condivisi, eliminabili cancellando la cache Android.

Tutte le notifiche hanno soltanto titolo **“Promemoria Cosma”** e testo **“Apri Cosma per consultare il promemoria.”** I dettagli sono nell’app. Sono programmati allarmi nativi, non timer JavaScript. Il ricevitore del plugin ripristina gli allarmi dopo il riavvio; questo comportamento deve ancora essere provato sul telefono. Un arresto forzato o lo spazio privato bloccato possono impedirli finché non riapri Cosma. Risparmio energetico e Doze possono ritardarli anche con configurazione corretta.

Per il backup sono programmate tredici scadenze distanti 28 giorni (circa un anno), aggiornate a ogni apertura/salvataggio; oltre tale orizzonte serve riaprire l’app. I promemoria complessivi sono limitati a 500, dando precedenza alle scadenze di backup. Questa versione è destinata a elenchi personali ridotti, non ad agende con migliaia di allarmi.

## Per chi sviluppa

La cartella `android/` è già generata e contiene il plugin locale Java. **Non rigenerarla da zero**, altrimenti perderesti manifest, firma, icone e servizi locali. Se parti da questo ZIP, basta sincronizzarla.

```powershell
npm ci
npm test
npm run android:sync
```

Per compilare localmente occorrono JDK 21, Android SDK 36 e le relative licenze accettate. Configura `JAVA_HOME` e `ANDROID_HOME`, quindi:

```powershell
Set-Location android
./gradlew.bat assembleDebug
```

Questa produce un APK di sviluppo con chiave di debug, **diversa da quella fissa della distribuzione**. Non usarlo come aggiornamento dell’APK ufficiale e non inserire dati sanitari reali prima delle verifiche native.

Per i test dell’interfaccia su Windows con Chrome:

```powershell
$env:COSMA_BROWSER='C:/Program Files/Google/Chrome/Application/chrome.exe'
npm run test:ui
```

Puoi indicare un altro Chromium installato. I test aprono un server locale temporaneo e usano dati fittizi in un archivio separato; non verificano SQLite, Keystore o notifiche Android. Producono schermate in `docs/schermate/` e un esito JSON. Non viene distribuita una versione browser per l’utente finale.

| Cartella/file | Scopo |
| --- | --- |
| `src/app.js`, `style.css`, `index.html` | Schermate e interazioni |
| `src/domain.js` | Date, validazione, statistiche, proiezione descrittiva |
| `src/database.js`, `storage.js`, `crypto.js` | Database privato, PIN e backup |
| `src/platform.js`, `notifications.js` | Collegamenti Android e promemoria |
| `src/education.js`, `science.js`, `FONTI.md` | Informazioni e riferimenti scientifici offline |
| `android/.../CosmaDevicePlugin.java` | Keystore, selettore file, stampa, protezione schermo |
| `tests/`, `scripts/` | Verifiche ripetibili e costruzione |
| `.github/workflows/android.yml` | APK firmato e Release |
| `docs/` | Esiti, schermate, design, limiti e checklist |

Aggiornando le fonti esegui `node scripts/fonti.mjs`, poi ricostruisci. Le immagini originali non vengono generate o ritoccate. L’icona adattiva usa il PNG originale su uno sfondo viola. Le licenze dei pacchetti di terzi sono riepilogate in `docs/DIPENDENZE.json`; i diritti della mascotte restano al suo titolare.
