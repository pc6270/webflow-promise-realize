
(function() {
    function handleSec7Resize() {
      const isDesk = window.innerWidth >= 768;
      const outerDesk = document.getElementById('wf-sec7-desktop-outer');
      const canvasDesk = document.getElementById('wf-sec7-canvas');
      const outerMob = document.getElementById('wf-sec7-mobile-outer');
      const canvasMob = document.getElementById('wf-sec7-mobile-canvas');

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;

      if (isDesk) {
        if (outerDesk && canvasDesk) {
          outerDesk.style.display = 'flex';
          if (outerMob) outerMob.style.display = 'none';
          const baseW = 1221;
          const baseH = 800;
          const maxW = windowW * 0.95;
          const headerHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
      const maxH = windowH * 0.92;
          const scale = Math.min(maxW / baseW, maxH / baseH, 1.0);
          canvasDesk.style.transform = 'scale(' + scale + ')';
          outerDesk.style.height = (baseH * scale) + 'px';
        }
      } else {
        if (outerMob && canvasMob) {
          outerMob.style.display = 'flex';
          if (outerDesk) outerDesk.style.display = 'none';
          const baseMobW = 346;
          const baseMobH = 718;
          const scale = Math.min(windowW / baseMobW, 1.0);
          canvasMob.style.transform = 'scale(' + scale + ')';
          outerMob.style.height = (baseMobH * scale) + 'px';
        }
      }
    }

    function setupSec7Animation() {
      const root = document.getElementById('wf-sec7-root');
      if (!root) return;

      const isDesk = window.innerWidth >= 768;
      const path = root.querySelector(isDesk ? '.wf-sec7-vector-svg path' : '.wf-sec7-m-vector-svg path');
      if (!path) return;

      const len = (isDesk && window.fpChainLength && window.fpChainLength('s7')) ? Math.ceil(window.fpChainLength('s7')) : Math.ceil(path.getTotalLength ? path.getTotalLength() : (isDesk ? 2234 : 750));
      path.style.strokeDasharray = len + 'px';
      path.style.strokeDashoffset = len + 'px';
      path.style.transition = 'none';

      const speed = isDesk ? 1600 : 600;
      const lineDur = Math.max(0.8, len / speed);
      const lineStartDelay = 0.1;
      const pushStartTime = lineStartDelay + lineDur;

      const manPush = root.querySelector(isDesk ? '.wf-sec7-man-push' : '.wf-sec7-m-man-push');
      const manShadow = root.querySelector(isDesk ? '.wf-sec7-man-shadow' : '.wf-sec7-m-man-shadow');
      const ball5 = root.querySelector(isDesk ? '.wf-sec7-ball-5' : '.wf-sec7-m-ball-5');

      if (manPush) manPush.style.transitionDelay = `${pushStartTime.toFixed(2)}s`;
      if (manShadow) manShadow.style.transitionDelay = `${pushStartTime.toFixed(2)}s`;
      if (ball5) ball5.style.transitionDelay = `${pushStartTime.toFixed(2)}s`;

      const remainingBalls = root.querySelectorAll(isDesk ? '.wf-sec7-ball-other' : '.wf-sec7-m-ball-other');
      remainingBalls.forEach((ball) => {
        if (ball) {
          ball.style.transitionDelay = `${pushStartTime.toFixed(2)}s`;
        }
      });

      path.setAttribute('data-dur', lineDur);
      path.setAttribute('data-delay', lineStartDelay);
    }

    function triggerSec7Animation() {
      const root = document.getElementById('wf-sec7-root');
      if (!root) return;

      setupSec7Animation();
      if (!window.fpSequencePermit(root)) return;
            root.classList.add('wf-sec7-active');

      const isDesk = window.innerWidth >= 768;
      const path = root.querySelector(isDesk ? '.wf-sec7-vector-svg path' : '.wf-sec7-m-vector-svg path');
      if (path) {
        const dur = path.getAttribute('data-dur') || 1.3;
        const delay = path.getAttribute('data-delay') || 0.1;
        setTimeout(() => {
          path.style.transition = `stroke-dashoffset ${dur}s linear`;
          path.style.strokeDashoffset = '0px';
        }, parseFloat(delay) * 1000);
      }
    }

    setupSec7Animation();

    if ('IntersectionObserver' in window) {
      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSec7Animation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const root = document.getElementById('wf-sec7-root');
      if (root) observer.observe(root);
    } else {
      triggerSec7Animation();
    }

    window.replaySec7Animation = function() {
      const root = document.getElementById('wf-sec7-root');
      if (!root) return;
      root.classList.remove('wf-sec7-active');
      setupSec7Animation();
      setTimeout(triggerSec7Animation, 100);
    };

    window.addEventListener('resize', handleSec7Resize);
    window.addEventListener('load', handleSec7Resize);
    handleSec7Resize();
  })();
