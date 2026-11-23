# Portare lo storico in Cosma

Ingranaggio → **Importa da un’altra app**, oppure Backup e dati. Il file viene letto sul telefono, senza caricamenti. Limite: 2 MB, 5.000 righe e 64 colonne. Le copie di prova in `tests/fixtures/importazione/` sono fittizie: non contengono dati personali.

## Cosa è stato verificato

Sono stati controllati i contenitori dichiarati nelle istruzioni ufficiali, non esportazioni personali reali. **Non promettiamo un importatore automatico già compatibile con ogni versione di Clue, Flo o Natural Cycles.** Le loro strutture possono cambiare. La mappatura chiede all’utente quale elenco e quali colonne usare; non assegna significati a nomi presunti.

| Provenienza | Come ottenere i dati | Verifica e limite |
|---|---|---|
| Clue | Altro → Impostazioni → Scarica i miei dati → Richiedi. Conserva la password, scarica ed estrai lo ZIP arrivato via email. | ZIP con password contenente JSON documentato. Nessun export personale reale provato. [Istruzioni ufficiali](https://support.helloclue.com/hc/en-us/articles/17320910724125-How-do-I-get-a-copy-of-my-Clue-data). |
| Flo | Avatar/Menu → Aiuto → Contattaci; richiedi JSON. | JSON e TXT documentati. TXT libero non supportato; chiedere JSON. Schema reale non verificato. [Istruzioni ufficiali](https://help.flo.health/hc/en-us/articles/360054973811-How-do-I-get-a-copy-of-my-data). |
| Natural Cycles | Richiedi il download dall’account, estrai il CSV delle registrazioni giornaliere dal primo archivio ricevuto. | Più CSV documentati, separati dal registro delle interazioni e dal report PDF. Nessun file reale provato. [Istruzioni ufficiali](https://help.naturalcycles.com/hc/en-us/articles/360006693938-How-to-download-your-Natural-Cycles-data). |
| Drip | Impostazioni → Dati → Esporta. Scegli il CSV. | La [FAQ ufficiale](https://dripapp.org/faq.html) documenta date ISO, flusso 0/1/2/3 e `bleeding.exclude`. Fixture sintetica con questi nomi, nessuna esportazione personale reale. |
| CSV generico | Esporta UTF-8, con virgola, punto e virgola oppure tabulazione. | Parser e mappatura verificati con dati finti, date italiane, BOM, note multilinea e virgolette. |
| Cosma | Backup e dati → Esporta JSON o CSV. | Schema aperto versione 1: test di andata e ritorno. Il backup cifrato completo resta una funzione separata. |

Ricerca aggiuntiva sulle altre app note: [Ovia](https://www.oviahealth.com/guide/323797/viewing-current-and-past-data-in-ovia/) documenta un’esportazione in fogli di calcolo, ma non abbiamo verificato CSV rispetto a XLSX né intestazioni. [Glow](https://glowing.com/) indica una richiesta di CSV al supporto nelle FAQ: schema non verificato. Per [Stardust](https://www.stardust.app/privacy-policy) e [Il mio Calendario Mestruale, Simple Design](https://play.google.com/store/apps/details?hl=it&id=com.popularapp.periodcalendar) non abbiamo verificato un formato di esportazione utilizzabile: nessun adattatore specifico dichiarato. Non è una classifica per diffusione.

## Passi nell’app

1. Estrai prima gli ZIP, anche quelli con password, con un’app locale di cui ti fidi. Cosma non decomprime archivi: nessuna ZIP bomb o percorso `../` viene estratto.
2. Scegli il CSV o JSON nel selettore Android. Se il JSON contiene più elenchi, seleziona quello delle registrazioni effettive. Gli altri restano esclusi. Sono leggibili oggetti annidati fino al limite del parser; strutture arbitrarie non tabellari richiedono una conversione locale.
3. Scegli **Inizi e fini dei cicli**, **Diario: flusso, misure e segnali** oppure annotazioni testuali. Specifica provenienza e formato della data. ISO, giorno/mese/anno e mese/giorno/anno sono scelte distinte: niente supposizioni sulle date ambigue. Orari e fusi non vengono convertiti automaticamente in una data civile.
4. Per il diario scegli solo i campi supportati. Temperatura in °C; per flusso, umore, muco e LH associa esplicitamente ogni valore del file a un valore di Cosma, oppure scegli Non importare. Sintomi multipli possono essere separati con `|` se corrispondono alla lista di Cosma. Non deduciamo inizi di ciclo da righe giornaliere di sanguinamento.
5. Controlla anteprima, date, campi ignorati, righe scartate, doppioni e intervalli sotto 15 o sopra 100 giorni. Queste sono soglie tecniche di controllo, non diagnosi. Puoi conservare gli intervalli o escludere quelli importati dalle statistiche. Per un intervallo che parte da una tua data già presente usa Gestisci i cicli.
6. **Unisci** è predefinito. Per i conflitti puoi tenere i tuoi dati o scegliere quelli importati. Per le note testuali Unisci accoda il testo con Tieni i miei; scegliendo Tieni importati sostituisce solo le note delle date in conflitto, conservando gli altri campi della giornata. **Sostituisci tutto** elimina cicli, diario, visite e farmaci correnti prima dell’importazione: richiede una conferma ulteriore; conserva tema, preferenze e protezione d’accesso.
7. Una sola transazione conserva la copia precedente insieme al nuovo archivio. La copia ha la stessa cifratura dell’archivio: Keystore Android e, se attivo, PIN. **Annulla importazione** è disponibile subito e in Backup e dati, anche dopo riapertura e sblocco. Torna all’intera copia precedente: rimuove anche eventuali modifiche fatte dopo l’importazione. L’importazione successiva sostituisce la copia precedente. Non sostituisce un backup su file; disinstallazione e Cancella tutto eliminano anche questa copia.
8. I dati importati mostrano la provenienza nel diario e nell’elenco dei cicli. Gli inizi reali entrano nei calcoli; il flusso giornaliero da solo non crea inizi. Il file sorgente non viene conservato da Cosma: valuta di eliminarlo dai Download.

Non vengono importati dati sessuali. I nomi chiaramente predittivi o sessuali vengono bloccati/ignorati e segnalati. Per nomi sconosciuti e valori senza etichetta serve il controllo dell’utente: nessun parser può garantire il significato di campi non documentati. Si richiede quindi di confermare che siano registrazioni effettive, senza previsioni. Le fixture non validano questa distinzione in tutti gli export commerciali.

Health Connect, importazione di screenshot, PDF e interpretazione automatica di testo libero non sono implementati. Nessun OCR o servizio online.
