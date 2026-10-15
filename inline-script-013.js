
(function() {
    function triggerS2P34Animation() {
      const root = document.getElementById('s2p34-root-container');
      if (root) {
        if (!window.fpSequencePermit(root)) return;
            root.classList.add('s2p34-active');
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new window.fpSequenceObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerS2P34Animation();
          }
        });
      }, { threshold: 0.05 });

      const root = document.getElementById('s2p34-root-container');
      if (root) observer.observe(root);
    } else {
      triggerS2P34Animation();
    }

    // 確保頁面加載完成時自動觸發動態
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(triggerS2P34Animation, 50);
    } else {
      window.addEventListener('fp:webflow-ready', () => setTimeout(triggerS2P34Animation, 50));
    }

    window.replayS2P34Animation = function() {
      const root = document.getElementById('s2p34-root-container');
      if (!root) return;
      root.classList.remove('s2p34-active');
      setTimeout(triggerS2P34Animation, 100);
    };

    // 動態更新 桌面版 SVG 路徑函數 (100% 保持 Figma 原生大圓弧 x=1180px 控制點)
    window.updateS2P34SVGPath = function(l1_start, l2_ext, l3_end_x, l3_end_y) {
      const pathEl = document.getElementById('s2p34-master-path');
      if (!pathEl) return;
      
      const p_l1_start = parseFloat(l1_start || 1200);
      const p_l2_ext = parseFloat(l2_ext || 927);
      const p_l3_end_x = parseFloat(l3_end_x || 600);
      const p_l3_end_y = parseFloat(l3_end_y || 960);

      const d = `M ${p_l1_start} 116 H 113.11 C 50.64 116 0 166.64 0 229 C 0 291.36 50.64 342 112.65 342 H ${p_l2_ext} C ${p_l2_ext + 136.5} 342 1180 442 1180 589 C 1180 736 ${p_l2_ext + 136.5} 836 ${p_l2_ext} 836 H ${p_l3_end_x + 110} C ${p_l3_end_x + 40} 836 ${p_l3_end_x} 884.82 ${p_l3_end_x} ${p_l3_end_y}`;

      pathEl.setAttribute('d', d);
    };
  })();
