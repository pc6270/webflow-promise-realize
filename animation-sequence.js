(() => {
 const definitions=[['sec1','s1-root-container','replayS1Animation'],['s2p1','s2p1-root-container','replayS2P1Animation'],['s2p2','s2p2-root-container','replayS2P2Animation'],['s2p34','s2p34-root-container','replayS2P34Animation'],['sec4','s4-root-container','replaySec4Animation'],['sec5','s5-global-container','replaySec5Animation'],['sec6','wf-sec6-root',null],['sec7','wf-sec7-root','replaySec7Animation'],['sec8','wf-sec8-root','replaySec8Animation']];
 const items=definitions.map(([id,root,replay])=>({id,root:document.getElementById(root),wrapper:document.querySelector('.fp-'+id+'-wrapper'),replay}));
 items.forEach(i=>i.wrapper.classList.add('fp-sequence-pending'));
 let current=-1,complete=false,lastY=scrollY,deadline=0,activeSeatRun=null;
 const seconds=s=>s.endsWith('ms')?parseFloat(s)/1000:parseFloat(s)||0;
 function duration(item){let max=0;for(const el of [item.root,...item.root.querySelectorAll('*')]){
  if(!el.getClientRects().length)continue;const s=getComputedStyle(el);
  for(const kind of ['animation','transition']){const ds=s[kind+'Duration'].split(','),del=s[kind+'Delay'].split(',');ds.forEach((d,j)=>{if(kind==='animation'&&s.animationIterationCount.split(',')[j]==='infinite')return;max=Math.max(max,seconds(d)+seconds(del[j%del.length]));});}
 }return Math.max(item.id==='sec5'?1.8:item.id==='sec6'?1.5:.5,max+.12)*1000;}
 function drawSeat(){
  const run={force:false};activeSeatRun=run;
  const holder=document.getElementById('s6-seat-holder');
  holder.classList.add('fp-seat-sequence');holder.classList.remove('is-drawn');
  const parts=[...holder.querySelectorAll('path.fp-seg')].map(path=>({path,line:!!path.closest('.s6-seat-line')}));
  for(const {path}of parts){path.setAttribute('pathLength','1');path.style.setProperty('transition','none','important');path.style.setProperty('stroke-dasharray','1','important');path.style.setProperty('stroke-dashoffset','1','important');}
  const actor=document.getElementById('sec6-d-asset-tag');
  document.getElementById('wf-sec6-root').dataset.s6ActorReady='0';
  const actorParts=[actor,document.getElementById('sec6-d-flashlight-icon')].filter(Boolean);
  actorParts.forEach(el=>el.style.setProperty('opacity','0','important'));
  const linePath=parts.find(part=>part.line)?.path;
  let revealedAt=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const displayedLength=p=>{const m=p.getScreenCTM();return p.getTotalLength()*Math.hypot(m.a,m.b);};
  const arcPart=parts.find(p=>!p.line),arcDuration=Math.max(120,displayedLength(arcPart.path)),lineDuration=Math.max(120,displayedLength(linePath));
  const arcDelay=180,lineDelay=arcDelay+arcDuration,total=lineDelay+lineDuration;
  const started=performance.now();
  function frame(now){
   const elapsed=now-started;
   for(const {path,line}of parts){const delay=line?lineDelay:arcDelay,duration=line?lineDuration:arcDuration;const fraction=(reduced||run.force)?1:Math.max(0,Math.min(1,(elapsed-delay)/duration));path.style.setProperty('stroke-dashoffset',String(1-fraction),'important');}
   let arrival=1;
   if(linePath&&actor){
    const matrix=linePath.getScreenCTM();
    const a=linePath.getPointAtLength(0).matrixTransform(matrix);
    const b=linePath.getPointAtLength(linePath.getTotalLength()).matrixTransform(matrix);
    const rect=actor.getBoundingClientRect(),x=rect.left+rect.width/2;
    arrival=Math.max(0,Math.min(1,(x-a.x)/(b.x-a.x||1)));
   }
   const progress=(reduced||run.force)?1:Math.max(0,Math.min(1,(elapsed-lineDelay)/lineDuration));
   if(revealedAt===null&&progress>=arrival){revealedAt=now;document.getElementById('wf-sec6-root').dataset.s6ActorReady='1';}
   if(revealedAt!==null){const opacity=(reduced||run.force)?1:Math.min(1,(now-revealedAt)/280);actorParts.forEach(el=>el.style.setProperty('opacity',String(opacity),'important'));if(opacity===1)document.getElementById('wf-sec6-root').classList.add('s6-lower-ready');}
   if(!reduced&&!run.force&&(elapsed<total||revealedAt===null||now-revealedAt<280))requestAnimationFrame(frame);else holder.classList.add('is-drawn');
  }
  requestAnimationFrame(frame);
 }
 function start(index){current=index;complete=false;const item=items[index];window.fpSequenceAuthorize(item.root.id);item.wrapper.classList.remove('fp-sequence-pending');item.wrapper.classList.add('fp-sequence-enter');
  if(item.id==='sec6'){if(innerWidth>=768)drawSeat();else{const actors=[document.getElementById('sec6-m-asset-tag'),document.getElementById('sec6-m-flashlight')],began=performance.now();function reveal(now){const opacity=Math.min(1,(now-began)/200);actors.forEach(el=>el.style.setProperty('opacity',String(opacity),'important'));if(opacity<1)requestAnimationFrame(reveal);else item.root.classList.add('s6-lower-ready');}actors.forEach(el=>el.style.setProperty('opacity','0','important'));requestAnimationFrame(reveal);}}
  if(item.replay)window[item.replay]?.();else{window.fpSequenceMark(item.root.id);window.handleSec6Scroll?.();}
  deadline=performance.now()+duration(item)+60;setTimeout(check,200);
 }
 function readyNext(){if(current<0||current>=items.length-1)return false;const next=items[current+1];const config=window.FP_PAGE_CONFIG||{};const raw=parseFloat(config[innerWidth<1200?'--animation-entry-mobile-percent':'--animation-entry-desktop-percent']);const percent=Number.isFinite(raw)?Math.max(0,Math.min(50,raw)):(innerWidth<1200?10:15);const threshold=1-percent/100;const lead=(next.id==='s2p1'||next.id==='s2p2')?.20:0;return next.wrapper.getBoundingClientRect().top<=innerHeight*(threshold+lead);}
 function check(){if(current<0||complete)return;const item=items[current];
  const active=item.root.getAnimations({subtree:true}).some(a=>a.playState==='running'&&a.effect?.getComputedTiming().iterations!==Infinity);
  let stickyDone=item.id!=='sec1'||window.fpHeroSequenceDone===true;if(item.id==='sec6'&&innerWidth>=768){const track=document.getElementById('sec6-d-track');stickyDone=track.getBoundingClientRect().top<=-(innerWidth<1200?1800:track.offsetHeight-innerHeight)+2;}
  if(performance.now()>=deadline&&!active&&stickyDone){complete=true;lastY=scrollY;if(scrollY>0&&readyNext())start(current+1);return;}setTimeout(check,100);
 }
 function finishFast(){if(activeSeatRun)activeSeatRun.force=true;const item=items[current];item.root.dataset.motionCaughtUp='1';dispatchEvent(new CustomEvent('fp:motion-catchup',{detail:{rootId:item.root.id}}));for(const path of item.root.querySelectorAll('path.fp-seg'))path.style.setProperty('stroke-dashoffset','0','important');for(const animation of item.root.getAnimations({subtree:true})){if(animation.effect?.getComputedTiming().iterations!==Infinity)try{animation.finish();}catch{}}if(item.id==='sec6')item.root.classList.add('s6-lower-ready');complete=true;}
 function shouldCatchUp(bottom,nextTop,height,velocity,stickyReleased){return stickyReleased&&(bottom<height*.25||(velocity>900&&nextTop<height*.45));}
 let scrollTime=performance.now(),velocity=0;
 addEventListener('scroll',()=>{
  const y=scrollY,now=performance.now(),down=y>lastY+.5,elapsed=Math.max(16,now-scrollTime);
  velocity=elapsed>200?0:velocity*.5+Math.max(0,y-lastY)/elapsed*1000*.5;
  lastY=y;scrollTime=now;
  if(!down||innerWidth<768)return;
  while(current>=0&&current<items.length-1){
   const item=items[current],next=items[current+1];
   let released=true;
   if(item.id==='sec6'){const track=document.getElementById('sec6-d-track'),stage=track.querySelector('.wf-sec6-desktop-sticky-inner');released=track.getBoundingClientRect().bottom<=stage.getBoundingClientRect().bottom+2;}
   if(!shouldCatchUp(item.wrapper.getBoundingClientRect().bottom,next.wrapper.getBoundingClientRect().top,innerHeight,velocity,released))break;
   finishFast();start(current+1);
  }
  if(complete&&current<items.length-1&&readyNext())start(current+1);
 },{passive:true});
 function showMobile(){if(innerWidth>=768)return;current=items.length-1;complete=true;const classes=['s1-active','s2p1-active','s2p2-active','s2p34-active','s4-active','s5-active',null,'wf-sec7-active','wf-sec8-active'];items.forEach((item,index)=>{window.fpSequenceAuthorize(item.root.id);window.fpSequenceMark(item.root.id);item.wrapper.classList.remove('fp-sequence-pending');if(classes[index])item.root.classList.add(classes[index]);});document.getElementById('wf-sec6-root').classList.add('s6-lower-ready');}
 addEventListener('resize',showMobile);
 let initialized=false;
 function init(){if(initialized)return;initialized=true;if(innerWidth<768){showMobile();return;}requestAnimationFrame(()=>requestAnimationFrame(()=>start(0)));}
 window.fpStartAnimationSequence=init;
 if(window.FP_WEBFLOW_BOOTSTRAP)addEventListener('fp:webflow-ready',init,{once:true});
 else if(document.readyState==='complete')init();else addEventListener('fp:webflow-ready',init,{once:true});
})();
