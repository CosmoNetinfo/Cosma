// Righe piccole evitano di affidare un documento crescente a una sola riga CursorWindow.
// Il contenuto è già cifrato: i pezzi non sono campi sanitari in chiaro.
export function splitCiphertext(text){
 if(typeof text!=='string'||!text.length)throw Error('Archivio cifrato vuoto.');
 const parts=[];for(let i=0;i<text.length;i+=48000)parts.push({part:parts.length,payload:text.slice(i,i+48000)});return parts;
}
export function joinCiphertext(rows){
 if(!rows.length||rows.some((r,i)=>r.part!==i||typeof r.payload!=='string'||!r.payload.length))throw Error('Archivio incompleto. Conserva il backup per il ripristino.');
 return rows.map(r=>r.payload).join('');
}
