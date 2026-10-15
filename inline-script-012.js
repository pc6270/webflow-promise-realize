

  /* ✒️ 線段引擎：依 CSS 變數重畫橫線端點／弧線位移，並依長度分配畫線時間 */
  (function () {
    var CH = {"s2p1": {"total": 3.0, "delay": 0}, "s2p2": {"total": 3.5, "delay": 0}, "s2p34": {"total": 3.5, "delay": 0}, "s5top": {"total": 0.7, "delay": 0.1}, "s5seat": {"total": 1.2, "delay": 0}, "s7": {"speed": 1600, "delay": 0.1, "minTotal": 0.8}, "s8": {"speed": 750, "delay": 0.1, "minSeg": 0.15}};
    var timing = {}, chainLen = {};
    function rootEl() { return document.getElementById('fp-master-root') || document.documentElement; }
    function num(cs, name, def) { var v = parseFloat(cs.getPropertyValue(name)); return isNaN(v) ? def : v; }
    function f(n) { return Math.round(n * 100) / 100; }
    window.fpScreenLeft = function(svg) {
      var matrix=svg && svg.getScreenCTM();
      if (!matrix) return 0;
      var point=new DOMPoint(-20,0).matrixTransform(matrix.inverse());
      return Math.floor(point.x);
    };
    function geom() {
      var cs = getComputedStyle(rootEl());
      var inset = num(cs, '--s6-anchor-inset', 128);
      function anchor(n, fallback) {
        var circle=document.getElementById('sec6-d-circle-'+n);
        var left=circle ? parseFloat(getComputedStyle(circle).left) : NaN;
        return Number.isFinite(left) ? left+inset : fallback;
      }
      var step1 = anchor(1,281);
      var step2 = anchor(2,755);
      var step3 = anchor(3,1056);
      window.fpS6Steps = { step1: step1, step2: step2, step3: step3 };

      document.querySelectorAll('[data-fp-h]').forEach(function (p) {
        var k = p.getAttribute('data-fp-h');
        var s = num(cs, '--' + k + '-start', +p.dataset.s), e = num(cs, '--' + k + '-end', +p.dataset.e);
        var y = num(cs, p.dataset.yk, +p.dataset.y), ox = +p.dataset.ox || 0, oy = +p.dataset.oy || 0;

        // Dynamic step alignment for S6
        if (k === 's6-h1') { e = step1; }
        else if (k === 's6-h2') { s = step1; e = step2; }
        else if (k === 's6-h3') { s = step2; e = step3; }
        else if (k === 's6-h4') { s = step3; }

        // Dynamic screen-left extension for s6-h1 and s5-h2 (0px gap to viewport left edge)
        if (k === 's6-h1' || k === 's5-h2') {
          var svgEl = p.ownerSVGElement;
          if (svgEl) {
            s = window.fpScreenLeft(svgEl) + ox;
          }
        }

        var a = s - ox, b = e - ox;
        if (p.dataset.dir === 'rtl') { var t = a; a = b; b = t; }
        p.setAttribute('d', 'M ' + f(a) + ' ' + f(y - oy) + ' H ' + f(b));
      });
      document.querySelectorAll('[data-fp-v]').forEach(function (p) {
        var k = p.getAttribute('data-fp-v');
        var s = num(cs, '--' + k + '-start', +p.dataset.s), e = num(cs, '--' + k + '-end', +p.dataset.e);
        var x = num(cs, '--' + k + '-x', +p.dataset.x), ox = +p.dataset.ox || 0, oy = +p.dataset.oy || 0;
        var a = s - oy, b = e - oy;
        if (p.dataset.dir === 'btt') { var t = a; a = b; b = t; }
        p.setAttribute('d', 'M ' + f(x - ox) + ' ' + f(a) + ' V ' + f(b));
      });
      document.querySelectorAll('[data-fp-arc]').forEach(function (g) {
        var k = g.getAttribute('data-fp-arc');
        g.setAttribute('transform', 'translate(' + f(num(cs, '--' + k + '-x', 0)) + ' ' + f(num(cs, '--' + k + '-y', 0)) + ')');
      });
      document.querySelectorAll('circle.fp-node').forEach(function (c) {
        var ox = +c.dataset.ox || 0, oy = +c.dataset.oy || 0;
        var atKey = c.dataset.at;
        var cxVal = num(cs, atKey, +c.dataset.x);
        if (atKey === '--s6-h1-end') cxVal = step1;
        else if (atKey === '--s6-h2-end') cxVal = step2;
        else if (atKey === '--s6-h3-end') cxVal = step3;
        c.setAttribute('cx', f(cxVal - ox));
        c.setAttribute('cy', f(num(cs, c.dataset.yk, +c.dataset.y) - oy));
      });
      var d1 = document.getElementById('sec6-d-dot-1');
      var d2 = document.getElementById('sec6-d-dot-2');
      var d3 = document.getElementById('sec6-d-dot-3');
      if (d1) d1.style.left = f(step1) + 'px';
      if (d2) d2.style.left = f(step2) + 'px';
      if (d3) d3.style.left = f(step3) + 'px';

      var batonArc = document.getElementById('sec6-d-baton-arc');
      if (batonArc) {
        var endX = num(cs, '--s6-h4-end', 1131.87);
        var yVal = num(cs, '--s6-h-y', 820);
        var dArc = 'M ' + f(endX) + ' ' + f(yVal) + ' C ' + f(endX + 136.79) + ' ' + f(yVal) + ' ' + f(endX + 247.69) + ' ' + f(yVal + 110.81) + ' ' + f(endX + 247.69) + ' ' + f(yVal + 247.5) + ' C ' + f(endX + 247.69) + ' ' + f(yVal + 384.19) + ' ' + f(endX + 136.79) + ' ' + f(yVal + 495) + ' ' + f(endX) + ' ' + f(yVal + 495);
        batonArc.setAttribute('d', window.fpS6ConnectionD || dArc);
      }
    }
    function segLen(p) {
      var d = p.getAttribute('d') || '';
      var m = d.match(/^M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+([HV])\s*(-?[\d.]+)\s*$/);
      if (m) return Math.abs(+m[4] - (m[3] === 'H' ? +m[1] : +m[2]));
      try { var l = p.getTotalLength(); if (l > 0) return l; } catch (err) {}
      return 150;
    }
    function times() {
      var groups = {};
      document.querySelectorAll('path.fp-seg[data-chain]').forEach(function (p) {
        (groups[p.dataset.chain] = groups[p.dataset.chain] || []).push(p);
      });
      Object.keys(groups).forEach(function (c) {
        var cfg = CH[c] || { total: 2, delay: 0 }, list = groups[c].filter(function(p){return p.getClientRects().length&&getComputedStyle(p).visibility!=='hidden';});
        var lens = list.map(function(p){var m=p.getScreenCTM();return segLen(p)*(m?Math.hypot(m.a,m.b):1);}), sum = lens.reduce(function (a, b) { return a + b; }, 0) || 1;
        chainLen[c] = sum;
        var t = cfg.delay || 0, total = null;
        total = sum / 1000;
        list.forEach(function (p, i) {
          var d = total != null ? total * lens[i] / sum : Math.max(cfg.minSeg || 0, lens[i] / cfg.speed);
          p.style.setProperty('--fp-d', d.toFixed(3) + 's');
          p.style.setProperty('--fp-dl', t.toFixed(3) + 's');
          timing[p.getAttribute('data-k')] = { start: t, dur: d };
          t += d;
        });
      });
    }
    function update() { geom(); times(); if (window.handleSec6Scroll) window.handleSec6Scroll(); }
    window.fpLinesUpdate = update;
    window.fpChainLength = function (c) { if (!chainLen[c]) update(); return chainLen[c] || 0; };
    window.fpSegTiming = function (k) { if (!timing[k]) update(); return timing[k] || null; };
    var tm = null;
    function soon() { clearTimeout(tm); tm = setTimeout(update, 30); }
    document.addEventListener('fp:webflow-ready', update);
    window.addEventListener('fp:webflow-ready', update);
    window.addEventListener('resize', soon);
    var r = document.getElementById('fp-master-root');
    if (r && 'MutationObserver' in window) {
      new MutationObserver(soon).observe(r, { attributes: true, attributeFilter: ['style'] });
    }
    update();
  })();

