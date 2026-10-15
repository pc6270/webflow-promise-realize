(function(){
 const root=document.getElementById('fp-master-root');
 const sections=[['sec1',29,166,347,361],['s2p1',26,478,363,504],['s2p2',53,982,318,601],['s2p34',23,1528,335,699],['sec4',-2,2227,402,820],['sec5',26,3047,380.5,789.38],['sec6',0,3799,402,613.626],['sec7',31,4287,346,717.983],['sec8',24,4961,346,1075.168]];
 const saved=new Map();let pending=false,active=false;
 sections.forEach(([id])=>{const el=document.querySelector('.fp-'+id+'-wrapper');saved.set(el,el.getAttribute('style'));});
 function layout(){
  pending=false;
  if(innerWidth>=768){if(active){root.style.removeProperty('height');for(const [el,style] of saved){if(style==null)el.removeAttribute('style');else el.setAttribute('style',style);}active=false;}return;}
  active=true;
  const scale=Math.min(1,innerWidth/402),origin=Math.max(0,(innerWidth-402*scale)/2),config=window.FP_PAGE_CONFIG||{};
  root.style.setProperty('--mobile-figma-scale',scale);
  const val=name=>parseFloat(config[name])||0;const firstScreenTop=Math.min(166*scale,Math.max(24,innerHeight-(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110)-361*scale));const firstScreenExtra=0;
  const s4=document.getElementById('s4-root-container');
  const extra=Math.max(0,s4.offsetHeight-820);
  sections.forEach(([id,x,y,w,h])=>{
   const el=document.querySelector('.fp-'+id+'-wrapper'),after=y>2227?extra:0;
   el.style.left=(origin+(x+val('--'+id+'-mb-x'))*scale)+'px';
   el.style.top=(firstScreenTop+(id==='sec1'?0:firstScreenExtra)+(y-166+after+val('--'+id+'-mb-y')+val('--'+id+'-mb-mt'))*scale)+'px';
   el.style.width=w+'px';el.style.height=h+'px';
  });
  root.style.height=(firstScreenTop+firstScreenExtra+(6036.168-166+extra)*scale)+'px';
  window.fpMobileConnectionsUpdate?.();
 }
 function soon(){if(!pending){pending=true;requestAnimationFrame(layout);}}
 window.fpMobileLayoutUpdate=soon;
 window.addEventListener('fp:webflow-ready',soon);window.addEventListener('resize',soon);document.fonts.ready.then(soon);
 new ResizeObserver(soon).observe(document.getElementById('s4-root-container'));
 soon();
})();
