(() => {
 const saved=new Map(),root=document.getElementById('fp-master-root');
 function clearFilter(el){if(!saved.has(el))saved.set(el,[el.style.getPropertyValue('filter'),el.style.getPropertyPriority('filter')]);el.style.setProperty('filter','none','important');}
 function update(){
  if(innerWidth>=1200||!CSS.supports('-webkit-touch-callout','none')){
   for(const [el,[value,priority]]of saved){if(value)el.style.setProperty('filter',value,priority);else el.style.removeProperty('filter');}saved.clear();return;
  }
  root.querySelectorAll('path.fp-seg,path.fp-track,.fp-fill-path,.fp-baton-arc,.s1-line-path,.mobile-seam-path,.mobile-s6-track path').forEach(path=>{
   clearFilter(path);
   for(let node=path.parentElement;node&&node!==root&&node.tagName.toLowerCase()!=='svg';node=node.parentElement)if(node.hasAttribute('filter')||node.style.filter)clearFilter(node);
  });
 }
 const previous=window.fpLinesUpdate;
 if(previous)window.fpLinesUpdate=(...args)=>{const value=previous(...args);update();return value;};
 addEventListener('resize',()=>requestAnimationFrame(update));addEventListener('fp:webflow-ready',update);document.fonts.ready.then(update);update();
})();
