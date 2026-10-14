
  (function() {
    function initS2P2Animation() {
      const root = document.getElementById('s2p2-root-container');
      if (!root) return;

      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!window.fpSequencePermit(root)) return;
            root.classList.add('s2p2-active');
          }
        });
      }, { threshold: 0.15 });

      observer.observe(root);

      window.replayS2P2Animation = function() {
        root.classList.remove('s2p2-active');
        setTimeout(() => {
          if (!window.fpSequencePermit(root)) return;
            root.classList.add('s2p2-active');
        }, 50);
      };
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initS2P2Animation);
    } else {
      initS2P2Animation();
    }
  })();
