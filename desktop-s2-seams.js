(() => {
 const root=document.getElementById('fp-master-root'),moved=new Set();
 const originalRailStart=[root.style.getPropertyValue('--s2p34-h2-start'),root.style.getPropertyPriority('--s2p34-h2-start')];let ownsRailStart=false;
 const actor=root.querySelector('.s2p34-man-body'),shadow=root.querySelector('.s2p34-man-shadow');
 const margins=new Map([actor,shadow].filter(Boolean).map(el=>[el,el.style.marginTop]));
 const text=root.querySelector('.s2p34-brand-text'),textMargin=text?.style.marginTop||'';
 const raised=root.querySelector('.s4-top-line'),raisedShadow=root.querySelector('.s4-top-man');
 const raisedMargins=new Map([raised,raisedShadow].filter(Boolean).map(el=>[el,[el.style.marginLeft,el.style.marginTop]]));
 const path=key=>root.querySelector('path[data-k="'+key+'"]');
 const screen=(p,end)=>p.getPointAtLength(end?p.getTotalLength():0).matrixTransform(p.getScreenCTM());
 const local=(p,point)=>point.matrixTransform(p.getScreenCTM().inverse());
 function snap(a,b){if(!a||!b)return;const target=local(b,screen(a,true)),start=b.getPointAtLength(0);b.setAttribute('transform',`translate(${target.x-start.x} ${target.y-start.y})`);moved.add(b);}
 function bar(key,a,b){const p=path(key);a=path(a);b=path(b);if(!p||!a||!b)return;const start=local(p,screen(a,true)),end=local(p,screen(b,false));p.setAttribute('d',`M ${start.x} ${start.y} H ${end.x}`);snap(p,b);}
 function update(){
  moved.forEach(p=>p.removeAttribute('transform'));moved.clear();
  for(const [el,margin]of margins)el.style.marginTop=margin;
  if(text)text.style.marginTop=textMargin;
  for(const [el,[left,top]]of raisedMargins){el.style.marginLeft=left;el.style.marginTop=top;}
  if(innerWidth<1200){if(ownsRailStart){if(originalRailStart[0])root.style.setProperty('--s2p34-h2-start',...originalRailStart);else root.style.removeProperty('--s2p34-h2-start');ownsRailStart=false;}return;}
  bar('s2p1-h1','s2p1-arc1','s2p1-arc2');
  bar('s2p2-h1','s2p2-arc1','s2p2-arc2');
  // The incoming rail owns the entry height; preserve the original next arc shape.
  const previous=path('s2p2-h2'),bend=path('s2p2-arc2');
  if(previous&&bend){const start=local(previous,screen(bend,true)),end=previous.getPointAtLength(previous.getTotalLength());previous.setAttribute('d',`M ${start.x} ${start.y} H ${end.x}`);}
  snap(previous,path('s2p34-arc1'));
  if(actor&&previous){const rect=actor.getBoundingClientRect(),scale=rect.height/(actor.offsetHeight||rect.height)||1,shift=(screen(previous,true).y-rect.bottom)/scale;
   for(const el of [actor,shadow].filter(Boolean))el.style.marginTop=((parseFloat(getComputedStyle(el).marginTop)||0)+shift)+'px';}
  bar('s2p34-h1','s2p34-arc1','s2p34-arc2');
  bar('s2p34-h2','s2p34-arc2','s2p34-arc3');
  if(raised){
   const arc=path('s2p34-arc3'),corner=screen(arc,false),r=raised.getBoundingClientRect(),scale=r.height/(raised.offsetHeight||r.height)||1;
   const section=document.getElementById('s4-root-container').getBoundingClientRect();
   const dx=(section.left+section.width/2-r.left-r.width/2)/scale,dy=(corner.y-r.top-r.height*.05)/scale;
   for(const el of [raised,raisedShadow].filter(Boolean)){el.style.marginLeft=((parseFloat(getComputedStyle(el).marginLeft)||0)+dx)+'px';el.style.marginTop=((parseFloat(getComputedStyle(el).marginTop)||0)+dy)+'px';}
   const aligned=raised.getBoundingClientRect(),target=new DOMPoint(aligned.left+aligned.width*.9,corner.y);
   const desired=local(arc,target),start=arc.getPointAtLength(0);
   arc.setAttribute('transform',`translate(${desired.x-start.x} ${desired.y-start.y})`);moved.add(arc);
   const rail=path('s2p34-h2'),from=local(rail,screen(path('s2p34-arc2'),true)),to=local(rail,screen(arc,false));
   // Persist the same endpoint in the parameter-driven renderer as well as the SVG.
   const endpoint=to.x+'px';
   if(root.style.getPropertyValue('--s2p34-h2-start')!==endpoint)root.style.setProperty('--s2p34-h2-start',endpoint,'important');
   ownsRailStart=true;
   rail.dataset.s=String(to.x);
   rail.setAttribute('d',`M ${from.x} ${from.y} H ${to.x}`);
  }
  if(text){const line=path('s2p34-h1'),rect=text.getBoundingClientRect(),scale=rect.width/(text.offsetWidth||rect.width)||1;
   const target=screen(line,false).y+24;
   text.style.marginTop=((parseFloat(getComputedStyle(text).marginTop)||0)+(target-rect.top)/scale)+'px';}
 }
 let pending=false;
 function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{pending=false;update();})));}
 const previous=window.fpLinesUpdate;
 if(previous)window.fpLinesUpdate=(...args)=>{const result=previous(...args);schedule();return result;};
 addEventListener('fp:webflow-ready',schedule);addEventListener('resize',schedule);document.fonts.ready.then(schedule);
 schedule();
})();
