(async()=>{
 if(window.__FP_WEBFLOW_LOADING)return;window.__FP_WEBFLOW_LOADING=true;
 const own=document.currentScript;window.FP_ASSET_BASE=new URL('.',own.src).href;
 const resolveAssets=node=>{if(node.nodeType!==1)return;for(const el of [node,...node.querySelectorAll('[data-fp-src]')])if(el.hasAttribute('data-fp-src')){el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');}};
 new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(resolveAssets))).observe(document.body,{childList:true,subtree:true});
 const script=src=>new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=new URL(src,window.FP_ASSET_BASE).href;el.async=false;el.onload=resolve;el.onerror=()=>reject(Error('無法載入 '+el.src));document.body.append(el);});
 try{
  for(const fragment of document.querySelectorAll('[data-fp-fragment]')){const target=document.querySelector('[data-fp-node="'+fragment.dataset.fpParent+'"]');if(!target)throw Error('缺少 Embed：'+fragment.dataset.fpParent);target.append(...fragment.childNodes);fragment.remove();}
  const root=document.getElementById('fp-master-root');if(!root)throw Error('缺少第一個 Embed');
  root.querySelectorAll('[data-fp-src]').forEach(el=>{el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');});
  await script('webflow-manifest.js');
  const loaded=window.FP_WEBFLOW_MANIFEST;
  for(const item of loaded.scripts){try{await script(item.src);}catch(error){if(item.src.startsWith('https://use.typekit.net/'))console.warn(error);else throw error;}}
  dispatchEvent(new Event('resize'));
  if(document.readyState==='complete')dispatchEvent(new Event('load'));
  document.getElementById('fp-webflow-mount').dataset.loaded='1';
 }catch(error){console.error('[安心實踐部署]',error);const notice=document.createElement('p');notice.textContent='安心實踐頁面載入失敗，請檢查 Embed 是否完整，以及外部檔案網址。';document.getElementById('fp-webflow-mount')?.prepend(notice);}
})();
