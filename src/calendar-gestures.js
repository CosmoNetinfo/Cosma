export function swipeDirection(start,end){if(!start||!end||end.time<start.time||end.time-start.time>1200)return 0;const x=end.x-start.x,y=end.y-start.y;return Math.abs(x)>=64&&Math.abs(x)>Math.abs(y)*1.4?(x<0?1:-1):0;}
export function installCalendarSwipe(root,{active,move}){
 let start=null,last=null;
 root.addEventListener('pointerdown',e=>{if(!active()||!e.isPrimary||!e.target.closest('.calendar-scroll,.calendar-year'))return;start={x:e.clientX,y:e.clientY,time:Date.now(),id:e.pointerId};},{passive:true});
 root.addEventListener('pointercancel',()=>{start=null;},{passive:true});
 root.addEventListener('pointerup',e=>{if(!start||e.pointerId!==start.id)return;const end={x:e.clientX,y:e.clientY,time:Date.now()},dir=swipeDirection(start,end);start=null;if(!active()||!dir)return;last=end;move(dir);},{passive:true});
 root.addEventListener('click',e=>{if(last&&Date.now()-last.time<450&&Math.hypot(e.clientX-last.x,e.clientY-last.y)<24&&e.target.closest('.calendar-scroll,.calendar-year')){e.preventDefault();e.stopImmediatePropagation();last=null;}},true);
}
