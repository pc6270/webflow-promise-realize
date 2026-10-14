(() => {
 const sections=[['sec1','區塊 1'],['s2p1','區塊 2 · Part 1'],['s2p2','區塊 2 · Part 2'],['s2p34','區塊 2 · Part 3–4'],['sec4','區塊 4'],['sec5','區塊 5'],['sec6','區塊 6'],['sec7','區塊 7'],['sec8','區塊 8']];
 const style=document.createElement('style');
 style.textContent='.fp-section-fade{transition:opacity .32s ease}.fp-section-fade.fp-outside{opacity:0}.fp-guide-layer{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:99999;display:none}.fp-guide-box{position:absolute;box-sizing:border-box;border:2px dashed var(--guide-color);background:color-mix(in srgb,var(--guide-color) 4%,transparent)}.fp-guide-label{position:absolute;left:0;top:0;background:var(--guide-color);color:white;padding:3px 6px;font:12px system-ui;white-space:nowrap}@media(prefers-reduced-motion:reduce){.fp-section-fade{transition:none}}';
 document.head.append(style);
 const layer=document.createElement('div');layer.className='fp-guide-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const items=sections.map(([id,label],i)=>{
  const section=document.querySelector('.fp-'+id+'-wrapper');
  const box=document.createElement('div');box.className='fp-guide-box';box.style.setProperty('--guide-color',['#a24d37','#416b90','#597c47'][i%3]);
  const tag=document.createElement('span');tag.className='fp-guide-label';tag.textContent=label;box.append(tag);layer.append(box);section.classList.add('fp-section-fade');return {section,box};
 });
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('fp-outside',!e.isIntersecting)),{threshold:0});
 items.forEach(({section})=>observer.observe(section));
 let enabled=new URLSearchParams(location.search).get('guides')==='1',pending=false;layer.style.display=enabled?'block':'none';
 function update(){pending=false;if(!enabled)return;items.forEach(({section,box})=>{const r=section.getBoundingClientRect();Object.assign(box.style,{left:Math.max(0,r.left)+'px',top:r.top+'px',width:Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left))+'px',height:Math.max(1,r.height)+'px'});});}
 function soon(){if(!pending){pending=true;requestAnimationFrame(update);}}
 window.fpSectionGuidesUpdate=soon;
 addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='fp:guides')return;enabled=!!e.data.enabled;layer.style.display=enabled?'block':'none';soon();});
 soon();addEventListener('load',soon);document.fonts.ready.then(soon);
 addEventListener('resize',soon);addEventListener('scroll',soon,{passive:true});
 const resize=new ResizeObserver(soon);items.forEach(({section})=>resize.observe(section));
 new MutationObserver(soon).observe(document.getElementById('fp-master-root'),{attributes:true,subtree:true,attributeFilter:['style']});
})();
