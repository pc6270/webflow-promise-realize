(() => {
 const root=document.getElementById('fp-master-root');let pending=false;
 const properties=['transition-duration','transition-delay','animation-duration','animation-delay'];
 const seconds=value=>value.trim().endsWith('ms')?parseFloat(value)/1000:parseFloat(value)||0;
 const touched=new Map(),dirty=new Set([root]);
 function update(){pending=false;
  const elements=new Set();for(const region of dirty)for(const element of region.querySelectorAll('*'))elements.add(element);dirty.clear();for(const element of elements){
   if(element.namespaceURI==='http://www.w3.org/2000/svg'||element.classList.contains('s6-seat-holder'))continue;
   if(!touched.has(element))touched.set(element,properties.map(key=>[element.style.getPropertyValue(key),element.style.getPropertyPriority(key)]));
   const original=touched.get(element);properties.forEach((key,i)=>{const [value,priority]=original[i];if(value)element.style.setProperty(key,value,priority);else element.style.removeProperty(key);});
   const style=getComputedStyle(element);
   for(const [key,field,factor,cap]of [['transition-duration','transitionDuration',.5,.28],['transition-delay','transitionDelay',0,0],['animation-duration','animationDuration',.5,.28],['animation-delay','animationDelay',0,0]]){
    const values=style[field].split(',').map(seconds);if(!values.some(v=>v>0))continue;
    element.style.setProperty(key,values.map(v=>Math.min(innerWidth<768?cap*.8:cap,v*factor)+'s').join(','),'important');
   }
  }
 }
 function soon(){if(!pending){pending=true;requestAnimationFrame(update);}}
 const observer=new MutationObserver(records=>{records.forEach(record=>dirty.add(record.target));soon();});
 for(const id of ['s1-root-container','s2p1-root-container','s2p2-root-container','s2p34-root-container','s4-root-container','s5-global-container','wf-sec6-root','wf-sec7-root','wf-sec8-root'])observer.observe(document.getElementById(id),{attributes:true,attributeFilter:['class']});
 addEventListener('fp:webflow-ready',()=>{dirty.add(root);soon();});addEventListener('resize',()=>{dirty.add(root);soon();});soon();
})();
