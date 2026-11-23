// Soltanto immagini originali disponibili; preferenza temporanea, nessun dato sanitario.
export const cosmaPoses=Object.freeze(['cosma-in-piedi.png','cosma-saluta-intera.png','cosma-abbraccio.png','cosma-dorme-intera.png']);
export function contextPose(page,{night=false,messagePose,difficult=false}={}){
 if(night)return cosmaPoses[3];
 if(cosmaPoses.includes(messagePose))return messagePose;
 if(difficult||['diario','salute','pms','security'].includes(page))return cosmaPoses[2];
 if(['settings','visits','feedback','learn'].includes(page))return cosmaPoses[1];
 return cosmaPoses[0];
}

export function manualReply(page,index=0){const list=({oggi:['hello','quick','statistics','general'],cal:['cal','general'],diario:['diario','comfort'],salute:['salute','general'],settings:['settings','general']})[page]||['general'];return list[Math.max(0,Math.trunc(index)||0)%list.length];}
