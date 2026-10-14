(() => {
 const root=document.getElementById('fp-master-root');
 window.fpTabletSetPhase=phase=>{
  if(innerWidth<768||innerWidth>=1200)return;
  root.dataset.tabletPhase=String(phase);
  phase=Math.max(0,Math.min(2,phase));
  const positions=phase===0?[78,488,732]:[78,338,phase===2?582:732];
  for(let i=0;i<3;i++){
   root.style.setProperty('--tablet-circle'+(i+1)+'-x',positions[i]+'px');
   root.style.setProperty('--tablet-circle'+(i+1)+'-y',((parseFloat(root.style.getPropertyValue('--tablet-stage-top'))||190)+(i===phase?0:150))+'px');
   root.style.setProperty('--tablet-circle'+(i+1)+'-size',(i===phase?372:222)+'px');
  }
  const anchor=positions[phase]+24;
  if(root.dataset.s6TextSwitching==='1')return;
  root.style.setProperty('--tablet-desc-x',anchor+'px');
  const title=document.getElementById('sec6-d-title');
  root.style.setProperty('--tablet-header-x',anchor+'px');
 };
})();
