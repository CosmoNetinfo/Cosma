# Cosma · Android 1.1 di prova

## Aggiornamento 25 novembre 2026 · v1.1.0-prova.2

Aggiunta la durata indicativa dell’ultima mestruazione senza fine: valore iniziale cinque giorni, modificabile a sei o ad altra durata 1–15 nelle preferenze o nel modulo. Dal primo giorno, i giorni successivi sono tratteggiati rosa in mese/anno e settimana. Non diventano sanguinamento confermato con il passare del tempo e non si sposta il termine perché manca la fine. Il pulsante **Fine mestruazioni**, visibile su Oggi e Calendario, apre l’ultimo giorno reale precompilato a oggi ma correggibile: il salvataggio sostituisce tutta la durata tratteggiata. Date di fine già presenti rispettate. Il metodo e la fonte NHS S18 sono consultabili.

Fertilità: l’utente ha confermato segnali e spiegazioni senza giorno personale certo. Nuova scheda in Salute → I tuoi segnali con informazioni ASRM 2022 ricontrollate (S19), limiti NICE, accesso al diario e alle categorie facoltative. Nessuna data fertile ricavata dal primo giorno, né previsione retrospettiva o conferma clinica dai segnali.

99 test Node e prove dell’interfaccia locali superati, inclusi durata inclusiva, cambio mese/anno/bisestile, distinzione stima/registrazioni, nessun avanzamento automatico, chiusura retrodatata, rimozione tratteggi e riapertura. domain.js, protezioni native, workflow e firma non modificati. La nuova visualizzazione è separata in menstrual-days.js; non altera le formule della prossima mestruazione. I due test nativi devono passare nel workflow prima della firma. Restano le prove fisiche della checklist e i limiti precedenti.


Diario del ciclo in italiano, con dati sul telefono e assistente locale Cosma. La versione **1.1.0-prova.2** raccoglie tutte le aggiunte del brief v1.1 e la revisione grafica richiesta. È una versione da provare, senza validazione clinica indipendente.

