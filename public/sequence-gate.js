(() => {
 window.fpSequenceObserver=function(){this.observe=()=>{};this.unobserve=()=>{};this.disconnect=()=>{};};
 window.fpSequenceObserver=function(){this.observe=()=>{};this.unobserve=()=>{};this.disconnect=()=>{};};
 const allowed=new Set(),started=new Set();
 window.fpSequenceStarted=id=>started.has(id);
 window.fpSequencePermit=root=>{if(!allowed.has(root.id)||started.has(root.id))return false;started.add(root.id);return true;};
 window.fpSequenceAuthorize=id=>allowed.add(id);
 window.fpSequenceMark=id=>started.add(id);
 const css=document.createElement('style');css.textContent='.fp-sequence-pending{opacity:0!important;pointer-events:none!important}.fp-sequence-enter{animation:fp-sequence-fade .32s ease both}@keyframes fp-sequence-fade{from{opacity:0}to{opacity:1}}@media(prefers-reduced-motion:reduce){.fp-sequence-enter{animation:none}}';document.head.append(css);
})();
