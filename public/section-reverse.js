(() => {
 let last=scrollY;const reversed=new Map();
 function restore(section){const entries=reversed.get(section);if(!entries)return;for(const [path,offset,priority,transition]of entries){if(offset)path.style.setProperty('stroke-dashoffset',offset,priority);else path.style.removeProperty('stroke-dashoffset');if(transition)path.style.setProperty('transition',transition,'important');else path.style.removeProperty('transition');}reversed.delete(section);}
 addEventListener('scroll',()=>{const up=scrollY<last;last=scrollY;
  document.querySelectorAll('.fp-sec-wrapper').forEach(section=>{
   if(section.classList.contains('fp-sequence-pending'))return;
   const r=section.getBoundingClientRect();
   if(up&&r.top>innerHeight*.75&&!reversed.has(section)&&!section.classList.contains('fp-sec6-wrapper')){
    const entries=[];section.querySelectorAll('path.fp-seg,.s1-line-path').forEach(path=>{entries.push([path,path.style.getPropertyValue('stroke-dashoffset'),path.style.getPropertyPriority('stroke-dashoffset'),path.style.getPropertyValue('transition')]);path.style.setProperty('transition','stroke-dashoffset .25s linear','important');path.style.setProperty('stroke-dashoffset',path.getAttribute('pathLength')==='1'?'1':String(path.getTotalLength()),'important');});reversed.set(section,entries);
   }else if(!up&&r.top<innerHeight*.85)restore(section);
  });
 },{passive:true});
})();
