(() => {
 const root=document.getElementById('fp-master-root');let lastPhase=-1,renderedEnds=[],fromEnds=[],phaseStarted=0,rayFrame=false;
 function quotes(){
  for(const [textSelector,lineSelector]of [['.s5-d-slogan-text','.s5-d-accent-line'],['.s5-m-slogan-text','.s5-m-accent-line'],['.wf-sec8-main-title','.wf-sec8-vert-line'],['.wf-sec8-mob-main-title','.wf-sec8-mob-vert-line']]){
   const text=document.querySelector(textSelector),line=document.querySelector(lineSelector);if(!text||!line||!text.offsetHeight)continue;
   line.style.setProperty('height',(text.offsetHeight+22)+'px','important');
   line.style.setProperty('top',(text.offsetTop-11)+'px','important');
  }
 }
 function optics(){
  if(innerWidth<768){lastPhase=-1;renderedEnds=[];return;}
  const tablet=root.classList.contains('fp-tablet');
  const seat=root.querySelector('path[data-k="s5-h2"]'),body=document.getElementById('sec6-d-asset-tag');
  const rayMatrix=document.getElementById('sec6-d-ray-svg').getScreenCTM();if(!rayMatrix)return;const scale=Math.hypot(rayMatrix.a,rayMatrix.b);
  if(tablet){
  const seatLocal=seat.getPointAtLength(0),seatTop=parseFloat(getComputedStyle(seat.closest('.s6-seat-line')).top)||0;
  const next=seatTop+seatLocal.y-body.offsetHeight*.46;
  const current=parseFloat(root.style.getPropertyValue('--tablet-seat-shift'))||0;
  if(Math.abs(next-current)>.05)root.style.setProperty('--tablet-seat-shift',next+'px');
  }else{
   const linePoint=seat.getPointAtLength(0).matrixTransform(seat.getScreenCTM()),rect=body.getBoundingClientRect();
   const current=parseFloat(root.style.getPropertyValue('--desktop-seat-shift'))||0;
   const next=current+(linePoint.y-(rect.top+rect.height*.46))/scale;
   if(Math.abs(next-current)>.1)root.style.setProperty('--desktop-seat-shift',next+'px');
  }
  const lamp=document.getElementById('sec6-d-flashlight-icon');
  if(!tablet){const br=body.getBoundingClientRect(),lr0=lamp.getBoundingClientRect();
   for(const [key,difference]of [['--desktop-lamp-adjust-x',br.left+br.width*56/59-lr0.left],['--desktop-lamp-adjust-y',br.top+br.height*30/74.09-lr0.top]]){
    const old=parseFloat(root.style.getPropertyValue(key))||0,next=old+difference/scale;
    if(Math.abs(next-old)>.1)root.style.setProperty(key,next+'px');
   }
  }
  const lr=lamp.getBoundingClientRect();
  const transform=getComputedStyle(lamp).transform,matrix=new DOMMatrix(transform==='none'?undefined:transform);
  const phase=Math.max(0,Math.min(2,+(root.dataset.s6Phase??root.dataset.tabletPhase??0)));
  const circle=document.getElementById('sec6-d-circle-'+(phase+1)).getBoundingClientRect();
  const cx=circle.left+circle.width/2,cy=circle.top+circle.height/2,rx=circle.width/2,ry=circle.height/2;
  const ray=document.getElementById('sec6-d-ray-svg'),inverse=ray.getScreenCTM().inverse();
  if(rx<=0||ry<=0)return;
  const lampScale=parseFloat(getComputedStyle(lamp).scale)||1;
  const starts=[[.0133118,20.4006],[8.33629,25.8939]].map(([x,y])=>{const edge=new DOMPoint((x/21-.5)*lamp.offsetWidth,(y/26-.5)*lamp.offsetHeight).matrixTransform(matrix);return new DOMPoint(lr.left+lr.width/2+edge.x*scale*lampScale,lr.top+lr.height/2+edge.y*scale*lampScale);}).sort((a,b)=>a.x-b.x);
  const now=performance.now();if(phase!==lastPhase){fromEnds=renderedEnds.map(p=>({...p}));phaseStarted=now;lastPhase=phase;}const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const fraction=reduced?1:Math.min(1,(now-phaseStarted)/650),ease=1-Math.pow(1-fraction,3);
  for(const [index,id]of ['sec6-d-ray-left','sec6-d-ray-right'].entries()){
   const start=starts[index];
   const x=(start.x-cx)/rx,y=(start.y-cy)/ry,d=x*x+y*y;if(d<=1)continue;
   const k=Math.sqrt(d-1)/d;
   const candidates=[{x:x/d-y*k,y:y/d+x*k},{x:x/d+y*k,y:y/d-x*k}].sort((a,b)=>a.x-b.x);
   const tangent=candidates[index],end=new DOMPoint(cx+rx*tangent.x,cy+ry*tangent.y);
   const a=start.matrixTransform(inverse),b=end.matrixTransform(inverse),line=document.getElementById(id);
   line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);const from=fromEnds[index]||b,finish={x:from.x+(b.x-from.x)*ease,y:from.y+(b.y-from.y)*ease};renderedEnds[index]=finish;line.setAttribute('x2',finish.x);line.setAttribute('y2',finish.y);
  }
  if(now-phaseStarted<950&&!rayFrame){rayFrame=true;requestAnimationFrame(()=>{rayFrame=false;optics();});}
 }
 window.fpTabletOpticsUpdate=optics;
 const resize=new ResizeObserver(quotes);document.querySelectorAll('.s5-d-slogan-text,.s5-m-slogan-text').forEach(el=>resize.observe(el));
 addEventListener('resize',()=>{quotes();optics();});addEventListener('fp:webflow-ready',()=>{quotes();optics();});document.fonts.ready.then(()=>{quotes();optics();});quotes();
})();
