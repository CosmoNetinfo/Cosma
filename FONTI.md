# Cosma — Fonti e metodo, versione Android 1.0 di prova

Aggiornamento 23 novembre 2026: per la mascotte si usa il catalogo locale `messaggi-cosma.md`; nessuna diagnosi, terapia, percentuale personale o nuova formula clinica. La raccomandazione NICE è **1.18.9**, non 1.18.8: il testo è stato riconfermato nell’indice del PDF ufficiale. In questa consultazione l’apertura diretta NICE/PMC ha restituito 403 o una verifica anti-bot; non viene dichiarata una nuova lettura integrale. Per FIGO è disponibile anche la copia dell’articolo nel [repository universitario dell’autore](https://escholarship.org/content/qt8p25g622/qt8p25g622.pdf). Le verifiche dettagliate sotto si riferiscono alla ricerca del 22 novembre.

Consultazione: **22 novembre 2026**. “Verificato” indica quale materiale è stato effettivamente controllato, non una revisione clinica indipendente. Ricerca mirata, non revisione sistematica. Nessuna fonte qui elencata valida clinicamente Cosma. Il dossier fornito dall'utente è stato trattato come una lista di candidati, non come evidenza già verificata.

## Fonti principali e funzione nell’app

Fonti tecniche per l’importazione, consultate il 23 novembre: [Clue](https://support.helloclue.com/hc/en-us/articles/17320910724125-How-do-I-get-a-copy-of-my-Clue-data), [Flo](https://help.flo.health/hc/en-us/articles/360054973811-How-do-I-get-a-copy-of-my-data), [Natural Cycles](https://help.naturalcycles.com/hc/en-us/articles/360006693938-How-to-download-your-Natural-Cycles-data), [Drip](https://dripapp.org/faq.html). Confermano contenitori e istruzioni, non la compatibilità universale degli schemi: nessun export personale reale provato. Dettagli e limiti in `docs/IMPORTAZIONE.md`. Non sono fonti cliniche per formule o soglie.

### S01 — Limiti dei grafici della temperatura

**NICE. Fertility problems: assessment and treatment. NG257. 31 marzo 2026.**

- [Linea guida definitiva, PDF ufficiale](https://www.nice.org.uk/guidance/ng257/resources/fertility-problems-assessment-and-treatment-pdf-66144022104517).
- Verifica: testo della **raccomandazione 1.18.9, pagina 27 del PDF**. Il testo inglese è: “Do not use basal body temperature charts to confirm ovulation because they do not reliably predict ovulation.”
- Funzione: schermata Segnali e spiegazione dei limiti della lettura retrospettiva. Nessuna conferma clinica derivata dalla BBT.
- Correzione al dossier utente: 1.18.8 è il riferimento sbagliato per questo contenuto. NG257 sostituisce la vecchia CG156; non usiamo una bozza di consultazione come raccomandazione vigente.

### S02 — Sanguinamento: terminologia FIGO

**Munro MG, Critchley HOD, Fraser IS, per il FIGO Menstrual Disorders Committee. The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes of abnormal uterine bleeding in the reproductive years: 2018 revisions. International Journal of Gynecology & Obstetrics. 2018;143(3):393–408. DOI 10.1002/ijgo.12666.**

- [Testo dell'editore](https://obgyn.onlinelibrary.wiley.com/doi/10.1002/ijgo.12666).
- Verifica: testo e tabella delle revisioni disponibili presso l'editore; pagina segnala un corrigendum. La tabella online è già annotata con le correzioni; il corrigendum separato ha restituito accesso negato.
- Funzione: linguaggio delle statistiche e riferimento generale per gli avvisi sulle adulte. Non un classificatore diagnostico.

### S03 — Applicazione descrittiva di FIGO System 1

**Jain V, Munro MG, Critchley HOD. Contemporary evaluation of women and girls with abnormal uterine bleeding: FIGO Systems 1 and 2. International Journal of Gynecology & Obstetrics. 2023;162(Suppl 2):29–42. DOI 10.1002/ijgo.14946. PMID 37538019.**

- [Testo integrale su PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10952771/).
- Verifica: sezioni Frequency, Duration, Regularity, Flow volume e nota della figura 1. Il sistema distingue frequenza, durata, regolarità e flusso percepito; i riferimenti di regolarità dipendono dall'età.
- Funzione: struttura di Statistiche e schede informative. I riferimenti non si applicano indistintamente a gravidanza, puerperio o sanguinamenti da terapia ormonale. Non convertiremo il flusso soggettivo in millilitri.

### S04 — Adolescenza distinta dall'età adulta

**American College of Obstetricians and Gynecologists, Committee on Adolescent Health Care. Committee Opinion No. 651: Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign. Obstetrics & Gynecology. 2015;126(6):e143–e146. DOI 10.1097/AOG.0000000000001215.**

- [Pubblicazione originale](https://doi.org/10.1097/AOG.0000000000001215).
- [FAQ ufficiale ACOG: Your First Period](https://www.acog.org/womens-health/faqs/your-first-period).
- Verifica: abstract e passaggi della pubblicazione disponibili, oltre alla FAQ ufficiale sul riferimento 21–45 giorni. L'accesso diretto alla pagina clinical-guidance ACOG è stato limitato; non dichiaro una lettura integrale di quella pagina.
- Funzione: evitare soglie delle adulte applicate automaticamente alle adolescenti. Fascia d'età e contesto saranno richiesti prima di abilitare avvisi numerici specifici.

### S05 — Finestra biologica rispetto all'ovulazione

**Wilcox AJ, Weinberg CR, Baird DD. Timing of sexual intercourse in relation to ovulation. Effects on the probability of conception, survival of the pregnancy, and sex of the baby. New England Journal of Medicine. 1995;333(23):1517–1521. DOI 10.1056/NEJM199512073332301. PMID 7477165.**

- [PubMed](https://pubmed.ncbi.nlm.nih.gov/7477165/), [articolo dell'editore](https://www.nejm.org/doi/full/10.1056/NEJM199512073332301).
- Verifica: metadati, abstract e sezioni Results/Discussion disponibili presso l'editore. La fascia di sei giorni termina nel giorno di ovulazione stimato nello studio.
- Funzione: correggere la convenzione della v0.2 da −5/+1 a **−5/0**. Non permette di ricavare automaticamente quei giorni per una persona da un calendario. Non dimostra un rischio individuale nullo fuori da una fascia prevista.

### S06 — Variabilità della collocazione dei giorni fertili

**Wilcox AJ, Dunson D, Baird DD. The timing of the “fertile window” in the menstrual cycle: day specific estimates from a prospective study. BMJ. 2000;321:1259–1262. DOI 10.1136/bmj.321.7271.1259.**

- [PDF originale BMJ](https://www.bmj.com/content/bmj/321/7271/1259.full.pdf).
- Verifica: metodi e risultati disponibili nel PDF. 221 partecipanti arruolate; l'algoritmo stima il giorno dell'ovulazione in 696 cicli di 213 partecipanti. Distinguere il campione iniziale da quello analizzato.
- Funzione: avviso sui limiti del calendario. Le percentuali descrivono la coorte e l'appartenenza alla finestra, non la probabilità individuale di gravidanza in Cosma.

### S07 — Dati reali di ciclo: distribuzione, non previsione individuale

**Bull JR, Rowland SP, Scherwitzl EB, Scherwitzl R, Gemzell Danielsson K, Harper J. Real-world menstrual cycle characteristics of more than 600,000 menstrual cycles. npj Digital Medicine. 2019;2:83. DOI 10.1038/s41746-019-0152-7. PMID 31482137.**

- [Testo integrale su PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6710244/).
- Verifica: campione, criteri di inclusione, tabella 1, discussione e affiliazioni. Dati di utenti di Natural Cycles, con autori affiliati all'azienda; campione autoselezionato e cicli selezionati per qualità/completamento delle misure.
- Funzione: spiegare variabilità e limiti di −14. Le statistiche di popolazione non diventano percentuali individuali, intervalli calibrati o certificazione di Cosma.

### S08 — Accuratezza dei metodi basati solo sul calendario

**Johnson S, Marriott L, Zinaman M. Can apps and calendar methods predict ovulation with accuracy? Current Medical Research and Opinion. 2018;34(9):1587–1594. DOI 10.1080/03007995.2018.1475348. PMID 29749274.**

- [PubMed](https://pubmed.ncbi.nlm.nih.gov/29749274/), [editore](https://www.tandfonline.com/doi/full/10.1080/03007995.2018.1475348).
- Verifica: abstract, metodi e risultati resi disponibili dalle pagine primarie. Studio con raccolta di urine in un ciclo; autori con affiliazioni anche a un'azienda del settore.
- Funzione: giustificare l'assenza di una data individuale di ovulazione dal solo calendario. Il risultato del 21% non misura Cosma e non viene mostrato come accuratezza delle app odierne.

### S09 — Audit delle app, non validazione di Cosma

**Ali R, Gürtin ZB, Harper JC. Do fertility tracking applications offer women useful information about their fertile window? Reproductive BioMedicine Online. Pubblicazione online 2020. DOI 10.1016/j.rbmo.2020.09.005. PMID 34756400.**

- [Record PubMed](https://pubmed.ncbi.nlm.nih.gov/34756400/), [manoscritto nel repository UCL](https://discovery.ucl.ac.uk/id/eprint/10114466/1/Ali%20et%20al%2C%202020.pdf).
- Verifica: record e abstract online, metadati e testo del manoscritto consultabile nel repository degli autori. Audit esplorativo trasversale: 90 app incluse nella revisione completa su 200 candidate.
- Funzione: motivare trasparenza dei metodi e registrazione facoltativa dei segnali. Non fornisce la formula di un algoritmo validato per Cosma. Anno online distinto dall'anno 2021 indicato nel dossier; non aggiungo volume o pagine non verificati.

### S10 — Segnali e valutazione clinica della fertilità

**Practice Committee of the American Society for Reproductive Medicine. Fertility evaluation of infertile women: a committee opinion. ASRM / Fertility and Sterility, 2026.**

- [Testo ufficiale aggiornato](https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026).
- Verifica: versione dichiarata sostitutiva del documento 2021; sezioni Ovulation predictor kits, Daily basal body temperature e tabella 4. La pagina riporta ancora segnaposto per volume/pagine, che non vengono inventati.
- Funzione: descrivere LH come segnale indiretto e la BBT come dato imperfetto; separare registrazione, compatibilità dei segnali e valutazione clinica. Non prescrivere test né trasferire protocolli di infertilità a tutte le utenti.

### S11 — Flusso percepito e qualità di vita

**NICE. Heavy menstrual bleeding: assessment and management. NG88. 2018; ultimo aggiornamento indicato sulla pagina consultata: 24 maggio 2021.**

- [Raccomandazioni ufficiali](https://www.nice.org.uk/guidance/ng88/chapter/Recommendations).
- Verifica: §§1.1.1, 1.2.1 e 1.2.2. Attenzione a impatto personale e variabilità naturale.
- Funzione: schede su flusso abbondante e invito a parlarne, senza quantificare una perdita da selezioni “leggero/medio/abbondante”. Non confermata la revisione 2024 riportata nel dossier.

### S12 — Assenza prolungata di mestruazioni

**Practice Committee of the American Society for Reproductive Medicine. Current evaluation of amenorrhea: a committee opinion. Fertility and Sterility. 2024;122:52–61.**

- [Testo ufficiale](https://www.asrm.org/practice-guidance/practice-committee-documents/current-evaluation-of-amenorrhea/).
- Verifica: definizioni e indicazioni introduttive. Le soglie dipendono dal ritmo precedente e dal contesto; non viene applicato un unico numero a tutte le persone.
- Funzione: contenuto informativo e invito a una valutazione, senza una diagnosi automatica di amenorrea o gravidanza.

### S13 — Dolore e impatto quotidiano

**NICE. Endometriosis: diagnosis and management. NG73. Raccomandazioni ufficiali, incluse modifiche 2024.**

- [Raccomandazioni](https://www.nice.org.uk/guidance/ng73/chapter/Recommendations).
- Verifica: elenco dei sintomi, incluso dolore mestruale che incide sulle attività o sulla qualità di vita.
- Funzione: suggerire un colloquio sanitario per dolore importante. La scala 0–10 di Cosma è una registrazione soggettiva e non diagnostica endometriosi.

### S14 — Metodi di consapevolezza e contraccezione

**Peragallo Urrutia R, Polis CB, Jensen ET, Greene ME, Kennedy E, Stanford JB. Effectiveness of Fertility Awareness–Based Methods for Pregnancy Prevention: A Systematic Review. Obstetrics & Gynecology. 2018;132(3):591–604. DOI 10.1097/AOG.0000000000002784.**

- [Articolo originale](https://doi.org/10.1097/AOG.0000000000002784).
- Verifica: abstract, selezione degli studi e risultati disponibili dall'editore. Efficacia variabile e qualità degli studi non elevata; i diversi tassi e probabilità non vanno confusi o trasferiti a un'altra app.
- Funzione: motivare il divieto di presentare Cosma come contraccettiva; nessuna percentuale di efficacia attribuita a Cosma.

### S15 — Contesto OMS

**World Health Organization. Selected practice recommendations for contraceptive use. Fourth edition. 2025.**

- [Scheda ufficiale OMS](https://www.who.int/publications/b/81080).
- Verifica: edizione, anno e ambito della scheda ufficiale, non lettura integrale del manuale.
- Funzione: contesto dei metodi contraccettivi e necessità di istruzioni specifiche per metodo. Non è usata come fonte di una nuova formula di ovulazione né per inventare istruzioni su pillola, anello o spirale.

### S16 — Statistica descrittiva

**NIST/SEMATECH. e-Handbook of Statistical Methods, §1.3.5.6, Measures of Scale. S.d.; consultato il 22 novembre 2026.**

- [Definizioni e formule](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm).
- Verifica: deviazione standard campionaria e misure di dispersione.
- Funzione: media, minimo/massimo e dispersione osservata in Statistiche. **Non valida la proiezione del prossimo ciclo, un margine di errore medico o una probabilità.** Il rango osservato usato nel mockup è una scelta descrittiva esplicitamente approvata dall'utente.

## Fonti italiane cercate e limiti

- **Ministero della Salute, “11–20 anni”**, [pagina ufficiale](https://www.salute.gov.it/new/it/tema/salute-della-donna/11-20-anni/), s.d., consultata il 22 novembre 2026: verificata l'indicazione ai consultori e al colloquio medico per irregolarità o dolore. Uso previsto: orientamento ai servizi, senza copiare associazioni come diagnosi.
- **ISS, “Concepire un figlio”**, [pagina istituzionale](https://www.iss.it/tecniche-di-procreazione-medicalmente-assistita/-/asset_publisher/RrcICIqW1zD1/content/concepire-un-figlio): reperita una pagina divulgativa datata con semplificazioni sul giorno 14. **Non usata per formule, soglie o certezza dell'ovulazione.** Non ne deduco che ISS abbia validato Cosma.
- Ricerca su **SIGO, AOGOI ed Epicentro**: nessun protocollo pubblico specifico per l'algoritmo richiesto identificato in questa ricerca mirata. Nessuna citazione istituzionale generica aggiunta per dare autorità a regole non verificate.

## Altri candidati del dossier, non usati per formule o numeri nell’app

- **Faust L et al.**, *Findings from a mobile application-based cohort are consistent with established knowledge of the menstrual cycle, fertile window, and conception*, Fertility and Sterility 2019;112(3):450–457.e3, DOI 10.1016/j.fertnstert.2019.05.008, [PMID 31272722](https://pubmed.ncbi.nlm.nih.gov/31272722/): metadati e abstract verificati; coorte Ovia con autori affiliati all'azienda. Non trasferiamo probabilità alla singola utente.
- **Fertility UK, Downloads / Guidelines**, [pagina originale](https://www.fertilityuk.org/new-page-3): verificata la presenza di materiali per uso personale. Non verificati qui protocollo completo versione agosto 2023, gestione di tutte le eccezioni e autorizzazione a riprodurre le istruzioni in un'app. Non è una linea guida NICE; una regola “3 su 6” non viene inventata né incorporata come validazione clinica.
- **PMC7381001 (Flo)**: accesso diretto limitato da controllo del browser; non completata qui la verifica integrale e non usate le percentuali del dossier. In ogni caso dati di un'altra azienda non sarebbero una validazione indipendente di Cosma.
- **Guermandi et al., 2001**: reperiti titolo, abstract e DOI 10.1016/S0029-7844(00)01083-8. Per i limiti di LH/BBT preferiamo la sintesi clinica ASRM 2026; non copiamo percentuali dalla sintesi AAFP citata nel dossier.
- Lenton 1977, PMID 7308516, PMID 11510707, PMC6265623, Scarpa 2006, DOI 10.1093/humrep/deab049, Hofmeister/Bodden e DRSP: non verificati integralmente in questa ricerca; **nessun risultato numerico, scoring o soglia derivata viene usato**. Non si attribuiscono a questi riferimenti formule che non abbiamo controllato.

## Cosa resta non validato

La previsione clinica di Cosma; copertura del prossimo ciclo tramite media ± deviazione standard o minimo/massimo; un intervallo numerico retrospettivo personale da temperatura, muco e LH; personalizzazione automatica della fase luteale; probabilità personale di gravidanza; un algoritmo di finestra fertile ampia. L’app dichiara i limiti o mostra “intervallo non stimabile”. Le associazioni operative sono riportate sotto; fonti e matematica non sostituiscono una validazione clinica.

## S00 — Metodo effettivamente implementato, non validazione clinica

- Giorno: distanza civile UTC dal più recente inizio registrato più uno; nessuna fase ormonale dedotta dall’anello. L’arco è un’indicazione grafica rispetto alla durata media arrotondata (o al valore iniziale con pochi dati), saturata per evitare giri multipli. Non è un indicatore di fertilità.
- Durata del ciclo: distanza fra inizi consecutivi. Sanguinamento: fine meno inizio più uno, solo con fine esplicita.
- Proiezione: ultimi sei intervalli completi non esclusi manualmente, minimo e massimo aggiunti all’ultimo inizio. Con meno di tre intervalli nessuna proiezione. Se gli estremi coincidono si mostra il dato osservato, senza inventare incertezza. La prossima mestruazione può cadere fuori dalla fascia. La data non slitta automaticamente se è passata.
- Media aritmetica e deviazione standard campionaria (denominatore n−1), solo descrittive in Statistiche. Nessuna probabilità, percentuale di successo o intervallo di confidenza. La finestra di sei intervalli e il minimo di tre sono scelte di prodotto, non soglie cliniche validate (S16, contesto S07).
- Esclusioni: scelte dalla persona, visibili e reversibili; nessun intervallo viene scartato automaticamente per durata.
- Finestra relativa −5/0 (S05): funzione didattica verificata dai test, non applicata al calendario personale. La modalità fertilità abilita i dati grezzi, senza un algoritmo personale non validato.
- BBT, muco, LH: grafico e dati originali, nessuna conferma clinica o intervallo retrospettivo numerico (S01, S10). Il testo “segnali compatibili con ovulazione” descrive il significato possibile delle osservazioni, non certifica che siano presenti nella persona.
- Scala quotidiana personale 0–3, sei voci: non DRSP, non strumento diagnostico. I giorni mancanti rimangono mancanti. Nessuna diagnosi di sindrome o disturbo premestruale.
- Avvisi: riferimento adulte 24–38 giorni e sanguinamento oltre 8 giorni (S02–S03); adolescente 21–45 e oltre 7 (S04). Avviso dopo almeno due degli ultimi tre intervalli fuori riferimento: questa regola di comparsa è una scelta di prodotto, non una soglia clinica convalidata. La frequenza non viene classificata con metodo contraccettivo registrato; gravidanza e puerperio non sono identificati automaticamente.
- Almeno 90 giorni senza nuovo inizio: promemoria prudente di colloquio, può trattarsi di dati mancanti. S12 distingue il contesto precedente e non valida un’unica soglia per tutte. Impatto personale sulle attività ≥2: invito a parlarne, senza diagnosi (S13 è contesto sul dolore, non validazione di questa scala).
- Limite completo in “Come l’ho calcolato?” e “Fonti e metodo”: “Stima basata sui tuoi cicli passati. Può cambiare, non è una previsione medica.” Nella Home resta la riga compatta approvata.

## Riferimenti tecnici Android

Versioni dei pacchetti controllate nel registro npm il 22 novembre 2026 e fissate in package-lock.json. Compilazione nativa verificata come indicato in docs/ESITO-TEST.md, non confondere una compilazione con un test sul telefono.

- Capacitor: https://capacitorjs.com/docs/android ; Java 21 richiesto anche dai build.gradle dei pacchetti 8.6.2 effettivamente installati. SDK compilazione e destinazione 36, minimo 24.
- Notifiche locali: https://capacitorjs.com/docs/apis/local-notifications . POST_NOTIFICATIONS per Android 13+, SCHEDULE_EXACT_ALARM per accesso speciale agli allarmi esatti; nessun USE_EXACT_ALARM. Il plugin contiene LocalNotificationRestoreReceiver per BOOT_COMPLETED. L’utente può negare gli allarmi esatti: i promemoria possono ritardare.
- Allarmi Android: https://developer.android.com/develop/background-work/services/alarms . Arresto forzato, Doze, riavvio e modifiche dell’autorizzazione richiedono le verifiche della checklist, non promesse di puntualità assoluta.
- Biometria: https://developer.android.com/identity/sign-in/biometric-auth ; plugin mantenuto @aparajita/capacitor-biometric-auth 10.0.0. Chiave Android Keystore con autorizzazione biometrica forte, PIN alternativo; nessuna esportazione del segreto biometrico nel backup.
- Keystore: https://developer.android.com/privacy-and-security/keystore . AES-GCM per il documento SQLite; la protezione hardware dipende dal dispositivo, non viene dichiarata universale.
- Backup Android: https://developer.android.com/identity/data/autobackup . allowBackup=false più esclusioni cloud e device-transfer; differenze dei produttori da controllare sul telefono.
- Firma APK: https://developer.android.com/studio/publish/app-signing . Una chiave fissa è indispensabile per aggiornare l’app; una chiave persa non è recuperabile da Cosma.

## Categorie e immagini del Diario, estensione prova.9

Le categorie supplementari sono etichette di auto-osservazione richieste dall’utente a partire da riferimenti grafici. Non sono criteri diagnostici, non hanno sensibilità o specificità dimostrate e non costituiscono un questionario validato. Non generano diagnosi, giorni fertili o modifiche delle formule. Un’icona di Cosma rappresenta un modo di registrare come ci si sente; non dimostra una causa né un legame con una fase del ciclo. Le espressioni sono state mantenute descrittive (per esempio Umore basso, Pensieri ripetitivi), senza assegnare una patologia. S00: scelta di interfaccia e richiesta dell’utente, non fonte clinica.
