
  (function() {
    function updateS1Scale() {
      const root = document.getElementById('s1-root-container');
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const w = rect.width || root.clientWidth || root.offsetWidth;
      if (w <= 0) return;

      let scale = w / 1020;
      if (scale > 1.0) scale = 1.0;
      if (scale < 0.65) scale = 0.65;
      root.style.setProperty('--s1-dt-scale', scale);
    }
    window.updateS1Scale = updateS1Scale;

    function initS1Animation() {
      const root = document.getElementById('s1-root-container');
      if (!root) return;

      updateS1Scale();
      window.addEventListener('resize', updateS1Scale);

      if (window.ResizeObserver) {
        new ResizeObserver(updateS1Scale).observe(root);
      }

      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!window.fpSequencePermit(root)) return;
            root.classList.add('s1-active');
            updateS1Scale();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(root);

      window.replayS1Animation = function() {
        root.classList.remove('s1-active');
        setTimeout(() => {
          if (!window.fpSequencePermit(root)) return;
            root.classList.add('s1-active');
          updateS1Scale();
        }, 50);
      };
    }

    if (document.readyState === 'loading') {
      document.addEventListener('fp:webflow-ready', initS1Animation);
    } else {
      initS1Animation();
    }
  })();
