# Cosma v1.1 — cosa cambia rispetto alla prova.3 (NON ripartire da zero)

## 0. Regola principale
**Si continua dal repository https://github.com/CosmoNetinfo/Cosma (versione 1.0.0-prova.3, codice Android 10010).** Prima di tutto leggi `docs/CONTINUA-DA-QUI.md`, `README.md`, `docs/NON-VERIFICATO.md`, `FONTI.md`, `messaggi-cosma.md` e controlla commit e Release successivi.

**Non rifare, non rimettere in discussione** (già fatto e testato):
- Progetto Capacitor Android, workflow GitHub Actions, firma definitiva e i 4 secrets. **Non creare una nuova keystore, non cambiare i secrets, non cambiare appId.** Gli aggiornamenti si installano sopra senza cancellare i dati.
- Privacy tecnica: nessun INTERNET, allowBackup=false, regole di esclusione dei backup, SQLite cifrato con Keystore, PIN/biometria, backup cifrato, PDF, esportazione JSON/CSV.
- Calcoli e test (53 test Node, test interfaccia, 2 test su emulatore API 35), "Come l'ho calcolato?", Fonti e metodo, FONTI.md, docs/NON-VERIFICATO.md.
- Mascotte intera su Oggi, volto altrove, fumetti, tre livelli di presenza, tour di 8 passi, motore di messaggi locale, 4 pose + 5 immagini precedenti (identiche, mai ritoccate).
- Importazione (mappatura, anteprima, Unisci/Sostituisci, annullamento, fixture sintetiche).
- Navigazione attuale: Oggi · Calendario · Diario · Salute, impostazioni dall'ingranaggio.
- Stile minimale approvato.

Regole scientifiche e di privacy: restano quelle già implementate (nessun −14 fisso, nessuna finestra fertile personale dal calendario, mai "ovulazione confermata", mestruazioni come fascia minimo/massimo con almeno 3 intervalli, soglie FIGO). **Non allentarle.**

## 1. Novità richieste (idee dal brief «calda e interattiva» da integrare, se non già presenti)
Controlla prima nel codice cosa c'è già; fai solo ciò che manca. Ogni voce deve restare coerente con le regole sopra.
1. **Più calore, stesso rigore**: tinte piatte e delicate per fase sullo sfondo di Oggi (rosato mestruazioni, viola/azzurro chiaro altrove, neutro in caso di ritardo), contrasto verificato in chiaro e scuro. **Niente gradienti di sfondo.**
2. **Striscia della settimana** in Oggi (oggi + 6 giorni): cerchio pieno = mestruazioni registrate; tratteggiato = fascia stimata (mai un solo giorno certo). Giorni fertili **solo** con "Conoscere la mia fertilità" attiva o con segnali registrati, e solo come convenzione −5/0 senza localizzazione automatica.
3. **Pulsanti tondi di azione rapida** su Oggi (mestruazioni, sintomi, note/test). "Rapporti" solo come opzione facoltativa spenta di default, mai nei pulsanti di base.
4. **Registrazione rapida con 2 tocchi** (pannello dal basso con icone tonde a scelta multipla, umore con faccine, flusso con gocce) e domande poste anche da Cosma.
5. **Tocco su Cosma**: cambia posa e dice una cosa (consiglio del giorno, informazione sulla fase, domanda su come stai), tutto offline dal catalogo `messaggi-cosma.md` con fonte per ogni frase che afferma un fatto. Usa solo le pose esistenti; elenca nel README le pose mancanti (curiosa, pensierosa, che festeggia, che indica, allegra).
6. **Swipe laterale** nel calendario per cambiare mese (oltre alle frecce).
7. **Consigli**: sezione o carosello di card per fase, ognuna con fonte in FONTI.md, italiano semplice, nessun assoluto medico. **Niente "Di tendenza ora".**
8. **Onboarding**: una domanda per schermata, barra di avanzamento, "Salta" sempre visibile, schermata finale "È tutto pronto"; passo facoltativo "Hai già usato un'altra app?" che porta all'importazione.
9. Linguaggio inclusivo (evita forme al femminile non necessarie).
10. Compatibilità F-Droid come **obiettivo verificato, non vincolo**: elenca nel README ogni plugin e se è open source; segnala quelli non compatibili. Licenza ancora da decidere (Dany).

## 2. Come lavorare
- Procedi a fasi piccole, un commit per fase, con test aggiornati e nuovo tag di prova (es. v1.0.0-prova.4). Ordine consigliato: 1 → 2 → 3-4 → 5-6 → 7-8 → 10.
- Aggiorna `docs/CONTINUA-DA-QUI.md`, `docs/NON-VERIFICATO.md` e i test a ogni fase.
- Dimmi con chiarezza cosa è fatto, cosa non verificato, cosa serve provare su telefono. Italiano semplice, nessun gergo inglese non spiegato.
- Se un dubbio è vero: UNA domanda con la tua proposta già pronta.

## 3. Ancora da fare (non dipende da te)
Prova su telefono fisico (notifiche a app chiusa/riavvio, biometria, selettori file, aggiornamento senza perdere dati), export reali di altre app, pose extra con Gemini, fonti istituzionali italiane (salute.gov.it, epicentro.iss.it, sigo.it, aogoi.it).
