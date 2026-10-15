(() => {
 const root=document.getElementById('fp-master-root');
 const track=document.getElementById('sec6-d-track');
 const stage=track.querySelector('.wf-sec6-desktop-sticky-inner');
 let pending=false,owned=false;
 function update(){
  pending=false;
  if(innerWidth<768||innerWidth>=1200||!root.classList.contains('fp-tablet')){
   if(owned){stage.style.removeProperty('transform');stage.classList.remove('fp-tablet-pinned');owned=false;}
   return;
  }
  const scale=parseFloat(getComputedStyle(root).getPropertyValue('--tablet-scale'))||1;
  const rect=track.getBoundingClientRect();
  const height=stage.offsetHeight*scale;
  const travel=Math.max(0,rect.height-height);
  const offset=Math.max(0,Math.min(travel,96-rect.top));
  stage.style.setProperty('transform',`translateY(${offset/scale}px)`,'important');
  stage.classList.toggle('fp-tablet-pinned',offset>0&&offset<travel);
  owned=true;
 }
 function soon(){if(!pending){pending=true;requestAnimationFrame(update);}}
 window.fpTabletStickyUpdate=update;
 addEventListener('scroll',soon,{passive:true});
 addEventListener('resize',soon);addEventListener('fp:webflow-ready',soon);
 new ResizeObserver(soon).observe(track);
 document.fonts.ready.then(soon);soon();
})();
