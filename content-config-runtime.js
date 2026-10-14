(() => {
 const config=window.FP_CONTENT_CONFIG;if(!config)return;
 function apply(){
  const root=document.getElementById('fp-master-root');
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_COMMENT);
  while(walker.nextNode()){
   const comment=walker.currentNode,key=comment.data.match(/^fp-text:(.+)$/)?.[1];
   const node=comment.nextSibling,value=config.texts[key];
   if(value!==undefined&&node?.nodeType===Node.TEXT_NODE){const left=node.nodeValue.match(/^\s*/)[0],right=node.nodeValue.match(/\s*$/)[0];node.nodeValue=left+value+right;}
  }
  for(const el of root.querySelectorAll('[data-page-asset]')){
   const asset=config.assets[el.dataset.pageAsset];if(!asset)continue;
   el.src=asset.src;el.alt=asset.decorative?'':asset.alt;
  }
  if(config.seo?.title)document.title=config.seo.title;
  const description=document.querySelector('meta[name="description"]');if(description&&config.seo?.description)description.content=config.seo.description;
 }
 window.fpContentUpdate=apply;apply();
})();
