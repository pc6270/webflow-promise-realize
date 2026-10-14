
(function() {
    function triggerSec4Animation() {
      const root = document.getElementById('s4-root-container');
      if (!root) return;
      if (!window.fpSequencePermit(root)) return;
            root.classList.add('s4-active');
    }

    if ('IntersectionObserver' in window) {
      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerSec4Animation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const root = document.getElementById('s4-root-container');
      if (root) observer.observe(root);
    } else {
      triggerSec4Animation();
    }

    window.replaySec4Animation = function() {
      const root = document.getElementById('s4-root-container');
      if (!root) return;
      root.classList.remove('s4-active');
      setTimeout(triggerSec4Animation, 100);
    };
  })();
