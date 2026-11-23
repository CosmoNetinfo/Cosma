# Verifica preliminare F-Droid

23 novembre 2026. È un esame del progetto e delle dipendenze, non una certificazione o una richiesta di pubblicazione.

## Esito

**Cosma non è dichiarata pronta per F-Droid.** Il brief lascia la licenza del progetto a Dany: non è stata scelta al suo posto. Manca anche una dichiarazione di ridistribuzione delle immagini originali e delle nuove varianti. Non ho individuato un plugin diretto proprietario: i dieci pacchetti diretti dichiarano MIT nei file installati. Ciò non dimostra la riproducibilità dei binari nativi o l’accettazione da parte del catalogo.

La [policy ufficiale](https://f-droid.org/docs/Inclusion_Policy/) richiede software libero, sorgenti accessibili, dipendenze ammesse e licenze degli asset. La [guida di invio](https://f-droid.org/docs/Submitting_to_F-Droid_Quick_Start_Guide/) richiede anche metadati e una ricetta di compilazione. L’[uso della firma originale](https://f-droid.org/docs/Reproducible_Builds/) è un percorso possibile dopo la verifica riproducibile: **non si cambia la keystore di Cosma**.

## Componenti esaminati

- I plugin e il nucleo Capacitor sono elencati, con versione e licenza, in LICENZE-RUNTIME.json. I testi disponibili sono nella schermata Impostazioni → Licenze e componenti e in LICENZE-COMPONENTI.txt.
- SQLite comunitario usa SQLCipher Android 4.17.0 dalla dipendenza Maven del plugin. L’[autore distingue l’edizione Community BSD-style dalle commerciali](https://www.zetetic.net/sqlcipher/license/); i testi Community e Android sono in legal/. Non è stata ricompilata la libreria nativa a partire dal suo sorgente e non è stata verificata integralmente la provenienza di ogni componente crittografico integrato.
- Le coordinate native di produzione sono state risolte con Gradle offline. DIPENDENZE-ANDROID-RUNTIME.json riporta i riferimenti POM trovati: un riferimento di licenza nel POM non equivale a un controllo del contenuto del binario.
- Nei sorgenti Git non sono aggiunti AAR/SO di terzi. Il JAR del wrapper Gradle è già presente. I JAR generati nelle cartelle build e i pacchetti node_modules non fanno parte del repository.
- Le configurazioni esaminate usano Google Maven e Maven Central. Nessun SDK Firebase, pubblicitario o Play Services è stato individuato nelle coordinate risolte. AndroidX e Material sono componenti distinti da Play Services.
- Il workflow usa Node, Temurin JDK21, SDK36 e la firma esistente. Non è stata preparata né collaudata una ricetta su fdroidserver, né confrontato il risultato byte per byte con un rebuild indipendente. Non è stato usato uno scanner F-Droid.

## Cosa resta prima di proporla

Licenza del codice e degli asset; verifica dei binari nativi e delle dipendenze transitive; ricetta e confronto riproducibile; conferma dei requisiti di manutenzione da parte dei revisori. I metadati in fastlane/metadata/android/it-IT sono una base descrittiva, non un invio. Non è stato contattato nessuno.

La Release GitHub di prova resta installabile con la firma già configurata. Questa verifica non richiede di rigenerare chiavi, sostituire secrets o cambiare le protezioni dei dati.
