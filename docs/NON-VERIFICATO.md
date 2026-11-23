# Limiti e verifiche mancanti

Consegna preparata il 23 novembre 2026. Il dettaglio delle fonti consultate il 22 novembre è in FONTI.md.

## Android e distribuzione

- Nessun telefono reale collegato. Notifiche con app chiusa, riavvio, Doze, arresto forzato, spazio privato e impostazioni dei produttori non sono stati provati sul dispositivo.
- SQLite/Keystore, invalidazione della chiave biometrica quando cambia l’impronta, selettori file nativi, condivisione, PDF e tasto Indietro necessitano di prova nativa. I test browser non dimostrano questi comportamenti.
- Esclusioni dei backup automatici verificate nei file e nel manifest; non è stato eseguito un trasferimento fra telefoni o un ripristino cloud di un produttore.
- Nessuna verifica su tutte le WebView, versioni Android, impostazioni di accessibilità, ingrandimento caratteri, tastiere e dimensioni fisiche. L’interfaccia è stata controllata nelle condizioni elencate in ESITO-TEST.md.
- Il workflow è fornito e la compilazione locale è stata eseguita. Non è stato avviato un workflow remoto con i quattro segreti dell’utente; non è stata pubblicata una Release. La firma con la chiave definitiva e il relativo aggiornamento conservando i dati devono essere verificati dopo aver configurato i segreti.
- Il cambio nome/icona per una modalità camuffata non è implementato. Rimane l’opzione FLAG_SECURE.
- Le scadenze di backup sono predisposte per circa un anno e rinnovate all’apertura. Non si promettono notifiche perpetue dopo anni senza aprire l’app. Non sono garantiti allarmi puntuali in ogni condizione.
- Non è stata svolta una revisione indipendente della sicurezza o una certificazione sanitaria. La protezione hardware Keystore dipende dal dispositivo. Un telefono compromesso o sbloccato con credenziali note non è reso invulnerabile dall’app.

## Scienza e funzioni volutamente non automatiche

- Nessun modello clinicamente validato del prossimo ciclo. Il minimo/massimo è descrittivo, non un intervallo con una probabilità nota. I prossimi dati possono cadere fuori dalla fascia.
- Nessun algoritmo combinato validato personale per temperatura, muco e LH: niente data certa né intervallo retrospettivo numerico. I segnali grezzi restano disponibili. Non è stata inventata una regola “3 su 6”.
- Nessuna finestra fertile personale, neanche attivando la modalità fertilità; è stata corretta la convenzione biologica −5/0 nei testi e nei test, senza usarla per localizzare giorni individuali.
- Nessuna diagnosi da scale premestruali. La scala 0–3 è personale, non una traduzione validata del DRSP. Nessuna attribuzione causale dei sintomi al ciclo.
- Avvisi di salute: i riferimenti pubblicati e le regole di comparsa scelte dal prodotto sono distinti in FONTI.md. Contesto di gravidanza/puerperio e terapie non completamente classificato. Gravidanza e perimenopausa non sono modalità dedicate nella 1.0.
- Dossier: accesso integrale non completato per Flo/PMC7381001, protocolli completi Fertility UK e candidati elencati in FONTI.md; non ne vengono usati scoring o percentuali. Nessuna validazione di Cosma attribuita a ISS, OMS o altre istituzioni.
- Nessuna integrazione con dispositivi indossabili, ricostruzione delle terapie passate o verifica dell’assunzione dei farmaci.

Queste limitazioni sono mostrate anche in Fonti e metodo. Le prove matematiche garantiscono soltanto che le formule implementate producano i risultati attesi negli scenari testati.
