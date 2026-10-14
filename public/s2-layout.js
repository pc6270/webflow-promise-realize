(() => {
  const root = document.getElementById('fp-master-root');
  const one = document.getElementById('s2p1-root-container');
  const two = document.getElementById('s2p2-root-container');
  if (!root || !one || !two) return;
  const wrap1 = one.closest('.fp-s2p1-wrapper'), wrap2 = two.closest('.fp-s2p2-wrapper');
  const keys=['--s2p1-arc1-x','--s2p1-arc1-y','--s2p1-arc2-x','--s2p1-arc2-y','--s2p1-h1-start','--s2p1-h1-end','--s2p1-h1-y','--s2p2-h1-end','--s2p2-h2-end'];
  const initial={...window.FP_PAGE_CONFIG,
    '--s2p1-x':'10px','--s2p2-x':'108px','--s2p2-y':'-47px',
    '--s2p1-tab-x':'-18px','--s2p2-tab-x':'100px','--s2p2-tab-y':'-38px',
    '--s2p1-mb-x':'0px','--s2p2-mb-x':'0px','--s2p2-mb-y':'-180px',
    '--s2p1-arc1-x':'0px','--s2p1-arc1-y':'0px','--s2p1-arc2-x':'0px','--s2p1-arc2-y':'0px',
    '--s2p1-h1-start':'309.66px','--s2p1-h1-end':'1039.92px','--s2p1-h1-y':'227.9px',
    '--s2p2-h1-end':'798.16px','--s2p2-h2-end':'794.7px'};
  let scheduled=false;
  function update(){
    scheduled=false;
    if(innerWidth<1200)return;
    const baseline=Object.fromEntries(keys.map(k=>[k,window.FP_PAGE_CONFIG[k]]));
    const w=window.innerWidth;
    const mobile=w<768, tablet=w>=768&&w<1200;
    const basis=mobile?402:tablet?1024:1440;
    const scale=Math.min(1,w/basis);
    root.style.setProperty('--s2-layout-scale',scale);
    const localX=mobile?26:tablet?70:125+(w-1440)/2;
    const nextX=mobile?53:tablet?226:311+(w-1440)/2;
    const chosenX=mobile?localX:tablet?70:localX;
    const suffix=mobile?'-mb':tablet?'-tab':'';
    const val=k=>parseFloat(window.FP_PAGE_CONFIG[k])||0;
    const delta=k=>val(k)-(parseFloat(initial[k])||0);
    const x1=chosenX* (w<basis?scale:1)+delta('--s2p1'+suffix+'-x'),x2=nextX*(w<basis?scale:1)+delta('--s2p2'+suffix+'-x');
    const canvas1=one.querySelector(mobile?'.s2p1-mb-container':'.s2p1-dt-container');
    const canvas2=two.querySelector(mobile?'.s2p2-mb-layer':'.s2p2-dt-layer');
    const wr1=wrap1.getBoundingClientRect(),wr2=wrap2.getBoundingClientRect();
    one.style.height=((mobile?504:tablet?744:739)*scale)+'px';
    two.style.height=((mobile?601:tablet?603:650)*scale)+'px';
    wrap2.style.marginTop=(delta('--s2p2'+suffix+'-y')+val('--s2p2'+suffix+'-mt'))+'px';
    wrap1.style.marginBottom=val('--s2p1'+suffix+'-mb')+'px';
    canvas1.style.left=(x1-one.getBoundingClientRect().left-window.scrollX)+'px';
    canvas2.style.left=(x2-two.getBoundingClientRect().left-window.scrollX)+'px';
    const values={...baseline,...(tablet?{'--s2p1-arc1-x':'-231px','--s2p1-arc1-y':'-5.9px','--s2p1-arc2-x':'5.34px','--s2p1-arc2-y':'-5.9px','--s2p1-h1-start':'315px','--s2p1-h1-end':'809px','--s2p1-h1-y':'222px','--s2p2-h1-end':'519.16px','--s2p2-h2-end':'519.16px'}:{})};
    for(const [k,v] of Object.entries(values))if(v!=null){
      const adjusted=tablet?(parseFloat(v)+delta(k))+'px':v;
      root.style.setProperty(k,adjusted);
    }
    root.dataset.s2Layout=mobile?'mobile':tablet?'tablet':'desktop';
    window.fpLinesUpdate?.();
  }
  function soon(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
  window.addEventListener('resize',soon);
  window.addEventListener('load',soon);
  document.fonts?.ready.then(soon);
  soon();
})();
