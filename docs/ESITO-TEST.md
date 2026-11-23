# Verifiche eseguite

23 novembre 2026. Sistema di lavoro Windows; Node 26.13.1 per le verifiche locali, JDK Microsoft 21.0.13, SDK Android 36. Il workflow usa Node 24 LTS e JDK 21. Nessun telefono reale collegato.

| Verifica | Risultato e limite |
| --- | --- |
| Test automatici | **19 superati, 0 falliti**. Formule, date civili, cinque fusi, ora legale, bisestile, dati insufficienti, esclusioni, range irregolari, −5/0, date non valide, cifratura/manomissione/password errata, privacy notifiche, scadenze backup contrasto palette/gradiente e divisione/ricostruzione di un archivio cifrato da quattro milioni di caratteri. Output in RISULTATI-FORMULE.txt |
| Ricostruzione dalla consegna | Copia dello ZIP estratta separatamente: npm ci riuscito, test e android:sync riusciti. Nessuna dipendenza locale del progetto originale necessaria |
| Interfaccia | Percorsi provati in Chromium/Chrome con archivio sostitutivo. Home a 360/390/430 px in chiaro e scuro; undici schermate secondarie a 360/430 px nei due temi. Nessuno scorrimento orizzontale esterno o testo visibile sotto 12 px nei percorsi controllati. Dettagli in ESITO-INTERFACCIA.json |
| Funzioni interfaccia | Primo avvio, aggiunta di sette inizi, apertura metodo, diario conservato dopo riapertura, aggiunta visita/farmaco, esportazione e ripristino cifrato con conferma, PIN errato rifiutato e PIN corretto accettato. Nessun errore JavaScript nei percorsi provati. Questi test **non** esercitano i servizi Android |
| Compilazione Android | `assembleDebug` riuscito; successivamente `:app:assembleRelease` riuscito con firma di sola prova. Java del plugin locale e Kotlin/Java dei plugin compilati. Log release in COMPILAZIONE-ANDROID.txt |
| Firma locale di prova | `apksigner verify` riuscito, firma v2. Chiave temporanea con certificato `CN=Solo test locale Cosma`, mai inclusa nel progetto o ZIP. Esito in FIRMA-SOLO-TEST.txt. **Non è la chiave definitiva dell’utente e l’APK di questo test non viene distribuito** |
| Manifest effettivo APK release | `aapt dump permissions`: **INTERNET assente**. Presenti solo notifiche/allarmi/riavvio/biometria e permesso interno del ricevitore. Elenco in PERMESSI-APK.txt |
| Backup automatico | Manifest unito: allowBackup=false; regole cloud e trasferimento escludono tutti i domini previsti. Controllo statico, non prova di trasferimento fra telefoni |
| Notifiche dopo riavvio | Ricevitore del plugin presente nel codice e nel manifest unito; effettiva ricezione dopo riavvio non provata |
| Immagini originali | SHA-256 delle cinque immagini confrontati con i file forniti: identiche byte per byte. IMMAGINI-ORIGINALI.json |

L’ambiente SDK segnala una differenza tra versioni del formato XML degli strumenti; la compilazione è comunque terminata. I plugin segnalano deprecazioni Gradle/Android: sono avvisi, non errori nascosti. L’assenza della chiave impedisce intenzionalmente di produrre un APK release firmato: la compilazione finale di prova è stata eseguita fornendo una chiave temporanea esterna.

## Aggiornamento: compilazione su GitHub

Il 23 novembre 2026 è stata completata con successo la [compilazione GitHub Actions](https://github.com/CosmoNetinfo/Cosma/actions/runs/45124315508), commit `9b07f42`. I 19 test, installazione pulita, sincronizzazione Android, compilazione release, firma con chiave definitiva e controllo dell’assenza di INTERNET sono riusciti. L’APK è stato caricato come artifact `Cosma-Android-2`.

La precedente firma di sola prova rimane documentata come verifica locale storica. La firma usata su GitHub è quella definitiva documentata in FIRMA-DEFINITIVA.md. Il primo tentativo remoto si era fermato nell’installazione dell’SDK, prima della compilazione: il workflow ora evita il pacchetto `tools` ritirato.

Le versioni numerate vengono pubblicate nella [pagina Releases](https://github.com/CosmoNetinfo/Cosma/releases). Non è stato verificato un aggiornamento sul telefono. Vedi NON-VERIFICATO.md e PROVA-SUL-TELEFONO.md. I test matematici e il controllo del contrasto non equivalgono a validazione medica, collaudo completo di accessibilità o revisione indipendente della sicurezza.
