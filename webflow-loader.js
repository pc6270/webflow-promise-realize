(async()=>{
 if(window.__FP_WEBFLOW_LOADING)return;window.__FP_WEBFLOW_LOADING=true;
 const own=document.currentScript;window.FP_ASSET_BASE=new URL('.',own.src).href;window.FP_WEBFLOW_BOOTSTRAP=true;
 const resolveAssets=node=>{if(node.nodeType!==1)return;for(const el of [node,...node.querySelectorAll('[data-fp-src]')])if(el.hasAttribute('data-fp-src')){el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');}};
 new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(resolveAssets))).observe(document.body,{childList:true,subtree:true});
 const curtain=window.FP_LOADING_CURTAIN||(window.FP_LOADING_CURTAIN=(()=>{
  let el=null,bar=null,label=null,value=0,done=false;
  const timer=setTimeout(function show(){
   if(done)return;
   if(!document.body){document.addEventListener('DOMContentLoaded',show,{once:true});return;}
   el=document.createElement('div');el.id='fp-loading-curtain';el.setAttribute('role','status');el.setAttribute('aria-label','頁面載入中');
   el.innerHTML='<div class="fp-curtain-top"></div><div class="fp-curtain-bottom"></div><div class="fp-curtain-track"><div class="fp-curtain-bar"></div></div><div class="fp-curtain-percent"></div>';
   document.body.append(el);bar=el.querySelector('.fp-curtain-bar');label=el.querySelector('.fp-curtain-percent');paint();
  },150);
  const safety=setTimeout(()=>{if(!done){done=true;clearTimeout(timer);el?.remove();}},20000);
  function paint(){if(!el)return;bar.style.transform='scaleX('+value/100+')';label.textContent=value+'%';}
  return {progress(finished,total){value=Math.min(99,Math.floor(finished/total*100));paint();},async finish(success=true){
   done=true;clearTimeout(timer);clearTimeout(safety);if(!el)return;
   value=success?100:value;paint();
   const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
   if(!success||reduced||!el.animate){el.remove();return;}
   const effects=[
    el.querySelector('.fp-curtain-top').animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:1200,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}),
    el.querySelector('.fp-curtain-bottom').animate([{transform:'translateY(0)'},{transform:'translateY(100%)'}],{duration:1200,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}),
    ...[el.querySelector('.fp-curtain-track'),label].map(node=>node.animate([{opacity:1},{opacity:0}],{duration:600,fill:'forwards'}))
   ];
   await Promise.all(effects.map(animation=>animation.finished.catch(()=>{})));el.remove();
  }};
 })());
 const assetReady=img=>new Promise(resolve=>{
  let settled=false;const finish=()=>{if(settled)return;settled=true;clearTimeout(timeout);img.removeEventListener('load',finish);img.removeEventListener('error',finish);resolve();};
  const timeout=setTimeout(finish,6000);
  if(img.complete){finish();return;}
  img.addEventListener('load',finish,{once:true});img.addEventListener('error',finish,{once:true});
 });
 const bounded=promise=>Promise.race([promise,new Promise(resolve=>setTimeout(resolve,4000))]);
 const script=src=>new Promise((resolve,reject)=>{const el=document.createElement('script');const url=new URL(src,window.FP_ASSET_BASE);if(!src.startsWith("https://"))url.searchParams.set("v","9af85aaadde7");el.src=url.href;el.async=false;const timeout=setTimeout(()=>{el.remove();reject(Error('載入逾時 '+el.src));},12000);el.onload=()=>{clearTimeout(timeout);resolve();};el.onerror=()=>{clearTimeout(timeout);reject(Error('無法載入 '+el.src));};document.body.append(el);});
 try{
  for(const fragment of document.querySelectorAll('[data-fp-fragment]')){const target=document.querySelector('[data-fp-node="'+fragment.dataset.fpParent+'"]');if(!target)throw Error('缺少 Embed：'+fragment.dataset.fpParent);target.append(...fragment.childNodes);fragment.remove();}
  const root=document.getElementById('fp-master-root');if(!root)throw Error('缺少第一個 Embed');
  root.querySelectorAll('[data-fp-src]').forEach(el=>{el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');});
  const hero=root.querySelector('.fp-sec1-wrapper');
  if(hero)hero.querySelectorAll('img').forEach(img=>{img.loading='eager';img.setAttribute('fetchpriority','high');});
  const heroImages=hero?[...hero.querySelectorAll('img')]:[];
  let finished=0,total=7+heroImages.length;
  const tick=()=>curtain.progress(++finished,total);
  const imagesReady=Promise.all(heroImages.map(img=>assetReady(img).then(tick)));
  await script('webflow-manifest.js');tick();
  const loaded=window.FP_WEBFLOW_MANIFEST;total=loaded.scripts.length+3+heroImages.length;
  for(const item of loaded.scripts){
   if(item.src.startsWith('https://'))continue;
   const preload=document.createElement('link');preload.rel='preload';preload.as='script';
   const url=new URL(item.src,window.FP_ASSET_BASE);url.searchParams.set('v',loaded.release);preload.href=url.href;document.head.append(preload);
  }
  for(const item of loaded.scripts){try{await script(item.src);tick();}catch(error){if(item.src.startsWith('https://use.typekit.net/'))console.warn(error);else throw error;}}
  await window.FP_BUNDLE_READY;
  window.fpTabletLayoutUpdate?.();window.fpMobileLayoutUpdate?.();window.fpLinesUpdate?.();
  await imagesReady;
  if(document.fonts)await bounded(document.fonts.ready);tick();
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));tick();
  await curtain.finish();
  document.dispatchEvent(new Event('fp:webflow-ready',{bubbles:true}));
  document.getElementById('fp-webflow-mount').dataset.loaded='1';
 }catch(error){await curtain.finish(false);console.error('[安心實踐部署]',error);const notice=document.createElement('p');notice.textContent='安心實踐頁面載入失敗，請檢查 Embed 是否完整，以及外部檔案網址。';document.getElementById('fp-webflow-mount')?.prepend(notice);}
})();
