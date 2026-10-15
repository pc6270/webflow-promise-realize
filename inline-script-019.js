
(function() {
    function handleSec8Resize() {
      const root = document.getElementById('wf-sec8-root');
      if (!root) return;
      const containerWidth = root.clientWidth;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      
      const outerDesk = document.getElementById('wf-sec8-desktop-outer');
      const canvasDesk = document.getElementById('wf-sec8-canvas');
      const outerMob = document.getElementById('wf-sec8-mobile-outer');
      const canvasMob = document.getElementById('wf-sec8-mobile-canvas');
      
      if (containerWidth >= 768) {
        if (outerDesk && canvasDesk) {
          outerDesk.style.display = 'flex';
          if (outerMob) outerMob.style.display = 'none';
          
          const scale = Math.min(1.0, containerWidth / 1221);
          
          canvasDesk.style.transform = `scale(${scale})`;
          canvasDesk.style.transformOrigin = 'top center';
          outerDesk.style.height = `${1200 * scale}px`;
        }
      } else {
        if (outerMob && canvasMob) {
          outerMob.style.display = 'flex';
          if (outerDesk) outerDesk.style.display = 'none';
          const rootStyle = getComputedStyle(root);
          const customScale = parseFloat(rootStyle.getPropertyValue('--sec8-mb-scale')) || 0.92;
          const scale = Math.min(customScale, (containerWidth / 375) * customScale);
          canvasMob.style.transform = `scale(${scale})`;
          canvasMob.style.transformOrigin = 'top center';
          outerMob.style.height = `${1140 * scale}px`;
        }
      }
    }
    window.addEventListener('resize', handleSec8Resize);
    window.addEventListener('fp:webflow-ready', handleSec8Resize);
    handleSec8Resize();

    // SVG 線條無縫 Linear 動態劃出與小人精準同步處理
    function setupSec8LineDraw() {
      const root = document.getElementById('wf-sec8-root');
      if (!root) return;
      
      const outerDesk = document.getElementById('wf-sec8-desktop-outer');
      const isDesk = outerDesk && getComputedStyle(outerDesk).display !== 'none';
      const prefix = isDesk ? '.wf-sec8-line-' : '.wf-sec8-mob-line-';
      
      const lineTypes = ['top', 'horiz', 'loop', 'bottom'];
      const lines = lineTypes.map(t => root.querySelector(`${prefix}${t} path`));

      // 取得各段線條真實像素長度
      const lengths = lines.map(p => p ? Math.ceil(p.getTotalLength ? p.getTotalLength() : 500) : 500);

      // 固定勻速 (px / second)
      const speed = isDesk ? 750 : 500;
      
      let currTime = 0.1; // 起始延遲 (秒)
      const timings = [];

      for (let i = 0; i < 4; i++) {
        const dur = Math.max(0.15, lengths[i] / speed);
        timings.push({ dur: dur, start: currTime, end: currTime + dur });
        currTime += dur; // 下一段線條在前一段毫秒時無縫接續！
      }

      // 設定線條圖層 CSS
      lines.forEach((path, i) => {
        if (path) {
          const len = lengths[i];
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          path.style.transition = 'none';
          path.setAttribute('data-dur', timings[i].dur);
          path.setAttribute('data-start', timings[i].start);
        }
      });

      // 計算底線 (Line 4) 劃過走路小人 (右) 與媽媽抱小孩 (左) 的精準毫秒到達時間
      let tLine4Start = timings[3].start;
      let tLine4Dur = timings[3].dur;
      if (isDesk && window.fpSegTiming) { const _a = window.fpSegTiming('s8-arc3'), _b = window.fpSegTiming('s8-h2'); if (_a && _b) { tLine4Start = _a.start; tLine4Dur = _b.start + _b.dur - _a.start; } }

      const fMan2 = 0.12; // 底部線從右側迴轉處出發 12% 位置到達走路小人
      const fMan1 = 0.88; // 底部線劃至 88% 位置到達左側媽媽抱小孩

      const tMan2 = tLine4Start + fMan2 * tLine4Dur + (isDesk ? 1.0 : 0);
      const tMan1 = tLine4Start + fMan1 * tLine4Dur;

      // 動態更新小人動畫淡入與平移的 transition-delay
      const man2Groups = root.querySelectorAll(isDesk ? '.wf-sec8-desktop-canvas .wf-sec8-man2-group' : '.wf-sec8-mobile-canvas .wf-sec8-man2-group');
      const man1Groups = root.querySelectorAll(isDesk ? '.wf-sec8-desktop-canvas .wf-sec8-man1-group' : '.wf-sec8-mobile-canvas .wf-sec8-man1-group');

      man2Groups.forEach(g => g.style.transitionDelay = `${tMan2.toFixed(2)}s`);
      man1Groups.forEach(g => g.style.transitionDelay = `${tMan1.toFixed(2)}s`);
    }

    function triggerSec8Animation() {
      const root = document.getElementById('wf-sec8-root');
      if (!root) return;
      
      setupSec8LineDraw();
      if (!window.fpSequencePermit(root)) return;
            root.classList.add('wf-sec8-active');

      const outerDesk = document.getElementById('wf-sec8-desktop-outer');
      const isDesk = outerDesk && getComputedStyle(outerDesk).display !== 'none';
      const prefix = isDesk ? '.wf-sec8-line-' : '.wf-sec8-mob-line-';
      
      const lineTypes = ['top', 'horiz', 'loop', 'bottom'];
      lineTypes.forEach(t => {
        const container = root.querySelector(`${prefix}${t}`);
        const path = container ? container.querySelector('path') : null;
        if (path) {
          const dur = path.getAttribute('data-dur') || 1;
          const start = path.getAttribute('data-start') || 0;
          setTimeout(() => {
            path.style.transition = `stroke-dashoffset ${dur}s linear`;
            path.style.strokeDashoffset = '0';
          }, parseFloat(start) * 1000);
        }
      });
    }

    setupSec8LineDraw();

    if ('IntersectionObserver' in window) {
      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSec8Animation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      
      const root = document.getElementById('wf-sec8-root');
      if (root) observer.observe(root);
    } else {
      triggerSec8Animation();
    }

    window.replaySec8Animation = function() {
      const root = document.getElementById('wf-sec8-root');
      if (!root) return;
      root.classList.remove('wf-sec8-active');
      setupSec8LineDraw();
      setTimeout(triggerSec8Animation, 100);
    };
  })();
