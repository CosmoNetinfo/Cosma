// Controlla il testo effettivamente visibile: i bordi delle schede non bastano.
export async function textCollisions(page){return page.evaluate(()=>{
 const modal=document.querySelector('dialog[open]'),roots=modal?[modal]:[document.querySelector('#header'),document.querySelector('main'),document.querySelector('nav')];
 const boxes=[];
 for(const root of roots.filter(Boolean)){
  const boundary=root.getBoundingClientRect(),walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){
   const node=walker.currentNode,e=node.parentElement;if(!node.textContent.trim()||!(e instanceof HTMLElement)||e.closest('script,style,.visually-hidden,[hidden]'))continue;
   if(e.closest('details:not([open])')&&!e.closest('summary'))continue;
   const style=getComputedStyle(e);if(style.visibility!=='visible'||style.display==='none')continue;
   const range=document.createRange();range.selectNodeContents(node);
   for(const r of range.getClientRects()){
    if(r.width<1||r.height<1||r.bottom<=Math.max(0,boundary.top)||r.top>=Math.min(innerHeight,boundary.bottom))continue;
    boxes.push({node,text:node.textContent.trim().slice(0,70),left:r.left,right:r.right,top:Math.max(r.top,boundary.top,0),bottom:Math.min(r.bottom,boundary.bottom,innerHeight)});
   }
  }
 }
 const overlaps=[];
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
  const a=boxes[i],b=boxes[j];if(a.node===b.node)continue;
  if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)overlaps.push([a.text,b.text]);
 }
 return overlaps;
});}
export async function ringLabelClear(page){return page.locator('.cycle-caption').evaluate(e=>{
 const caption=e.getBoundingClientRect(),ring=e.previousElementSibling.getBoundingClientRect();
 return caption.top>=ring.bottom+4&&caption.left>=ring.left-8&&caption.right<=ring.right+8&&!e.closest('.cycle-ring');
});}
