

  (function () {
    function placeSeatLine() {
      var holder = document.getElementById('s6-seat-holder');
      var track = document.getElementById('sec6-d-track');
      var aArc = document.querySelector('.s5-d-bottom-arc.s5-seat-anchor');
      var aLine = document.querySelector('.s5-d-bottom-line.s5-seat-anchor');
      if (!holder || !track || !aArc || !aLine) return;
      if (window.innerWidth < 768) return;
      var inner = holder.parentElement;
      var tr = track.getBoundingClientRect();   // 釘住層的自然頂點 = 軌道頂點（不受釘住影響）
      var ir = inner.getBoundingClientRect();
      [[aArc, holder.querySelector('.s6-seat-arc'), 103.65],
       [aLine, holder.querySelector('.s6-seat-line'), 856]].forEach(function (p) {
        var r = p[0].getBoundingClientRect();
        if (!r.width) return;
        var sc = r.width / p[2];
        p[1].style.left = (r.left - ir.left).toFixed(2) + 'px';
        p[1].style.top = (r.top - tr.top).toFixed(2) + 'px';
        p[1].style.transform = 'scale(' + sc.toFixed(5) + ')';
      });
    }
    function placeSoon() {
      placeSeatLine();
      setTimeout(placeSeatLine, 200);
    }
    window.addEventListener('resize', placeSoon);
    window.addEventListener('fp:webflow-ready', function () { placeSoon(); setTimeout(placeSeatLine, 1000); });
    document.addEventListener('fp:webflow-ready', placeSoon);
    var root = document.getElementById('fp-master-root');
    if (root && 'MutationObserver' in window) {
      new MutationObserver(placeSoon).observe(root, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    placeSoon();

    // 畫線動態：沿用區塊五原本的時序（弧線 1.6s 後、橫線緊接）
    var s5 = document.getElementById('s5-global-container');
    var drawn = false;
    function checkDraw() {
      if (drawn || !s5 || !s5.classList.contains('s5-active')) return;
      drawn = true;
      setTimeout(function () {
        var h = document.getElementById('s6-seat-holder');
        if (h) h.classList.add('is-drawn');
      }, 1600);
    }
    if (s5 && 'MutationObserver' in window) {
      new MutationObserver(checkDraw).observe(s5, { attributes: true, attributeFilter: ['class'] });
    }
    checkDraw();
  })();

