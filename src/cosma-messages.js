import {analysis,diff,today,healthNotices} from './domain.js';

// Catalogo locale: nessun testo generato o richiesto in rete.
export const messages={
 hello:{text:'Come stai oggi? Ti va di segnarlo?',pose:'cosma-saluta-intera.png',answers:['Bene','Così così','Non bene'],source:'S00'},
 end:{text:'Il flusso è finito? Se vuoi, puoi registrare la data di fine.',pose:'cosma-in-piedi.png',action:'end-period',label:'Controlla le date',source:'S00'},
 estimate:{text:'La stima è vicina. Si basa sui cicli passati e può cambiare.',pose:'cosma-in-piedi.png',action:'calculation',label:'Come l’ho calcolato?',source:'S06, S16'},
 backup:{text:'Ti va di conservare una copia cifrata dei tuoi dati?',pose:'cosma-in-piedi.png',action:'backup',label:'Apri backup',source:'S00'},
 agenda:{text:'Hai un tuo promemoria oggi. Vuoi rileggerlo?',pose:'cosma-in-piedi.png',action:'notify',label:'Apri promemoria',source:'S00'},
 statistics:{text:'Media e variabilità descrivono il passato. Non prevedono il futuro.',pose:'cosma-in-piedi.png',action:'stats',label:'Leggi i tuoi dati',source:'S16'},
 health:{text:'Vuoi rileggere i dati da portare a un colloquio sanitario?',pose:'cosma-abbraccio.png',action:'salute',label:'Leggi con calma',source:'S03, S04, S12, S13'},
 comfort:{text:'Puoi annotare come stai, con le tue parole e senza fretta.',pose:'cosma-abbraccio.png',action:'today-diary',label:'Apri il diario',source:'S00'},
 cal:{text:'Tocca un giorno per aprire il diario. La fascia tratteggiata è una stima descrittiva.',source:'S00, S16'},
 diario:{text:'Scegli ciò che vuoi registrare. Premi Salva il diario prima di uscire.',source:'S00'},
 salute:{text:'Qui trovi visite, promemoria, segnali e statistiche. Puoi scegliere cosa usare.',source:'S00'},
 settings:{text:'Puoi cambiare la mia presenza, il tema e le categorie. Il tour si può ripetere.',source:'S00'},
 general:{text:'Scegli una voce per leggere o modificare i tuoi dati. Sono qui se vuoi una guida.',source:'S00'},
};
export const tour=[
 {title:'Il tuo spazio',text:'Dati sul telefono. Nessun account né rete.',target:'oggi',focus:'#header'},
 {title:'Partiamo da una data',text:'Registra un inizio reale e modificabile.',target:'oggi',focus:'[data-action=new-period]',action:'new-period',label:'Aggiungi una data'},
 {title:'Hai già usato un’altra app?',text:'Importa lo storico con anteprima.',target:'settings',focus:'[data-action=import-app]',action:'import-app',label:'Importa lo storico'},
 {title:'Una giornata alla volta',text:'Scegli i dati che vuoi registrare.',target:'diario',focus:'[data-form=diary]'},
 {title:'Leggere le stime',text:'Le stime possono cambiare. Leggi il metodo.',target:'oggi',focus:'.prediction',action:'calculation',label:'Leggi il metodo'},
 {title:'Proteggi e conserva',text:'Scegli il PIN e un backup cifrato.',target:'security',focus:'main',action:'backup',label:'Apri backup'},
 {title:'Promemoria discreti',text:'Decidi tu se attivare gli avvisi.',target:'notify',focus:'[data-action=enable-notifications]'},
 {title:'Con i tuoi tempi',text:'Scegli quanto vuoi che ti accompagni.',target:'settings',focus:'[name=cosmaPresence]'},
];
export function selectMessage(s,{date=today(),hour=new Date().getHours(),typing=false}={}){
 const cap={presente:3,discreta:1,silenziosa:0}[s.cosmaPresence]??1;
 if(!cap||typing||hour<8||hour>=22||Object.values(s.cosmaSeen||{}).filter(d=>d===date).length>=cap)return null;
 const a=analysis(s,date),last=s.periods.filter(p=>p.start<=date).at(-1),pr=a.prediction;
 const candidates=[];
 if(healthNotices(s,date).length)candidates.push('health');
 if(last&&!last.end&&a.periodMean&&diff(last.start,date)+1>a.periodMean)candidates.push('end');
 if(s.visits.some(v=>v.date===date)||s.meds.some(m=>m.remind&&m.time))candidates.push('agenda');
 if(!s.lastBackup?diff(s.createdAt,date)>=28:diff(s.lastBackup,date)>=28)candidates.push('backup');
 if(pr&&diff(date,pr.low)>=0&&diff(date,pr.low)<=3)candidates.push('estimate');
 if(diff(s.createdAt,date)>=30&&a.used.length)candidates.push('statistics');
 if(!s.log[date])candidates.push('hello');
 return candidates.find(id=>s.cosmaSeen?.[id]!==date)||null;
}
