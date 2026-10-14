
  (function() {
    function updateS2P1Scale() {
      const root = document.getElementById('s2p1-root-container');
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const w = rect.width || root.clientWidth || root.offsetWidth;
      if (w <= 0) return;

      // Calculate scale cleanly based on total 1215px bounding canvas span (from left photo edge 0px to right curve edge 1153px)
      let scale = w / 1215;
      if (scale > 1.0) scale = 1.0;
      if (scale < 0.50) scale = 0.50;
      root.style.setProperty('--s2p1-dt-scale', scale);
    }
    window.updateS2P1Scale = updateS2P1Scale;

    function initS2P1Animation() {
      const root = document.getElementById('s2p1-root-container');
      if (!root) return;

      updateS2P1Scale();
      window.addEventListener('resize', updateS2P1Scale);

      if (window.ResizeObserver) {
        new ResizeObserver(updateS2P1Scale).observe(root);
      }

      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!window.fpSequencePermit(root)) return;
            root.classList.add('s2p1-active');
            updateS2P1Scale();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(root);

      window.replayS2P1Animation = function() {
        root.classList.remove('s2p1-active');
        setTimeout(() => {
          if (!window.fpSequencePermit(root)) return;
            root.classList.add('s2p1-active');
          updateS2P1Scale();
        }, 50);
      };
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initS2P1Animation);
    } else {
      initS2P1Animation();
    }
  })();
