// Sole etichette di auto-osservazione: nessuna scala clinica o interpretazione.
export const EXTRA_SYMPTOMS=['Coaguli','Va tutto bene','Vampate di calore','Sudorazione notturna','Confusione mentale','Dolori articolari','Bruciore alla bocca','Insonnia','Dolore addominale','Prurito vaginale','Secchezza vaginale','Stitichezza','Diarrea'];
export const EXTRA_MOODS=['Con energia','Vivace','Sbalzi di umore','Umore basso','Sensi di colpa','Pensieri ripetitivi','Poca energia','Apatia','Confusione','Autocritica'];
export const MUCUS=['Non osservato','Secco','Appiccicoso','Cremoso','Acquoso','Trasparente e filante','Spotting','Insolite','Bianco grumoso','Grigio'];
export const INTIMACY=['Nessun rapporto','Rapporto protetto','Rapporto non protetto','Sesso orale','Sesso anale','Masturbazione','Tocco sensuale','Sex toy','Orgasmo','Desiderio elevato','Desiderio neutro','Desiderio basso'];
export const ACTIVITY=['Nessuna attività','Yoga','Palestra','Aerobica e danza','Nuoto','Sport di squadra','Corsa','Bicicletta','Camminare'];
export const CONTEXT=['Viaggio','Stress','Meditazione','Scrivere un diario','Esercizi di Kegel','Esercizi di respirazione','Malattia o trauma','Alcol','Terapia ormonale'];
export function picks(values,allowed,none){const out=Array.isArray(values)?[...new Set(values.filter(v=>allowed.includes(v)))]:[];return none&&out.length>1?out.filter(v=>v!==none):out;}
export function togglePick(values,value,multiple,none){if(!multiple)return values===value?'':value;const old=Array.isArray(values)?values:[];if(old.includes(value))return old.filter(v=>v!==value);if(value===none)return[value];return[...old.filter(v=>v!==none),value];}

export function intimacyPicks(values){const out=picks(values,INTIMACY),desire=out.filter(v=>v.startsWith('Desiderio ')).at(-1),acts=out.filter(v=>!v.startsWith('Desiderio ')),clean=acts.length>1?acts.filter(v=>v!=='Nessun rapporto'):acts;return[...clean,...(desire?[desire]:[])];}
export function toggleIntimacy(values,value){const old=intimacyPicks(values);if(old.includes(value))return old.filter(v=>v!==value);if(value==='Nessun rapporto')return[...old.filter(v=>v.startsWith('Desiderio ')),value];if(value.startsWith('Desiderio '))return[...old.filter(v=>!v.startsWith('Desiderio ')),value];return[...old.filter(v=>v!=='Nessun rapporto'),value];}
