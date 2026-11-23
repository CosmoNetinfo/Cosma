# Cosma v1.1 per fasi

Si continua dalla prova.3. Il brief aggiuntivo è in BRIEF-COSMA-v1.1-DELTA.md. Ogni fase mantiene il codice esistente e ha un proprio commit, test e tag di prova.

## Fase 1, tag v1.0.0-prova.4

Solo sfondi piatti su Oggi: rosato nelle date di mestruazioni esplicitamente registrate; lilla con una nota azzurra negli altri giorni; neutro con dati assenti o fascia descrittiva già superata. Senza una fine registrata il rosato vale solo per il giorno d’inizio, secondo i dati già mostrati dall’app. Nessuna durata viene inventata.

Il colore non identifica fase follicolare, ovulazione, fase luteale o fertilità. La tinta quotidiana è soltanto estetica. Quando la fascia stimata è passata, il colore torna neutro senza spostare la previsione. Nelle altre pagine, nell’onboarding e nel blocco rimane la palette precedente. Tema automatico, chiaro e scuro sono mantenuti; nessun gradiente di sfondo.

Verifiche locali: 57 test Node, compresi quattro controlli nuovi sulle tinte, sui limiti della loro interpretazione e sul contrasto del testo almeno 4,5:1. Il test dell’interfaccia controlla anche cambio del tema di sistema, aggiunta/eliminazione di una data e ritorno allo sfondo ordinario fuori da Oggi. Il workflow del tag esegue nuovamente test e prova nativa prima di firmare l’APK. Sul telefono restano da verificare resa dei colori, leggibilità e aggiornamento sopra prova.3.

## Fase 2, tag v1.0.0-prova.6

Aggiunta la striscia di oggi e dei prossimi sei giorni sotto l’anello di Oggi. Cerchio pieno: mestruazioni registrate; tratteggio: fascia descrittiva dell’inizio, ripresa dal calendario esistente. Tutti i giorni della fascia visibili nella settimana vengono indicati, senza scegliere una data centrale. Se minimo e massimo coincidono rimane un simbolo tratteggiato, con descrizione esplicita “non una data certa”: non si inventa una variabilità ulteriore e non si trasforma il dato in certezza.

Toccando una data si apre il Calendario nel mese e nel giorno scelti. Da oggi si può aprire il diario; i giorni futuri restano consultabili senza registrazioni anticipate. I comandi misurano almeno 48 px, con numeri da 14 px, etichette e legenda da 12 px. A 360 px si usa lo stesso spazio laterale del calendario, senza allargare la pagina. La Home vuota mantiene il suo unico pulsante iniziale; la striscia compare quando c’è un inizio registrato. Il contenuto della Home continua a scorrere nello spazio separato da Cosma e dalla navigazione.

Nessun giorno fertile personale viene localizzato, neppure attivando la modalità fertilità o inserendo LH, muco e temperatura: la convenzione biologica −5/0 rimane soltanto nelle spiegazioni già esistenti. Non cambiano le formule, le registrazioni o la fascia stimata; le stime passate non vengono spostate.

Verifiche: 62 test Node, inclusi cinque controlli nuovi sulla settimana, sui cambi di mese/anno, bisestile e ora legale, sugli stati registrati/stimati e sull’assenza di deduzioni fertili. Il controllo dell’interfaccia verifica sette pulsanti, apertura del Calendario e del diario di oggi, impossibilità di registrare nel futuro e dimensioni minime in chiaro/scuro a 360/390/430 px. Il workflow del tag ripete i controlli e la prova Android prima della firma. Su telefono rimangono da verificare scorrimento, TalkBack e aggiornamento sopra prova.4.

La funzione è nel commit della prova.5. Un successivo commit di manutenzione, prova.6, seleziona esplicitamente il dialogo Android nel test di eliminazione: la prima esecuzione della prova.5 aveva incontrato un errore intermittente di focus, poi superato alla ripetizione. Il codice dell’app resta identico fra prova.5 e prova.6; nessun test di sicurezza è rimosso.

## Inventario e prossime fasi

| Richiesta del delta | Esistente nella prova.3 | Cosa manca |
|---|---|---|
| 1. Sfondi delicati | Palette minimale chiara/scura | Aggiunto nella fase 1, con le cautele sopra |
| 2. Settimana su Oggi | Calendario mensile e fascia descrittiva | Completata nella fase 2; nessuna localizzazione fertile automatica |
| 3–4. Azioni e registrazione rapida | Diario con selezioni multiple | Pulsanti tondi e pannello rapido; rapporti assenti dalla base |
| 5. Tocco su Cosma | Menu, aiuto contestuale e catalogo locale | Cambio posa e messaggio al tocco; senza rifare motore o tour |
| 6. Gesto nel calendario | Frecce del mese | Scorrimento laterale oltre alle frecce |
| 7. Consigli | Schede informative con fonti | Organizzazione delle schede senza dedurre una fase personale |
| 8. Onboarding | Primo avvio e tour di otto passi | Domanda per schermata, avanzamento e conclusione; conservare tour e importazione |
| 9. Linguaggio inclusivo | Gran parte dei testi già neutra | Verifica dei soli testi aggiunti e delle forme non necessarie |
| 10. F-Droid | Elenco dipendenze e licenze tecniche | Verifica specifica della compatibilità; licenza del progetto da decidere con Dany |

Le fasi successive alla settimana non fanno parte della prova.6. Il prossimo passo comprende azioni rapide e pannello di registrazione. Rimangono da ottenere export reali delle altre app, pose aggiuntive e prove su telefono; non vengono presentati come già verificati. Nessuna formula clinica è stata aggiunta nelle prime due fasi.
