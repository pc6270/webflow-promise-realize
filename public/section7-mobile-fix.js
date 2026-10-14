(() => {
  const root=document.getElementById('wf-sec7-root');
  const path=root?.querySelector('.wf-sec7-m-vector-svg path');
  if(!path)return;
  // Keep the original supplied path; restore the mobile drawing after a mode switch.
  let previous=window.innerWidth<768;
  function sync(){
    const mobile=window.innerWidth<768;
    if(mobile&&root.classList.contains('wf-sec7-active')){
      path.style.strokeDasharray=String(path.getTotalLength());
      path.style.strokeDashoffset='0';
    }
    if(mobile!==previous){previous=mobile;if(mobile&&root.classList.contains('wf-sec7-active'))window.replaySec7Animation?.();}
  }
  window.addEventListener('resize',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['class']});
  sync();
})();
