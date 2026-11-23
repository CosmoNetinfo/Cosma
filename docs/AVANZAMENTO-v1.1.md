# Cosma v1.1 per fasi

## Fase 3–4 e icone richieste, prova.9

Completati i tre pulsanti tondi su Oggi e il pannello dal basso: le selezioni di flusso, umore e sintomi si salvano al tocco; le note hanno il loro comando di salvataggio. Il Diario ha categorie e pulsanti illustrati sul modello dei riferimenti forniti. Le figure umane sono sostituite da sette nuove varianti di Cosma, generate su richiesta esplicita dell’utente, conservando intatte le nove immagini originali. Master e prompt sono in design/mascotte-sintomi; icone a 160/320 px in src/; provenienza e hash in docs/POSE-SINTOMI.json.

Aggiunte registrazioni facoltative di attività e contesto, nuove etichette di sintomi e umore, perdite vaginali e rapporti/desiderio. Questi ultimi sono spenti all’inizio, attivabili nelle categorie e assenti dai pulsanti di base: compaiono soltanto dopo la scelta esplicita. L’importazione aperta Cosma richiede un consenso separato per includerli, mentre il backup cifrato conserva l’intero archivio. Nessuna etichetta è una diagnosi o una scala validata. La ricerca non cancella i valori temporaneamente nascosti. Vecchi valori e nuove categorie convivono; JSON/CSV mantengono le registrazioni.

76 test Node e controlli dell’interfaccia locali superati, incluse nuove prove del pannello, consenso, categorie e risoluzioni delle immagini. I calcoli da analysis fino a healthNotices sono identici alla prova.8, verificati in FORMULE-CONSERVATE.json. Le modifiche a domain.js riguardano solo cataloghi e normalizzazione delle registrazioni. Chiave, secrets, plugin, permessi, cifratura e notifiche non sono modificati.

Prossime parti da completare prima della Release complessiva richiesta: tocco diretto su Cosma, calendario a scorrimento e vista annuale, consigli organizzati, primo avvio a passi e verifica F-Droid. Restano necessarie le prove fisiche descritte nella checklist.


## Revisione grafica e nuovo Diario, prova.8

L’utente ha chiesto una resa più curata, parole fuori dall’anello e un Diario organizzato come le immagini di riferimento Flo. Modifiche: dentro l’anello rimane solo il numero, con “Giorno del ciclo” in una riga esterna; tipografia e spazi comuni sono rivisti; il Diario ha fondo neutro, ricerca locale, quattro scorciatoie illustrate, categorie in schede bianche e pulsanti pastello con icone SVG locali. Le quattro pose di Cosma restano originali e intere. Non sono stati copiati gli asset di Flo. La Home presenta prima stima e azione principale, poi la settimana.

Ricerca e scorciatoie usano le categorie già presenti; i valori salvati, le date, il formato dei dati e i calcoli sono conservati. Cercare una voce non elimina i valori nascosti al salvataggio. Il calendario usa già il primo giorno registrato come riferimento e ricalcola la fascia descrittiva quando lo si modifica; un nuovo controllo dell’interfaccia verifica gli estremi dopo una correzione. Non vengono inventati giorni futuri di flusso o localizzazioni fertili.

Verifiche locali: 69 test Node, controlli dell’interfaccia aggiornati, ricerca e persistenza anche dei campi facoltativi, scritte separate nei percorsi provati, due temi e schermi da 360 a 430 px, compilazione dei test Android riuscita. La prova.7 non ha prodotto un APK: il test nativo aspettava ancora l’immagine del volto. Nella prova.8 quel controllo verifica una delle quattro pose originali, descrizione accessibile e immagine caricata; gli altri controlli nativi restano presenti. Per i risultati effettivi sull’emulatore e la firma consultare la Release v1.0.0-prova.8.

Restano a fasi successive: pannelli rapidi dal basso, ulteriori categorie dei riferimenti (rapporti facoltativi, digestione, attività e nuovi sintomi), vista annuale e calendario su più mesi, gesto laterale, organizzazione dei consigli, onboarding a passi e verifica F-Droid. La nuova grafica non certifica la compatibilità su ogni telefono o con ogni impostazione dei caratteri Android.


## Revisione degli spazi e delle pose, prova.7

Richiesta successiva dell’utente: eliminare i tagli, rendere la Home meno spoglia e dare a Cosma più pose in ogni pagina. La prova.7 conserva le funzioni della fase 2 e sostituisce la fascia fissa dell’assistente con una presenza nel contenuto: intera accanto all’anello nella Home, piccola e intera accanto al titolo nelle altre pagine, fumetti nel contenuto scorrevole. Il tour mantiene uno spazio riservato ai suoi controlli. Le quattro immagini restano identiche; “Cambia posa” nel menu cambia l’immagine solo nella sessione. Le pose contestuali non costituiscono diagnosi o nuove deduzioni. Restano frequenza, orari, modalità di presenza e catalogo esistenti.

Verifiche locali: 65 test Node e controlli dell’interfaccia nei due temi a 360/390/430 px, apertura completa della scheda della stima, titolo visibile dopo il tour, sette comandi della settimana interamente nel viewport e cambio posa manuale nel Diario. La prova Android e la firma dell’APK effettivo si consultano nella Release v1.0.0-prova.7. Nessuna prova su telefono reale è stata effettuata. Le azioni rapide e il pannello di registrazione restano il prossimo passo.


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
