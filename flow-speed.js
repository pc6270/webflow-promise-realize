(() => {
 const selectors='.s1-line-path,.s2p34-mb-line-svg path,.s2p2-mb-layer .s2p2-line-svg path,.s5-mobile-wrapper .s5-line-path path,.wf-sec7-m-vector-svg path,.wf-sec8-mobile-outer .wf-sec8-line-path path';
 function update(){document.querySelectorAll(selectors).forEach(path=>{
  if(!path.getClientRects().length)return;const matrix=path.getScreenCTM();if(!matrix)return;
  const duration=Math.max(.10,path.getTotalLength()*Math.hypot(matrix.a,matrix.b)/(innerWidth<768?1400:1000));
  path.style.setProperty('transition-duration',duration+'s','important');
  path.style.setProperty('transition-timing-function','linear','important');
 });}
 addEventListener('load',update);addEventListener('resize',()=>requestAnimationFrame(update));update();
})();
