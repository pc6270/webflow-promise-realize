(() => {
 // Capture tablet clicks once, before the legacy per-card handlers.
 document.addEventListener('click',event=>{
  if(innerWidth<768||innerWidth>=1200||document.getElementById('inspection-video-modal')?.open)return;
  const watch=event.target.closest('.s4-btn-watch-video')||[...document.querySelectorAll('.s4-tab-panel.active .s4-accordion-card.active .s4-btn-watch-video')].find(b=>{const r=b.getBoundingClientRect();return r.width>0&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;});
  if(watch){event.preventDefault();event.stopImmediatePropagation();window.fpOpenInspectionVideo?.(watch);return;}
  let card=event.target.closest('.s4-accordion-card');
  if(!card&&!event.target.closest('.s4-tab-btn,button,a,input,select,textarea')){card=[...document.querySelectorAll('.s4-tab-panel.active .s4-accordion-card')].find(c=>{const r=c.getBoundingClientRect();return r.width>0&&r.height>0&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;});}
  if(!card)return;
  event.preventDefault();event.stopImmediatePropagation();
  const open=!card.classList.contains('active');
  card.parentElement.querySelectorAll('.s4-accordion-card').forEach(c=>{c.classList.remove('active');c.setAttribute('aria-expanded','false');});
  if(open){card.classList.add('active');card.setAttribute('aria-expanded','true');}
 },true);
 document.querySelectorAll('.s4-accordion-card').forEach(card=>{const button=document.createElement('button');button.type='button';button.className='s4-card-toggle';button.setAttribute('aria-label','展開 '+card.querySelector('.s4-collapsed-title').textContent);card.append(button);});
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
 svg.innerHTML='<defs><filter id="tabletFlowPencil" filterUnits="userSpaceOnUse" x="-2500" y="-2500" width="6000" height="6000"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" seed="5976" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale=".7"/></filter></defs>';
 document.getElementById('fp-master-root').append(svg);
 const paths=[...document.querySelectorAll('.s2p1-dt-container path.fp-seg,.s2p2-dt-layer path.fp-seg,.s2p34-line-svg path.fp-seg')],parents=new Map();
 const styles=new Map(paths.map(p=>[p,[p.style.getPropertyValue('filter'),p.style.getPropertyPriority('filter')]]));
 paths.forEach(p=>{for(let g=p.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)if(g.hasAttribute('filter'))parents.set(g,g.getAttribute('filter'));});
 function filters(){const tablet=innerWidth>=768&&innerWidth<1200;
  parents.forEach((value,g)=>g.setAttribute('filter',tablet?'none':value));
  paths.forEach(p=>{if(tablet)p.style.setProperty('filter','url(#tabletFlowPencil)','important');else{const [value,priority]=styles.get(p);if(value)p.style.setProperty('filter',value,priority);else p.style.removeProperty('filter');}});
 }
 addEventListener('resize',filters);filters();
})();
