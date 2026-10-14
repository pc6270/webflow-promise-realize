(function(){
  let until=0, pending=false;
  function tick(){
    if(window.fpLinesUpdate)window.fpLinesUpdate();
    if(window.fpS6AlignStage)window.fpS6AlignStage();
    if(performance.now()<until)requestAnimationFrame(tick);else pending=false;
  }
  function sync(){until=performance.now()+900;if(!pending){pending=true;requestAnimationFrame(tick);}}
  document.querySelectorAll('[id^="sec6-d-circle-"]').forEach(circle=>{
    circle.addEventListener('transitionrun',sync);
    circle.addEventListener('transitionend',sync);
    new MutationObserver(sync).observe(circle,{attributes:true,attributeFilter:['style']});
  });
  window.addEventListener('resize',sync);
  window.addEventListener('load',sync);
  sync();
})();
