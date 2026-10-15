(() => {
 const images=[...document.querySelectorAll('.s4-card-bg-photo[data-media-id]')];
 function apply(){for(const image of images){
  const config=window.FP_MEDIA_CONFIG?.section4?.find(c=>c.id===image.dataset.mediaId);if(!config)continue;
  if(config.image&&image.getAttribute('src')!==config.image)image.src=config.image;
  image.alt=config.alt||config.title||'';
  const card=image.closest('.s4-accordion-card');
  const button=card.querySelector('.s4-btn-watch-video');
  if(button)button.hidden=(config.showVideoButton??window.FP_MEDIA_CONFIG.showVideoButton)!==true;
  for(const label of card.querySelectorAll('.s4-collapsed-title,.s4-expanded-title'))if(config.title)label.textContent=config.title;
  if(config.description)card.querySelector('.s4-expanded-desc').textContent=config.description;
  const slot=image.closest('.s4-accordion-card').querySelector('.s4-card-icon');
  let icon=slot.querySelector('img');
  if(!icon){icon=document.createElement('img');slot.append(icon);}
  icon.hidden=!config.icon;slot.style.backgroundColor=config.icon?'transparent':'';slot.classList.toggle('has-icon',!!config.icon);
  if(config.icon){icon.src=config.icon;icon.alt='';Object.assign(icon.style,{width:'100%',height:'100%',objectFit:'contain',position:'absolute',left:'0',top:'0'});}
  slot.setAttribute('aria-hidden','true');
 }}
 window.fpInspectionMediaUpdate=apply;apply();
 // Delegation works even when this file arrives after DOMContentLoaded in Webflow.
 document.addEventListener('click',event=>{
  if(innerWidth>=768)return;
  const card=event.target.closest?.('.s4-accordion-card');
  if(!card||event.target.closest('.s4-btn-watch-video'))return;
  event.preventDefault();event.stopImmediatePropagation();
  const active=card.classList.contains('active');
  card.closest('.s4-cards-accordion').querySelectorAll('.s4-accordion-card').forEach(item=>item.classList.remove('active'));
  if(!active)card.classList.add('active');
  requestAnimationFrame(()=>window.fpMobileLayoutUpdate?.());
 },true);
})();
