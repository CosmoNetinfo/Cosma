import {splitCiphertext,joinCiphertext} from './chunks.js';

// Ogni chiamata contiene UNA istruzione. Il plugin Android separa i batch con
// ";\n": due CREATE sulla stessa riga non creavano entrambe le tabelle.
export async function createNativeVault(db,cipher){
 await db.execute('CREATE TABLE IF NOT EXISTS vault (id INTEGER PRIMARY KEY CHECK (id=1), revision INTEGER NOT NULL, payload TEXT NOT NULL);');
 await db.execute('CREATE TABLE IF NOT EXISTS vault_parts (part INTEGER PRIMARY KEY, payload TEXT NOT NULL);');
 const tables=(await db.query("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('vault','vault_parts')")).values||[];
 if(!['vault','vault_parts'].every(name=>tables.some(t=>t.name===name)))throw Error('Preparazione del database incompleta. I dati esistenti sono stati conservati: chiudi e riapri Cosma.');
 return {
  async read(){
   const r=await db.query('SELECT revision,payload FROM vault WHERE id=1'),v=r.values?.[0];if(!v)return null;
   const data=v.payload==='chunks-v1'?joinCiphertext((await db.query('SELECT part,payload FROM vault_parts ORDER BY part')).values||[]):v.payload;
   const opened=await cipher.open({data});return{...JSON.parse(opened.text),revision:v.revision};
  },
  async write(record,expected){
   const sealed=await cipher.seal({text:JSON.stringify(record)}),parts=splitCiphertext(sealed.data);
   await db.beginTransaction();
   try{
    const r=await db.query('SELECT revision FROM vault WHERE id=1');
    if((r.values?.[0]?.revision||0)!==expected)throw Error('L’archivio è cambiato. Chiudi e riapri Cosma prima di salvare.');
    await db.executeSet([
     {statement:'DELETE FROM vault_parts',values:[]},
     ...parts.map(x=>({statement:'INSERT INTO vault_parts(part,payload) VALUES(?,?)',values:[x.part,x.payload]})),
     {statement:'INSERT OR REPLACE INTO vault(id,revision,payload) VALUES(1,?,?)',values:[expected+1,'chunks-v1']}
    ],false);
    await db.commitTransaction();
   }catch(e){await db.rollbackTransaction();throw e;}
  }
 };
}
