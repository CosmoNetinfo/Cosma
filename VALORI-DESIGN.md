# Estensioni dello stile approvato

## v1.1 fase 1, sfondo piatto di Oggi

| Contesto grafico | Chiaro | Scuro |
|---|---|---|
| Mestruazioni effettivamente registrate | #fff1f5 | #241622 |
| Tinta quotidiana, senza fase dedotta | #f4f3ff | #171525 |
| Dati assenti o fascia stimata passata | #fdf4ff | #17101f |

I testi primari, secondari e i link conservano i colori approvati: contrasto almeno 4,5:1 su tutte le tinte, verificato dai test. Le superfici delle schede e la navigazione non cambiano. Nessun gradiente aggiunto, nessuna impostazione salvata e nessun cambiamento ai calcoli. I colori sono una convenzione grafica, non una classificazione clinica.

I valori approvati sono conservati senza modifiche in `docs/stile-approvato/`. Di seguito soltanto gli elementi aggiunti per le altre schermate.

| Elemento | Valori aggiunti |
| --- | --- |
| Campi e selettori | Altezza minima 48 px; testo 16 px; bordo neutro 1 px; raggio 13 px; nessuna ombra |
| Etichette campi | 14 px / 400, distanza 8 px dal controllo |
| Chip del diario | Altezza minima 48 px; pillola 999 px; testo 14 px; selezione con bordo viola e segno di spunta, senza gradiente |
| Checkbox | Controllo 20 px dentro etichetta toccabile alta almeno 48 px; testo 16 px |
| Calendario | Sette colonne da almeno 48 px; giorni 14 px; intestazioni 12 px; cella alta 48 px, raggio 16 px. A 360 px le colonne occupano 336 px con margini locali 12 px, rispetto ai margini 24 px degli altri blocchi; sotto questa larghezza scorre internamente |
| Giorni registrati | Sfondo uguale al testo primario, numero nel colore del fondo; stime con bordo tratteggiato viola, nessuna codifica dei giorni fertili |
| Elenchi Salute e impostazioni | Righe piatte, minimo 64 px, icone lineari neutre da 22 px, testo 16 px e dettaglio 14 px, bordo divisorio 1 px |
| Grafici | SVG locali; etichette almeno 14 px nel viewBox, dati anche testuali; colori neutri e viola pieno, senza gradiente. Nessuna linea attraverso dati mancanti o temperature disturbate |
| Pannelli di modifica | Dialogo raggio 24 px, padding 20 px, massimo schermo meno aree sicure e 32 px; chiusura toccabile 48×48 px |
| Focus | Contorno viola 3 px, distanza 3 px; informazione non affidata soltanto al colore |
| Avvisi temporanei | 14 px, fondo testo primario e testo nel colore del fondo; non contengono dettagli sanitari |
| Android | Insets della WebView/SystemBars; barra inferiore 56 px più padding e area gestuale. Il contenuto ha almeno 24 px liberi dopo l’ultimo elemento prima della barra quando si arriva a fine scorrimento |

Schermate reali del codice in `docs/schermate/`; sono acquisizioni dell’interfaccia con dati fittizi, non fotografie di un telefono. La mascotte rimane un PNG originale da 64 px nell’intestazione Oggi, nel primo avvio e negli stati vuoti; nessuna sovrapposizione con l’anello.
# Aggiunte per le sezioni 13 e 14 del nuovo brief

Queste aggiunte prevalgono sul precedente ruolo dell’immagine da 64 px; gli altri token approvati restano validi.

| Elemento | Valori |
|---|---|
| Cosma su Oggi | Figura intera, altezza 128 px, proporzioni originali; spazio riservato sopra la navigazione; margini laterali e inferiori 24 px |
| Altre schede | Volto 48 × 48 px, area toccabile 48 px, spazio riservato |
| Fumetto | Fondo surface, testo text, bordo 1 px border della palette approvata; raggi 24/24/4/24 px verso Cosma, padding 12 px; corpo 16/24 px, comandi secondari 14/24 px; nessuna ombra |
| Risposte | Massimo tre, raggio 999 px, altezza 48 px, spazio 8 px, tinte neutre; conferma prima del salvataggio |
| Tour | Contatore 14 px, contorno 2 px accent e offset 4 px; area scorrevole fino al 40% della vista |
| Movimento | Comparsa 250 ms, nessun ciclo continuo; assente con prefers-reduced-motion |
| Scorrimento | Contenuto separato dall’assistente con flex e altezza dinamica; assistente nascosta durante la scrittura per liberare spazio alla tastiera |
| Importazione | Modali e campi condivisi; tabella scorrevole internamente, valori escaped, errori in italiano |
