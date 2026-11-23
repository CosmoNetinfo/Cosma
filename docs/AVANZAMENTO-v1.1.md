# Cosma v1.1 per fasi

Si continua dalla prova.3. Il brief aggiuntivo è in BRIEF-COSMA-v1.1-DELTA.md. Ogni fase mantiene il codice esistente e ha un proprio commit, test e tag di prova.

## Fase 1, tag v1.0.0-prova.4

Solo sfondi piatti su Oggi: rosato nelle date di mestruazioni esplicitamente registrate; lilla con una nota azzurra negli altri giorni; neutro con dati assenti o fascia descrittiva già superata. Senza una fine registrata il rosato vale solo per il giorno d’inizio, secondo i dati già mostrati dall’app. Nessuna durata viene inventata.

Il colore non identifica fase follicolare, ovulazione, fase luteale o fertilità. La tinta quotidiana è soltanto estetica. Quando la fascia stimata è passata, il colore torna neutro senza spostare la previsione. Nelle altre pagine, nell’onboarding e nel blocco rimane la palette precedente. Tema automatico, chiaro e scuro sono mantenuti; nessun gradiente di sfondo.

Verifiche locali: 57 test Node, compresi quattro controlli nuovi sulle tinte, sui limiti della loro interpretazione e sul contrasto del testo almeno 4,5:1. Il test dell’interfaccia controlla anche cambio del tema di sistema, aggiunta/eliminazione di una data e ritorno allo sfondo ordinario fuori da Oggi. Il workflow del tag esegue nuovamente test e prova nativa prima di firmare l’APK. Sul telefono restano da verificare resa dei colori, leggibilità e aggiornamento sopra prova.3.

## Inventario e prossime fasi

| Richiesta del delta | Esistente nella prova.3 | Cosa manca |
|---|---|---|
| 1. Sfondi delicati | Palette minimale chiara/scura | Aggiunto nella fase 1, con le cautele sopra |
| 2. Settimana su Oggi | Calendario mensile e fascia descrittiva | Striscia oggi + sei giorni; nessuna localizzazione fertile automatica |
| 3–4. Azioni e registrazione rapida | Diario con selezioni multiple | Pulsanti tondi e pannello rapido; rapporti assenti dalla base |
| 5. Tocco su Cosma | Menu, aiuto contestuale e catalogo locale | Cambio posa e messaggio al tocco; senza rifare motore o tour |
| 6. Gesto nel calendario | Frecce del mese | Scorrimento laterale oltre alle frecce |
| 7. Consigli | Schede informative con fonti | Organizzazione delle schede senza dedurre una fase personale |
| 8. Onboarding | Primo avvio e tour di otto passi | Domanda per schermata, avanzamento e conclusione; conservare tour e importazione |
| 9. Linguaggio inclusivo | Gran parte dei testi già neutra | Verifica dei soli testi aggiunti e delle forme non necessarie |
| 10. F-Droid | Elenco dipendenze e licenze tecniche | Verifica specifica della compatibilità; licenza del progetto da decidere con Dany |

Le fasi successive non fanno parte della prova.4. Rimangono da ottenere export reali delle altre app, pose aggiuntive e prove su telefono; non vengono presentati come già verificati. Nessuna nuova ricerca clinica o modifica delle formule è necessaria per questa fase grafica.
