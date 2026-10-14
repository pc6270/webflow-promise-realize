
(function() {
    function handleSec5Resize() {
      const outerD = document.getElementById('s5-desktop-scaler');
      const outerM = document.getElementById('s5-mobile-scaler');
      
      if (outerD && window.innerWidth >= 768) {
        const scaleD = Math.min(window.innerWidth / 1171, 1.0);
        outerD.style.transform = `scale(${scaleD})`;
        const wrapD = document.querySelector('.s5-desktop-wrapper');
        if (wrapD) wrapD.style.height = `${740 * scaleD}px`;
      }
      
      if (outerM && window.innerWidth < 768) {
        const scaleM = Math.min(window.innerWidth / 375, 1.0);
        outerM.style.transform = `scale(${scaleM})`;
        const wrapM = document.querySelector('.s5-mobile-wrapper');
        if (wrapM) wrapM.style.height = `${790 * scaleM}px`;
      }
    }

    function setupSec5Animation() {
      const root = document.getElementById('s5-global-container');
      if (!root) return;

      const allPaths = root.querySelectorAll('.s5-line-path path');
      allPaths.forEach(path => {
        const len = Math.ceil(path.getTotalLength ? path.getTotalLength() : 800);
        path.style.strokeDasharray = len + 'px';
        path.style.strokeDashoffset = len + 'px';
        path.style.transition = 'none';
      });

      const photoFrame = root.querySelectorAll('.s5-d-photo-frame, .s5-m-photo-frame');
      photoFrame.forEach(el => el.style.transitionDelay = '0.8s');

      const text1 = root.querySelectorAll('.s5-d-subtitle-en, .s5-m-subtitle-en');
      const text2 = root.querySelectorAll('.s5-d-title-cn, .s5-m-title-cn');
      const text3 = root.querySelectorAll('.s5-d-slogan-block, .s5-d-slogan-text, .s5-m-slogan-text, .s5-m-accent-line');
      const text4 = root.querySelectorAll('.s5-d-desc, .s5-m-desc');

      text1.forEach(el => el.style.transitionDelay = '0.3s');
      text2.forEach(el => el.style.transitionDelay = '0.5s');
      text3.forEach(el => el.style.transitionDelay = '0.75s');
      text4.forEach(el => el.style.transitionDelay = '1.0s');
    }

    function triggerSec5Animation() {
      const root = document.getElementById('s5-global-container');
      if (!root) return;

      setupSec5Animation();
      if (!window.fpSequencePermit(root)) return;
            root.classList.add('s5-active');

      // 💻 桌面版線條動態序列
      const dTop = root.querySelector('.s5-d-top-curve path');
      const dArc = root.querySelector('.s5-d-bottom-arc path');
      const dLine = root.querySelector('.s5-d-bottom-line path');

      if (dTop) {
        setTimeout(() => {
          dTop.style.transition = 'stroke-dashoffset 0.7s linear';
          dTop.style.strokeDashoffset = '0';
        }, 100);
      }

      if (dArc) {
        setTimeout(() => {
          dArc.style.transition = 'stroke-dashoffset 0.5s linear';
          dArc.style.strokeDashoffset = '0';
        }, 1600);
      }

      if (dLine) {
        setTimeout(() => {
          dLine.style.transition = 'stroke-dashoffset 0.7s linear';
          dLine.style.strokeDashoffset = '0';
        }, 2100);
      }

      // 📱 手機版線條動態序列 (同步觸發，確保各尺寸下線條均平滑繪製)
      const mSeg1 = root.querySelector('.s5-m-top-curve path');
      const mSeg2 = root.querySelector('.s5-m-top-arch path');
      const mSeg3 = root.querySelector('.s5-m-left-line path');
      const mSeg4 = root.querySelector('.s5-m-bottom-arc path');
      const mSeg5 = root.querySelector('.s5-m-bottom-line path');

      if (mSeg1) {
        setTimeout(() => {
          mSeg1.style.transition = 'stroke-dashoffset 0.35s linear';
          mSeg1.style.strokeDashoffset = '0';
        }, 100);
      }

      if (mSeg2) {
        setTimeout(() => {
          mSeg2.style.transition = 'stroke-dashoffset 0.35s linear';
          mSeg2.style.strokeDashoffset = '0';
        }, 450);
      }

      if (mSeg3) {
        setTimeout(() => {
          mSeg3.style.transition = 'stroke-dashoffset 0.55s linear';
          mSeg3.style.strokeDashoffset = '0';
        }, 800);
      }

      if (mSeg4) {
        setTimeout(() => {
          mSeg4.style.transition = 'stroke-dashoffset 0.40s linear';
          mSeg4.style.strokeDashoffset = '0';
        }, 1350);
      }

      if (mSeg5) {
        setTimeout(() => {
          mSeg5.style.transition = 'stroke-dashoffset 0.55s linear';
          mSeg5.style.strokeDashoffset = '0';
        }, 1750);
      }
    }

    setupSec5Animation();

    if ('IntersectionObserver' in window) {
      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSec5Animation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const root = document.getElementById('s5-global-container');
      if (root) observer.observe(root);
    } else {
      triggerSec5Animation();
    }

    window.replaySec5Animation = function() {
      const root = document.getElementById('s5-global-container');
      if (!root) return;
      root.classList.remove('s5-active');
      setupSec5Animation();
      setTimeout(triggerSec5Animation, 100);
    };

    window.addEventListener('resize', handleSec5Resize);
    window.addEventListener('load', handleSec5Resize);
    handleSec5Resize();
  })();
