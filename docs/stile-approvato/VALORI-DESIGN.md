# Cosma · Oggi minimale

Tre mockup statici da 390 × 844 px: chiaro, scuro e nessun ciclo registrato. Nessuna modifica alle altre schermate o al codice dell'app. Le date sono illustrative; metodo e limiti estesi restano nella destinazione del link “Come l'ho calcolato?”. Le immagini della mascotte sono i PNG originali, senza ritocchi.

| Elemento | Valore comune | Chiaro | Scuro |
| --- | --- | --- | --- |
| Font | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Stesso font | Stesso font |
| Numero giorno | 76 px / 300, interlinea 80 px, cifre tabulari | `#3b0a45` | `#f8f0fc` |
| Titolo Oggi | 28 px / 700, interlinea 32 px | `#3b0a45` | `#f8f0fc` |
| Data stimata | 24 px / 600, interlinea 32 px | `#3b0a45` | `#f8f0fc` |
| Testo corrente | 16 px / 400, interlinea 24 px | `#3b0a45` | `#f8f0fc` |
| Testo secondario | 14 px / 400, interlinea 24 px | `#74597c` | `#b9a7c6` |
| Etichette navigazione | 12 px / 400, interlinea 18 px | `#74597c` | `#b9a7c6` |
| Pulsante principale | 16 px / 600, altezza 56 px | Testo `#ffffff` | Testo `#ffffff` |
| Griglia e margini | Base 8 px; lati 24 px; contenuto largo 342 px | Uguali | Uguali |
| Spazi | Blocchi 32 px; elementi correlati 8 px; scheda padding 20 px | Uguali | Uguali |
| Anello | 192 × 192 px; raggio 84 px; spessore 8 px | Traccia `#e8d9f0` | Traccia `#422c50` |
| Indicatore attuale | Raggio 5 px; bordo 2 px | `#7c3aed`, centro `#ffffff` | `#d5b4ff`, centro `#241a2c` |
| Gradiente | Solo arco e pulsante: `#7c3aed` → `#c026d3` | Uguale | Uguale |
| Sfondo | Tinta piatta | `#fdf4ff` | `#17101f` |
| Superficie scheda e barra | Tinta piatta | `#ffffff` | `#241a2c` |
| Bordo | 1 px | `#e9deee` | `#44324f` |
| Link e voce attiva | Colore pieno | `#7c3aed` | `#d5b4ff` |
| Raggi e ombre | Scheda 24 px; pulsante 999 px; nessuna ombra | Uguali | Uguali |
| Mascotte | 64 × 64 px, raggio 20 px, senza sovrapposizioni all'anello | Originale | Originale |
| Icone navigazione | 24 × 24 px, tratto 1,7 px | Uniformi | Uniformi |
| Aree toccabili | Link e agenda 48 px; pulsante e voci nav 56 px | Uguali | Uguali |
| Spazio prima della barra | 24 px dalla fine dell'agenda; maggiore nello stato vuoto | Verificato | Verificato |

## Controlli

- Nessuna compenetrazione: etichetta e numero restano all'interno dell'anello; la riga appuntamenti termina 24 px prima della navigazione.
- Contrasto secondario sul fondo: **5,65:1 chiaro**, **8,32:1 scuro**; sulla scheda: **6,06:1**, **7,47:1**.
- Contrasto minimo del bianco sul gradiente del pulsante: **4,71:1**, verificato anche sui colori intermedi campionati.
- Nessun testo dell'interfaccia sotto i 12 px; nessun controllo sotto i 48 px di altezza.
- Nessun font o immagine caricati dalla rete. La pagina HTML contiene le immagini originali incorporate.

La cornice arrotondata, la barra di stato e l'indicatore inferiore simulano il telefono e non sono nuovi componenti dell'app. Il CSS consegnato descrive la tavola statica e le tre schermate: non è stato applicato all'app in attesa dell'approvazione della Home.
