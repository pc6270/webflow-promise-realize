(() => {
  const definitions=[
    ['s1','區塊 1｜站立小人','.s1-dt-container .s1-figure-man-body','.s1-dt-container .s1-figure-man-shadow','.s1-mb-container .s1-figure-man-body','.s1-mb-container .s1-figure-man-shadow'],
    ['s2p1','區塊 2 Part 1｜弧線上小人','.s2p1-dt-container .figure-woman-body','.s2p1-dt-container .figure-woman-shadow','.s2p1-mb-container .figure-woman-body','.s2p1-mb-container .figure-woman-shadow'],
    ['s2p2','區塊 2 Part 2｜檢驗小人','.s2p2-figure-body','.s2p2-shadow-wrapper','.s2p2-mb-figure','.s2p2-mb-shadow'],
    ['s2p34man','區塊 2 Part 3–4｜左側小人','.s2p34-man-body','.s2p34-man-shadow','.s2p34-mb-man-body','.s2p34-mb-man-shadow'],
    ['s2p34woman','區塊 2 Part 3–4｜右側小人','.s2p34-woman-body','.s2p34-woman-shadow',null,null],
    ['s4','區塊 4｜拉線小人','.s4-top-line','.s4-top-man','.s4-top-line','.s4-top-man'],
    ['s6','區塊 6｜坐姿手電筒小人','.wf-sec6-asset-tag',null,'.wf-sec6-m-asset-tag',null],
    ['s7','區塊 7｜推球小人','.wf-sec7-man-push','.wf-sec7-man-shadow','.wf-sec7-m-man-push','.wf-sec7-m-man-shadow'],
    ['s8seat','區塊 8｜圓圈上坐姿小人','.wf-sec8-man-3','.wf-sec8-shadow-3','.wf-sec8-mob-man-3','.wf-sec8-mob-shadow-3'],
    ['s8walk','區塊 8｜走路小人','.wf-sec8-man-2','.wf-sec8-shadow-2','.wf-sec8-mob-man-2','.wf-sec8-mob-shadow-2'],
    ['s8family','區塊 8｜媽媽與孩子','.wf-sec8-man-1','.wf-sec8-shadow-1','.wf-sec8-mob-man-1','.wf-sec8-mob-shadow-1']
  ];
  const labels={}, defaults={}, registrations=[];
  for(const [id,title,db,ds,mb,ms] of definitions)for(const [device,body,shadow] of [['d',db,ds],['t',db,ds],['m',mb,ms]]){
    if(!body)continue;
    const prefix='--person-'+id+'-'+device+'-';
    const add=(part,key,value,label,help)=>{const name=prefix+part+'-'+key;defaults[name]=value;labels[name]={name,section:title,device:device==='d'?'桌面':device==='t'?'平板':'手機',title:label,help};};
    for(const part of ['group','body',...(shadow?['shadow']:[])]){
      const target={group:'人物＋陰影整組',body:'人物本體',shadow:'陰影'}[part];
      add(part,'x','0px',target+'・左右位移','單位 px；正值向右，負值向左，基於目前位置加減。');
      add(part,'y','0px',target+'・上下位移','單位 px；正值向下，負值向上，基於目前位置加減。');
      add(part,'scale','1',target+'・大小倍率','1 是目前大小，1.2 是放大 20%；整組以人物腳部為中心縮放。');
    }
    if(shadow){
      add('shadow','rotate','0deg','陰影・追加旋轉','單位 deg；基於目前陰影方向調整。');
      add('shadow','skew','0deg','陰影・追加傾斜','單位 deg；可調整投影傾斜方向。');
      add('shadow','opacity','1','陰影・透明度倍率','0 是完全透明，1 保留原透明度。');
      add('shadow','blur','0px','陰影・追加模糊','單位 px；在原有模糊質感上增加，0 保留原效果。');
    }
    registrations.push({prefix,body,shadow,device,shared:db===mb});
  }
  window.FP_PEOPLE_DEFAULTS=defaults;window.FP_PEOPLE_LABELS=labels;
  if(!document.getElementById('fp-master-root'))return;
  const items=[];
  for(const item of registrations){
    const body=document.querySelector(item.body),shadow=item.shadow&&document.querySelector(item.shadow);
    if(!body)continue;
    const filter=shadow?getComputedStyle(shadow).filter:'none';const shadowTransform=shadow?getComputedStyle(shadow).transform:'none';
    const origin=getComputedStyle(body).transformOrigin.split(' ').map(parseFloat);
    const shadowOrigin=shadow?getComputedStyle(shadow).transformOrigin.split(' ').map(parseFloat):[0,0];
    items.push({...item,body,shadow,filter,shadowTransform,origin,shadowOrigin});
  }
  function update(){
    const config=window.FP_PAGE_CONFIG||{};
    const num=(p,k,fallback=0)=>{const n=parseFloat(config[p+k]??defaults[p+k]);return Number.isFinite(n)?n:fallback;};
    for(const {prefix:p,body,shadow,filter,shadowTransform,origin,shadowOrigin,shared,device} of items){
      if(device!==(innerWidth<768?'m':innerWidth<1200?'t':'d'))continue;
      const gx=num(p,'group-x'),gy=num(p,'group-y'),gs=num(p,'group-scale',1);
      const size=gs*num(p,'body-scale',1);
      body.style.translate=(gx+num(p,'body-x')+(1-size)*(body.offsetWidth/2-origin[0]))+'px '+(gy+num(p,'body-y')+(1-size)*(body.offsetHeight-origin[1]))+'px';
      body.style.setProperty('translate',body.style.translate,device==='t'?'important':'');body.style.setProperty('scale',String(size),device==='t'?'important':'');
      if(p==='--person-s6-t-'||p==='--person-s6-d-'){const lamp=document.getElementById('sec6-d-flashlight-icon');if(lamp){lamp.style.setProperty('translate',body.style.translate,device==='t'?'important':'');lamp.style.setProperty('scale',String(size),device==='t'?'important':'');}}
      if(p==='--person-s6-m-'){const lamp=document.getElementById('sec6-m-flashlight');if(lamp){const xy=body.style.translate.split(' ').map(parseFloat);lamp.style.translate=(xy[0]+(parseFloat(config['--s6-mb-lamp-x'])||0))+'px '+(xy[1]+(parseFloat(config['--s6-mb-lamp-y'])||0))+'px';lamp.style.scale=size;}}
      if(shadow){
        // Move the shadow around the body's foot when scaling the whole pair.
        // Base layout boxes stay independent of animation transforms.
        const anchorX=body.offsetLeft+body.offsetWidth/2,anchorY=body.offsetTop+body.offsetHeight;
        const sx=gx+num(p,'shadow-x')+(gs-1)*(shadow.offsetLeft+shadowOrigin[0]-anchorX);
        const sy=gy+num(p,'shadow-y')+(gs-1)*(shadow.offsetTop+shadowOrigin[1]-anchorY);
        shadow.style.setProperty('translate',sx+'px '+sy+'px',device==='t'?'important':'');shadow.style.setProperty('scale',String(gs*num(p,'shadow-scale',1)),device==='t'?'important':'');
        const rotation=num(p,'shadow-rotate'),skew=num(p,'shadow-skew');if(rotation||skew){shadow.style.setProperty('transform',(shadowTransform==='none'?'':shadowTransform+' ')+`rotate(${rotation}deg) skewX(${skew}deg)`,'important');shadow.dataset.personTransform='1';}else if(shadow.dataset.personTransform){shadow.style.removeProperty('transform');delete shadow.dataset.personTransform;}
        shadow.style.setProperty('filter',(filter==='none'?'':filter+' ')+'opacity('+num(p,'shadow-opacity',1)+') blur('+Math.max(0,num(p,'shadow-blur'))+'px)',device==='t'?'important':'');
      }
    }
  }
  window.addEventListener('resize',update);window.addEventListener('fp:webflow-ready',update);update();
})();
