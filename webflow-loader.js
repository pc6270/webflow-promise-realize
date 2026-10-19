(async()=>{
 if(window.__FP_WEBFLOW_LOADING)return;window.__FP_WEBFLOW_LOADING=true;
 const own=document.currentScript;window.FP_ASSET_BASE=new URL('.',own.src).href;window.FP_WEBFLOW_BOOTSTRAP=true;
 const resolveAssets=node=>{if(node.nodeType!==1)return;for(const el of [node,...node.querySelectorAll('[data-fp-src]')])if(el.hasAttribute('data-fp-src')){el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');}};
 new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(resolveAssets))).observe(document.body,{childList:true,subtree:true});
 const script=src=>new Promise((resolve,reject)=>{const el=document.createElement('script');const url=new URL(src,window.FP_ASSET_BASE);if(!src.startsWith("https://"))url.searchParams.set("v","fa4bd282bad7");el.src=url.href;el.async=false;el.onload=resolve;el.onerror=()=>reject(Error('無法載入 '+el.src));document.body.append(el);});
 try{
  for(const fragment of document.querySelectorAll('[data-fp-fragment]')){const target=document.querySelector('[data-fp-node="'+fragment.dataset.fpParent+'"]');if(!target)throw Error('缺少 Embed：'+fragment.dataset.fpParent);target.append(...fragment.childNodes);fragment.remove();}
  const root=document.getElementById('fp-master-root');if(!root)throw Error('缺少第一個 Embed');
  root.querySelectorAll('[data-fp-src]').forEach(el=>{el.src=new URL(el.dataset.fpSrc,window.FP_ASSET_BASE).href;el.removeAttribute('data-fp-src');});
  await script('webflow-manifest.js');
  const loaded=window.FP_WEBFLOW_MANIFEST;
  for(const item of loaded.scripts){try{await script(item.src);}catch(error){if(item.src.startsWith('https://use.typekit.net/'))console.warn(error);else throw error;}}
  await window.FP_BUNDLE_READY;
  dispatchEvent(new Event('resize'));
  document.dispatchEvent(new Event('fp:webflow-ready',{bubbles:true}));
  document.getElementById('fp-webflow-mount').dataset.loaded='1';
 }catch(error){console.error('[安心實踐部署]',error);const notice=document.createElement('p');notice.textContent='安心實踐頁面載入失敗，請檢查 Embed 是否完整，以及外部檔案網址。';document.getElementById('fp-webflow-mount')?.prepend(notice);}
})();
