import {parseExport,previewImport,mergeImport,fields,sources} from './import-v2.js';

export function createImportFlow(ui){
 const {esc,button,select,field,formEnd,modal,fmt}=ui;
 let table=null,plan=null,lastOptions=null,rawText=null;
 function reset(){table=null;plan=null;lastOptions=null;rawText=null;}
 function open(){
  reset();
  modal('Importa da un’altra app',`<p>Cosma ti accompagna: scegli un file CSV o JSON fino a 2 MB. Vedrai l’anteprima prima di salvare. Tutto avviene sul telefono.</p>${instructions()}<p class="hint">Estrai gli ZIP prima di scegliere il file, anche quelli con password. Nessun archivio viene decompresso da Cosma. Un TXT non tabellare o PDF richiede una conversione locale: non basta cambiare estensione.</p>${ui.testMode?`<form data-form="foreign-file">${field('file','Scegli CSV o JSON','file','','required accept=".csv,.json,text/csv,application/json"')}${formEnd('Leggi il file')}`:button('choose-foreign-file','Scegli un file','primary')+'<p class="field-error" role="alert"></p>'}`);
 }
 function load(text,index){rawText=text;table=parseExport(text,index);if(table.tables){modal('Scegli l’elenco JSON',`<p>Il file contiene più elenchi. Scegli solo dati registrati; gli altri elenchi restano esclusi.</p>${table.tables.map((t,i)=>button('foreign-table',esc(t.label),'text-button',`data-index="${i}"`)).join('')}`);return;}mapping();}
 function chooseTable(index){load(rawText,index);}
 function instructions(){return '<details><summary class="text-button">Come esportare dalle altre app</summary>'+[
 ['Clue','Menu Altro → Impostazioni → Scarica i miei dati → Richiedi. Conserva la password mostrata. Scarica lo ZIP ricevuto via email ed estrai il JSON.'],
 ['Flo','Avatar/Menu → Aiuto → Contattaci: chiedi i dati in JSON. Il TXT è leggibile ma non ha uno schema tabellare verificato.'],
 ['Natural Cycles','Dall’area di download dei dati dell’account richiedi l’archivio. Estrai il CSV delle registrazioni giornaliere, non il registro delle interazioni o il report PDF.'],
 ['Drip','Impostazioni → Dati → Esporta: scegli il CSV. I giorni di flusso sono registrazioni giornaliere, non automaticamente inizi di ciclo.'],
 ['CSV generico','Esporta un CSV UTF-8. Scegli le colonne e il formato delle date. Occorre una riga per inizio oppure una riga per giornata.']
 ].map(([name,text])=>'<h3>'+name+'</h3><p class="hint">'+text+'</p>').join('')+'<p class="hint">I contenitori sono documentati; non abbiamo verificato esportazioni personali reali di queste app. I menu possono cambiare. Non viene indovinato il significato dei campi. Fonti e dettagli nel README.</p></details>';}
 async function choose(){const text=await ui.pickFile();if(text!==null)load(text);}
 async function readTestFile(file){if(!file?.size||file.size>2*1024*1024)throw Error('Scegli un CSV o JSON fino a 2 MB.');load(await file.text());}
 function mapping(){
  if(!table)throw Error('Scegli prima un file.');
  plan=null;
  if(table.portable){lastOptions={source:'Cosma',mode:'merge',conflict:'existing'};showPortable();return;}
  const cols=table.columns.map((name,i)=>[String(i),(i+1)+' · '+name.slice(0,70)]),o=lastOptions||{};
  modal('Scegli le colonne',`<p>${esc(table.format)} · ${table.rows.length} righe. Controlla le prime righe e indica come leggerle.</p><div class="scroll-table"><table><thead><tr>${table.columns.map(c=>'<th>'+esc(c.slice(0,60))+'</th>').join('')}</tr></thead><tbody>${table.rows.slice(0,3).map(r=>'<tr>'+table.columns.map((_,i)=>'<td>'+esc((r.values[i]||'').slice(0,80))+'</td>').join('')+'</tr>').join('')}</tbody></table></div><form data-form="foreign-map">${select('kind','Che cosa vuoi importare',[['cycles','Inizi e fini dei cicli'],['daily','Diario: flusso, misure e segnali'],['notes','Annotazioni nel diario']],o.kind||'cycles')}${select('dateColumn','Colonna della data: inizio ciclo o giorno della nota',[['-1','Scegli una colonna'],...cols],o.dateColumn??'-1')}${select('endColumn','Data di fine, solo per i cicli',[['-1','Non presente'],...cols],o.endColumn??'-1')}${select('noteColumn','Testo delle annotazioni, solo per il diario',[['all','Conserva gli altri campi come testo'],...cols],o.noteColumn||'all')}${select('dateFormat','Formato delle date',[['iso','Anno-mese-giorno · 2026-11-23'],['dmy','Giorno/mese/anno · 23/11/2026'],['mdy','Mese/giorno/anno · 11/23/2026']],o.dateFormat||'iso')}<p class="hint">Per i cicli serve una riga per ogni inizio registrato. Per le righe giornaliere scegli Diario e associa i campi, oppure Annotazioni per conservare solo testo.</p>${select('source','Provenienza',sources,o.source||'CSV generico')}${select('mode','Modalità',[['merge','Unisci · conserva i dati esistenti'],['replace','Sostituisci tutti i cicli, il diario, visite e farmaci']],o.mode||'merge')}${select('conflict','Quando un dato è già presente',[['existing','Tieni i miei'],['incoming','Tieni gli importati']],o.conflict||'existing')}${select('unusual','Intervalli sotto 15 o sopra 100 giorni',[['keep','Importa comunque, con segnalazione'],['exclude','Escludi dalle statistiche gli intervalli importati']],o.unusual||'keep')}<details><summary class="text-button">Colonne del diario e unità</summary>${Object.keys(fields).map(k=>select(k+'Column',{flusso:'Flusso',umore:'Umore',sint:'Sintomi',temp:'Temperatura in °C',mucus:'Muco',lh:'Test LH',note:'Note'}[k],[['-1','Non importare'],...cols],o[k+'Column']??'-1')).join('')}<p class="hint">La temperatura deve essere in gradi Celsius. Date con orario o fuso non sono convertite automaticamente. I sintomi devono essere separati da | e scelti dalla lista supportata.</p></details><label class="check-label"><input name="recorded" type="checkbox" required>Ho scelto dati realmente registrati, escludendo previsioni e dati sessuali.</label>${formEnd('Controlla anteprima')}`);
 }
 function showPortable(){modal('Formato Cosma riconosciuto',`<p>Archivio aperto, versione 1: cicli, diario, visite e farmaci. Unisci conserva le date e i giorni già presenti. Nessuna previsione viene importata.</p><form data-form="foreign-portable">${select('mode','Modalità',[['merge','Unisci'],['replace','Sostituisci tutto']],'merge')}${select('conflict','Dati già presenti',[['existing','Tieni i miei'],['incoming','Tieni gli importati']],'existing')}${formEnd('Controlla anteprima')}`);}
 function preview(form){
  lastOptions=Object.fromEntries(['kind','dateColumn','endColumn','noteColumn','dateFormat','source','mode','conflict','unusual',...Object.keys(fields).map(k=>k+'Column')].map(k=>[k,String(form.get(k)??'')]));
  if(table.portable){lastOptions.source='Cosma';showPreview();return;}
  if(lastOptions.kind==='daily'){
   let body='<p>Indica cosa significa ogni valore del file. Quelli non supportati restano esclusi. Non vengono indovinati.</p><form data-form="foreign-values">';
   for(const [key,allowed] of Object.entries(fields)){
    const col=Number(lastOptions[key+'Column']);if(col<0||!allowed)continue;
    const values=[...new Set(table.rows.map(r=>r.values[col]).filter(Boolean))];
    if(values.length>30)throw Error('Più di 30 valori diversi per '+key+': scegli una colonna categoriale o non importarla.');
    for(const [i,value] of values.entries())body+=select('map-'+key+'-'+i,key+' · '+value.slice(0,80),[['__ignore__','Non importare'],...allowed],allowed.includes(value)?value:'__ignore__');
   }
   modal('Significato dei valori',body+formEnd('Controlla anteprima'));return;
  }
  showPreview();
 }
 function valuesPreview(form){lastOptions.values={};for(const [key,allowed] of Object.entries(fields)){const col=Number(lastOptions[key+'Column']);if(col<0||!allowed)continue;const values=[...new Set(table.rows.map(r=>r.values[col]).filter(Boolean))];lastOptions.values[key]=Object.fromEntries(values.map((v,i)=>[v,String(form.get('map-'+key+'-'+i)||'__ignore__')]));}showPreview();}
 function showPreview(){
  plan=previewImport(ui.getState(),table,lastOptions);
  const name=plan.kind==='cycles'?(plan.items.length===1?'ciclo':'cicli'):(plan.items.length===1?'registrazione':'registrazioni');
  modal('Anteprima importazione',`<p class="hint">Formato: ${esc(plan.format||table.format)}. Campi scelti: ${esc((plan.recognized||["schema Cosma v1"]).join(", "))}.</p><p><b>${plan.items.length} ${name} da aggiungere</b> · ${plan.skipped.length} righe non importate, di cui ${plan.duplicates} già presenti.</p>${plan.range?'<p>Dal '+fmt(plan.range[0],true)+' al '+fmt(plan.range[1],true)+'.</p>':''}<p class="hint">Provenienza: ${esc(plan.source)} · modalità ${plan.mode==='replace'?'Sostituisci tutto':'Unisci'}. Una copia locale protetta permette di annullare l’ultima importazione. Controlla le date prima di confermare. I cicli devono essere registrazioni effettive, non previsioni esportate dall’altra app.</p>${plan.warnings.map(w=>'<p class="warning">'+esc(w)+'</p>').join('')}<div class="import-preview">${plan.items.slice(0,10).map(item=>`<div class="list-entry"><b>${fmt(item.start||item.date,true)}</b><p>${item.start?(item.end?'Fine: '+fmt(item.end,true):'Fine non registrata'):esc((item.text||JSON.stringify(item.data||{})).slice(0,180))}</p></div>`).join('')||'<p class="hint">Nessuna nuova registrazione valida. Controlla colonne, formato delle date e righe già presenti.</p>'}</div>${plan.items.length>10?'<p class="hint">Altre '+(plan.items.length-10)+' registrazioni valide.</p>':''}${plan.skipped.length?'<h3>Righe non importate</h3>'+plan.skipped.slice(0,12).map(r=>'<p class="hint">Riga '+r.line+': '+esc(r.reason)+'</p>').join('')+(plan.skipped.length>12?'<p class="hint">Altre '+(plan.skipped.length-12)+' righe non valide o duplicate.</p>':''):''}${plan.ignored?.length?'<p class="hint">Campi ignorati: '+esc(plan.ignored.join(', '))+'. I dati sessuali e le previsioni non sono supportati.</p>':''}${button('confirm-foreign-import',(plan.mode==='replace'?'Sostituisci con ':'Unisci ')+plan.items.length+' '+name,'primary',plan.items.length?'':'disabled')}${button('map-foreign-import','Rivedi le colonne','text-button')}<p class="field-error" role="alert"></p>`);
 }
 async function apply(){
  const count=plan?.items?.length||0,kind=plan?.kind;
  const next=mergeImport(ui.getState(),plan);
  if(plan.mode==='replace'&&!confirm('Sostituire tutti i cicli, il diario, visite e farmaci? Potrai annullare dalla copia precedente.'))return;
  await ui.commitImport(next);ui.closeModal();ui.render();ui.modal('Importazione completata',`<p>Cosma ha aggiornato i dati. I calcoli usano le registrazioni importate.</p><p class="hint">Puoi annullare l’ultima importazione anche dopo aver riaperto l’app. L’annullamento riporta alla copia precedente e rimuove anche le modifiche successive. Un’altra importazione sostituirà questa copia.</p>${button('undo-import','Annulla importazione','secondary')}<p class="hint">Il file contiene dati sanitari: valuta di eliminarlo dai Download quando hai finito.</p>`);ui.toast(count+' '+(kind==='cycles'?(count===1?'ciclo importato. Calcoli aggiornati.':'cicli importati. Calcoli aggiornati.'):(count===1?'annotazione aggiunta al diario.':'annotazioni aggiunte al diario.')));
 }
 return{open,choose,readTestFile,mapping,preview,apply,reset,chooseTable,valuesPreview};
}
