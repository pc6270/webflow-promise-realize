
(function() {
    function handleSec6Resize() {
      const outer = document.getElementById('wf-sec6-desktop-outer');
      const canvas = document.getElementById('wf-sec6-canvas');
      if (!outer || !canvas) return;

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;
      if (windowW < 768) return;

      const baseW = 1221;
      const baseH = 936;

      const maxW = windowW * 0.95;
      const headerHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
      const maxH = windowH * 0.92;

      const scaleW = maxW / baseW;
      const scaleH = maxH / baseH;
      const scale = Math.min(scaleW, scaleH, 1.0);

      canvas.style.transform = 'scale(' + scale + ')';
      outer.style.height = (baseH * scale) + 'px';
    }

    // 用戶最新內文更新
    const cardData = [
      {
        num: '01',
        title: '空間裁切的匠心',
        desc: '在坪數規劃上，與建設一同細心思量，讓空間能承載不同家庭的樣貌。',
        headerLeft: 206,
        descLeft: 206
      },
      {
        num: '02',
        title: '真摯不溢的坦誠',
        desc: '在廣告與銷售中，不誇大、不隱瞞，誠實呈現家的本質。',
        headerLeft: 508,
        descLeft: 578
      },
      {
        num: '03',
        title: '溫暖舒心的迎賓體驗',
        desc: '在現場，以溫暖的氛圍迎接——迎賓茶點、流動香氛，讓對話不只是資訊交換，而是一段舒心的交流。',
        headerLeft: 809,
        descLeft: 879
      }
    ].map((item,i)=>({...item,...window.FP_CONTENT_CONFIG.section6[i]}));

    // 用戶最新提供之精確 3 階段虛線座標 ( Phase 4 數值與 Phase 3 100% 完全相同 )
    window.sec6RayParams = {
      p1: { lx1: 242, ly1: 62, lx2: 188, ly2: 452, rx1: 249, ry1: 56, rx2: 549, ry2: 446 },
      p2: { lx1: 242, ly1: 63, lx2: 450, ly2: 578, rx1: 253, ry1: 56, rx2: 725, ry2: 371 },
      p3: { lx1: 247, ly1: 63, lx2: 761, ly2: 639, rx1: 252, ry1: 55, rx2: 1060, ry2: 382 }
    };

    let currentPhase = -1;
    let phaseTextTimer,phaseTextVersion=0;
    let isClickNavigating = false;
    let clickNavTimeout = null;
    function alignStage(phase) {
      if(document.getElementById('fp-master-root').dataset.s6TextSwitching==='1')return;
      const index=Math.max(0,Math.min(2,phase));
      const cs=getComputedStyle(document.getElementById('fp-master-root'));
      const circle=document.getElementById('sec6-d-circle-'+(index+1));
      const x=circle ? parseFloat(getComputedStyle(circle).left)+(parseFloat(cs.getPropertyValue('--s6-anchor-inset'))||128) : NaN;
      if (!Number.isFinite(x)) return;
      const title=document.getElementById('sec6-d-title');
      const header=document.getElementById('sec6-d-header-group');
      const desc=document.getElementById('sec6-d-desc');
      if(header&&title)header.style.left=(x-title.offsetLeft)+'px';
      if(desc)desc.style.left=x+'px';
    }
    window.fpS6AlignStage=()=>alignStage(currentPhase);
    window.fpS6ReapplyPhase=()=>{const phase=Math.max(0,currentPhase);currentPhase=-1;updateDesktopPhase(phase);};
    window.addEventListener('resize',()=>alignStage(currentPhase));


    // 核心卡片、標題、說明與放射虛線狀態切換
    function updateDesktopPhase(newPhase) {
      const phaseRoot=document.getElementById('fp-master-root');
      if(newPhase!==currentPhase){phaseRoot.dataset.s6TextSwitching='1';for(const id of ['sec6-d-header-group','sec6-d-desc']){const el=document.getElementById(id);if(el)el.style.setProperty('left',getComputedStyle(el).left,'important');}}
      phaseRoot.dataset.s6Phase=String(newPhase);
      if(innerWidth>=768&&innerWidth<1200)window.fpTabletSetPhase?.(newPhase);
      if (newPhase === currentPhase) return;
      currentPhase = newPhase;

      const headerGroup = document.getElementById('sec6-d-header-group');
      const descEl = document.getElementById('sec6-d-desc');
      const numEl = document.getElementById('sec6-d-num');
      const titleEl = document.getElementById('sec6-d-title');

      const circle1 = document.getElementById('sec6-d-circle-1');
      const circle2 = document.getElementById('sec6-d-circle-2');
      const circle3 = document.getElementById('sec6-d-circle-3');

      // Keep the old text at its existing anchor until it is fully transparent.
      clearTimeout(phaseTextTimer);const version=++phaseTextVersion;
      if(headerGroup&&descEl){
        headerGroup.style.opacity='0';descEl.style.opacity='0';
        phaseTextTimer=setTimeout(()=>{
          if(version!==phaseTextVersion)return;
          if(numEl)numEl.textContent=cardData[newPhase].num;
          if(titleEl)titleEl.textContent=cardData[newPhase].title;
          descEl.textContent=cardData[newPhase].desc;
          phaseRoot.dataset.s6TextSwitching='0';
          headerGroup.style.removeProperty('left');descEl.style.removeProperty('left');
          if(innerWidth>=768&&innerWidth<1200)window.fpTabletSetPhase?.(newPhase);else alignStage(newPhase);
          requestAnimationFrame(()=>{if(version===phaseTextVersion){headerGroup.style.opacity='1';descEl.style.opacity='1';}});
        },matchMedia('(prefers-reduced-motion:reduce)').matches?0:200);
      }

      // 動態切換三張圓形圖素卡片的放大 (448px) 與縮小 (276px)
      if (circle1 && circle2 && circle3 && !(innerWidth>=768&&innerWidth<1200)) {
        if (newPhase === 0) {
          circle1.style.left = '153px';
          circle1.style.top = '368px';
          circle1.style.width = '448px';
          circle1.style.height = '448px';

          circle2.style.left = '627px';
          circle2.style.top = '540.2px';
          circle2.style.width = '276px';
          circle2.style.height = '276px';

          circle3.style.left = '928px';
          circle3.style.top = '540.2px';
          circle3.style.width = '276px';
          circle3.style.height = '276px';
        } else if (newPhase === 1) {
          circle1.style.left = '153px';
          circle1.style.top = '540.2px';
          circle1.style.width = '276px';
          circle1.style.height = '276px';

          circle2.style.left = '455px';
          circle2.style.top = '368px';
          circle2.style.width = '448px';
          circle2.style.height = '448px';

          circle3.style.left = '928px';
          circle3.style.top = '540.2px';
          circle3.style.width = '276px';
          circle3.style.height = '276px';
        } else if (newPhase === 2) {
          circle1.style.left = '153px';
          circle1.style.top = '540.2px';
          circle1.style.width = '276px';
          circle1.style.height = '276px';

          circle2.style.left = '455px';
          circle2.style.top = '540.2px';
          circle2.style.width = '276px';
          circle2.style.height = '276px';

          circle3.style.left = '756px';
          circle3.style.top = '368px';
          circle3.style.width = '448px';
          circle3.style.height = '448px';
        }
      }
    }

    // 放射虛線直接對齊指定階段目標端點
    function setRaysToPhase(phaseIndex) {
      if(window.fpTabletOpticsUpdate){
        for(const id of ['sec6-d-ray-left','sec6-d-ray-right'])document.getElementById(id).style.strokeDashoffset='0';
        window.fpTabletOpticsUpdate();return;
      }
      const p = window.sec6RayParams;
      if (!p) return;
      const targetP = phaseIndex === 0 ? p.p1 : (phaseIndex === 1 ? p.p2 : p.p3);
      const rayLeft = document.getElementById('sec6-d-ray-left');
      const rayRight = document.getElementById('sec6-d-ray-right');

      if (rayLeft) {
        rayLeft.setAttribute('x1', targetP.lx1);
        rayLeft.setAttribute('y1', targetP.ly1);
        rayLeft.setAttribute('x2', targetP.lx2);
        rayLeft.setAttribute('y2', targetP.ly2);
        rayLeft.style.strokeDashoffset = '0';
      }
      if (rayRight) {
        rayRight.setAttribute('x1', targetP.rx1);
        rayRight.setAttribute('y1', targetP.ry1);
        rayRight.setAttribute('x2', targetP.rx2);
        rayRight.setAttribute('y2', targetP.ry2);
        rayRight.style.strokeDashoffset = '0';
      }
    }

    // 點擊節點圓點或卡片切換步驟 (0, 1, 2)
    function goToStep(stepIndex) {
      stepIndex = Math.max(0, Math.min(2, stepIndex));
      const tail=document.getElementById('sec6-d-baton-arc');
      if(tail){tail.style.transition='none';tail.style.strokeDashoffset='1';tail.style.visibility='hidden';}
      const nextArc=document.querySelector('path[data-k="s7-arc1"]');if(nextArc)nextArc.style.strokeDashoffset='1';

      const rootEl = document.getElementById('fp-master-root') || document.documentElement;
      const cs = getComputedStyle(rootEl);
      const numVar = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isNaN(v) ? d : v; };
      const step1 = (window.fpS6Steps && window.fpS6Steps.step1) || numVar('--s6-step1-x', 206);
      const step2 = (window.fpS6Steps && window.fpS6Steps.step2) || numVar('--s6-step2-x', 647);
      const step3 = (window.fpS6Steps && window.fpS6Steps.step3) || numVar('--s6-step3-x', 930);
      const endX = step3;

      const fillBar = document.getElementById('sec6-d-fill-bar');
      const fillPath = document.getElementById('sec6-d-fill-path');
      const dot1 = document.getElementById('sec6-d-dot-1');
      const dot2 = document.getElementById('sec6-d-dot-2');
      const dot3 = document.getElementById('sec6-d-dot-3');

      // 1. 動態平滑填滿進度線
      const targetX = stepIndex === 0 ? step1 : (stepIndex === 1 ? step2 : step3);
      if (fillBar) {
        fillBar.style.transition = 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        fillBar.style.width = Math.max(0, targetX) + 'px';
      }
      if (fillPath) {
        const svg = document.querySelector('.fp-s6-track');
        const start = window.fpScreenLeft(svg);
        fillPath.setAttribute('d', 'M '+start+' '+numVar('--s6-h-y',855)+' H '+endX);
        fillPath.style.strokeDasharray = '1';
        fillPath.style.transition = 'stroke-dashoffset .4s ease';
        fillPath.style.strokeDashoffset = String(1-Math.max(0,Math.min(1,(targetX-start)/(endX-start||1))));
      }

      // 2. 圓點節點依序由實心灰轉為實心深咖啡色
      if (dot1) {
        if (stepIndex >= 0) dot1.classList.add('filled');
        else dot1.classList.remove('filled');
      }
      if (dot2) {
        if (stepIndex >= 1) dot2.classList.add('filled');
        else dot2.classList.remove('filled');
      }
      if (dot3) {
        if (stepIndex >= 2) dot3.classList.add('filled');
        else dot3.classList.remove('filled');
      }

      // 3. 切換卡片放大縮小、標題與內文
      updateDesktopPhase(stepIndex);

      // 4. 對齊虛線手電筒光束
      setRaysToPhase(stepIndex);

      // 5. 若處於滾動釘住容器內，同步平滑滾動頁面
      const track = document.getElementById('sec6-d-track');
      if (track) {
        const trackH = innerWidth>=768&&innerWidth<1200 ? track.getBoundingClientRect().height-(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-stage-height'))||760)*(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-scale'))||1) : track.offsetHeight-window.innerHeight;
        if (trackH > 0) {
          isClickNavigating = true;
          if (clickNavTimeout) clearTimeout(clickNavTimeout);
          clickNavTimeout = setTimeout(() => { isClickNavigating = false; handleSec6Scroll(); }, 800);

          const trackTop = track.getBoundingClientRect().top + window.pageYOffset;
          const targetP = stepIndex === 0 ? 0.15 : (stepIndex === 1 ? 0.40 : 0.70);
          window.scrollTo({ top: trackTop + targetP * trackH, behavior: 'smooth' });
        }
      }
    }

    // 滾動驅動交互處理
    function handleSec6Scroll() {
      if (!window.fpSequenceStarted?.('wf-sec6-root')) return;
      const windowW = window.innerWidth;
      if (windowW < 768) return;

      const track = document.getElementById('sec6-d-track');
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const trackH = innerWidth>=768&&innerWidth<1200 ? track.getBoundingClientRect().height-(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-stage-height'))||760)*(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-scale'))||1) : track.offsetHeight-window.innerHeight;
      if (trackH <= 0) return;

      // 若正在執行點擊導航動畫，暫緩滾動干擾
      if (isClickNavigating) return;
      alignStage(currentPhase);

      // 計算 0.0 ~ 1.0 的滾動進度
      let progress = -rect.top / trackH;
      progress = Math.max(0, Math.min(1, progress));

      const rayLeft = document.getElementById('sec6-d-ray-left');
      const rayRight = document.getElementById('sec6-d-ray-right');
      const fillBar = document.getElementById('sec6-d-fill-bar');

      const dot1 = document.getElementById('sec6-d-dot-1');
      const dot2 = document.getElementById('sec6-d-dot-2');
      const dot3 = document.getElementById('sec6-d-dot-3');

      // 1. 虛線端點 (x2, y2) 像進度條一樣真實延伸填滿射出
      if (rayLeft) rayLeft.style.strokeDashoffset = '0';
      if (rayRight) rayRight.style.strokeDashoffset = '0';

      // 2. 咖啡色直線動態填滿（高度基準 820px）
      const rootEl = document.getElementById('fp-master-root') || document.documentElement;
      const cs = getComputedStyle(rootEl);
      const numVar = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isNaN(v) ? d : v; };
      const step1 = (window.fpS6Steps && window.fpS6Steps.step1) || numVar('--s6-step1-x', 206);
      const step2 = (window.fpS6Steps && window.fpS6Steps.step2) || numVar('--s6-step2-x', 647);
      const step3 = (window.fpS6Steps && window.fpS6Steps.step3) || numVar('--s6-step3-x', 930);
      const endX = step3;

      if (dot1) dot1.style.left = step1 + 'px';
      if (dot2) dot2.style.left = step2 + 'px';
      if (dot3) dot3.style.left = step3 + 'px';

      const fillPath = document.getElementById('sec6-d-fill-path');
      const batonArc = document.getElementById('sec6-d-baton-arc');
      const trackSvg = document.querySelector('.fp-s6-track');
      const screenLeft = window.fpScreenLeft(trackSvg);

      let curX = screenLeft;
      if (progress <= 0.08) {
        curX = screenLeft + (progress / 0.08) * (step1 - screenLeft);
      } else if (progress <= 0.25) {
        curX = step1;
      } else if (progress <= 0.33) {
        curX = step1 + ((progress - 0.25) / 0.08) * (step2 - step1);
      } else if (progress <= 0.50) {
        curX = step2;
      } else if (progress <= 0.58) {
        curX = step2 + ((progress - 0.50) / 0.08) * (step3 - step2);
      } else if (progress <= 0.75) {
        curX = step3;
      } else if (progress <= 0.83) {
        curX = step3 + ((progress - 0.75) / 0.08) * (endX - step3);
      } else {
        curX = endX;
      }

      if (fillPath) {
        fillPath.style.transition='none';
        const geometry='M '+screenLeft+' '+numVar('--s6-h-y',855)+' H '+endX;
        fillPath.setAttribute('d',geometry);
        fillPath.style.strokeDasharray='1';
        const fraction=Math.max(0,Math.min(1,(curX-screenLeft)/(endX-screenLeft||1)));
        fillPath.style.strokeDashoffset=String(1-fraction);
      }
      if (fillBar) {
        fillBar.style.transition = 'width 0.1s linear';
        fillBar.style.width = Math.max(0, curX) + 'px';
      }

      // 當填滿條到達 step1, step2, step3 圓點時，圓點同步變為實心深咖啡色！
      if (dot1) {
        if (curX >= step1 - 2) dot1.classList.add('filled');
        else dot1.classList.remove('filled');
      }
      if (dot2) {
        if (curX >= step2 - 2) dot2.classList.add('filled');
        else dot2.classList.remove('filled');
      }
      if (dot3) {
        if (curX >= step3 - 2) dot3.classList.add('filled');
        else dot3.classList.remove('filled');
      }

      // 方案 B：同層接棒 (progress 0.83 ~ 1.00 直接自進度線順滑畫出右側大半圓)
      let batonT = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));
      if (batonArc) {
        // Both layers meet at the same current third-dot coordinate.
        const tailD=(window.fpS6ConnectionD||batonArc.getAttribute('d')).replace(/^M\s+[-\d.]+\s+[-\d.]+/, 'M '+step3+' '+numVar('--s6-h-y',855));
        if(batonArc.getAttribute('d')!==tailD)batonArc.setAttribute('d',tailD);
        batonArc.style.visibility=batonT>0?'visible':'hidden';
        batonArc.style.strokeDashoffset = (1 - batonT).toFixed(4);
      }
      const s7Arc = document.querySelector('path[data-k="s7-arc1"]');
      if (s7Arc) {
        s7Arc.style.strokeDashoffset = (1 - batonT).toFixed(4);
      }

      // 3. 虛線動態插值
      const p = window.sec6RayParams || {
        p1: { lx1: 242, ly1: 62, lx2: 188, ly2: 452, rx1: 249, ry1: 56, rx2: 549, ry2: 446 },
        p2: { lx1: 242, ly1: 63, lx2: 450, ly2: 578, rx1: 253, ry1: 56, rx2: 725, ry2: 371 },
        p3: { lx1: 247, ly1: 63, lx2: 761, ly2: 639, rx1: 252, ry1: 55, rx2: 1060, ry2: 382 }
      };

      let curLX1, curLY1, curLX2, curLY2, curRX1, curRY1, curRX2, curRY2;

      if (progress <= 0.20) {
        const shootT = Math.min(1, Math.max(0, progress / 0.15));
        curLX1 = p.p1.lx1;
        curLY1 = p.p1.ly1;
        curLX2 = p.p1.lx1 + shootT * (p.p1.lx2 - p.p1.lx1);
        curLY2 = p.p1.ly1 + shootT * (p.p1.ly2 - p.p1.ly1);

        curRX1 = p.p1.rx1;
        curRY1 = p.p1.ry1;
        curRX2 = p.p1.rx1 + shootT * (p.p1.rx2 - p.p1.rx1);
        curRY2 = p.p1.ry1 + shootT * (p.p1.ry2 - p.p1.ry1);
      } else if (progress <= 0.30) {
        const t = (progress - 0.20) / 0.10;
        curLX1 = p.p1.lx1 + t * (p.p2.lx1 - p.p1.lx1);
        curLY1 = p.p1.ly1 + t * (p.p2.ly1 - p.p1.ly1);
        curLX2 = p.p1.lx2 + t * (p.p2.lx2 - p.p1.lx2);
        curLY2 = p.p1.ly2 + t * (p.p2.ly2 - p.p1.ly2);

        curRX1 = p.p2.rx1 + t * (p.p3.rx1 - p.p2.rx1);
        curRY1 = p.p2.ry1 + t * (p.p3.ry1 - p.p2.ry1);
        curRX2 = p.p2.rx2 + t * (p.p3.rx2 - p.p2.rx2);
        curRY2 = p.p2.ry2 + t * (p.p3.ry2 - p.p2.ry2);
      } else if (progress <= 0.45) {
        curLX1 = p.p2.lx1; curLY1 = p.p2.ly1; curLX2 = p.p2.lx2; curLY2 = p.p2.ly2;
        curRX1 = p.p2.rx1; curRY1 = p.p2.ry1; curRX2 = p.p2.rx2; curRY2 = p.p2.ry2;
      } else if (progress <= 0.55) {
        const t = (progress - 0.45) / 0.10;
        curLX1 = p.p2.lx1 + t * (p.p3.lx1 - p.p2.lx1);
        curLY1 = p.p2.ly1 + t * (p.p3.ly1 - p.p2.ly1);
        curLX2 = p.p2.lx2 + t * (p.p3.lx2 - p.p2.lx2);
        curLY2 = p.p2.ly2 + t * (p.p3.ly2 - p.p2.ly2);

        curRX1 = p.p2.rx1 + t * (p.p3.rx1 - p.p2.rx1);
        curRY1 = p.p2.ry1 + t * (p.p3.ry1 - p.p2.ry1);
        curRX2 = p.p2.rx2 + t * (p.p3.rx2 - p.p2.rx2);
        curRY2 = p.p2.ry2 + t * (p.p3.ry2 - p.p2.ry2);
      } else {
        curLX1 = p.p3.lx1; curLY1 = p.p3.ly1; curLX2 = p.p3.lx2; curLY2 = p.p3.ly2;
        curRX1 = p.p3.rx1; curRY1 = p.p3.ry1; curRX2 = p.p3.rx2; curRY2 = p.p3.ry2;
      }

      if (rayLeft && !window.fpTabletOpticsUpdate) {
        rayLeft.setAttribute('x1', curLX1);
        rayLeft.setAttribute('y1', curLY1);
        rayLeft.setAttribute('x2', curLX2);
        rayLeft.setAttribute('y2', curLY2);
      }
      if (rayRight && !window.fpTabletOpticsUpdate) {
        rayRight.setAttribute('x1', curRX1);
        rayRight.setAttribute('y1', curRY1);
        rayRight.setAttribute('x2', curRX2);
        rayRight.setAttribute('y2', curRY2);
      }

      // 4. 圓圈大小切換與內容對齊更新 Phase 0, 1, 2
      let newPhase = 0;
      if (progress > 0.20 && progress <= 0.45) newPhase = 1;
      else if (progress > 0.45) newPhase = 2;

      updateDesktopPhase(newPhase);
      window.fpTabletOpticsUpdate?.();
    }

    // 綁定節點圓點與卡片點擊事件 (支援點擊直達特定步驟)
    const dot1El = document.getElementById('sec6-d-dot-1');
    const dot2El = document.getElementById('sec6-d-dot-2');
    const dot3El = document.getElementById('sec6-d-dot-3');

    if (dot1El) dot1El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(0); });
    if (dot2El) dot2El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(1); });
    if (dot3El) dot3El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(2); });

    const card1El = document.getElementById('sec6-d-circle-1');
    const card2El = document.getElementById('sec6-d-circle-2');
    const card3El = document.getElementById('sec6-d-circle-3');

    if (card1El) card1El.addEventListener('click', () => goToStep(0));
    if (card2El) card2El.addEventListener('click', () => goToStep(1));
    if (card3El) card3El.addEventListener('click', () => goToStep(2));

    window.goToSec6Step = goToStep;

    // 5. 手機版卡片輪播點擊切換 (最新內文)
    const mobileData = window.FP_CONTENT_CONFIG.section6;

    let currentIndex = 0;

    let mobileFadeTimer,mobileOldLayers=[];
    function updateMobileCard(index) {
      clearTimeout(mobileFadeTimer);
      mobileOldLayers.forEach(el=>el.remove());mobileOldLayers=[];
      const numEl=document.getElementById('sec6-m-num'),titleEl=document.getElementById('sec6-m-title'),descEl=document.getElementById('sec6-m-desc'),imgEl=document.getElementById('sec6-m-img');
      if(!numEl||!titleEl||!descEl||!imgEl)return;
      const elements=[imgEl,descEl,numEl,titleEl],reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
      for(const el of elements){
        el.getAnimations().forEach(animation=>animation.cancel());el.style.opacity='1';
        if(reduced)continue;
        const old=el.cloneNode(true),computed=getComputedStyle(el);
        old.removeAttribute('id');old.removeAttribute('data-page-asset');old.setAttribute('aria-hidden','true');
        for(const property of computed)old.style.setProperty(property,computed.getPropertyValue(property));
        Object.assign(old.style,{position:'absolute',left:el.offsetLeft+'px',top:el.offsetTop+'px',width:el.offsetWidth+'px',height:el.offsetHeight+'px',margin:'0',opacity:'1',pointerEvents:'none',transition:'none'});
        el.parentElement.append(old);mobileOldLayers.push(old);
      }
      numEl.textContent=mobileData[index].num;titleEl.textContent=mobileData[index].title;descEl.textContent=mobileData[index].desc;imgEl.src=mobileData[index].img;imgEl.alt=mobileData[index].alt;
      if(reduced)return;
      for(const el of elements)el.animate([{opacity:0},{opacity:1}],{duration:500,easing:'ease',fill:'none'});
      for(const el of mobileOldLayers)el.animate([{opacity:1},{opacity:0}],{duration:500,easing:'ease',fill:'forwards'});
      mobileFadeTimer=setTimeout(()=>{mobileOldLayers.forEach(el=>el.remove());mobileOldLayers=[];},500);
    }

    const btnLeft = document.getElementById('sec6-m-btn-left');
    const btnRight = document.getElementById('sec6-m-btn-right');

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mobileData.length) % mobileData.length;
        updateMobileCard(currentIndex);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mobileData.length;
        updateMobileCard(currentIndex);
      });
    }

    window.addEventListener('resize', handleSec6Resize);
    window.addEventListener('scroll', handleSec6Scroll);
    window.handleSec6Scroll = handleSec6Scroll;

    handleSec6Resize();
    handleSec6Scroll();
  })();
