(() => {
 const modal=document.createElement('dialog');modal.id='inspection-video-modal';modal.setAttribute('aria-label','驗屋服務影片');
 modal.innerHTML='<button type="button" class="inspection-video-close" aria-label="關閉影片"><span class="inspection-close-roll"><span class="inspection-close-row"><img data-fp-src="assets/video-close.svg" alt=""><span>CLOSE</span></span><span class="inspection-close-row" aria-hidden="true"><img data-fp-src="assets/video-close.svg" alt=""><span>CLOSE</span></span></span></button><div class="inspection-video-frame"></div>';
 document.body.append(modal);const frame=modal.querySelector('.inspection-video-frame');let previousOverflow='';
 function close(){modal.close();}
 modal.querySelector('button').onclick=()=>{modal.querySelector('button').classList.add('is-closing');setTimeout(close,180);};
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 modal.addEventListener('close',()=>{modal.querySelector('button').classList.remove('is-closing');frame.querySelector('video')?.pause();frame.replaceChildren();document.documentElement.style.overflow=previousOverflow;});
 let opening=false;
 function open(button){if(button.hidden||modal.open||opening)return;opening=true;button.classList.add('fp-video-pressed');const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:140;setTimeout(()=>{button.classList.remove('fp-video-pressed');opening=false;if(!button.hidden)show(button);},delay);}
 function show(button){if(modal.open)return;const id=button.closest('.s4-accordion-card').querySelector('.s4-card-bg-photo').dataset.mediaId;
  const card=window.FP_MEDIA_CONFIG?.section4?.find(c=>c.id===id);frame.replaceChildren();modal.setAttribute('aria-label',(card?.title||'驗屋服務')+'影片');
  if(card?.video){const player=document.createElement(card.videoType==='iframe'?'iframe':'video');player.src=card.video;if(player.tagName==='VIDEO'){player.controls=true;player.playsInline=true;}else{player.title=card.title;player.allow='fullscreen; picture-in-picture';player.allowFullscreen=true;}frame.append(player);}
  else{const message=document.createElement('p');message.textContent='影片準備中';frame.append(message);}
  previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';modal.showModal();
 }
 window.fpOpenInspectionVideo=open;
 document.querySelectorAll('.s4-btn-watch-video').forEach(button=>button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open(button);}));
})();
