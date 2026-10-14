(() => {
 const root=document.getElementById('fp-master-root'),changed=new Set();
 const path=k=>root.querySelector('path[data-k="'+k+'"]');
 const point=(p,last)=>p.getPointAtLength(last?p.getTotalLength():0).matrixTransform(p.getScreenCTM());
 const local=(p,v)=>v.matrixTransform(p.getScreenCTM().inverse());
 function join(a,b){if(!a||!b)return;const target=local(b,point(a,true)),start=b.getPointAtLength(0);b.setAttribute('transform',`translate(${target.x-start.x} ${target.y-start.y})`);changed.add(b);}
 function horizontal(p,a,b){if(!p||!a||!b)return;const start=local(p,point(a,true)),finish=local(p,point(b,false));
  p.setAttribute('d',`M ${start.x} ${start.y} H ${finish.x}`);
  join(p,b);
 }
 function update(){if(!root.classList.contains('fp-tablet')){changed.forEach(p=>p.removeAttribute('transform'));changed.clear();return;}
  changed.forEach(p=>p.removeAttribute('transform'));changed.clear();
  path('s2p1-arc1').setAttribute('d','M845.161 2.16C907.499 2.16 958.032 52.6924 958.032 115.031C958.032 177.37 907.499 227.902 845.161 227.902');
  horizontal(path('s2p1-h1'),path('s2p1-arc1'),path('s2p1-arc2'));
  const photo1=document.querySelector('.s2p1-dt-container .circle-photo-box').getBoundingClientRect(),entry2=path('s2p2-arc1');
  const desired2=local(entry2,new DOMPoint(photo1.left+photo1.width/2,photo1.bottom)),first2=entry2.getPointAtLength(0);
  entry2.setAttribute('transform',`translate(${desired2.x-first2.x} ${desired2.y-first2.y})`);changed.add(entry2);
  horizontal(path('s2p2-h1'),path('s2p2-arc1'),path('s2p2-arc2'));
  horizontal(path('s2p2-h2'),path('s2p2-arc2'),path('s2p34-arc1'));
  horizontal(path('s2p34-h1'),path('s2p34-arc1'),path('s2p34-arc2'));
  horizontal(path('s2p34-h2'),path('s2p34-arc2'),path('s2p34-arc3'));
  const seat=path('s5-h2'),seatArc=path('s5-arc3');
  if(seat&&seatArc){const photo=document.querySelector('.s5-d-photo-frame').getBoundingClientRect(),pin=document.querySelector('.wf-sec6-desktop-sticky-inner').getBoundingClientRect().top-document.getElementById('sec6-d-track').getBoundingClientRect().top,desired=local(seatArc,new DOMPoint(photo.left+photo.width/2,photo.bottom+pin)),first=seatArc.getPointAtLength(0);seatArc.setAttribute('transform',`translate(${desired.x-first.x} ${desired.y-first.y})`);changed.add(seatArc);const end=local(seat,point(seatArc,true)),left=local(seat,new DOMPoint(-20,0));seat.setAttribute('d',`M ${end.x} ${end.y} H ${left.x}`);}
  const arc=path('s7-arc1'),rail=path('s6-h4');
  if(arc&&rail){
   const track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
   const y=parseFloat(getComputedStyle(root).getPropertyValue('--s6-h-y'))||627;
   const screenRail=new DOMPoint(0,y).matrixTransform(rail.getScreenCTM());
   const releaseTop=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height;
   const targetY=releaseTop+screenRail.y-sticky.getBoundingClientRect().top;
   const correction=targetY-point(arc,false).y;
   if(Math.abs(correction)>.1)for(const id of ['sec7','sec8']){
    const wrapper=document.querySelector('.fp-'+id+'-wrapper');
    wrapper.style.setProperty('top',(parseFloat(wrapper.style.top)+correction)+'px','important');
   }
   const entry=local(rail,point(arc,false)),start=rail.getPointAtLength(0);rail.setAttribute('d',`M ${start.x} ${y} H ${entry.x}`);

  }
  if(arc){const svg=document.querySelector('.fp-s6-track'),track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
   const release=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height,delta=release-sticky.getBoundingClientRect().top;
   const sm=svg.getScreenCTM(),matrix=sm.inverse().multiply(arc.getScreenCTM());const tokens=arc.getAttribute('d').match(/[MC]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi),mapped=[];
   for(let i=0;i<tokens.length;){if(/[MC]/.test(tokens[i])){mapped.push(tokens[i++]);continue;}const p=new DOMPoint(+tokens[i++],+tokens[i++]).matrixTransform(matrix);mapped.push(p.x,p.y-delta/sm.a);}
   const step3=window.fpS6Steps?.step3||606;const railY=parseFloat(getComputedStyle(root).getPropertyValue('--s6-h-y'))||627;window.fpS6ConnectionD=`M ${step3} ${railY} H ${mapped[1]} `+mapped.slice(3).join(' ');document.getElementById('sec6-d-baton-arc').setAttribute('d',window.fpS6ConnectionD);
  }
  window.fpTabletOpticsUpdate?.();
  horizontal(path('s8-h1'),path('s8-arc1'),path('s8-arc2'));
  const vertical=path('s8-v1');if(vertical){const a=local(vertical,point(path('s8-arc2'),true)),b=local(vertical,point(path('s8-arc3'),false));vertical.setAttribute('d',`M ${a.x} ${a.y} V ${b.y}`);join(vertical,path('s8-arc3'));}
  const bottom=path('s8-h2');if(bottom){const end=local(bottom,point(path('s8-arc3'),true));bottom.setAttribute('d',`M ${end.x} ${end.y} H 33.5`);}
 }
 window.fpTabletSeamsUpdate=update;
 const originalUpdate=window.fpLinesUpdate;if(originalUpdate)window.fpLinesUpdate=(...args)=>{originalUpdate(...args);if(root.classList.contains('fp-tablet'))update();};
 addEventListener('resize',()=>{if(innerWidth<768||innerWidth>=1200)update();});
})();
