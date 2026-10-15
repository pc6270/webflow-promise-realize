(function(){
 const root=document.getElementById('fp-master-root'),NS='http://www.w3.org/2000/svg';
 const make=(name,attrs)=>{const n=document.createElementNS(NS,name);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
 const overlays=new Map();
 const filterStyles=new Map();
 function restoreFilters(){for(const [el,[value,priority]]of filterStyles){if(value)el.style.setProperty('filter',value,priority);else el.style.removeProperty('filter');}filterStyles.clear();}
 function unfiltered(el){if(!filterStyles.has(el))filterStyles.set(el,[el.style.getPropertyValue('filter'),el.style.getPropertyPriority('filter')]);el.style.setProperty('filter','none','important');}
 function overlay(container){
  if(overlays.has(container))return overlays.get(container);
  const svg=make('svg',{class:'mobile-seams',viewBox:'0 0 402 900',width:402,height:900,'aria-hidden':'true'});
  const path=make('path',{class:'mobile-seam-path'});svg.append(path);container.append(svg);overlays.set(container,svg);return svg;
 }
 const scaler=document.getElementById('s5-mobile-scaler'),seams5=overlay(scaler);
 const p2=document.querySelector('.s2p2-mb-layer'),seams2=overlay(p2);
 const p34=document.querySelector('.s2p34-mb-canvas'),seams34=overlay(p34);
 const lineBox=document.querySelector('.wf-sec6-m-line-container');
 const track=make('svg',{class:'mobile-s6-track',viewBox:'0 0 402 10',width:402,height:10,'aria-hidden':'true'});
 track.innerHTML='<defs><filter id="mobileTrackPencil" filterUnits="userSpaceOnUse" x="-30" y="-20" width="500" height="50"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" seed="5976" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
 track.querySelector('defs').insertAdjacentHTML('beforeend','<filter id="mobileLinearPencil" filterUnits="userSpaceOnUse" x="-30" y="-30" width="1500" height="1500"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7"/></filter>');
 const group=make('g',{filter:'url(#mobileTrackPencil)'});
 const gray=make('path',{fill:'none',stroke:'#E0E0E0','stroke-linecap':'round'});
 const fill=make('path',{fill:'none',stroke:'var(--brand-line-color,#675D54)','stroke-linecap':'round',pathLength:1,'stroke-dasharray':1});
 fill.style.transition='stroke-dashoffset .35s ease';
 const dot=make('circle',{r:5.5,fill:'#987a6b',class:'mobile-s6-node-dot'});
 group.append(gray,fill);track.append(group,dot);lineBox.append(track);
 function local(svg,point){return point.matrixTransform(svg.getScreenCTM().inverse());}
 function end(path,last,svg){const point=path.getPointAtLength(last?path.getTotalLength():0).matrixTransform(path.getScreenCTM());return svg?local(svg,point):point;}
 function join(svg,pairs,maxGap=25){
  const d=[];
  for(const [a,b]of pairs){if(!a||!b)continue;let nearest=null;
   for(const ea of [0,1])for(const eb of [0,1]){const p=end(a,ea,svg),q=end(b,eb,svg),distance=Math.hypot(p.x-q.x,p.y-q.y);if(!nearest||distance<nearest.distance)nearest={p,q,distance};}
   if(nearest.distance<maxGap)d.push(`M ${nearest.p.x} ${nearest.p.y} L ${nearest.q.x} ${nearest.q.y}`);
  }
  svg.querySelector('path').setAttribute('d',d.join(' '));
 }
 function widenFilters(){
  document.querySelectorAll('.s2p2-mb-layer .s2p2-line-svg filter,.s5-mobile-wrapper .s5-line-path filter').forEach(f=>{
   if(f.dataset.mobileExpanded)return;f.dataset.mobileExpanded='1';
   for(const [key,delta]of [['x',-4],['y',-4],['width',8],['height',8]]){const raw=f.getAttribute(key);if(raw&&/^[-\d.]+$/.test(raw))f.setAttribute(key,+raw+delta);}
  });
 }
 function update(){
  if(innerWidth>=768){restoreFilters();return;}
  const cs=getComputedStyle(root),stroke=parseFloat(cs.getPropertyValue('--brand-line-mb-width'))||2;
  gray.setAttribute('stroke-width',stroke);fill.setAttribute('stroke-width',stroke);
  const scale=Math.min(1,innerWidth/402);
  // Beam geometry remains fixed when the lamp or character is adjusted.
  const ray=document.querySelector('.wf-sec6-m-ray-svg');
  ray.querySelector('#sec6-ray-left').setAttribute('x1','250');
  ray.querySelector('#sec6-ray-right').setAttribute('x1','267');
  ray.querySelectorAll('line').forEach(line=>line.setAttribute('y1','-40'));
  // Solve tangency in normalized circle coordinates; keep both ray origins fixed.
  const circle=document.querySelector('.wf-sec6-m-circle-card').getBoundingClientRect();
  const cx=circle.left+circle.width/2,cy=circle.top+circle.height/2;
  const rx=circle.width/2,ry=circle.height/2;
  if(rx>0&&ry>0)for(const line of ray.querySelectorAll('line')){
   const start=new DOMPoint(+line.getAttribute('x1'),+line.getAttribute('y1')).matrixTransform(ray.getScreenCTM());
   const ux=(start.x-cx)/rx,uy=(start.y-cy)/ry,d2=ux*ux+uy*uy;
   if(d2<=1)continue;
   const k=Math.sqrt(d2-1)/d2;
   const candidates=[{x:ux/d2-uy*k,y:uy/d2+ux*k},{x:ux/d2+uy*k,y:uy/d2-ux*k}];
   const tangent=candidates.sort((a,b)=>a.x-b.x)[line.id==='sec6-ray-left'?0:1];
   const finish=local(ray,new DOMPoint(cx+rx*tangent.x,cy+ry*tangent.y));
   line.setAttribute('x2',finish.x);line.setAttribute('y2',finish.y);
  }
  // Extend S5's vertical segment; retain the original bottom arc shape.
  const body=document.getElementById('sec6-m-asset-tag'),br=body.getBoundingClientRect();
  const seat=local(seams5,new DOMPoint(br.left+br.width/2,br.top+br.height/2));
  const topCurve=scaler.querySelector('.s5-m-top-curve path'),arch=scaler.querySelector('.s5-m-top-arch'),archPath=arch.querySelector('path');
  arch.style.left='0px';arch.style.top='108px';
  const topEnd=end(topCurve,1,seams5),archStart=end(archPath,0,seams5);
  arch.style.left=(topEnd.x-archStart.x)+'px';arch.style.top=(108+topEnd.y-archStart.y)+'px';
  const archEnd=end(archPath,1,seams5);
  const bottom=scaler.querySelector('.s5-m-bottom-arc'),bottomPath=bottom.querySelector('path');bottom.style.top='690px';bottom.style.left='0px';
  const bottomStartX=end(bottomPath,0,seams5).x;bottom.style.left=(archEnd.x-bottomStartX)+'px';
  const before=end(bottomPath,1,seams5),shift=seat.y-before.y;bottom.style.top=(690+shift)+'px';
  const bottomStart=end(bottomPath,0,seams5),vertical=scaler.querySelector('.s5-m-left-line');
  const height=(bottomStart.y-archEnd.y)*477.66/476.5;
  vertical.style.height=height+'px';vertical.style.left=(archEnd.x-1.16)+'px';vertical.style.top=(archEnd.y-height*1.16/477.66)+'px';
  const edge=local(seams5,new DOMPoint(innerWidth+20,br.top+br.height/2));
  const arcEnd=end(bottomPath,1,seams5),bar=scaler.querySelector('.s5-m-bottom-line'),inner=bar.firstElementChild,barSvg=inner.querySelector('svg'),barPath=barSvg.querySelector('path');
  const left=arcEnd.x-.66,width=Math.max(1,edge.x-left+.66);
  bar.style.left=left+'px';bar.style.top=(seat.y-1.16)+'px';bar.style.width=width+'px';inner.style.width=width+'px';
  const d=`M ${width-.66} 1.16 H 0.66`;
  if(barPath.getAttribute('d')!==d){const oldLen=barPath.getTotalLength(),offset=parseFloat(getComputedStyle(barPath).strokeDashoffset)||0;barSvg.setAttribute('viewBox',`0 0 ${width} 2.3698`);barPath.setAttribute('d',d);const len=barPath.getTotalLength();barPath.style.strokeDasharray=len;barPath.style.strokeDashoffset=oldLen?offset/oldLen*len:len;}
  const s5Paths=['.s5-m-top-curve','.s5-m-top-arch','.s5-m-left-line','.s5-m-bottom-arc','.s5-m-bottom-line'].map(s=>scaler.querySelector(s+' path'));
  join(seams5,s5Paths.slice(1).map((p,i)=>[s5Paths[i],p]));
  const s2Paths=['.s2p2-mb-vector-top','.s2p2-mb-arc-top','.s2p2-mb-line-vert','.s2p2-mb-arc-bottom'].map(selector=>p2.querySelector(selector+' path'));
  join(seams2,s2Paths.slice(1).map((p,i)=>[s2Paths[i],p]),100);
  // Snap the next horizontal segment to the bottom arc in its own SVG coordinates.
  // Preserve the remaining curve and all content positions.
  const nextPath=p34.querySelector('#s2p34-mb-master-path');
  const arcExit=end(s2Paths[s2Paths.length-1],1);
  const connection=arcExit.matrixTransform(nextPath.getScreenCTM().inverse());
  const deltaY=connection.y-56.16;
  nextPath.setAttribute('d',`M ${connection.x} ${connection.y} H 134.60 C 69.93 ${56.21+deltaY} 21.16 104.98 21.16 165.16 V 547.50 C 21.16 590.85 55.32 625.05 97.46 625.05 H 134.85 C 176.99 625.26 211.16 659.46 211.16 701.66`);
  join(seams34,[[s2Paths[s2Paths.length-1],nextPath]]);
  // The S6 rail ends exactly at S7's original entry point.
  const arc=document.querySelector('.wf-sec7-m-vector-svg path'),entry=end(arc,0,track);
  const leftEdge=local(track,new DOMPoint(0,0)),rightEdge=local(track,new DOMPoint(innerWidth,0));
  const geometry=`M ${leftEdge.x} ${entry.y} H ${entry.x}`;gray.setAttribute('d',geometry);fill.setAttribute('d',geometry);
  const stage=Math.max(0,Math.min(2,(+document.getElementById('sec6-m-num').textContent||1)-1));
  const target=entry.x;
  fill.style.transition='none';fill.style.strokeDashoffset='0';dot.setAttribute('cx',96+(parseFloat(cs.getPropertyValue('--s6-mb-desc-x'))||0));dot.setAttribute('cy',entry.y);
  arc.setAttribute('pathLength',1);root.style.removeProperty('--mobile-s7-offset');
  // Limit the first text row to the curved boundary, including a 14px gutter.
  const desc=document.getElementById('sec6-m-desc');const number=k=>parseFloat(cs.getPropertyValue('--s6-mb-'+k))||0;desc.style.left=(96+number('desc-x'))+'px';desc.style.top=(412+number('desc-y'))+'px';const manualWidth=number('desc-w');desc.style.width=(manualWidth>0?manualWidth:275)+'px';const dr=desc.getBoundingClientRect();let boundary=Infinity;
  for(let i=0;i<=320;i++){const p=arc.getPointAtLength(arc.getTotalLength()*i/320).matrixTransform(arc.getScreenCTM());if(p.y>=dr.top+7*scale&&p.y<=dr.bottom)boundary=Math.min(boundary,p.x);}
  if(!manualWidth&&Number.isFinite(boundary))desc.style.width=Math.max(120,Math.min(275,(boundary-dr.left)/scale-14))+'px';
  widenFilters();
  // The original filter primitives clip the horizontal tail of the top curve.
  for(const path of s2Paths){
   path.style.setProperty('filter','url(#mobileLinearPencil)','important');
   for(let g=path.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)g.removeAttribute('filter');
  }
  document.querySelectorAll('.mobile-pencil-svg path,.s1-mb-container .s1-line-path,.s2p2-mb-line-vert path,.s5-m-left-line path,.s5-m-bottom-line path,.wf-sec8-mobile-outer .wf-sec8-line-path path').forEach(p=>{
   const box=p.getBBox();if(box.width>.1&&box.height>.1)return;
   p.style.setProperty('filter','url(#mobileLinearPencil)','important');
   for(let g=p.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)if(g.hasAttribute('filter'))g.setAttribute('filter','none');
  });
  // WebKit can drop zero-height stroked paths when an SVG displacement filter is applied.
  // Retain the exact geometry and stroke, without filtering the mobile flow lines.
  root.querySelectorAll('.s1-mb-container svg path,.s2p1-mb-container svg path,.s2p2-mb-layer svg path,.s2p34-mb-canvas svg path,.s5-mobile-wrapper svg path,.mobile-s6-track path,.wf-sec7-mobile-outer svg path,.wf-sec8-mobile-outer svg path').forEach(path=>{
   if(getComputedStyle(path).stroke==='none')return;
   unfiltered(path);
   for(let parent=path.parentElement;parent&&parent.tagName.toLowerCase()!=='svg';parent=parent.parentElement)if(parent.hasAttribute('filter')||parent.style.filter)unfiltered(parent);
  });
 }
 let pending=false;function soon(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;update();});}}
 window.fpMobileConnectionsUpdate=update;
 window.addEventListener('resize',soon);window.addEventListener('fp:webflow-ready',soon);document.fonts.ready.then(soon);
 new MutationObserver(soon).observe(document.getElementById('sec6-m-num'),{childList:true,characterData:true,subtree:true});
 soon();
})();
