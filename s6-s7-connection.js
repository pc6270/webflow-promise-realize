(function(){
  const root=document.getElementById('fp-master-root');
  const originals=new WeakMap();let queued=false;
  const measure=document.createElement('div');measure.setAttribute('aria-hidden','true');document.body.append(measure);
  function layout(){
    queued=false;if(innerWidth<1200){[7,8].forEach(n=>{const canvas=document.getElementById('wf-sec'+n+'-canvas');for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])canvas.style.removeProperty(key);});return;}
    if(window.fpLinesUpdate)window.fpLinesUpdate();
    const cs=getComputedStyle(root),s6=document.getElementById('wf-sec6-canvas');
    let shared=1;
    const headerHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
    const set=(key,value)=>{if(root.style.getPropertyValue(key)!==value)root.style.setProperty(key,value);};
    set('--s6-desktop-beam-shorten','0px');set('--s6-h-y',window.FP_PAGE_CONFIG?.['--s6-h-y']||'855px');
    const available=Math.max(240,innerHeight-headerHeight-48);
    let stageHeight=1010,scale=Math.min(1,innerWidth*.95/1221,available/stageHeight);
    const description=document.getElementById('sec6-d-desc'),header=document.getElementById('sec6-d-header-group');
    const finalText=window.FP_CONTENT_CONFIG?.section6?.[2]?.desc||description.textContent;
    measure.textContent=finalText;
    for(let pass=0;pass<4;pass++){
      set('--s6-desktop-scale',String(scale));set('--s6-desktop-font-factor',String(1/scale));
      const textStyle=getComputedStyle(description);
      Object.assign(measure.style,{position:'fixed',left:'-10000px',top:'0',visibility:'hidden',width:description.offsetWidth+'px',fontFamily:textStyle.fontFamily,fontSize:textStyle.fontSize,fontWeight:textStyle.fontWeight,lineHeight:textStyle.lineHeight,letterSpacing:textStyle.letterSpacing,whiteSpace:'normal',padding:'0',margin:'0'});
      stageHeight=Math.max(936,883+measure.offsetHeight+24/scale);
      scale=Math.min(1,innerWidth*.95/1221,available/stageHeight);
    }
    shared=scale;set('--s6-desktop-scale',String(scale));set('--s6-desktop-font-factor',String(1/scale));
    set('--s6-desktop-stage-height',stageHeight+'px');
    set('--s6-desktop-header-top',(368-20/scale-header.offsetHeight)+'px');
    const fixed7=document.getElementById('wf-sec7-canvas');
    fixed7.style.transform='none';document.getElementById('wf-sec7-desktop-outer').style.height='800px';
    for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])fixed7.style.removeProperty(key);
    fixed7.querySelectorAll('.wf-sec7-main-title,.wf-sec7-description,.wf-sec7-ball-text').forEach(el=>{for(const key of ['font-size','letter-spacing','line-height','width'])el.style.removeProperty(key);});
    const independent8=document.getElementById('wf-sec8-canvas');
    for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])independent8.style.removeProperty(key);
    independent8.querySelectorAll('.wf-sec8-main-title,.wf-sec8-description,.wf-sec8-subtitle,.wf-sec8-category-title,.wf-sec8-circle-text').forEach(el=>{
      for(const key of ['font-size','letter-spacing','line-height','width'])el.style.removeProperty(key);
    });
    const scale8=1;
    independent8.style.transform='scale('+scale8+')';
    document.getElementById('wf-sec8-desktop-outer').style.height=(1200*scale8)+'px';
    const arc=document.querySelector('#wf-sec7-canvas path[data-k="s7-arc1"]');
    const baseline=document.querySelector('#wf-sec7-canvas path[data-k="s7-h1"]');
    const svg=document.querySelector('.fp-s6-track'),track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
    const canvas7=document.getElementById('wf-sec7-canvas');
    const outer7=document.getElementById('wf-sec7-desktop-outer');
    // Restore the measured base before calculating the natural (released) position.
    canvas7.style.left='0px';canvas7.style.top='0px';outer7.style.marginTop='0px';
    const release=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height;
    const delta=release-sticky.getBoundingClientRect().top;
    const x=parseFloat(cs.getPropertyValue('--s6-h4-end'))||1131.87;
    const y=parseFloat(cs.getPropertyValue('--s6-h-y'))||855;
    const target=new DOMPoint(x,y).matrixTransform(svg.getScreenCTM());
    target.y+=delta;
    const first=arc.getPointAtLength(0).matrixTransform(arc.getScreenCTM());
    // Translate S7 to meet S6; never stretch or rebuild the original arc.
    canvas7.style.left=(target.x-first.x)+'px';
    canvas7.style.top=(target.y-first.y)+'px';
    const matrix=svg.getScreenCTM().inverse().multiply(arc.getScreenCTM());
    const tokens=arc.getAttribute('d').match(/[MC]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
    const mapped=[];
    for(let i=0;i<tokens.length;){
      if(/[MC]/.test(tokens[i])){mapped.push(tokens[i++]);continue;}
      const p=new DOMPoint(+tokens[i++],+tokens[i++]).matrixTransform(matrix);
      mapped.push(p.x,p.y-delta/shared);
    }
    const end=window.fpS6Steps?.step3||parseFloat(cs.getPropertyValue('--s6-step3-x'))||930;
    window.fpS6ConnectionD=mapped.join(' ').replace(/^M\s+([^ ]+)\s+([^ ]+)/,(_,ax,ay)=>'M '+end+' '+y+' H '+ax);
    document.getElementById('sec6-d-baton-arc').setAttribute('d',window.fpS6ConnectionD);
    // The original S7 path is a reference only. The visible arc lives with S6.
    arc.setAttribute('aria-hidden','true');
    // Keep S8's original entry arc attached to the lower circle in S7.
    const canvas8=document.getElementById('wf-sec8-canvas');
    const outer8=document.getElementById('wf-sec8-desktop-outer');
    const entry8=canvas8.querySelector('path[data-k="s8-arc1"]');
    const circle7=canvas7.querySelector('.wf-sec7-ball-4');
    if(entry8&&circle7){
      canvas8.style.left='0px';canvas8.style.top='0px';outer8.style.marginTop='0px';
      const centered=canvas8.getBoundingClientRect();canvas8.style.left=(innerWidth/2-centered.left-centered.width/2)+'px';
      entry8.removeAttribute('transform');
      entry8.setAttribute('d','M29.16 2.16C29.16 64.3757 79.6129 114.808 141.854 114.808');
      const circleShape=circle7.querySelector('circle');
      const rect=circle7.getBoundingClientRect();
      let edge=new DOMPoint(rect.left+rect.width/2,rect.bottom);
      if(circleShape){const c=circleShape,border=parseFloat(getComputedStyle(c).strokeWidth)||0;edge=new DOMPoint(+c.getAttribute('cx'),+c.getAttribute('cy')+(+c.getAttribute('r'))+border/2).matrixTransform(c.getScreenCTM());}
      const matrix8=entry8.getScreenCTM(),cap=(parseFloat(getComputedStyle(entry8).strokeWidth)||3)*Math.hypot(matrix8.a,matrix8.b)/2;
      edge.y+=cap;
      const entry=entry8.getPointAtLength(0).matrixTransform(matrix8);
      canvas8.querySelector('#s7-s8-extension')?.remove();
      const localEdge=edge.matrixTransform(matrix8.inverse()),localEntry=entry8.getPointAtLength(0);
      entry8.setAttribute('transform',`translate(${localEdge.x-localEntry.x} ${localEdge.y-localEntry.y})`);
      const rail8=canvas8.querySelector('path[data-k="s8-h1"]'),nextArc=canvas8.querySelector('path[data-k="s8-arc2"]');
      if(rail8&&nextArc){
        const exit=entry8.getPointAtLength(entry8.getTotalLength()).matrixTransform(entry8.getScreenCTM()).matrixTransform(rail8.getScreenCTM().inverse());
        const finish=nextArc.getPointAtLength(0).matrixTransform(nextArc.getScreenCTM()).matrixTransform(rail8.getScreenCTM().inverse());
        rail8.setAttribute('d',`M ${exit.x} ${exit.y} H ${finish.x}`);
        nextArc.removeAttribute('transform');
        const wanted=new DOMPoint(finish.x,exit.y).matrixTransform(rail8.getScreenCTM()).matrixTransform(nextArc.getScreenCTM().inverse()),start=nextArc.getPointAtLength(0);
        nextArc.setAttribute('transform',`translate(${wanted.x-start.x} ${wanted.y-start.y})`);
        const vertical=canvas8.querySelector('path[data-k="s8-v1"]'),bottomArc=canvas8.querySelector('path[data-k="s8-arc3"]');
        if(vertical&&bottomArc){const from=nextArc.getPointAtLength(nextArc.getTotalLength()).matrixTransform(nextArc.getScreenCTM()).matrixTransform(vertical.getScreenCTM().inverse()),to=bottomArc.getPointAtLength(0).matrixTransform(bottomArc.getScreenCTM()).matrixTransform(vertical.getScreenCTM().inverse());vertical.setAttribute('d',`M ${from.x} ${from.y} V ${to.y}`);}
      }

    }
    const seatPath=root.querySelector('path[data-k="s5-h2"]'),seatArc=root.querySelector('path[data-k="s5-arc3"]');
    if(seatPath&&seatArc){
      const inverse=seatPath.getScreenCTM().inverse();
      const from=seatArc.getPointAtLength(seatArc.getTotalLength()).matrixTransform(seatArc.getScreenCTM()).matrixTransform(inverse);
      const edge=new DOMPoint(-2,0).matrixTransform(inverse);
      set('--s5-h2-start',edge.x+'px');set('--s5-h2-end',from.x+'px');
      seatPath.setAttribute('d',`M ${from.x} ${from.y} H ${edge.x}`);
    }
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(layout);}}
  window.addEventListener('resize',schedule);window.addEventListener('fp:webflow-ready',schedule);
  new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['style']});
  document.fonts.ready.then(schedule);schedule();
})();
