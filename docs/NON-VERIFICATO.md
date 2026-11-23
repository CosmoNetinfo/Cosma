# Limiti e verifiche mancanti

Consegna preparata il 23 novembre 2026. Il dettaglio delle fonti consultate il 22 novembre è in FONTI.md.

## Android e distribuzione

- Nessun telefono reale collegato. Notifiche con app chiusa, riavvio, Doze, arresto forzato, spazio privato e impostazioni dei produttori non sono stati provati sul dispositivo.
- Aggiornamento prova.2: inizializzazione da schema incompleto, salvataggio e riapertura SQLite con cifratura Keystore di base verificati su emulatore Android API 35. Restano da provare invalidazione della chiave biometrica quando cambia l’impronta, selettori file nativi, condivisione, PDF e tasto Indietro. I test browser non dimostrano questi comportamenti; l’emulatore non sostituisce il telefono reale.
- Esclusioni dei backup automatici verificate nei file e nel manifest; non è stato eseguito un trasferimento fra telefoni o un ripristino cloud di un produttore.
- Nessuna verifica su tutte le WebView, versioni Android, impostazioni di accessibilità, ingrandimento caratteri, tastiere e dimensioni fisiche. L’interfaccia è stata controllata nelle condizioni elencate in ESITO-TEST.md.
- Aggiornamento 23 novembre 2026: workflow remoto eseguito con successo con i quattro secrets e la firma definitiva; [esecuzione verificata](https://github.com/CosmoNetinfo/Cosma/actions/runs/45124315508). L’aggiornamento di un’installazione reale conservando i dati deve ancora essere provato sul telefono. Le versioni numerate sono distribuite attraverso la [pagina Releases](https://github.com/CosmoNetinfo/Cosma/releases).
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
