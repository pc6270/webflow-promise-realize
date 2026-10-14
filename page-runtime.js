(() => {
  const root = document.getElementById('fp-master-root');
  if (!root) return;
  // Local custom-property declarations override inheritance from the page root.
  const owners = new Map();
  const pencilFloods=[...document.querySelectorAll('feFlood')].filter(e=>/^rgba\(255,\s*255,\s*255/.test(e.getAttribute('flood-color')||''));
  function collect(rules) {
    for (const rule of rules) {
      if (rule.cssRules) collect(rule.cssRules);
      if (!rule.style || !rule.selectorText) continue;
      for (const name of rule.style) {
        if (!name.startsWith('--')) continue;
        let elements;
        try { elements=document.querySelectorAll(rule.selectorText); } catch { continue; }
        const set=owners.get(name)||new Set();
        for(const element of elements) if(element===root||root.contains(element))set.add(element);
        owners.set(name,set);
      }
    }
  }
  for(const sheet of document.styleSheets)try{collect(sheet.cssRules)}catch{}
  const apply = values => {
    window.FP_PAGE_CONFIG = {...window.FP_PAGE_CONFIG, ...values};
    for (const [name, value] of Object.entries(values || {})) {
      if (/^--[\w-]+$/.test(name)) {
        root.style.setProperty(name, String(value));
        for(const element of owners.get(name)||[]) element.style.setProperty(name,String(value));
      }
    }
    window.fpLinesUpdate?.();
    window.dispatchEvent(new Event('resize'));
    updateTabletText();
    updateNoise();
    for(const flood of pencilFloods)flood.setAttribute('flood-color',window.FP_PAGE_CONFIG['--brand-line-flood']);
    const y=window.FP_PAGE_CONFIG['--s6-h-y'];
    for(const id of ['sec6-d-dot-1','sec6-d-dot-2','sec6-d-dot-3'])document.getElementById(id)?.style.setProperty('top',y);
    window.dispatchEvent(new Event('scroll'));
  };
  function updateTabletText(){
    const tablet=window.innerWidth>=768&&window.innerWidth<1200;
    const canvas=document.getElementById('wf-sec8-canvas');
    if(!canvas)return;
    for(const part of ['sub','cat','line','title','desc'])for(const axis of ['x','y',...(part==='desc'?['w']:[])]){
      const key='--s8-'+part+'-'+axis;
      canvas.style.setProperty(key,window.FP_PAGE_CONFIG[tablet?'--s8-tab-'+part+'-'+axis:key]||'0px');
    }
  }
  function updateNoise(){
    const freq=window.FP_PAGE_CONFIG['--s4-noise-freq'];
    const opacity=window.FP_PAGE_CONFIG['--s4-noise-opacity'];
    document.getElementById('s4-noise-turb')?.setAttribute('baseFrequency',freq+' '+freq);
    const flood=document.getElementById('s4-noise-flood');
    if(flood){flood.setAttribute('flood-color','rgb(157,157,157)');flood.setAttribute('flood-opacity',opacity);}
  }
  window.addEventListener('resize',updateTabletText);
  apply(window.FP_PAGE_CONFIG);
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.data?.type !== 'fp:config') return;
    if (event.origin !== location.origin) return;
    apply(event.data.values);
  });
  document.fonts?.ready.then(() => {
    window.dispatchEvent(new Event('resize'));
    window.fpLinesUpdate?.();
  });
})();