**[Scarica l’APK](https://github.com/CosmoNetinfo/Cosma/releases/download/v1.1.0-prova.2/Cosma.apk)** · **[Scarica il pacchetto completo](https://github.com/CosmoNetinfo/Cosma/releases/download/v1.1.0-prova.2/Cosma-Android-1.1.0-prova.2-completo.zip)** · [Release e verifiche della compilazione](https://github.com/CosmoNetinfo/Cosma/releases/tag/v1.1.0-prova.2).

## Installare o aggiornare, passo per passo

1. Sul telefono Android scarica `Cosma.apk` dal collegamento sopra. Lo ZIP completo serve a conservare anche il progetto e le istruzioni: per usare l’app basta l’APK.
2. Apri il file dalla cartella Download. Se Android lo richiede, autorizza temporaneamente l’installazione da quella applicazione, per esempio il browser, e poi disattiva l’autorizzazione.
3. Premi **Installa** oppure **Aggiorna**. Se hai già Cosma, installa sopra: **non disinstallare e non cancellare i dati**. La chiave di firma e l’identificativo `info.cosmonet.cosma` sono conservati.
4. Se la vecchia versione si apre, fai prima un backup cifrato da Impostazioni → Backup e dati. Se non si apre, conserva comunque i dati e installa l’aggiornamento sopra.
5. Prova inizialmente con dati fittizi e segui [la checklist sul telefono](docs/PROVA-SUL-TELEFONO.md). Android minimo 7.0; occorre una WebView aggiornata.

Se l’installazione rifiuta l’aggiornamento, fermati e annota l’errore: non disinstallare per aggirarlo. L’impronta pubblica della firma è in [FIRMA-DEFINITIVA.md](docs/FIRMA-DEFINITIVA.md). Password del backup e PIN non sono recuperabili.

## Cosa trovi nell’app

| Pagina | Funzioni |
| --- | --- |
| Oggi | Anello con il solo numero, didascalia esterna, Cosma intera, fascia descrittiva, azioni tonde, settimana e letture |
| Calendario | Mese/Anno, frecce e gesto laterale, giorni registrati distinti dalle stime, primo giorno usato e metodo di calcolo |
| Diario | Ricerca locale, quattro scorciatoie, categorie in schede, pulsanti pastello illustrati e selezioni multiple |
| Salute | Dati grezzi, statistiche, visite, farmaci e 29 letture con fonti e argomenti |
| Impostazioni | Temi, categorie, inizi del ciclo, presenza di Cosma, importazione, backup, PIN/biometria e promemoria |
| Primo avvio | Sei passi con Indietro, Salta, importazione facoltativa e conclusione; tour di otto passi ripetibile |

L’ingranaggio apre le Impostazioni. Sotto l’anello puoi correggere l’ultimo primo giorno; in **Impostazioni → Inizi del ciclo** puoi correggere o eliminare qualsiasi inizio, anche passato. Il conteggio e le statistiche si aggiornano da quella data. Eliminare un inizio conserva il diario. La fine del sanguinamento è facoltativa e non viene inventata.

I tre comandi di base aprono mestruazioni, sintomi e note/test. Nel pannello dal basso le selezioni si salvano al tocco; le note hanno il loro pulsante Salva. Rapporti e desiderio sono facoltativi, spenti inizialmente e presenti solo dopo attivazione esplicita. Nascondere una categoria o cercare una voce non elimina le registrazioni già presenti.

## Cosma e le immagini

Tocca Cosma: cambia posa e apre un messaggio del catalogo locale. Non usa servizi di intelligenza artificiale online. Dal fumetto, **Opzioni** apre i controlli; le Impostazioni offrono Presente (massimo tre messaggi automatici al giorno), Discreta (uno, predefinita), Silenziosa (nessuno). Pausa notturna 22–8 e nessun messaggio automatico mentre scrivi. Il tocco volontario può aprire un aiuto anche in modalità Silenziosa. Le risposte che registrano un dato chiedono conferma.

Le nove immagini fornite restano identiche byte per byte. Su richiesta successiva dell’utente sono state aggiunte **sette nuove illustrazioni di Cosma per i sintomi**, separate dagli originali: testa, crampi, gonfiore, schiena, sudore, acne e confusione. Sostituiscono le figure umane dei riferimenti; gli altri simboli sono SVG locali nei colori Cosma. Master, prompt e provenienza sono in [NUOVE-POSE.md](docs/NUOVE-POSE.md) e `design/mascotte-sintomi/`. Non sono stati estratti gli asset di Flo.

Pose aggiuntive ancora non disponibili: curiosa, pensierosa, che festeggia, che indica, allegra. I messaggi, con fonti dove affermano fatti di salute, sono in [messaggi-cosma.md](messaggi-cosma.md).

## Stime e rigore scientifico

La prossima mestruazione è una **proiezione descrittiva**: primo giorno effettivamente registrato più minimo/massimo degli ultimi sei intervalli completi non esclusi, solo con almeno tre intervalli disponibili. Non è un intervallo di confidenza, non ha una percentuale di affidabilità nota e può non contenere il prossimo inizio. Con pochi dati il limite è esplicito; una fascia passata non viene spostata automaticamente. **Come l’ho calcolato?** mostra dati utilizzati e fonti.

Nessuna regola fissa meno 14 giorni, nessuna localizzazione automatica della finestra fertile e nessuna conferma clinica dell’ovulazione. Temperatura, muco e LH restano osservazioni facoltative consultabili. La convenzione biologica relativa −5/0 non diventa un calendario personale. Le schede sulle fasi sono informazioni generali, senza attribuire una fase all’utente.

Le formule della base sono conservate: [confronto automatico](docs/FORMULE-CONSERVATE.json). Fonti e limiti: [FONTI.md](FONTI.md), [NON-VERIFICATO.md](docs/NON-VERIFICATO.md). Cosma non fa diagnosi e non suggerisce terapie o dosaggi.

## Privacy, blocco e promemoria

Nessun account, pubblicità, analisi d’uso o permesso INTERNET. SQLite e chiave Android Keystore conservano l’archivio privato. PIN/password e biometria forte sono facoltativi. `allowBackup=false` e regole di esclusione impediscono i backup automatici previsti da Android; i comportamenti specifici dei produttori richiedono prove fisiche.

Per mostrare una schermata: **Impostazioni → Screenshot e privacy → Consenti screenshot**. Il PIN resta protetto e l’opzione iniziale protegge anche l’anteprima delle app recenti.

Il backup manuale è cifrato: scegli una password robusta e conservala separatamente. Disinstallare o cancellare i dati Android elimina l’archivio; senza backup e password non si recupera. Se scegli personalmente un servizio cloud nel selettore file o in Condividi, il file cifrato può essere salvato lì. Nessun invio autonomo.

Le notifiche native hanno solo titolo **Promemoria Cosma** e testo **Apri Cosma per consultare il promemoria.** I dettagli rimangono nell’app. App chiusa, riavvio, risparmio energetico e arresto forzato vanno provati sul telefono; non sono garantiti allarmi puntuali in tutte le condizioni. I promemoria di backup coprono circa un anno e vengono rinnovati all’apertura, con un limite complessivo di 500 allarmi.

## Importare dati da un’altra app

Apri **Impostazioni → Importa da un’altra app**. Sono disponibili istruzioni per Clue, Flo, Natural Cycles, Drip e CSV generico, scelta dei campi e anteprima con controlli. I formati JSON/CSV aperti di Cosma sono descritti in [FORMATO-DATI.md](docs/FORMATO-DATI.md).

Controlla le date nell’anteprima e importa soltanto registrazioni, mai previsioni. Nessun file personale reale di quelle app è stato verificato: la compatibilità automatica non è garantita. ZIP e PDF non sono interpretati; estrai prima l’archivio e usa JSON/CSV. [Ricerca e istruzioni sui formati](docs/IMPORTAZIONE.md).

Prima dell’importazione è conservata una copia locale protetta. **Annulla importazione** ripristina l’intera copia precedente, comprese eventuali modifiche successive: un nuovo import sostituisce questa singola copia. Fai comunque un backup cifrato su file. I dati intimi richiedono un consenso separato nell’importazione aperta.

## Test e prove ancora necessarie

99 test Node superati e controlli dell’interfaccia in due temi, larghezze 360/390/430 px e undici pagine secondarie. Provati primo avvio con importazione e riapertura, pannelli rapidi, persistenza, PIN, backup, correzione degli inizi, calendario annuale, gesti e scritte separate nei percorsi verificati.

Il workflow ripete questi controlli e **due test nativi su emulatore Android API 35 prima di firmare**. L’esito effettivo della versione è nella Release e nei suoi risultati allegati; non considerare pronta una compilazione rossa. La ricevuta dell’APK scaricato verifica firma, hash, versione, permessi e immagini.

Rimangono da provare sul telefono: notifiche a app chiusa/riavvio, biometria, selettori file, backup/ripristino, accessibilità e aggiornamento conservando i dati. Non sono state effettuate una certificazione sanitaria, una revisione indipendente della sicurezza o una validazione clinica del modello. [Risultati](docs/ESITO-TEST.md) · [Checklist](docs/PROVA-SUL-TELEFONO.md).

## Continuare da un nuovo computer

Il codice completo è su GitHub; non occorre ricreare repository, chiave o secrets. Leggi prima [CONTINUA-DA-QUI.md](docs/CONTINUA-DA-QUI.md). Con Git e Node 24 installati:

```powershell
git clone https://github.com/CosmoNetinfo/Cosma.git
Set-Location Cosma
npm ci
npm test
```

Per la compilazione sul servizio GitHub basta caricare una modifica su `main`. Oppure apri **Actions → Costruisci Cosma Android → Run workflow**, scegli `main` e avvia. Quando è verde, apri **Artifacts**, scarica `Cosma-Android-...` ed estrai l’APK. Per una Release, crea e carica un **nuovo** tag `v...`; non riutilizzare tag pubblicati. Il codice Android cresce con il numero di esecuzione del workflow.

La [pagina del progetto nel tuo account ChatGPT](https://chatgpt.com/space/page_6b04222afab48191bfb142279f50f342) raccoglie stato e collegamenti: accedi allo stesso account sull’altro dispositivo. GitHub rimane la fonte del codice; gli archivi allegati sono copie datate.

## Sviluppo locale

Non rigenerare la cartella `android/`. Interfaccia HTML/CSS/JavaScript senza framework pesanti. Node 24, JDK 21 e SDK Android 36 per compilare localmente; per il solo download non serve Android Studio.

```powershell
npm run android:sync
Set-Location android
./gradlew.bat assembleDebug
```

Questo APK locale usa una chiave di debug diversa: non aggiorna l’APK ufficiale. Per testare l’interfaccia su Windows con Chrome:

```powershell
$env:COSMA_BROWSER='C:/Program Files/Google/Chrome/Application/chrome.exe'
npm run test:ui
```

I test browser usano un archivio sostitutivo con dati fittizi: non sono una versione web da distribuire e non dimostrano il comportamento della memoria Android. `scripts/fonti.mjs` rigenera le fonti offline; `scripts/licenze.mjs` l’inventario legale. Le schermate sono in `docs/schermate/` e [PANORAMICA.html](docs/PANORAMICA.html).

| Percorso | Contenuto |
| --- | --- |
| `src/app.js`, `style.css` | Schermate e interazioni |
| `src/domain.js` | Date, dati e formule conservate |
| `src/diary-view.js`, `quick-entry.js` | Diario e pannelli rapidi |
| `src/cosma-ui.js`, `cosma-messages.js` | Assistente locale e messaggi |
| `src/calendar-view.js`, `calendar-gestures.js` | Mese, anno e gesti |
| `src/onboarding.js`, `education.js` | Primo avvio e letture |
| `src/database.js`, `storage.js`, `crypto.js` | Archivio e protezioni |
| `android/`, `.github/workflows/android.yml` | Integrazione nativa e APK firmato |
| `tests/`, `docs/`, `legal/`, `design/` | Prove, documentazione, licenze e master grafici |

## Componenti open source e F-Droid

| Componente diretto | Versione | Licenza dichiarata |
| --- | --- | --- |
| `@aparajita/capacitor-biometric-auth` | 10.0.0 | MIT · open source |
| `@capacitor-community/sqlite` | 8.1.1 | MIT · open source |
| `@capacitor/android` | 8.6.2 | MIT · open source |
| `@capacitor/app` | 8.1.2 | MIT · open source |
| `@capacitor/core` | 8.6.2 | MIT · open source |
| `@capacitor/filesystem` | 8.1.5 | MIT · open source |
| `@capacitor/local-notifications` | 8.3.1 | MIT · open source |
| `@capacitor/share` | 8.0.3 | MIT · open source |
| `@capacitor/splash-screen` | 8.0.2 | MIT · open source |
| `@capacitor/status-bar` | 8.0.4 | MIT · open source |

Dieci dipendenze dirette open source; testi consultabili anche nell’app in **Licenze e componenti**. [Inventario npm](docs/LICENZE-RUNTIME.json), [dipendenze Android](docs/DIPENDENZE-ANDROID-RUNTIME.json), [rapporto F-Droid](docs/FDROID.md).

**Non dichiarato pronto per F-Droid e non inviato:** la licenza del progetto e delle immagini è da decidere dal titolare. Non risultano servizi Google proprietari nelle dipendenze risolte; restano verifica completa dei binari nativi, ricompilazione riproducibile e controlli dell’infrastruttura F-Droid. Questa verifica preliminare non è una certificazione. La Release GitHub di prova è indipendente da tale obiettivo facoltativo.

## Appendice: configurare un repository nuovo

**Cosma è già configurato: non eseguire questi passaggi nel repository esistente e non ricreare la sua chiave.** La procedura seguente documenta soltanto la prima configurazione di un progetto nuovo, per un principiante. Non inviare mai le chiavi in chat e non caricarle nei file pubblici del repository.

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
