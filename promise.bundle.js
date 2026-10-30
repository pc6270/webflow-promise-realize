window.FP_BUNDLE_READY=(async()=>{

;/* reload-start.js */
(() => {
 if(window.fpReloadTopInstalled)return;
 window.fpReloadTopInstalled=true;
 const navigation=performance.getEntriesByType('navigation')[0];
 if(navigation?.type!=='reload')return;
 history.scrollRestoration='manual';
 let cancelled=false;
 function reset(){if(!cancelled)window.scrollTo({top:0,left:0,behavior:'instant'});}
 function cancel(event){if(event.isTrusted!==false)cancelled=true;}
 for(const event of ['wheel','touchstart','pointerdown','keydown'])addEventListener(event,cancel,{passive:true,capture:true});
 reset();
 for(const event of ['pageshow','load','fp:webflow-ready'])addEventListener(event,()=>{reset();requestAnimationFrame(reset);},{once:true});
})();

;

;/* sequence-gate.js */
(() => {
 window.fpSequenceObserver=function(){this.observe=()=>{};this.unobserve=()=>{};this.disconnect=()=>{};};
 window.fpSequenceObserver=function(){this.observe=()=>{};this.unobserve=()=>{};this.disconnect=()=>{};};
 const allowed=new Set(),started=new Set();
 window.fpSequenceStarted=id=>started.has(id);
 window.fpSequencePermit=root=>{if(!allowed.has(root.id)||started.has(root.id))return false;started.add(root.id);return true;};
 window.fpSequenceAuthorize=id=>allowed.add(id);
 window.fpSequenceMark=id=>started.add(id);
 const css=document.createElement('style');css.textContent='.fp-sequence-pending{opacity:0!important;pointer-events:none!important}.fp-sequence-enter{animation:fp-sequence-fade .32s ease both}@keyframes fp-sequence-fade{from{opacity:0}to{opacity:1}}@media(prefers-reduced-motion:reduce){.fp-sequence-enter{animation:none}}';document.head.append(css);
})();

;
(()=>{const s=document.createElement("script");s.src="https://use.typekit.net/usm6obt.js";s.async=true;s.onload=()=>window.Typekit?.load({async:true});s.onerror=()=>console.warn("Optional font service unavailable");document.head.append(s);})();

;/* inline-script-007.js */
try{Typekit.load();}catch(error){}
;

;/* viewport-state.js */
(() => {function update(){const root=document.getElementById('fp-master-root');if(root)root.classList.toggle('fp-tablet',innerWidth>=768&&innerWidth<1200);}addEventListener('resize',update);document.addEventListener('fp:webflow-ready',update,{once:true});})();

;

;/* inline-script-009.js */

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

;

;/* inline-script-010.js */

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
      document.addEventListener('fp:webflow-ready', initS2P1Animation);
    } else {
      initS2P1Animation();
    }
  })();

;

;/* inline-script-011.js */

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
      document.addEventListener('fp:webflow-ready', initS2P2Animation);
    } else {
      initS2P2Animation();
    }
  })();

;

;/* content-config-runtime.js */
(() => {
 const config=window.FP_CONTENT_CONFIG;if(!config)return;
 function apply(){
  const root=document.getElementById('fp-master-root');
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_COMMENT);
  while(walker.nextNode()){
   const comment=walker.currentNode,key=comment.data.match(/^fp-text:(.+)$/)?.[1];
   const node=comment.nextSibling,value=config.texts[key];
   if(value!==undefined&&node?.nodeType===Node.TEXT_NODE){const left=node.nodeValue.match(/^\s*/)[0],right=node.nodeValue.match(/\s*$/)[0];node.nodeValue=left+value+right;}
  }
  for(const el of root.querySelectorAll('[data-page-asset]')){
   const asset=config.assets[el.dataset.pageAsset];if(!asset)continue;
   el.src=asset.src;el.alt=asset.decorative?'':asset.alt;
  }
  // Webflow owns the published page metadata; use config SEO only in standalone previews.
  if(!window.FP_WEBFLOW_BOOTSTRAP){
   if(config.seo?.title)document.title=config.seo.title;
   const description=document.querySelector('meta[name="description"]');if(description&&config.seo?.description)description.content=config.seo.description;
  }
 }
 window.fpContentUpdate=apply;apply();
})();

;

;/* inline-script-013.js */


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
        if(window.innerWidth>=1200 && p.dataset.desktopSeam==='1')return;
        if(window.innerWidth>=1200 && k.startsWith('s8-') && p.closest('#wf-sec8-canvas[data-compact="1"]'))return;
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
        if(k === 's5-h2') {
          const arc=document.querySelector('path[data-k="s5-arc3"]');
          const matrix=p.getScreenCTM();
          if(arc&&matrix){
            const joint=arc.getPointAtLength(arc.getTotalLength()).matrixTransform(arc.getScreenCTM()).matrixTransform(matrix.inverse());
            p.setAttribute('d','M '+joint.x+' '+joint.y+' H '+window.fpScreenLeft(p.ownerSVGElement));
            return;
          }
        }
        p.setAttribute('d', 'M ' + f(a) + ' ' + f(y - oy) + ' H ' + f(b));
      });
      document.querySelectorAll('[data-fp-v]').forEach(function (p) {
        var k = p.getAttribute('data-fp-v');
        if(window.innerWidth>=1200 && k.startsWith('s8-') && p.closest('#wf-sec8-canvas[data-compact="1"]'))return;
        var s = num(cs, '--' + k + '-start', +p.dataset.s), e = num(cs, '--' + k + '-end', +p.dataset.e);
        var x = num(cs, '--' + k + '-x', +p.dataset.x), ox = +p.dataset.ox || 0, oy = +p.dataset.oy || 0;
        var a = s - oy, b = e - oy;
        if (p.dataset.dir === 'btt') { var t = a; a = b; b = t; }
        p.setAttribute('d', 'M ' + f(x - ox) + ' ' + f(a) + ' V ' + f(b));
      });
      document.querySelectorAll('[data-fp-arc]').forEach(function (g) {
        var k = g.getAttribute('data-fp-arc');
        if(window.innerWidth>=1200 && k.startsWith('s8-') && g.closest('#wf-sec8-canvas[data-compact="1"]'))return;
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


;

;/* inline-script-014.js */

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

;

;/* inline-script-015.js */

function switchS4Tab(index) {
    var pill = document.getElementById('s4-tab-pill-el');
    var glow = document.getElementById('s4-tab-glow-el');
    var track = document.querySelector('.s4-tab-track');
    
    var offset = 0;
    if (track && track.offsetWidth > 0) {
      // 數學完美步進：按鈕列嵌套於軌道長條內部，步進等於 (長條軌道寬度 / 3)，確保 100% 絕對居中
      var stepOffset = track.offsetWidth / 3;
      offset = index * stepOffset;
    } else {
      var offsets = [0, 299, 598];
      offset = offsets[index] || 0;
    }

    if (pill) pill.style.transform = 'translateX(' + offset + 'px)';
    if (glow) glow.style.transform = 'translateX(' + offset + 'px)';

    var btns = document.querySelectorAll('.s4-tab-btn');
    var panels = document.querySelectorAll('.s4-tab-panel');

    btns.forEach(function(btn, idx) {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    panels.forEach(function(panel, idx) {
      if (idx === index) {
        panel.classList.add('active');
        var cardsInPanel = panel.querySelectorAll('.s4-accordion-card');
        cardsInPanel.forEach(function(c) { c.classList.remove('active'); });
      } else {
        panel.classList.remove('active');
      }
    });
  }

  window.switchS4Tab = switchS4Tab;

  window.addEventListener('resize', function() {
    var activeBtn = document.querySelector('.s4-tab-btn.active');
    var btns = Array.from(document.querySelectorAll('.s4-tab-btn'));
    if (activeBtn) {
      var index = btns.indexOf(activeBtn);
      if (index >= 0) switchS4Tab(index);
    }
  });

  // 僅在手機版 (<= 768px) 啟用直向卡片點擊展合 Toggle
  document.addEventListener('fp:webflow-ready', function() {
    var accordionContainers = document.querySelectorAll('.s4-cards-accordion');
    accordionContainers.forEach(function(container) {
      var cards = container.querySelectorAll('.s4-accordion-card');
      cards.forEach(function(card) {
        card.addEventListener('click', function(e) {
          if (e.target.closest('.s4-btn-watch-video')) {
            return;
          }
          
          if (window.innerWidth < 1200) {
            e.stopPropagation();
            var targetCard = e.currentTarget;
            var isCurrentActive = targetCard.classList.contains('active');
            
            cards.forEach(function(c) {
              c.classList.remove('active');
            });
            
            if (!isCurrentActive) {
              targetCard.classList.add('active');
            }
          }
        });
      });
    });
  });

;

;/* inline-script-016.js */

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

;

;/* inline-script-017.js */

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
    window.addEventListener('fp:webflow-ready', handleSec5Resize);
    handleSec5Resize();
  })();

;

;/* inline-script-018.js */

(function() {
    function handleSec6Resize() {
      const outer = document.getElementById('wf-sec6-desktop-outer');
      const canvas = document.getElementById('wf-sec6-canvas');
      if (!outer || !canvas) return;

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;
      if (windowW < 768) return;

      const baseW = 1221;
      const baseH = 936;

      const maxW = windowW * 0.95;
      const headerHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
      const maxH = windowH * 0.92;

      const scaleW = maxW / baseW;
      const scaleH = maxH / baseH;
      const scale = Math.min(scaleW, scaleH, 1.0);

      canvas.style.transform = 'scale(' + scale + ')';
      outer.style.height = (baseH * scale) + 'px';
    }

    // 用戶最新內文更新
    const cardData = [
      {
        num: '01',
        title: '空間裁切的匠心',
        desc: '在坪數規劃上，與建設一同細心思量，讓空間能承載不同家庭的樣貌。',
        headerLeft: 206,
        descLeft: 206
      },
      {
        num: '02',
        title: '真摯不溢的坦誠',
        desc: '在廣告與銷售中，不誇大、不隱瞞，誠實呈現家的本質。',
        headerLeft: 508,
        descLeft: 578
      },
      {
        num: '03',
        title: '溫暖舒心的迎賓體驗',
        desc: '在現場，以溫暖的氛圍迎接——迎賓茶點、流動香氛，讓對話不只是資訊交換，而是一段舒心的交流。',
        headerLeft: 809,
        descLeft: 879
      }
    ].map((item,i)=>({...item,...window.FP_CONTENT_CONFIG.section6[i]}));

    // 用戶最新提供之精確 3 階段虛線座標 ( Phase 4 數值與 Phase 3 100% 完全相同 )
    window.sec6RayParams = {
      p1: { lx1: 242, ly1: 62, lx2: 188, ly2: 452, rx1: 249, ry1: 56, rx2: 549, ry2: 446 },
      p2: { lx1: 242, ly1: 63, lx2: 450, ly2: 578, rx1: 253, ry1: 56, rx2: 725, ry2: 371 },
      p3: { lx1: 247, ly1: 63, lx2: 761, ly2: 639, rx1: 252, ry1: 55, rx2: 1060, ry2: 382 }
    };

    let currentPhase = -1;
    let phaseTextTimer,phaseTextVersion=0;
    let isClickNavigating = false;
    let clickNavTimeout = null;
    function writeS6Style(el,key,value){if(el.style[key]!==value)el.style[key]=value;}
    function writeS6Attribute(el,key,value){if(el.getAttribute(key)!==value)el.setAttribute(key,value);}
    function alignStage(phase) {
      if(document.getElementById('fp-master-root').dataset.s6TextSwitching==='1')return;
      const index=Math.max(0,Math.min(2,phase));
      const cs=getComputedStyle(document.getElementById('fp-master-root'));
      const circle=document.getElementById('sec6-d-circle-'+(index+1));
      const x=circle ? parseFloat(getComputedStyle(circle).left)+(parseFloat(cs.getPropertyValue('--s6-anchor-inset'))||128) : NaN;
      if (!Number.isFinite(x)) return;
      const title=document.getElementById('sec6-d-title');
      const header=document.getElementById('sec6-d-header-group');
      const desc=document.getElementById('sec6-d-desc');
      const headerLeft=header&&title?(x-title.offsetLeft)+'px':null;
      if(headerLeft!==null)writeS6Style(header,'left',headerLeft);
      if(desc)writeS6Style(desc,'left',x+'px');
    }
    window.fpS6AlignStage=()=>alignStage(currentPhase);
    window.fpS6ReapplyPhase=()=>{const phase=Math.max(0,currentPhase);currentPhase=-1;updateDesktopPhase(phase);};
    window.addEventListener('resize',()=>alignStage(currentPhase));


    // 核心卡片、標題、說明與放射虛線狀態切換
    function updateDesktopPhase(newPhase) {
      const phaseRoot=document.getElementById('fp-master-root');
      if(newPhase!==currentPhase){phaseRoot.dataset.s6TextSwitching='1';for(const id of ['sec6-d-header-group','sec6-d-desc']){const el=document.getElementById(id);if(el)el.style.setProperty('left',getComputedStyle(el).left,'important');}}
      phaseRoot.dataset.s6Phase=String(newPhase);
      if(innerWidth>=768&&innerWidth<1200)window.fpTabletSetPhase?.(newPhase);
      if (newPhase === currentPhase) return;
      currentPhase = newPhase;

      const headerGroup = document.getElementById('sec6-d-header-group');
      const descEl = document.getElementById('sec6-d-desc');
      const numEl = document.getElementById('sec6-d-num');
      const titleEl = document.getElementById('sec6-d-title');

      const circle1 = document.getElementById('sec6-d-circle-1');
      const circle2 = document.getElementById('sec6-d-circle-2');
      const circle3 = document.getElementById('sec6-d-circle-3');

      // Keep the old text at its existing anchor until it is fully transparent.
      clearTimeout(phaseTextTimer);const version=++phaseTextVersion;
      if(headerGroup&&descEl){
        headerGroup.style.opacity='0';descEl.style.opacity='0';
        phaseTextTimer=setTimeout(()=>{
          if(version!==phaseTextVersion)return;
          if(numEl)numEl.textContent=cardData[newPhase].num;
          if(titleEl)titleEl.textContent=cardData[newPhase].title;
          descEl.textContent=cardData[newPhase].desc;
          phaseRoot.dataset.s6TextSwitching='0';
          headerGroup.style.removeProperty('left');descEl.style.removeProperty('left');
          if(innerWidth>=768&&innerWidth<1200)window.fpTabletSetPhase?.(newPhase);else alignStage(newPhase);
          requestAnimationFrame(()=>{if(version===phaseTextVersion){headerGroup.style.opacity='1';descEl.style.opacity='1';}});
        },matchMedia('(prefers-reduced-motion:reduce)').matches?0:200);
      }

      // 動態切換三張圓形圖素卡片的放大 (448px) 與縮小 (276px)
      if (circle1 && circle2 && circle3 && !(innerWidth>=768&&innerWidth<1200)) {
        if (newPhase === 0) {
          circle1.style.left = '153px';
          circle1.style.top = '368px';
          circle1.style.width = '448px';
          circle1.style.height = '448px';

          circle2.style.left = '627px';
          circle2.style.top = '540.2px';
          circle2.style.width = '276px';
          circle2.style.height = '276px';

          circle3.style.left = '928px';
          circle3.style.top = '540.2px';
          circle3.style.width = '276px';
          circle3.style.height = '276px';
        } else if (newPhase === 1) {
          circle1.style.left = '153px';
          circle1.style.top = '540.2px';
          circle1.style.width = '276px';
          circle1.style.height = '276px';

          circle2.style.left = '455px';
          circle2.style.top = '368px';
          circle2.style.width = '448px';
          circle2.style.height = '448px';

          circle3.style.left = '928px';
          circle3.style.top = '540.2px';
          circle3.style.width = '276px';
          circle3.style.height = '276px';
        } else if (newPhase === 2) {
          circle1.style.left = '153px';
          circle1.style.top = '540.2px';
          circle1.style.width = '276px';
          circle1.style.height = '276px';

          circle2.style.left = '455px';
          circle2.style.top = '540.2px';
          circle2.style.width = '276px';
          circle2.style.height = '276px';

          circle3.style.left = '756px';
          circle3.style.top = '368px';
          circle3.style.width = '448px';
          circle3.style.height = '448px';
        }
      }
    }

    // 放射虛線直接對齊指定階段目標端點
    function setRaysToPhase(phaseIndex) {
      if(window.fpTabletOpticsUpdate){
        for(const id of ['sec6-d-ray-left','sec6-d-ray-right'])document.getElementById(id).style.strokeDashoffset='0';
        window.fpTabletOpticsUpdate();return;
      }
      const p = window.sec6RayParams;
      if (!p) return;
      const targetP = phaseIndex === 0 ? p.p1 : (phaseIndex === 1 ? p.p2 : p.p3);
      const rayLeft = document.getElementById('sec6-d-ray-left');
      const rayRight = document.getElementById('sec6-d-ray-right');

      if (rayLeft) {
        rayLeft.setAttribute('x1', targetP.lx1);
        rayLeft.setAttribute('y1', targetP.ly1);
        rayLeft.setAttribute('x2', targetP.lx2);
        rayLeft.setAttribute('y2', targetP.ly2);
        rayLeft.style.strokeDashoffset = '0';
      }
      if (rayRight) {
        rayRight.setAttribute('x1', targetP.rx1);
        rayRight.setAttribute('y1', targetP.ry1);
        rayRight.setAttribute('x2', targetP.rx2);
        rayRight.setAttribute('y2', targetP.ry2);
        rayRight.style.strokeDashoffset = '0';
      }
    }

    // 點擊節點圓點或卡片切換步驟 (0, 1, 2)
    function goToStep(stepIndex) {
      stepIndex = Math.max(0, Math.min(2, stepIndex));
      const tail=document.getElementById('sec6-d-baton-arc');
      if(tail){tail.style.transition='none';tail.style.strokeDashoffset='1';tail.style.visibility='hidden';}
      const nextArc=document.querySelector('path[data-k="s7-arc1"]');if(nextArc)nextArc.style.strokeDashoffset='1';

      const rootEl = document.getElementById('fp-master-root') || document.documentElement;
      const cs = getComputedStyle(rootEl);
      const numVar = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isNaN(v) ? d : v; };
      const step1 = (window.fpS6Steps && window.fpS6Steps.step1) || numVar('--s6-step1-x', 206);
      const step2 = (window.fpS6Steps && window.fpS6Steps.step2) || numVar('--s6-step2-x', 647);
      const step3 = (window.fpS6Steps && window.fpS6Steps.step3) || numVar('--s6-step3-x', 930);
      const endX = step3;

      const fillBar = document.getElementById('sec6-d-fill-bar');
      const fillPath = document.getElementById('sec6-d-fill-path');
      const dot1 = document.getElementById('sec6-d-dot-1');
      const dot2 = document.getElementById('sec6-d-dot-2');
      const dot3 = document.getElementById('sec6-d-dot-3');

      // 1. 動態平滑填滿進度線
      const targetX = stepIndex === 0 ? step1 : (stepIndex === 1 ? step2 : step3);
      if (fillBar) {
        fillBar.style.transition = 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        fillBar.style.width = Math.max(0, targetX) + 'px';
      }
      if (fillPath) {
        const svg = document.querySelector('.fp-s6-track');
        const start = window.fpScreenLeft(svg);
        fillPath.setAttribute('d', 'M '+start+' '+numVar('--s6-h-y',855)+' H '+endX);
        fillPath.style.strokeDasharray = '1';
        fillPath.style.transition = 'stroke-dashoffset .4s ease';
        fillPath.style.strokeDashoffset = String(1-Math.max(0,Math.min(1,(targetX-start)/(endX-start||1))));
      }

      // 2. 圓點節點依序由實心灰轉為實心深咖啡色
      if (dot1) {
        if (stepIndex >= 0) dot1.classList.add('filled');
        else dot1.classList.remove('filled');
      }
      if (dot2) {
        if (stepIndex >= 1) dot2.classList.add('filled');
        else dot2.classList.remove('filled');
      }
      if (dot3) {
        if (stepIndex >= 2) dot3.classList.add('filled');
        else dot3.classList.remove('filled');
      }

      // 3. 切換卡片放大縮小、標題與內文
      updateDesktopPhase(stepIndex);

      // 4. 對齊虛線手電筒光束
      setRaysToPhase(stepIndex);

      // 5. 若處於滾動釘住容器內，同步平滑滾動頁面
      const track = document.getElementById('sec6-d-track');
      if (track) {
        const trackH = innerWidth>=768&&innerWidth<1200 ? track.getBoundingClientRect().height-(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-stage-height'))||760)*(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-scale'))||1) : track.offsetHeight-window.innerHeight;
        if (trackH > 0) {
          isClickNavigating = true;
          if (clickNavTimeout) clearTimeout(clickNavTimeout);
          clickNavTimeout = setTimeout(() => { isClickNavigating = false; handleSec6Scroll(); }, 800);

          const trackTop = track.getBoundingClientRect().top + window.pageYOffset;
          const targetP = stepIndex === 0 ? 0.15 : (stepIndex === 1 ? 0.40 : 0.70);
          window.scrollTo({ top: trackTop + targetP * trackH, behavior: 'smooth' });
        }
      }
    }

    // Release click/step navigation as soon as native smooth scrolling finishes.
    window.addEventListener('scrollend',()=>{
      if(!isClickNavigating)return;
      clearTimeout(clickNavTimeout);isClickNavigating=false;handleSec6Scroll();
    },{passive:true});

    // 滾動驅動交互處理
    let lastS6OutsideSide=0;
    function handleSec6Scroll() {
      if (!window.fpSequenceStarted?.('wf-sec6-root')) return;
      const windowW = window.innerWidth;
      if (windowW < 768) return;

      const track = document.getElementById('sec6-d-track');
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const outside=rect.top>innerHeight+160?1:rect.bottom < -160?-1:0;
      if(outside && outside===lastS6OutsideSide)return;
      lastS6OutsideSide=outside;
      const trackH = innerWidth>=768&&innerWidth<1200 ? track.getBoundingClientRect().height-(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-stage-height'))||760)*(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-scale'))||1) : track.offsetHeight-window.innerHeight;
      if (trackH <= 0) return;

      // 若正在執行點擊導航動畫，暫緩滾動干擾
      if (isClickNavigating) return;
      alignStage(currentPhase);

      // 計算 0.0 ~ 1.0 的滾動進度
      let progress = -rect.top / trackH;
      progress = Math.max(0, Math.min(1, progress));

      const rayLeft = document.getElementById('sec6-d-ray-left');
      const rayRight = document.getElementById('sec6-d-ray-right');
      const fillBar = document.getElementById('sec6-d-fill-bar');

      const dot1 = document.getElementById('sec6-d-dot-1');
      const dot2 = document.getElementById('sec6-d-dot-2');
      const dot3 = document.getElementById('sec6-d-dot-3');

      // 1. 虛線端點 (x2, y2) 像進度條一樣真實延伸填滿射出
      if (rayLeft) rayLeft.style.strokeDashoffset = '0';
      if (rayRight) rayRight.style.strokeDashoffset = '0';

      // 2. 咖啡色直線動態填滿（高度基準 820px）
      const rootEl = document.getElementById('fp-master-root') || document.documentElement;
      const cs = getComputedStyle(rootEl);
      const numVar = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isNaN(v) ? d : v; };
      const step1 = (window.fpS6Steps && window.fpS6Steps.step1) || numVar('--s6-step1-x', 206);
      const step2 = (window.fpS6Steps && window.fpS6Steps.step2) || numVar('--s6-step2-x', 647);
      const step3 = (window.fpS6Steps && window.fpS6Steps.step3) || numVar('--s6-step3-x', 930);
      const endX = step3;

      if (dot1) writeS6Style(dot1,'left',step1+'px');
      if (dot2) writeS6Style(dot2,'left',step2+'px');
      if (dot3) writeS6Style(dot3,'left',step3+'px');

      const fillPath = document.getElementById('sec6-d-fill-path');
      const batonArc = document.getElementById('sec6-d-baton-arc');
      const trackSvg = document.querySelector('.fp-s6-track');
      const screenLeft = window.fpScreenLeft(trackSvg);

      let curX = screenLeft;
      if (progress <= 0.08) {
        curX = screenLeft + (progress / 0.08) * (step1 - screenLeft);
      } else if (progress <= 0.25) {
        curX = step1;
      } else if (progress <= 0.33) {
        curX = step1 + ((progress - 0.25) / 0.08) * (step2 - step1);
      } else if (progress <= 0.50) {
        curX = step2;
      } else if (progress <= 0.58) {
        curX = step2 + ((progress - 0.50) / 0.08) * (step3 - step2);
      } else if (progress <= 0.75) {
        curX = step3;
      } else if (progress <= 0.83) {
        curX = step3 + ((progress - 0.75) / 0.08) * (endX - step3);
      } else {
        curX = endX;
      }

      if (fillPath) {
        writeS6Style(fillPath,'transition','none');
        const geometry='M '+screenLeft+' '+numVar('--s6-h-y',855)+' H '+endX;
        writeS6Attribute(fillPath,'d',geometry);
        writeS6Style(fillPath,'strokeDasharray','1');
        const fraction=Math.max(0,Math.min(1,(curX-screenLeft)/(endX-screenLeft||1)));
        writeS6Style(fillPath,'strokeDashoffset',String(1-fraction));
      }
      if (fillBar) {
        writeS6Style(fillBar,'transition','width 0.1s linear');
        writeS6Style(fillBar,'width',Math.max(0,curX)+'px');
      }

      // 當填滿條到達 step1, step2, step3 圓點時，圓點同步變為實心深咖啡色！
      if (dot1) {
        if (curX >= step1 - 2) dot1.classList.add('filled');
        else dot1.classList.remove('filled');
      }
      if (dot2) {
        if (curX >= step2 - 2) dot2.classList.add('filled');
        else dot2.classList.remove('filled');
      }
      if (dot3) {
        if (curX >= step3 - 2) dot3.classList.add('filled');
        else dot3.classList.remove('filled');
      }

      // 方案 B：同層接棒 (progress 0.83 ~ 1.00 直接自進度線順滑畫出右側大半圓)
      let batonT = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));
      if (batonArc) {
        // Both layers meet at the same current third-dot coordinate.
        const tailD=(window.fpS6ConnectionD||batonArc.getAttribute('d')).replace(/^M\s+[-\d.]+\s+[-\d.]+/, 'M '+step3+' '+numVar('--s6-h-y',855));
        if(batonArc.getAttribute('d')!==tailD)batonArc.setAttribute('d',tailD);
        writeS6Style(batonArc,'visibility',batonT>0?'visible':'hidden');
        writeS6Style(batonArc,'strokeDashoffset',(1-batonT).toFixed(4));
      }
      const s7Arc = document.querySelector('path[data-k="s7-arc1"]');
      if (s7Arc) {
        s7Arc.style.strokeDashoffset = (1 - batonT).toFixed(4);
      }

      // 3. 虛線動態插值
      if(!window.fpTabletOpticsUpdate){
      const p = window.sec6RayParams || {
        p1: { lx1: 242, ly1: 62, lx2: 188, ly2: 452, rx1: 249, ry1: 56, rx2: 549, ry2: 446 },
        p2: { lx1: 242, ly1: 63, lx2: 450, ly2: 578, rx1: 253, ry1: 56, rx2: 725, ry2: 371 },
        p3: { lx1: 247, ly1: 63, lx2: 761, ly2: 639, rx1: 252, ry1: 55, rx2: 1060, ry2: 382 }
      };

      let curLX1, curLY1, curLX2, curLY2, curRX1, curRY1, curRX2, curRY2;

      if (progress <= 0.20) {
        const shootT = Math.min(1, Math.max(0, progress / 0.15));
        curLX1 = p.p1.lx1;
        curLY1 = p.p1.ly1;
        curLX2 = p.p1.lx1 + shootT * (p.p1.lx2 - p.p1.lx1);
        curLY2 = p.p1.ly1 + shootT * (p.p1.ly2 - p.p1.ly1);

        curRX1 = p.p1.rx1;
        curRY1 = p.p1.ry1;
        curRX2 = p.p1.rx1 + shootT * (p.p1.rx2 - p.p1.rx1);
        curRY2 = p.p1.ry1 + shootT * (p.p1.ry2 - p.p1.ry1);
      } else if (progress <= 0.30) {
        const t = (progress - 0.20) / 0.10;
        curLX1 = p.p1.lx1 + t * (p.p2.lx1 - p.p1.lx1);
        curLY1 = p.p1.ly1 + t * (p.p2.ly1 - p.p1.ly1);
        curLX2 = p.p1.lx2 + t * (p.p2.lx2 - p.p1.lx2);
        curLY2 = p.p1.ly2 + t * (p.p2.ly2 - p.p1.ly2);

        curRX1 = p.p2.rx1 + t * (p.p3.rx1 - p.p2.rx1);
        curRY1 = p.p2.ry1 + t * (p.p3.ry1 - p.p2.ry1);
        curRX2 = p.p2.rx2 + t * (p.p3.rx2 - p.p2.rx2);
        curRY2 = p.p2.ry2 + t * (p.p3.ry2 - p.p2.ry2);
      } else if (progress <= 0.45) {
        curLX1 = p.p2.lx1; curLY1 = p.p2.ly1; curLX2 = p.p2.lx2; curLY2 = p.p2.ly2;
        curRX1 = p.p2.rx1; curRY1 = p.p2.ry1; curRX2 = p.p2.rx2; curRY2 = p.p2.ry2;
      } else if (progress <= 0.55) {
        const t = (progress - 0.45) / 0.10;
        curLX1 = p.p2.lx1 + t * (p.p3.lx1 - p.p2.lx1);
        curLY1 = p.p2.ly1 + t * (p.p3.ly1 - p.p2.ly1);
        curLX2 = p.p2.lx2 + t * (p.p3.lx2 - p.p2.lx2);
        curLY2 = p.p2.ly2 + t * (p.p3.ly2 - p.p2.ly2);

        curRX1 = p.p2.rx1 + t * (p.p3.rx1 - p.p2.rx1);
        curRY1 = p.p2.ry1 + t * (p.p3.ry1 - p.p2.ry1);
        curRX2 = p.p2.rx2 + t * (p.p3.rx2 - p.p2.rx2);
        curRY2 = p.p2.ry2 + t * (p.p3.ry2 - p.p2.ry2);
      } else {
        curLX1 = p.p3.lx1; curLY1 = p.p3.ly1; curLX2 = p.p3.lx2; curLY2 = p.p3.ly2;
        curRX1 = p.p3.rx1; curRY1 = p.p3.ry1; curRX2 = p.p3.rx2; curRY2 = p.p3.ry2;
      }

      if (rayLeft && !window.fpTabletOpticsUpdate) {
        rayLeft.setAttribute('x1', curLX1);
        rayLeft.setAttribute('y1', curLY1);
        rayLeft.setAttribute('x2', curLX2);
        rayLeft.setAttribute('y2', curLY2);
      }
      if (rayRight && !window.fpTabletOpticsUpdate) {
        rayRight.setAttribute('x1', curRX1);
        rayRight.setAttribute('y1', curRY1);
        rayRight.setAttribute('x2', curRX2);
        rayRight.setAttribute('y2', curRY2);
      }

      }

      // 4. 圓圈大小切換與內容對齊更新 Phase 0, 1, 2
      let newPhase = 0;
      if (progress > 0.20 && progress <= 0.45) newPhase = 1;
      else if (progress > 0.45) newPhase = 2;

      updateDesktopPhase(newPhase);
      window.fpTabletOpticsUpdate?.();
    }

    // 綁定節點圓點與卡片點擊事件 (支援點擊直達特定步驟)
    const dot1El = document.getElementById('sec6-d-dot-1');
    const dot2El = document.getElementById('sec6-d-dot-2');
    const dot3El = document.getElementById('sec6-d-dot-3');

    if (dot1El) dot1El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(0); });
    if (dot2El) dot2El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(1); });
    if (dot3El) dot3El.addEventListener('click', (e) => { e.stopPropagation(); goToStep(2); });

    const card1El = document.getElementById('sec6-d-circle-1');
    const card2El = document.getElementById('sec6-d-circle-2');
    const card3El = document.getElementById('sec6-d-circle-3');

    if (card1El) card1El.addEventListener('click', () => goToStep(0));
    if (card2El) card2El.addEventListener('click', () => goToStep(1));
    if (card3El) card3El.addEventListener('click', () => goToStep(2));

    window.goToSec6Step = goToStep;

    // 5. 手機版卡片輪播點擊切換 (最新內文)
    const mobileData = window.FP_CONTENT_CONFIG.section6;

    let currentIndex = 0;

    let mobileFadeTimer,mobileOldLayers=[];
    function updateMobileCard(index) {
      clearTimeout(mobileFadeTimer);
      mobileOldLayers.forEach(el=>el.remove());mobileOldLayers=[];
      const numEl=document.getElementById('sec6-m-num'),titleEl=document.getElementById('sec6-m-title'),descEl=document.getElementById('sec6-m-desc'),imgEl=document.getElementById('sec6-m-img');
      if(!numEl||!titleEl||!descEl||!imgEl)return;
      const elements=[imgEl,descEl,numEl,titleEl],reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
      for(const el of elements){
        el.getAnimations().forEach(animation=>animation.cancel());el.style.opacity='1';
        if(reduced)continue;
        const old=el.cloneNode(true),computed=getComputedStyle(el);
        old.removeAttribute('id');old.removeAttribute('data-page-asset');old.setAttribute('aria-hidden','true');
        for(const property of computed)old.style.setProperty(property,computed.getPropertyValue(property));
        Object.assign(old.style,{position:'absolute',left:el.offsetLeft+'px',top:el.offsetTop+'px',width:el.offsetWidth+'px',height:el.offsetHeight+'px',margin:'0',opacity:'1',pointerEvents:'none',transition:'none'});
        el.parentElement.append(old);mobileOldLayers.push(old);
      }
      numEl.textContent=mobileData[index].num;titleEl.textContent=mobileData[index].title;descEl.textContent=mobileData[index].desc;imgEl.src=mobileData[index].img;imgEl.alt=mobileData[index].alt;
      if(reduced)return;
      for(const el of elements)el.animate([{opacity:0},{opacity:1}],{duration:500,easing:'ease',fill:'none'});
      for(const el of mobileOldLayers)el.animate([{opacity:1},{opacity:0}],{duration:500,easing:'ease',fill:'forwards'});
      mobileFadeTimer=setTimeout(()=>{mobileOldLayers.forEach(el=>el.remove());mobileOldLayers=[];},500);
    }

    const btnLeft = document.getElementById('sec6-m-btn-left');
    const btnRight = document.getElementById('sec6-m-btn-right');

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mobileData.length) % mobileData.length;
        updateMobileCard(currentIndex);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mobileData.length;
        updateMobileCard(currentIndex);
      });
    }

    window.addEventListener('resize', handleSec6Resize);
    let s6ScrollFrame=false;
    window.addEventListener('scroll',()=>{
      if(s6ScrollFrame)return;
      s6ScrollFrame=true;
      requestAnimationFrame(()=>{s6ScrollFrame=false;handleSec6Scroll();});
    },{passive:true});
    window.handleSec6Scroll = handleSec6Scroll;

    handleSec6Resize();
    handleSec6Scroll();
  })();

;

;/* inline-script-019.js */

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
    window.addEventListener('fp:webflow-ready', handleSec7Resize);
    handleSec7Resize();
  })();

;

;/* inline-script-020.js */

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

;

;/* inline-script-021.js */


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
    var seatFrame=false,seatTimer;
    function placeSoon() {
      if(seatFrame)return;
      seatFrame=true;
      requestAnimationFrame(function(){seatFrame=false;placeSeatLine();});
      clearTimeout(seatTimer);seatTimer=setTimeout(placeSeatLine,200);
    }
    window.addEventListener('resize', placeSoon);
    window.addEventListener('fp:webflow-ready', function () { placeSoon(); setTimeout(placeSeatLine, 1000); });
    document.addEventListener('fp:webflow-ready', placeSoon);
    var root = document.getElementById('fp-master-root');
    if (root && 'MutationObserver' in window) {
      new MutationObserver(placeSoon).observe(root, { attributes: true, attributeFilter: ['class'] });
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


;

;/* page-runtime.js */
(() => {
  const root = document.getElementById('fp-master-root');
  if (!root) return;
  // Local custom-property declarations override inheritance from the page root.
  const owners = new Map();
  const pencilFloods=[...document.querySelectorAll('feFlood')].filter(e=>/^rgba\(255,\s*255,\s*255/.test(e.getAttribute('flood-color')||''));
  function collect(rules) {
    for (const rule of rules) {
      if (rule.cssRules) collect(rule.cssRules);
      if (!rule.style || !rule.selectorText) continue;
      for (const name of rule.style) {
        if (!name.startsWith('--')) continue;
        let elements;
        try { elements=document.querySelectorAll(rule.selectorText); } catch { continue; }
        const set=owners.get(name)||new Set();
        for(const element of elements) if(element===root||root.contains(element))set.add(element);
        owners.set(name,set);
      }
    }
  }
  for(const sheet of document.styleSheets)try{collect(sheet.cssRules)}catch{}
  const apply = values => {
    window.FP_PAGE_CONFIG = {...window.FP_PAGE_CONFIG, ...values};
    for (const [name, value] of Object.entries(values || {})) {
      if (/^--[\w-]+$/.test(name)) {
        root.style.setProperty(name, String(value));
        for(const element of owners.get(name)||[]) element.style.setProperty(name,String(value));
      }
    }
    window.fpLinesUpdate?.();
    window.fpTabletLayoutUpdate?.();window.fpMobileLayoutUpdate?.();window.fpS6AlignStage?.();
    updateTabletText();
    updateNoise();
    for(const flood of pencilFloods)flood.setAttribute('flood-color',window.FP_PAGE_CONFIG['--brand-line-flood']);
    const y=window.FP_PAGE_CONFIG['--s6-h-y'];
    for(const id of ['sec6-d-dot-1','sec6-d-dot-2','sec6-d-dot-3'])document.getElementById(id)?.style.setProperty('top',y);
    window.handleSec6Scroll?.();
  };
  function updateTabletText(){
    const tablet=window.innerWidth>=768&&window.innerWidth<1200;
    const canvas=document.getElementById('wf-sec8-canvas');
    if(!canvas)return;
    for(const part of ['sub','cat','line','title','desc'])for(const axis of ['x','y',...(part==='desc'?['w']:[])]){
      const key='--s8-'+part+'-'+axis;
      canvas.style.setProperty(key,window.FP_PAGE_CONFIG[tablet?'--s8-tab-'+part+'-'+axis:key]||'0px');
    }
  }
  function updateNoise(){
    const freq=window.FP_PAGE_CONFIG['--s4-noise-freq'];
    const opacity=window.FP_PAGE_CONFIG['--s4-noise-opacity'];
    document.getElementById('s4-noise-turb')?.setAttribute('baseFrequency',freq+' '+freq);
    const flood=document.getElementById('s4-noise-flood');
    if(flood){flood.setAttribute('flood-color','rgb(157,157,157)');flood.setAttribute('flood-opacity',opacity);}
  }
  window.addEventListener('resize',updateTabletText);
  apply(window.FP_PAGE_CONFIG);
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.data?.type !== 'fp:config') return;
    if (event.origin !== location.origin) return;
    apply(event.data.values);
  });
  document.fonts?.ready.then(() => {
    window.fpTabletLayoutUpdate?.();window.fpMobileLayoutUpdate?.();window.fpS6AlignStage?.();
    window.fpLinesUpdate?.();
  });
})();

;

;/* s2-layout.js */
(() => {
  const root = document.getElementById('fp-master-root');
  const one = document.getElementById('s2p1-root-container');
  const two = document.getElementById('s2p2-root-container');
  if (!root || !one || !two) return;
  const wrap1 = one.closest('.fp-s2p1-wrapper'), wrap2 = two.closest('.fp-s2p2-wrapper');
  const keys=['--s2p1-arc1-x','--s2p1-arc1-y','--s2p1-arc2-x','--s2p1-arc2-y','--s2p1-h1-start','--s2p1-h1-end','--s2p1-h1-y','--s2p2-h1-end','--s2p2-h2-end'];
  const initial={...window.FP_PAGE_CONFIG,
    '--s2p1-x':'10px','--s2p2-x':'108px','--s2p2-y':'-47px',
    '--s2p1-tab-x':'-18px','--s2p2-tab-x':'100px','--s2p2-tab-y':'-38px',
    '--s2p1-mb-x':'0px','--s2p2-mb-x':'0px','--s2p2-mb-y':'-180px',
    '--s2p1-arc1-x':'0px','--s2p1-arc1-y':'0px','--s2p1-arc2-x':'0px','--s2p1-arc2-y':'0px',
    '--s2p1-h1-start':'309.66px','--s2p1-h1-end':'1039.92px','--s2p1-h1-y':'227.9px',
    '--s2p2-h1-end':'798.16px','--s2p2-h2-end':'794.7px'};
  let scheduled=false;
  function update(){
    scheduled=false;
    if(innerWidth<1200)return;
    const baseline=Object.fromEntries(keys.map(k=>[k,window.FP_PAGE_CONFIG[k]]));
    const w=window.innerWidth;
    const mobile=w<768, tablet=w>=768&&w<1200;
    const basis=mobile?402:tablet?1024:1440;
    const scale=Math.min(1,w/basis);
    root.style.setProperty('--s2-layout-scale',scale);
    const localX=mobile?26:tablet?70:125+(w-1440)/2;
    const nextX=mobile?53:tablet?226:311+(w-1440)/2;
    const chosenX=mobile?localX:tablet?70:localX;
    const suffix=mobile?'-mb':tablet?'-tab':'';
    const val=k=>parseFloat(window.FP_PAGE_CONFIG[k])||0;
    const delta=k=>val(k)-(parseFloat(initial[k])||0);
    const x1=chosenX* (w<basis?scale:1)+delta('--s2p1'+suffix+'-x'),x2=nextX*(w<basis?scale:1)+delta('--s2p2'+suffix+'-x');
    const canvas1=one.querySelector(mobile?'.s2p1-mb-container':'.s2p1-dt-container');
    const canvas2=two.querySelector(mobile?'.s2p2-mb-layer':'.s2p2-dt-layer');
    const wr1=wrap1.getBoundingClientRect(),wr2=wrap2.getBoundingClientRect();
    one.style.height=((mobile?504:tablet?744:739)*scale)+'px';
    two.style.height=((mobile?601:tablet?603:650)*scale)+'px';
    wrap2.style.marginTop=(delta('--s2p2'+suffix+'-y')+val('--s2p2'+suffix+'-mt'))+'px';
    wrap1.style.marginBottom=val('--s2p1'+suffix+'-mb')+'px';
    canvas1.style.left=(x1-one.getBoundingClientRect().left-window.scrollX)+'px';
    canvas2.style.left=(x2-two.getBoundingClientRect().left-window.scrollX)+'px';
    const values={...baseline,...(tablet?{'--s2p1-arc1-x':'-231px','--s2p1-arc1-y':'-5.9px','--s2p1-arc2-x':'5.34px','--s2p1-arc2-y':'-5.9px','--s2p1-h1-start':'315px','--s2p1-h1-end':'809px','--s2p1-h1-y':'222px','--s2p2-h1-end':'519.16px','--s2p2-h2-end':'519.16px'}:{})};
    for(const [k,v] of Object.entries(values))if(v!=null){
      const adjusted=tablet?(parseFloat(v)+delta(k))+'px':v;
      root.style.setProperty(k,adjusted);
    }
    root.dataset.s2Layout=mobile?'mobile':tablet?'tablet':'desktop';
    window.fpLinesUpdate?.();
  }
  function soon(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
  window.addEventListener('resize',soon);
  window.addEventListener('fp:webflow-ready',soon);
  document.fonts?.ready.then(soon);
  soon();
})();

;

;/* people-controls.js */
(() => {
  const definitions=[
    ['s1','區塊 1｜站立小人','.s1-dt-container .s1-figure-man-body','.s1-dt-container .s1-figure-man-shadow','.s1-mb-container .s1-figure-man-body','.s1-mb-container .s1-figure-man-shadow'],
    ['s2p1','區塊 2 Part 1｜弧線上小人','.s2p1-dt-container .figure-woman-body','.s2p1-dt-container .figure-woman-shadow','.s2p1-mb-container .figure-woman-body','.s2p1-mb-container .figure-woman-shadow'],
    ['s2p2','區塊 2 Part 2｜檢驗小人','.s2p2-figure-body','.s2p2-shadow-wrapper','.s2p2-mb-figure','.s2p2-mb-shadow'],
    ['s2p34man','區塊 2 Part 3–4｜左側小人','.s2p34-man-body','.s2p34-man-shadow','.s2p34-mb-man-body','.s2p34-mb-man-shadow'],
    ['s2p34woman','區塊 2 Part 3–4｜右側小人','.s2p34-woman-body','.s2p34-woman-shadow',null,null],
    ['s4','區塊 4｜拉線小人','.s4-top-line','.s4-top-man','.s4-top-line','.s4-top-man'],
    ['s6','區塊 6｜坐姿手電筒小人','.wf-sec6-asset-tag',null,'.wf-sec6-m-asset-tag',null],
    ['s7','區塊 7｜推球小人','.wf-sec7-man-push','.wf-sec7-man-shadow','.wf-sec7-m-man-push','.wf-sec7-m-man-shadow'],
    ['s8seat','區塊 8｜圓圈上坐姿小人','.wf-sec8-man-3','.wf-sec8-shadow-3','.wf-sec8-mob-man-3','.wf-sec8-mob-shadow-3'],
    ['s8walk','區塊 8｜走路小人','.wf-sec8-man-2','.wf-sec8-shadow-2','.wf-sec8-mob-man-2','.wf-sec8-mob-shadow-2'],
    ['s8family','區塊 8｜媽媽與孩子','.wf-sec8-man-1','.wf-sec8-shadow-1','.wf-sec8-mob-man-1','.wf-sec8-mob-shadow-1']
  ];
  const labels={}, defaults={}, registrations=[];
  for(const [id,title,db,ds,mb,ms] of definitions)for(const [device,body,shadow] of [['d',db,ds],['t',db,ds],['m',mb,ms]]){
    if(!body)continue;
    const prefix='--person-'+id+'-'+device+'-';
    const add=(part,key,value,label,help)=>{const name=prefix+part+'-'+key;defaults[name]=value;labels[name]={name,section:title,device:device==='d'?'桌面':device==='t'?'平板':'手機',title:label,help};};
    for(const part of ['group','body',...(shadow?['shadow']:[])]){
      const target={group:'人物＋陰影整組',body:'人物本體',shadow:'陰影'}[part];
      add(part,'x','0px',target+'・左右位移','單位 px；正值向右，負值向左，基於目前位置加減。');
      add(part,'y','0px',target+'・上下位移','單位 px；正值向下，負值向上，基於目前位置加減。');
      add(part,'scale','1',target+'・大小倍率','1 是目前大小，1.2 是放大 20%；整組以人物腳部為中心縮放。');
    }
    if(shadow){
      add('shadow','rotate','0deg','陰影・追加旋轉','單位 deg；基於目前陰影方向調整。');
      add('shadow','skew','0deg','陰影・追加傾斜','單位 deg；可調整投影傾斜方向。');
      add('shadow','opacity','1','陰影・透明度倍率','0 是完全透明，1 保留原透明度。');
      add('shadow','blur','0px','陰影・追加模糊','單位 px；在原有模糊質感上增加，0 保留原效果。');
    }
    registrations.push({prefix,body,shadow,device,shared:db===mb});
  }
  window.FP_PEOPLE_DEFAULTS=defaults;window.FP_PEOPLE_LABELS=labels;
  if(!document.getElementById('fp-master-root'))return;
  const items=[];
  for(const item of registrations){
    const body=document.querySelector(item.body),shadow=item.shadow&&document.querySelector(item.shadow);
    if(!body)continue;
    const filter=shadow?getComputedStyle(shadow).filter:'none';const shadowTransform=shadow?getComputedStyle(shadow).transform:'none';
    const origin=getComputedStyle(body).transformOrigin.split(' ').map(parseFloat);
    const shadowOrigin=shadow?getComputedStyle(shadow).transformOrigin.split(' ').map(parseFloat):[0,0];
    items.push({...item,body,shadow,filter,shadowTransform,origin,shadowOrigin});
  }
  function update(){
    const config=window.FP_PAGE_CONFIG||{};
    const num=(p,k,fallback=0)=>{const n=parseFloat(config[p+k]??defaults[p+k]);return Number.isFinite(n)?n:fallback;};
    for(const {prefix:p,body,shadow,filter,shadowTransform,origin,shadowOrigin,shared,device} of items){
      if(device!==(innerWidth<768?'m':innerWidth<1200?'t':'d'))continue;
      const gx=num(p,'group-x'),gy=num(p,'group-y'),gs=num(p,'group-scale',1);
      const size=gs*num(p,'body-scale',1);
      body.style.translate=(gx+num(p,'body-x')+(1-size)*(body.offsetWidth/2-origin[0]))+'px '+(gy+num(p,'body-y')+(1-size)*(body.offsetHeight-origin[1]))+'px';
      body.style.setProperty('translate',body.style.translate,device==='t'?'important':'');body.style.setProperty('scale',String(size),device==='t'?'important':'');
      if(p==='--person-s6-t-'||p==='--person-s6-d-'){const lamp=document.getElementById('sec6-d-flashlight-icon');if(lamp){lamp.style.setProperty('translate',body.style.translate,device==='t'?'important':'');lamp.style.setProperty('scale',String(size),device==='t'?'important':'');}}
      if(p==='--person-s6-m-'){const lamp=document.getElementById('sec6-m-flashlight');if(lamp){const xy=body.style.translate.split(' ').map(parseFloat);lamp.style.translate=(xy[0]+(parseFloat(config['--s6-mb-lamp-x'])||0))+'px '+(xy[1]+(parseFloat(config['--s6-mb-lamp-y'])||0))+'px';lamp.style.scale=size;}}
      if(shadow){
        // Move the shadow around the body's foot when scaling the whole pair.
        // Base layout boxes stay independent of animation transforms.
        const anchorX=body.offsetLeft+body.offsetWidth/2,anchorY=body.offsetTop+body.offsetHeight;
        const sx=gx+num(p,'shadow-x')+(gs-1)*(shadow.offsetLeft+shadowOrigin[0]-anchorX);
        const sy=gy+num(p,'shadow-y')+(gs-1)*(shadow.offsetTop+shadowOrigin[1]-anchorY);
        shadow.style.setProperty('translate',sx+'px '+sy+'px',device==='t'?'important':'');shadow.style.setProperty('scale',String(gs*num(p,'shadow-scale',1)),device==='t'?'important':'');
        const rotation=num(p,'shadow-rotate'),skew=num(p,'shadow-skew');if(rotation||skew){shadow.style.setProperty('transform',(shadowTransform==='none'?'':shadowTransform+' ')+`rotate(${rotation}deg) skewX(${skew}deg)`,'important');shadow.dataset.personTransform='1';}else if(shadow.dataset.personTransform){shadow.style.removeProperty('transform');delete shadow.dataset.personTransform;}
        shadow.style.setProperty('filter',(filter==='none'?'':filter+' ')+'opacity('+num(p,'shadow-opacity',1)+') blur('+Math.max(0,num(p,'shadow-blur'))+'px)',device==='t'?'important':'');
      }
    }
  }
  window.addEventListener('resize',update);window.addEventListener('fp:webflow-ready',update);update();
})();

;

;/* section7-mobile-fix.js */
(() => {
  const root=document.getElementById('wf-sec7-root');
  const path=root?.querySelector('.wf-sec7-m-vector-svg path');
  if(!path)return;
  // Keep the original supplied path; restore the mobile drawing after a mode switch.
  let previous=window.innerWidth<768;
  function sync(){
    const mobile=window.innerWidth<768;
    if(mobile&&root.classList.contains('wf-sec7-active')){
      path.style.strokeDasharray=String(path.getTotalLength());
      path.style.strokeDashoffset='0';
    }
    if(mobile!==previous){previous=mobile;if(mobile&&root.classList.contains('wf-sec7-active'))window.replaySec7Animation?.();}
  }
  window.addEventListener('resize',sync);
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['class']});
  sync();
})();

;

;/* s6-anchor-sync.js */
(function(){
  let until=0, pending=false;
  function tick(){
    if(window.fpLinesUpdate)window.fpLinesUpdate();
    if(window.fpS6AlignStage)window.fpS6AlignStage();
    if(performance.now()<until)requestAnimationFrame(tick);else pending=false;
  }
  function sync(){until=performance.now()+900;if(!pending){pending=true;requestAnimationFrame(tick);}}
  document.querySelectorAll('[id^="sec6-d-circle-"]').forEach(circle=>{
    circle.addEventListener('transitionrun',sync);
    circle.addEventListener('transitionend',sync);
    new MutationObserver(sync).observe(circle,{attributes:true,attributeFilter:['style']});
  });
  window.addEventListener('resize',sync);
  window.addEventListener('fp:webflow-ready',sync);
  sync();
})();

;

;/* s6-s7-connection.js */
// Build viewport SVG coordinates from the rendered SVG box. WebKit versions
// can omit ancestor CSS transforms from getScreenCTM(). Keep native CTMs for
// internal SVG transforms, and replace only the outer viewport mapping.
window.fpSvgScreenMatrix = function(el){
  const native=el.getScreenCTM();
  if(!native)return new DOMMatrix();
  let svg=el.tagName.toLowerCase()==='svg'?el:el.ownerSVGElement;
  while(svg?.ownerSVGElement)svg=svg.ownerSVGElement;
  if(!svg)return native;
  const base=svg.getScreenCTM(),box=svg.getBoundingClientRect(),vb=svg.viewBox.baseVal;
  if(!base||!box.width||!box.height||!vb.width||!vb.height)return native;
  let sx=box.width/vb.width,sy=box.height/vb.height,dx=0,dy=0;
  const aspect=svg.preserveAspectRatio.baseVal;
  if(aspect.align!==1){
    const factor=aspect.meetOrSlice===2?Math.max(sx,sy):Math.min(sx,sy);
    const alignment=aspect.align-2;
    dx=(box.width-vb.width*factor)*(alignment%3)/2;
    dy=(box.height-vb.height*factor)*Math.floor(alignment/3)/2;
    sx=sy=factor;
  }
  const viewport=new DOMMatrix([sx,0,0,sy,box.left+dx-vb.x*sx,box.top+dy-vb.y*sy]);
  const result=viewport.multiply(base.inverse()).multiply(native);
  // Legacy SVGPoint.matrixTransform requires an SVGMatrix on WebKit.
  const compatible=svg.createSVGMatrix();
  for(const key of ['a','b','c','d','e','f'])compatible[key]=result[key];
  return compatible;
};
// Match the screen-space weight of the surrounding brand rail, not its raw CSS width.
window.fpMatchS6Stroke = function(){
 if(innerWidth<1200)return;
 const root=document.getElementById('fp-master-root');
 const reference=root.querySelector('path[data-k="s2p1-h1"]');if(!reference)return;
 const scaleOf=path=>{
  const m=window.fpSvgScreenMatrix(path);
  return Math.abs(m.a*m.d-m.b*m.c)/(Math.hypot(m.a,m.b)||1);
 };
 const style=getComputedStyle(reference),referenceScale=scaleOf(reference);
 const width=parseFloat(style.strokeWidth)||3;
 const screenWidth=width*(style.vectorEffect==='non-scaling-stroke'?1:referenceScale);
 if(!Number.isFinite(screenWidth)||screenWidth<=0)return;
 root.querySelectorAll('.s6-seat-holder svg path.fp-seg,.fp-s6-track path').forEach(path=>{
  const scale=scaleOf(path);if(!Number.isFinite(scale)||scale<=0)return;
  const value=(screenWidth/scale).toFixed(5)+'px';
  if(path.style.getPropertyValue('--s6-matched-stroke')!==value)path.style.setProperty('--s6-matched-stroke',value);
 });
};
window.fpScreenLeft = svg => Math.floor(new DOMPoint(-2,0).matrixTransform(window.fpSvgScreenMatrix(svg).inverse()).x);
(function(){
  const root=document.getElementById('fp-master-root');
  const originals=new WeakMap();let queued=false,applying=false,sizeCache=null;
  const measure=document.createElement('div');measure.setAttribute('aria-hidden','true');document.body.append(measure);
  function layout(){
    queued=false;if(innerWidth<1200){
      document.getElementById('wf-sec7-canvas').style.removeProperty('left');
      const compact=document.getElementById('wf-sec8-canvas');
      if(compact.dataset.compact){
        delete compact.dataset.compact;for(const prop of ['height','left','top'])compact.style.removeProperty(prop);
        document.getElementById('wf-sec8-desktop-outer').style.removeProperty('height');
        compact.querySelectorAll('.wf-sec8-subtitle,.wf-sec8-category-title,.wf-sec8-main-title,.wf-sec8-description,.wf-sec8-vert-line,.wf-sec8-circles-block,.wf-sec8-man3-group,.wf-sec8-man1-group,.wf-sec8-man2-group,.wf-sec8-circle-text,.wf-sec8-shadow-1,.wf-sec8-shadow-2').forEach(el=>{for(const prop of ['position','left','top','height','transform','transform-origin','translate','scale','font-size'])el.style.removeProperty(prop);});
        compact.querySelector('path[data-k="s8-arc3"]')?.removeAttribute('transform');
      }
      [7,8].forEach(n=>{const canvas=document.getElementById('wf-sec'+n+'-canvas');for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])canvas.style.removeProperty(key);});return;
    }
    applying=true;
    if(window.fpLinesUpdate)window.fpLinesUpdate();
    const cs=getComputedStyle(root),s6=document.getElementById('wf-sec6-canvas');
    let shared=1;
    const headerHeight=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
    const set=(key,value)=>{if(root.style.getPropertyValue(key)!==value)root.style.setProperty(key,value);};
    const compact=innerWidth<1600&&innerHeight<=900;
    root.dataset.s6Compact=compact?'1':'0';
    const activeTop=compact?290:368,railY=compact?766:(parseFloat(window.FP_PAGE_CONFIG?.['--s6-h-y'])||855);
    set('--s6-desktop-beam-shorten','0px');set('--s6-h-y',railY+'px');
    set('--s6-desktop-active-top',activeTop+'px');set('--s6-desktop-small-top',(activeTop+172.2)+'px');
    set('--s6-desktop-desc-width',compact?'440px':'320px');
    const available=Math.max(240,innerHeight-headerHeight-48);
    let stageHeight=compact?840:1010,scale=Math.min(1,innerWidth*.95/1221,available/stageHeight);
    const description=document.getElementById('sec6-d-desc'),header=document.getElementById('sec6-d-header-group');
    const finalText=window.FP_CONTENT_CONFIG?.section6?.[2]?.desc||description.textContent;
    const sizeKey=[innerWidth,innerHeight,headerHeight,finalText,compact,railY].join('|');
    if(sizeCache?.key===sizeKey){stageHeight=sizeCache.height;scale=sizeCache.scale;}else{
    measure.textContent=finalText;
    for(let pass=0;pass<4;pass++){
      set('--s6-desktop-scale',String(scale));set('--s6-desktop-font-factor',String(1/scale));
      const textStyle=getComputedStyle(description);
      Object.assign(measure.style,{position:'fixed',left:'-10000px',top:'0',visibility:'hidden',width:description.offsetWidth+'px',fontFamily:textStyle.fontFamily,fontSize:textStyle.fontSize,fontWeight:textStyle.fontWeight,lineHeight:textStyle.lineHeight,letterSpacing:textStyle.letterSpacing,whiteSpace:'normal',padding:'0',margin:'0'});
      stageHeight=Math.max(compact?760:936,railY+28+measure.offsetHeight+24/scale);
      scale=Math.min(1,innerWidth*.95/1221,available/stageHeight);
    }
    sizeCache={key:sizeKey,height:stageHeight,scale};
    }
    shared=scale;set('--s6-desktop-scale',String(scale));set('--s6-desktop-font-factor',String(1/scale));
    set('--s6-desktop-stage-height',stageHeight+'px');
    set('--s6-desktop-header-top',(activeTop-20/scale-header.offsetHeight)+'px');
    const fixed7=document.getElementById('wf-sec7-canvas');
    fixed7.style.transform='none';document.getElementById('wf-sec7-desktop-outer').style.height='800px';
    for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])fixed7.style.removeProperty(key);
    fixed7.querySelectorAll('.wf-sec7-main-title,.wf-sec7-description,.wf-sec7-ball-text').forEach(el=>{for(const key of ['font-size','letter-spacing','line-height','width'])el.style.removeProperty(key);});
    const independent8=document.getElementById('wf-sec8-canvas');
    for(const key of ['--body-size','--quote-size','--label-cn-size','--label-en-size'])independent8.style.removeProperty(key);
    independent8.querySelectorAll('.wf-sec8-main-title,.wf-sec8-description,.wf-sec8-subtitle,.wf-sec8-category-title,.wf-sec8-circle-text').forEach(el=>{
      for(const key of ['font-size','letter-spacing','line-height','width'])el.style.removeProperty(key);
    });
    const scale8=1;
    independent8.style.transform='scale('+scale8+')';
    let compactHeight=Math.max(560,Math.min(850,innerHeight-headerHeight-24));
    const artScale=.9*Math.min(1,(compactHeight-120)/606);
    independent8.dataset.compact='1';
    independent8.style.height=compactHeight+'px';
    document.getElementById('wf-sec8-desktop-outer').style.height=compactHeight+'px';
    const put=(selector,property,value)=>independent8.querySelector(selector)?.style.setProperty(property,value,'important');
    put('.wf-sec8-subtitle','top','40px');
    put('.wf-sec8-category-title','top','68px');
    put('.wf-sec8-main-title','top','148px');
    const quote=independent8.querySelector('.wf-sec8-main-title');
    const description8=independent8.querySelector('.wf-sec8-description');
    // Keep the original column's x coordinates. Align the complete text
    // group's vertical centre with the three-circle composition's centre.
    const textTop=44;
    const descriptionTop=148+quote.offsetHeight+28;
    const textBottom=descriptionTop+description8.offsetHeight;
    const circleCenter=90+303*artScale;
    const textShift=circleCenter-(textTop+textBottom)/2;
    for(const [selector,left]of [['.wf-sec8-subtitle',70],['.wf-sec8-category-title',68],['.wf-sec8-vert-line',68],['.wf-sec8-main-title',96],['.wf-sec8-description',68]])put(selector,'left',left+'px');
    for(const [selector,top]of [['.wf-sec8-subtitle',textTop],['.wf-sec8-category-title',68],['.wf-sec8-main-title',148],['.wf-sec8-description',descriptionTop],['.wf-sec8-vert-line',137]])put(selector,'top',(top+textShift)+'px');
    put('.wf-sec8-vert-line','height',(quote.offsetHeight+22)+'px');
    // The family occupies 102px above the bottom rail. Let the section grow
    // with the measured copy instead of forcing it into one laptop viewport.
    const copyBottom=descriptionTop+textShift+description8.offsetHeight;
    compactHeight=Math.max(compactHeight,Math.ceil(copyBottom+36+102+52));
    independent8.style.height=compactHeight+'px';
    document.getElementById('wf-sec8-desktop-outer').style.height=compactHeight+'px';

    for(const selector of ['.wf-sec8-circles-block','.wf-sec8-man3-group']){
      // Separate layout from the entrance animation's transform property.
      put(selector,'transform','none');
      put(selector,'translate',`${786.5*(1-artScale)}px ${90-265*artScale}px`);
      put(selector,'scale',String(artScale));
      put(selector,'transform-origin','0 0');
    }
    independent8.querySelectorAll('.wf-sec8-circle-text').forEach(el=>el.style.setProperty('font-size',(18/artScale)+'px','important'));
    for(const [selector,bodySelector,shadowSelector]of [
      ['.wf-sec8-man1-group','.wf-sec8-man-1','.wf-sec8-shadow-1'],
      ['.wf-sec8-man2-group','.wf-sec8-man-2','.wf-sec8-shadow-2']
    ]){
      const body=independent8.querySelector(bodySelector);
      const foot=body.offsetTop+(parseFloat(getComputedStyle(body).height)||body.offsetHeight);
      // These groups were static-positioned: top had no effect. Translate
      // the pair by its actual foot, independently of the entrance transform.
      put(selector,'translate',`0px ${compactHeight-52-foot}px`);
      put(selector,'top','0px');
      // Preserve the original shadow's reflected geometry and its own anchor;
      // translating the pair already moves it by exactly the body's offset.
      independent8.querySelector(shadowSelector)?.style.removeProperty('top');
    }
    const arc=document.querySelector('#wf-sec7-canvas path[data-k="s7-arc1"]');
    const svg=document.querySelector('.fp-s6-track'),track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
    const canvas7=document.getElementById('wf-sec7-canvas');
    const outer7=document.getElementById('wf-sec7-desktop-outer');
    // Restore the measured base before calculating the natural (released) position.
    canvas7.style.setProperty('left','0px','important');canvas7.style.top='0px';outer7.style.marginTop='0px';
    arc.removeAttribute('transform');
    const release=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height;
    const delta=release-sticky.getBoundingClientRect().top;
    const x=parseFloat(cs.getPropertyValue('--s6-h4-end'))||1131.87;
    const y=parseFloat(cs.getPropertyValue('--s6-h-y'))||855;
    const target=new DOMPoint(x,y).matrixTransform(window.fpSvgScreenMatrix(svg));
    target.y+=delta;
    const first=arc.getPointAtLength(0).matrixTransform(window.fpSvgScreenMatrix(arc));
    // S6 can scale down while S7 retains native typography. Do not let the
    // S6 anchor pull S7's content past either viewport edge.
    const base7=canvas7.getBoundingClientRect();
    const title7=canvas7.querySelector('.wf-sec7-main-title'),desc7=canvas7.querySelector('.wf-sec7-description');
    const shiftX=el=>parseFloat(getComputedStyle(el).translate)||0;
    const balls=canvas7.querySelector('.wf-sec7-balls-container');
    const ballBounds=[...balls.querySelectorAll('.wf-sec7-ball')].map(ball=>{
      const left=balls.offsetLeft+ball.offsetLeft+shiftX(ball);
      return {left,right:left+ball.offsetWidth};
    });
    const contentLeft=Math.min(title7.offsetLeft+shiftX(title7),desc7.offsetLeft+shiftX(desc7),...ballBounds.map(b=>b.left));
    const contentRight=Math.max(title7.offsetLeft+shiftX(title7)+title7.offsetWidth,desc7.offsetLeft+shiftX(desc7)+desc7.offsetWidth,...ballBounds.map(b=>b.right));
    const parentScale7=base7.width/(canvas7.offsetWidth||base7.width)||1;
    const gutter=24,minimumLeft=gutter-contentLeft*parentScale7,maximumLeft=Math.max(minimumLeft,innerWidth-gutter-contentRight*parentScale7);
    const desiredLeft=base7.left+target.x-first.x;
    const fittedLeft=Math.max(minimumLeft,Math.min(maximumLeft,desiredLeft));
    canvas7.style.setProperty('left',((fittedLeft-base7.left)/parentScale7)+'px','important');
    canvas7.style.top=(target.y-first.y)+'px';
    // Own both sides of the join; the parameter renderer must not restore
    // the old rail endpoint after the responsive curve has moved.
    const arcRect=arc.getBoundingClientRect(),arcMatrix=window.fpSvgScreenMatrix(arc);
    const correction=Math.min(0,innerWidth-gutter-arcRect.right);
    if(correction<0)arc.setAttribute('transform',`translate(${correction/arcMatrix.a} 0)`);
    // Draw the released S6/S7 join in ONE SVG coordinate system.
    const baseline=canvas7.querySelector('path[data-k="s7-h1"]');
    const inverse6=window.fpSvgScreenMatrix(svg).inverse();
    // Original S7 two-quarter-circle geometry, translated without stretching.
    const circle2Element=canvas7.querySelector('.wf-sec7-ball-2');
    const circle2=circle2Element.getBoundingClientRect();
    const moveY=target.y+495-(circle2.top+circle2.height/2);
    const canvasTop=(parseFloat(canvas7.style.top)||0)+moveY;
    canvas7.style.top=canvasTop+'px';
    outer7.style.height=(800+Math.max(0,canvasTop))+'px';
    const alignedCircle=circle2Element.getBoundingClientRect();
    const destination=new DOMPoint(alignedCircle.right,alignedCircle.top+alignedCircle.height/2-delta).matrixTransform(inverse6);
    const screenRight=new DOMPoint(innerWidth-24,0).matrixTransform(inverse6).x;
    const end=window.fpS6Steps?.step3||930;
    const unit=1/shared,half=247.5*unit,reach=247.686*unit,control=136.793*unit;
    const turn=screenRight-reach;
    window.fpS6ConnectionD=`M ${end} ${y} H ${turn} C ${turn+control} ${y} ${turn+reach} ${y+110.81*unit} ${turn+reach} ${y+half} C ${turn+reach} ${y+384.19*unit} ${turn+control} ${y+495*unit} ${turn} ${y+495*unit} H ${destination.x}`;
    document.getElementById('sec6-d-baton-arc').setAttribute('d',window.fpS6ConnectionD);
    if(baseline){baseline.dataset.desktopSeam='1';baseline.setAttribute('d',`M ${destination.x} ${destination.y}`);}
    arc.setAttribute('aria-hidden','true');
    // Extend the initial rail using the same rendered SVG viewport.
    const firstRail=svg.querySelector('[data-fp-h="s6-h1"]');
    if(firstRail){
      const left=new DOMPoint(-2,0).matrixTransform(inverse6).x;
      const step1=window.fpS6Steps?.step1||parseFloat(cs.getPropertyValue('--s6-step1-x'))||283;
      firstRail.dataset.desktopSeam='1';firstRail.setAttribute('d',`M ${left} ${y} H ${step1}`);
    }
    // Keep S8's original entry arc attached to the lower circle in S7.
    const canvas8=document.getElementById('wf-sec8-canvas');
    const outer8=document.getElementById('wf-sec8-desktop-outer');
    const entry8=canvas8.querySelector('path[data-k="s8-arc1"]');
    const circle7=canvas7.querySelector('.wf-sec7-ball-4');
    if(entry8&&circle7){
      canvas8.style.left='0px';canvas8.style.top='0px';outer8.style.marginTop='0px';
      const compositionCenter=(68+786.5+123.5*artScale)/2;
      const centered=canvas8.getBoundingClientRect();canvas8.style.left=(innerWidth/2-centered.left-compositionCenter)+'px';
      const circleRect=circle7.getBoundingClientRect();
      const edge=new DOMPoint(circleRect.left+circleRect.width/2,circleRect.bottom);
      const topShift=edge.y+112.648-canvas8.getBoundingClientRect().top;
      canvas8.style.top=topShift+'px';
      outer8.style.height=(compactHeight+Math.max(0,topShift))+'px';
      const lines=canvas8.querySelector('.fp-s8-lines');
      const local=edge.matrixTransform(window.fpSvgScreenMatrix(lines).inverse());
      const bottom=compactHeight-52,right=1039.16,r=113,top=local.y+112.648;
      const draw=(key,d)=>{
        const path=canvas8.querySelector(`path[data-k="${key}"]`);
        path.removeAttribute('transform');
        path.parentElement.removeAttribute('transform');
        path.setAttribute('d',d);
      };
      draw('s8-arc1',`M ${local.x} ${local.y} C ${local.x} ${top} ${local.x+60} ${top} ${local.x+112.694} ${top}`);
      draw('s8-h1',`M ${local.x+112.694} ${top} H ${right-r}`);
      draw('s8-arc2',`M ${right-r} ${top} C ${right-50} ${top} ${right} ${top+50} ${right} ${top+r}`);
      draw('s8-v1',`M ${right} ${top+r} V ${bottom-r}`);
      draw('s8-arc3',`M ${right} ${bottom-r} C ${right} ${bottom-50} ${right-50} ${bottom} ${right-r} ${bottom}`);
      draw('s8-h2',`M ${right-r} ${bottom} H 33.5`);
    }
    const seatPath=root.querySelector('path[data-k="s5-h2"]'),seatArc=root.querySelector('path[data-k="s5-arc3"]');
    if(seatPath&&seatArc){
      const inverse=window.fpSvgScreenMatrix(seatPath).inverse();
      const from=seatArc.getPointAtLength(seatArc.getTotalLength()).matrixTransform(window.fpSvgScreenMatrix(seatArc)).matrixTransform(inverse);
      const edge=new DOMPoint(-2,0).matrixTransform(inverse);
      set('--s5-h2-start',edge.x+'px');set('--s5-h2-end',from.x+'px');
      seatPath.setAttribute('d',`M ${from.x} ${from.y} H ${edge.x}`);
      // Keep the line engine's local origin in sync; it otherwise redraws the
      // shortened line from the old 725.22px offset on the next update.
      seatPath.dataset.s=String(edge.x);seatPath.dataset.e=String(from.x);
      seatPath.dataset.oy=String((parseFloat(cs.getPropertyValue('--s5-h2-y'))||727.38)-from.y);
      seatPath.dataset.dir='rtl';
    }
    window.fpMatchS6Stroke();
    applying=false;
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(layout);}}
  const previousLines=window.fpLinesUpdate;
  if(previousLines)window.fpLinesUpdate=(...args)=>{const value=previousLines(...args);if(!applying&&innerWidth>=1200)schedule();return value;};
  window.addEventListener('resize',schedule);window.addEventListener('fp:webflow-ready',schedule);
  const anchorCircle=document.querySelector('#wf-sec7-canvas .wf-sec7-ball-4');
  // The circle's scale entrance changes its visual lower edge without a resize.
  // Re-anchor after that transition, rather than retaining the early 0.88 scale.
  anchorCircle?.addEventListener('transitionend',schedule);
  anchorCircle?.addEventListener('animationend',schedule);
  const section7=document.getElementById('wf-sec7-root');
  if(section7)new MutationObserver(()=>{schedule();setTimeout(schedule,2800);}).observe(section7,{attributes:true,attributeFilter:['class']});
  // This layout writes root variables itself; observing those writes caused
  // repeated measure/write cycles and competing line geometry on each frame.
  document.fonts.ready.then(()=>{sizeCache=null;schedule();});document.fonts.addEventListener?.('loadingdone',()=>{sizeCache=null;schedule();});schedule();
})();

;

;/* mobile-figma.js */
(function(){
 const root=document.getElementById('fp-master-root');
 const sections=[['sec1',29,166,347,361],['s2p1',26,478,363,504],['s2p2',53,982,318,601],['s2p34',23,1528,335,699],['sec4',-2,2227,402,820],['sec5',26,3047,380.5,789.38],['sec6',0,3799,402,613.626],['sec7',31,4287,346,717.983],['sec8',24,4961,346,1075.168]];
 const saved=new Map();let pending=false,active=false;
 sections.forEach(([id])=>{const el=document.querySelector('.fp-'+id+'-wrapper');saved.set(el,el.getAttribute('style'));});
 function layout(){
  pending=false;
  if(innerWidth>=768){if(active){root.style.removeProperty('height');for(const [el,style] of saved){if(style==null)el.removeAttribute('style');else el.setAttribute('style',style);}active=false;}return;}
  active=true;
  const scale=Math.min(1,innerWidth/402),origin=Math.max(0,(innerWidth-402*scale)/2),config=window.FP_PAGE_CONFIG||{};
  root.style.setProperty('--mobile-figma-scale',scale);
  const val=name=>parseFloat(config[name])||0;const firstScreenTop=Math.min(166*scale,Math.max(24,innerHeight-(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110)-361*scale));const firstScreenExtra=0;
  const s4=document.getElementById('s4-root-container');
  const extra=Math.max(0,s4.offsetHeight-820);
  sections.forEach(([id,x,y,w,h])=>{
   const el=document.querySelector('.fp-'+id+'-wrapper'),after=y>2227?extra:0;
   el.style.left=(origin+(x+val('--'+id+'-mb-x'))*scale)+'px';
   el.style.top=(firstScreenTop+(id==='sec1'?0:firstScreenExtra)+(y-166+after+val('--'+id+'-mb-y')+val('--'+id+'-mb-mt'))*scale)+'px';
   el.style.width=w+'px';el.style.height=h+'px';
  });
  root.style.height=(firstScreenTop+firstScreenExtra+(6036.168-166+extra)*scale)+'px';
  window.fpMobileConnectionsUpdate?.();
 }
 function soon(){if(!pending){pending=true;requestAnimationFrame(layout);}}
 window.fpMobileLayoutUpdate=soon;
 window.addEventListener('fp:webflow-ready',soon);window.addEventListener('resize',soon);document.fonts.ready.then(soon);
 new ResizeObserver(soon).observe(document.getElementById('s4-root-container'));
 soon();
})();

;

;/* mobile-line-fixes.js */
(function(){
 const root=document.getElementById('fp-master-root'),NS='http://www.w3.org/2000/svg';
 const make=(name,attrs)=>{const n=document.createElementNS(NS,name);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
 const overlays=new Map();
 const filterStyles=new Map();
 function restoreFilters(){for(const [el,[value,priority]]of filterStyles){if(value)el.style.setProperty('filter',value,priority);else el.style.removeProperty('filter');}filterStyles.clear();}
 function unfiltered(el){if(!filterStyles.has(el))filterStyles.set(el,[el.style.getPropertyValue('filter'),el.style.getPropertyPriority('filter')]);el.style.setProperty('filter','none','important');}
 function overlay(container){
  if(overlays.has(container))return overlays.get(container);
  const svg=make('svg',{class:'mobile-seams',viewBox:'0 0 402 900',width:402,height:900,'aria-hidden':'true'});
  const path=make('path',{class:'mobile-seam-path'});svg.append(path);container.append(svg);overlays.set(container,svg);return svg;
 }
 const scaler=document.getElementById('s5-mobile-scaler'),seams5=overlay(scaler);
 const mirrored5=document.createElement('div');mirrored5.className='s5-mobile-mirrored-lines';
 Object.assign(mirrored5.style,{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',pointerEvents:'none',transformOrigin:'0 0',overflow:'visible'});
 scaler.append(mirrored5);
 for(const selector of ['.s5-m-top-curve','.s5-m-top-arch','.s5-m-left-line','.s5-m-bottom-arc','.s5-m-bottom-line']){
  const line=scaler.querySelector(selector);if(line)mirrored5.append(line);
 }
 mirrored5.append(seams5);
 const p2=document.querySelector('.s2p2-mb-layer'),seams2=overlay(p2);
 const p34=document.querySelector('.s2p34-mb-canvas'),seams34=overlay(p34);
 const lineBox=document.querySelector('.wf-sec6-m-line-container');
 const track=make('svg',{class:'mobile-s6-track',viewBox:'0 0 402 10',width:402,height:10,'aria-hidden':'true'});
 track.innerHTML='<defs><filter id="mobileTrackPencil" filterUnits="userSpaceOnUse" x="-30" y="-20" width="500" height="50"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" seed="5976" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
 track.querySelector('defs').insertAdjacentHTML('beforeend','<filter id="mobileLinearPencil" filterUnits="userSpaceOnUse" x="-30" y="-30" width="1500" height="1500"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7"/></filter>');
 const group=make('g',{filter:'url(#mobileTrackPencil)'});
 const gray=make('path',{fill:'none',stroke:'#E0E0E0','stroke-linecap':'round'});
 const fill=make('path',{fill:'none',stroke:'var(--brand-line-color,#675D54)','stroke-linecap':'round',pathLength:1,'stroke-dasharray':1});
 fill.style.transition='stroke-dashoffset .35s ease';
 // Paint the dot outside the 10px SVG viewport; a centre at y=0 must not
 // lose its upper half to SVG clipping in Safari or embedded Webflow styles.
 const dot=document.createElement('span');dot.className='mobile-s6-node-dot';dot.setAttribute('aria-hidden','true');
 group.append(gray,fill);track.append(group);lineBox.append(track,dot);
 function local(svg,point){return point.matrixTransform(svg.getScreenCTM().inverse());}
 function end(path,last,svg){const point=path.getPointAtLength(last?path.getTotalLength():0).matrixTransform(path.getScreenCTM());return svg?local(svg,point):point;}
 function join(svg,pairs,maxGap=25){
  const d=[];
  for(const [a,b]of pairs){if(!a||!b)continue;let nearest=null;
   for(const ea of [0,1])for(const eb of [0,1]){const p=end(a,ea,svg),q=end(b,eb,svg),distance=Math.hypot(p.x-q.x,p.y-q.y);if(!nearest||distance<nearest.distance)nearest={p,q,distance};}
   if(nearest.distance<maxGap)d.push(`M ${nearest.p.x} ${nearest.p.y} L ${nearest.q.x} ${nearest.q.y}`);
  }
  svg.querySelector('path').setAttribute('d',d.join(' '));
 }
 // Paint each connected mobile flow in one SVG coordinate system. The
 // original segments remain measurement references, avoiding independent
 // SVG viewBox rounding and WebKit seams after breakpoint changes.
 function continuous(svg,paths){
  const inverse=svg.getScreenCTM().inverse();let previous=null;const commands=[];
  for(const source of paths){
   if(!source)continue;
   const length=source.getTotalLength(),count=Math.max(1,Math.ceil(length/2));
   let points=Array.from({length:count+1},(_,i)=>source.getPointAtLength(length*i/count).matrixTransform(source.getScreenCTM()).matrixTransform(inverse));
   if(previous){
    const distance=p=>Math.hypot(p.x-previous.x,p.y-previous.y);
    if(distance(points.at(-1))<distance(points[0]))points.reverse();
    const dx=previous.x-points[0].x,dy=previous.y-points[0].y;
    points=points.map(p=>({x:p.x+dx,y:p.y+dy}));
   }else if(points[0].y>points.at(-1).y)points.reverse();
   points.forEach((p,i)=>commands.push(`${!previous&&i===0?'M':'L'} ${p.x.toFixed(4)} ${p.y.toFixed(4)}`));
   previous=points.at(-1);source.classList.add('mobile-flow-reference');
  }
  const paint=svg.querySelector('path');paint.setAttribute('d',commands.join(' '));
  paint.classList.add('mobile-continuous-flow');paint.style.setProperty('opacity','1','important');
 }
 function widenFilters(){
  document.querySelectorAll('.s2p2-mb-layer .s2p2-line-svg filter,.s5-mobile-wrapper .s5-line-path filter').forEach(f=>{
   if(f.dataset.mobileExpanded)return;f.dataset.mobileExpanded='1';
   for(const [key,delta]of [['x',-4],['y',-4],['width',8],['height',8]]){const raw=f.getAttribute(key);if(raw&&/^[-\d.]+$/.test(raw))f.setAttribute(key,+raw+delta);}
  });
 }
 function update(){
  mirrored5.style.transform='none';
  if(innerWidth>=768){document.querySelector('.wf-sec7-m-vector-svg').setAttribute('viewBox','0 0 346 718');restoreFilters();return;}
  const cs=getComputedStyle(root),stroke=parseFloat(cs.getPropertyValue('--brand-line-mb-width'))||2;
  // Add paint padding without changing the path's displayed coordinates.
  document.querySelector('.wf-sec7-m-vector-svg').setAttribute('viewBox','-8 -8 362 734');
  gray.setAttribute('stroke-width',stroke);fill.setAttribute('stroke-width',stroke);
  const scale=Math.min(1,innerWidth/402);
  // Beam geometry remains fixed when the lamp or character is adjusted.
  const ray=document.querySelector('.wf-sec6-m-ray-svg');
  ray.querySelector('#sec6-ray-left').setAttribute('x1','250');
  ray.querySelector('#sec6-ray-right').setAttribute('x1','267');
  ray.querySelectorAll('line').forEach(line=>line.setAttribute('y1','-40'));
  // Solve tangency in normalized circle coordinates; keep both ray origins fixed.
  const circle=document.querySelector('.wf-sec6-m-circle-card').getBoundingClientRect();
  const cx=circle.left+circle.width/2,cy=circle.top+circle.height/2;
  const rx=circle.width/2,ry=circle.height/2;
  if(rx>0&&ry>0)for(const line of ray.querySelectorAll('line')){
   const start=new DOMPoint(+line.getAttribute('x1'),+line.getAttribute('y1')).matrixTransform(ray.getScreenCTM());
   const ux=(start.x-cx)/rx,uy=(start.y-cy)/ry,d2=ux*ux+uy*uy;
   if(d2<=1)continue;
   const k=Math.sqrt(d2-1)/d2;
   const candidates=[{x:ux/d2-uy*k,y:uy/d2+ux*k},{x:ux/d2+uy*k,y:uy/d2-ux*k}];
   const tangent=candidates.sort((a,b)=>a.x-b.x)[line.id==='sec6-ray-left'?0:1];
   const finish=local(ray,new DOMPoint(cx+rx*tangent.x,cy+ry*tangent.y));
   line.setAttribute('x2',finish.x);line.setAttribute('y2',finish.y);
  }
  // Extend S5's vertical segment; retain the original bottom arc shape.
  const body=document.getElementById('sec6-m-asset-tag'),br=body.getBoundingClientRect();
  const seat=local(seams5,new DOMPoint(br.left+br.width/2,br.top+br.height/2));
  const topCurve=scaler.querySelector('.s5-m-top-curve path'),arch=scaler.querySelector('.s5-m-top-arch'),archPath=arch.querySelector('path');
  arch.style.left='0px';arch.style.top='108px';
  const topEnd=end(topCurve,1,seams5),archStart=end(archPath,0,seams5);
  arch.style.left=(topEnd.x-archStart.x)+'px';arch.style.top=(108+topEnd.y-archStart.y)+'px';
  const archEnd=end(archPath,1,seams5);
  const bottom=scaler.querySelector('.s5-m-bottom-arc'),bottomPath=bottom.querySelector('path');bottom.style.top='690px';bottom.style.left='0px';
  const bottomStartX=end(bottomPath,0,seams5).x;bottom.style.left=(archEnd.x-bottomStartX)+'px';
  const before=end(bottomPath,1,seams5),shift=seat.y-before.y;bottom.style.top=(690+shift)+'px';
  const bottomStart=end(bottomPath,0,seams5),vertical=scaler.querySelector('.s5-m-left-line');
  const height=(bottomStart.y-archEnd.y)*477.66/476.5;
  vertical.style.height=height+'px';vertical.style.left=(archEnd.x-1.16)+'px';vertical.style.top=(archEnd.y-height*1.16/477.66)+'px';
  // The line layer is reflected below: solve its far endpoint before reflection
  // so the final, reflected seat line reaches the physical left viewport edge.
  const mirrorJoint=topCurve.getPointAtLength(0).matrixTransform(topCurve.getScreenCTM());
  const edge=local(seams5,new DOMPoint(2*mirrorJoint.x+2,br.top+br.height/2));
  const arcEnd=end(bottomPath,1,seams5),bar=scaler.querySelector('.s5-m-bottom-line'),inner=bar.firstElementChild,barSvg=inner.querySelector('svg'),barPath=barSvg.querySelector('path');
  const left=arcEnd.x-.66,width=Math.max(1,edge.x-left+.66);
  bar.style.left=left+'px';bar.style.top=(seat.y-1.16)+'px';bar.style.width=width+'px';inner.style.width=width+'px';
  const d=`M ${width-.66} 1.16 H 0.66`;
  if(barPath.getAttribute('d')!==d){const oldLen=barPath.getTotalLength(),offset=parseFloat(getComputedStyle(barPath).strokeDashoffset)||0;barSvg.setAttribute('viewBox',`0 0 ${width} 2.3698`);barPath.setAttribute('d',d);const len=barPath.getTotalLength();barPath.style.strokeDasharray=len;barPath.style.strokeDashoffset=oldLen?offset/oldLen*len:len;}
  const s5Paths=['.s5-m-top-curve','.s5-m-top-arch','.s5-m-left-line','.s5-m-bottom-arc','.s5-m-bottom-line'].map(s=>scaler.querySelector(s+' path'));
  join(seams5,s5Paths.slice(1).map((p,i)=>[s5Paths[i],p]));
  const s2Paths=['.s2p2-mb-vector-top','.s2p2-mb-arc-top','.s2p2-mb-line-vert','.s2p2-mb-arc-bottom'].map(selector=>p2.querySelector(selector+' path'));
  join(seams2,s2Paths.slice(1).map((p,i)=>[s2Paths[i],p]),100);
  // Fixed 402px design coordinates: no reflected SVG matrix is used to
  // determine the direction of the two right-hand bends on iOS WebKit.
  s2Paths.forEach(p=>p.classList.add('mobile-flow-reference'));
  const secondFlow=seams2.querySelector('path');
  secondFlow.classList.add('mobile-continuous-flow');
  secondFlow.setAttribute('d','M 46.222 1.1567 C 46.222 63.5666 96.8027 114.157 159.201 114.157 H 206.138 C 268.4766 114.157 317.5 164.8135 317.5 227.1521 V 489.1379 C 317.5 551.4765 266.8435 602.009 204.5049 602.009');
  secondFlow.style.setProperty('opacity','1','important');
  continuous(seams5,s5Paths);
  // Snap the next horizontal segment to the bottom arc in its own SVG coordinates.
  // Preserve the remaining curve and all content positions.
  const nextPath=p34.querySelector('#s2p34-mb-master-path');
  const arcExit=end(secondFlow,1);
  const connection=arcExit.matrixTransform(nextPath.getScreenCTM().inverse());
  const deltaY=connection.y-56.16;
  nextPath.setAttribute('d',`M ${connection.x} ${connection.y} H 134.60 C 69.93 ${56.21+deltaY} 21.16 104.98 21.16 165.16 V 547.50 C 21.16 590.85 55.32 625.05 97.46 625.05 H 134.85 C 176.99 625.26 211.16 659.46 211.16 701.66`);
  join(seams34,[[s2Paths[s2Paths.length-1],nextPath]]);
  // Keep the right stroke inside its containing canvas, with one uniform
  // width. Perpendicular-scale estimation amplified WebKit matrix differences.
  const seventhSvg=document.querySelector('.wf-sec7-m-vector-svg');
  const seventh=seventhSvg.querySelector('path');
  seventhSvg.style.translate='none';
  seventh.style.setProperty('vector-effect','none','important');
  seventh.style.setProperty('stroke-width',String(stroke),'important');
  // The S6 rail ends exactly at S7's original entry point.
  const arc=document.querySelector('.wf-sec7-m-vector-svg path'),entry=end(arc,0,track);
  const leftEdge=local(track,new DOMPoint(0,0)),rightEdge=local(track,new DOMPoint(innerWidth,0));
  const geometry=`M ${leftEdge.x} ${entry.y} H ${entry.x}`;gray.setAttribute('d',geometry);fill.setAttribute('d',geometry);
  const stage=Math.max(0,Math.min(2,(+document.getElementById('sec6-m-num').textContent||1)-1));
  const target=entry.x;
  fill.style.transition='none';fill.style.strokeDashoffset='0';dot.style.left=(96+(parseFloat(cs.getPropertyValue('--s6-mb-desc-x'))||0))+'px';dot.style.top=entry.y+'px';
  arc.setAttribute('pathLength',1);root.style.removeProperty('--mobile-s7-offset');
  // Limit the first text row to the curved boundary, including a 14px gutter.
  const desc=document.getElementById('sec6-m-desc');const number=k=>parseFloat(cs.getPropertyValue('--s6-mb-'+k))||0;desc.style.left=(96+number('desc-x'))+'px';desc.style.top=(412+number('desc-y'))+'px';const manualWidth=number('desc-w');desc.style.width=(manualWidth>0?manualWidth:275)+'px';const dr=desc.getBoundingClientRect();let boundary=Infinity;
  for(let i=0;i<=320;i++){const p=arc.getPointAtLength(arc.getTotalLength()*i/320).matrixTransform(arc.getScreenCTM());if(p.y>=dr.top+7*scale&&p.y<=dr.bottom)boundary=Math.min(boundary,p.x);}
  if(!manualWidth&&Number.isFinite(boundary))desc.style.width=Math.max(120,Math.min(275,(boundary-dr.left)/scale-14))+'px';
  widenFilters();
  // The original filter primitives clip the horizontal tail of the top curve.
  for(const path of s2Paths){
   path.style.setProperty('filter','url(#mobileLinearPencil)','important');
   for(let g=path.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)g.removeAttribute('filter');
  }
  document.querySelectorAll('.mobile-pencil-svg path,.s1-mb-container .s1-line-path,.s2p2-mb-line-vert path,.s5-m-left-line path,.s5-m-bottom-line path,.wf-sec8-mobile-outer .wf-sec8-line-path path').forEach(p=>{
   const box=p.getBBox();if(box.width>.1&&box.height>.1)return;
   p.style.setProperty('filter','url(#mobileLinearPencil)','important');
   for(let g=p.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)if(g.hasAttribute('filter'))g.setAttribute('filter','none');
  });
  // WebKit can drop zero-height stroked paths when an SVG displacement filter is applied.
  // Retain the exact geometry and stroke, without filtering the mobile flow lines.
  root.querySelectorAll('.s1-mb-container svg path,.s2p1-mb-container svg path,.s2p2-mb-layer svg path,.s2p34-mb-canvas svg path,.s5-mobile-wrapper svg path,.mobile-s6-track path,.wf-sec7-mobile-outer svg path,.wf-sec8-mobile-outer svg path').forEach(path=>{
   if(getComputedStyle(path).stroke==='none')return;
   unfiltered(path);
   for(let parent=path.parentElement;parent&&parent.tagName.toLowerCase()!=='svg';parent=parent.parentElement)if(parent.hasAttribute('filter')||parent.style.filter)unfiltered(parent);
  });
  // Reflect only the line layer around its incoming joint, so the previous
  // section stays connected and photos, typography and actors are untouched.
  const incoming=topCurve.getPointAtLength(0).matrixTransform(topCurve.getScreenCTM());
  const anchorX=(incoming.x-scaler.getBoundingClientRect().left)/scale;
  // Use one untransformed SVG for the final mobile sales route. WebKit's
  // screen matrices for nested reflected/rotated SVGs are not needed here.
  mirrored5.style.transform='none';
  const salesRect=scaler.getBoundingClientRect(),salesScale=salesRect.width/380.5;
  const halo=document.querySelector('.s4-bg-ellipse').getBoundingClientRect();
  const startX=(halo.left+halo.width/2-salesRect.left)/salesScale;
  const startY=(halo.bottom-salesRect.top)/salesScale;
  const rightX=(innerWidth-18-salesRect.left)/salesScale;
  const midX=(startX+rightX)/2;
  const topBottom=startY+215;
  const seatY=(br.top+br.height/2-salesRect.top)/salesScale;
  const radius=Math.min(99.33,Math.max(1,(seatY-topBottom)/2));
  const bottomX=rightX-radius,edgeX=(-2-salesRect.left)/salesScale;
  const k=.5522847498;
  const paint=seams5.querySelector('path');
  paint.setAttribute('d',`M ${startX} ${startY} C ${startX} ${startY+59.6} ${midX-(midX-startX)*k} ${startY+108} ${midX} ${startY+108} C ${midX+(rightX-midX)*k} ${startY+108} ${rightX} ${topBottom-59.1} ${rightX} ${topBottom} V ${seatY-radius} C ${rightX} ${seatY-radius+radius*k} ${bottomX+radius*k} ${seatY} ${bottomX} ${seatY} H ${edgeX}`);
  root.dataset.mobileSalesGeometry='viewport-anchors';
 }
 let pending=false;function soon(){if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;update();});}}
 window.fpMobileConnectionsUpdate=update;
 window.addEventListener('resize',soon);window.addEventListener('fp:webflow-ready',soon);window.addEventListener('pageshow',soon);window.addEventListener('orientationchange',soon);document.fonts.ready.then(soon);
 root.addEventListener('fp:webflow-ready',event=>{if(event.target.tagName==='IMG')soon();},true);
 new MutationObserver(soon).observe(document.getElementById('sec6-m-num'),{childList:true,characterData:true,subtree:true});
 soon();
})();

;

;/* section-guides.js */
(() => {
 const sections=[['sec1','區塊 1'],['s2p1','區塊 2 · Part 1'],['s2p2','區塊 2 · Part 2'],['s2p34','區塊 2 · Part 3–4'],['sec4','區塊 4'],['sec5','區塊 5'],['sec6','區塊 6'],['sec7','區塊 7'],['sec8','區塊 8']];
 const style=document.createElement('style');
 style.textContent='.fp-section-fade{transition:opacity .32s ease}.fp-section-fade.fp-outside{opacity:0}.fp-guide-layer{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:99999;display:none}.fp-guide-box{position:absolute;box-sizing:border-box;border:2px dashed var(--guide-color);background:color-mix(in srgb,var(--guide-color) 4%,transparent)}.fp-guide-label{position:absolute;left:0;top:0;background:var(--guide-color);color:white;padding:3px 6px;font:12px system-ui;white-space:nowrap}@media(prefers-reduced-motion:reduce){.fp-section-fade{transition:none}}';
 document.head.append(style);
 const layer=document.createElement('div');layer.className='fp-guide-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const items=sections.map(([id,label],i)=>{
  const section=document.querySelector('.fp-'+id+'-wrapper');
  const box=document.createElement('div');box.className='fp-guide-box';box.style.setProperty('--guide-color',['#a24d37','#416b90','#597c47'][i%3]);
  const tag=document.createElement('span');tag.className='fp-guide-label';tag.textContent=label;box.append(tag);layer.append(box);section.classList.add('fp-section-fade');return {section,box};
 });
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('fp-outside',!e.isIntersecting)),{threshold:0});
 items.forEach(({section})=>observer.observe(section));
 let enabled=new URLSearchParams(location.search).get('guides')==='1',pending=false;layer.style.display=enabled?'block':'none';
 function update(){pending=false;if(!enabled)return;items.forEach(({section,box})=>{const r=section.getBoundingClientRect();Object.assign(box.style,{left:Math.max(0,r.left)+'px',top:r.top+'px',width:Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left))+'px',height:Math.max(1,r.height)+'px'});});}
 function soon(){if(!pending){pending=true;requestAnimationFrame(update);}}
 window.fpSectionGuidesUpdate=soon;
 addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='fp:guides')return;enabled=!!e.data.enabled;layer.style.display=enabled?'block':'none';soon();});
 soon();addEventListener('fp:webflow-ready',soon);document.fonts.ready.then(soon);
 addEventListener('resize',soon);addEventListener('scroll',soon,{passive:true});
 const resize=new ResizeObserver(soon);items.forEach(({section})=>resize.observe(section));
 new MutationObserver(soon).observe(document.getElementById('fp-master-root'),{attributes:true,subtree:true,attributeFilter:['style']});
})();

;

;/* animation-sequence.js */
(() => {
 const definitions=[['sec1','s1-root-container','replayS1Animation'],['s2p1','s2p1-root-container','replayS2P1Animation'],['s2p2','s2p2-root-container','replayS2P2Animation'],['s2p34','s2p34-root-container','replayS2P34Animation'],['sec4','s4-root-container','replaySec4Animation'],['sec5','s5-global-container','replaySec5Animation'],['sec6','wf-sec6-root',null],['sec7','wf-sec7-root','replaySec7Animation'],['sec8','wf-sec8-root','replaySec8Animation']];
 const items=definitions.map(([id,root,replay])=>({id,root:document.getElementById(root),wrapper:document.querySelector('.fp-'+id+'-wrapper'),replay}));
 items.forEach(i=>i.wrapper.classList.add('fp-sequence-pending'));
 let current=-1,complete=false,lastY=scrollY,deadline=0,activeSeatRun=null,startedScrollY=scrollY;
 const seconds=s=>s.endsWith('ms')?parseFloat(s)/1000:parseFloat(s)||0;
 function duration(item){let max=0;for(const el of [item.root,...item.root.querySelectorAll('*')]){
  if(!el.getClientRects().length)continue;const s=getComputedStyle(el);
  for(const kind of ['animation','transition']){const ds=s[kind+'Duration'].split(','),del=s[kind+'Delay'].split(',');ds.forEach((d,j)=>{if(kind==='animation'&&s.animationIterationCount.split(',')[j]==='infinite')return;max=Math.max(max,seconds(d)+seconds(del[j%del.length]));});}
 }return Math.max(item.id==='sec5'?1.8:item.id==='sec6'?1.5:.5,max+.12)*1000;}
 function drawSeat(){
  const run={force:false};activeSeatRun=run;
  const holder=document.getElementById('s6-seat-holder');
  holder.classList.add('fp-seat-sequence');holder.classList.remove('is-drawn');
  const parts=[...holder.querySelectorAll('path.fp-seg')].map(path=>({path,line:!!path.closest('.s6-seat-line')}));
  for(const {path}of parts){path.setAttribute('pathLength','1');path.style.setProperty('transition','none','important');path.style.setProperty('stroke-dasharray','1','important');path.style.setProperty('stroke-dashoffset','1','important');}
  const actor=document.getElementById('sec6-d-asset-tag');
  document.getElementById('wf-sec6-root').dataset.s6ActorReady='0';
  const actorParts=[actor,document.getElementById('sec6-d-flashlight-icon')].filter(Boolean);
  actorParts.forEach(el=>el.style.setProperty('opacity','0','important'));
  const linePath=parts.find(part=>part.line)?.path;
  let revealedAt=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const displayedLength=p=>{const m=p.getScreenCTM();return p.getTotalLength()*Math.hypot(m.a,m.b);};
  const arcPart=parts.find(p=>!p.line),arcDuration=Math.max(120,displayedLength(arcPart.path)),lineDuration=Math.max(120,displayedLength(linePath));
  const arcDelay=180,lineDelay=arcDelay+arcDuration,total=lineDelay+lineDuration;
  const started=performance.now();
  function frame(now){
   const elapsed=now-started;
   for(const {path,line}of parts){const delay=line?lineDelay:arcDelay,duration=line?lineDuration:arcDuration;const fraction=(reduced||run.force)?1:Math.max(0,Math.min(1,(elapsed-delay)/duration));path.style.setProperty('stroke-dashoffset',String(1-fraction),'important');}
   let arrival=1;
   if(linePath&&actor){
    const matrix=linePath.getScreenCTM();
    const a=linePath.getPointAtLength(0).matrixTransform(matrix);
    const b=linePath.getPointAtLength(linePath.getTotalLength()).matrixTransform(matrix);
    const rect=actor.getBoundingClientRect(),x=rect.left+rect.width/2;
    arrival=Math.max(0,Math.min(1,(x-a.x)/(b.x-a.x||1)));
   }
   const progress=(reduced||run.force)?1:Math.max(0,Math.min(1,(elapsed-lineDelay)/lineDuration));
   if(revealedAt===null&&progress>=arrival){revealedAt=now;document.getElementById('wf-sec6-root').dataset.s6ActorReady='1';}
   if(revealedAt!==null){const opacity=(reduced||run.force)?1:Math.min(1,(now-revealedAt)/280);actorParts.forEach(el=>el.style.setProperty('opacity',String(opacity),'important'));if(opacity===1)document.getElementById('wf-sec6-root').classList.add('s6-lower-ready');}
   if(!reduced&&!run.force&&(elapsed<total||revealedAt===null||now-revealedAt<280))requestAnimationFrame(frame);else{
    for(const {path}of parts)path.style.setProperty('stroke-dashoffset','0','important');
    holder.classList.add('is-drawn');
   }
  }
  requestAnimationFrame(frame);
 }
 function start(index){startedScrollY=scrollY;current=index;complete=false;const item=items[index];window.fpSequenceAuthorize(item.root.id);item.wrapper.classList.remove('fp-sequence-pending');item.wrapper.classList.add('fp-sequence-enter');
  if(item.id==='sec6'){if(innerWidth>=768)drawSeat();else{const actors=[document.getElementById('sec6-m-asset-tag'),document.getElementById('sec6-m-flashlight')],began=performance.now();function reveal(now){const opacity=Math.min(1,(now-began)/200);actors.forEach(el=>el.style.setProperty('opacity',String(opacity),'important'));if(opacity<1)requestAnimationFrame(reveal);else item.root.classList.add('s6-lower-ready');}actors.forEach(el=>el.style.setProperty('opacity','0','important'));requestAnimationFrame(reveal);}}
  if(item.replay)window[item.replay]?.();else{window.fpSequenceMark(item.root.id);window.handleSec6Scroll?.();}
  deadline=performance.now()+duration(item)+60;setTimeout(check,200);
 }
 function readyNext(){if(current<0||current>=items.length-1)return false;const next=items[current+1];const config=window.FP_PAGE_CONFIG||{};const raw=parseFloat(config[innerWidth<1200?'--animation-entry-mobile-percent':'--animation-entry-desktop-percent']);const percent=Number.isFinite(raw)?Math.max(0,Math.min(50,raw)):(innerWidth<1200?10:15);const threshold=1-percent/100;return next.wrapper.getBoundingClientRect().top<=innerHeight*threshold;}
 function check(){if(current<0||complete)return;const item=items[current];
  const active=item.root.getAnimations({subtree:true}).some(a=>a.playState==='running'&&a.effect?.getComputedTiming().iterations!==Infinity);
  let stickyDone=item.id!=='sec1'||window.fpHeroSequenceDone===true;if(item.id==='sec6'&&innerWidth>=768){const track=document.getElementById('sec6-d-track');stickyDone=track.getBoundingClientRect().top<=-(innerWidth<1200?1800:track.offsetHeight-innerHeight)+2;}
  if(performance.now()>=deadline&&!active&&stickyDone){complete=true;lastY=scrollY;if(scrollY>startedScrollY+24&&readyNext())start(current+1);return;}setTimeout(check,100);
 }
 function finishFast(){if(activeSeatRun)activeSeatRun.force=true;const item=items[current];item.root.dataset.motionCaughtUp='1';dispatchEvent(new CustomEvent('fp:motion-catchup',{detail:{rootId:item.root.id}}));for(const path of item.root.querySelectorAll('path.fp-seg'))path.style.setProperty('stroke-dashoffset','0','important');for(const animation of item.root.getAnimations({subtree:true})){if(animation.effect?.getComputedTiming().iterations!==Infinity)try{animation.finish();}catch{}}if(item.id==='sec6')item.root.classList.add('s6-lower-ready');complete=true;}
 function shouldCatchUp(bottom,nextTop,height,velocity,stickyReleased){return stickyReleased&&(bottom<height*.25||(velocity>900&&nextTop<height*.45));}
 let scrollTime=performance.now(),velocity=0;
 addEventListener('scroll',()=>{
  const y=scrollY,now=performance.now(),down=y>lastY+.5,elapsed=Math.max(16,now-scrollTime);
  velocity=elapsed>200?0:velocity*.5+Math.max(0,y-lastY)/elapsed*1000*.5;
  lastY=y;scrollTime=now;
  if(!down||innerWidth<768)return;
  while(current>=0&&current<items.length-1){
   const item=items[current],next=items[current+1];
   let released=true;
   if(item.id==='sec6'){const track=document.getElementById('sec6-d-track'),stage=track.querySelector('.wf-sec6-desktop-sticky-inner');released=track.getBoundingClientRect().bottom<=stage.getBoundingClientRect().bottom+2;}
   if(!shouldCatchUp(item.wrapper.getBoundingClientRect().bottom,next.wrapper.getBoundingClientRect().top,innerHeight,velocity,released))break;
   finishFast();start(current+1);
  }
  if(complete&&current<items.length-1&&readyNext())start(current+1);
 },{passive:true});
 function showMobile(){if(innerWidth>=768)return;current=items.length-1;complete=true;const classes=['s1-active','s2p1-active','s2p2-active','s2p34-active','s4-active','s5-active',null,'wf-sec7-active','wf-sec8-active'];items.forEach((item,index)=>{window.fpSequenceAuthorize(item.root.id);window.fpSequenceMark(item.root.id);item.wrapper.classList.remove('fp-sequence-pending');if(classes[index])item.root.classList.add(classes[index]);});document.getElementById('wf-sec6-root').classList.add('s6-lower-ready');}
 addEventListener('resize',showMobile);
 let initialized=false;
 function init(){if(initialized)return;initialized=true;if(innerWidth<768){showMobile();return;}requestAnimationFrame(()=>requestAnimationFrame(()=>start(0)));}
 window.fpStartAnimationSequence=init;
 if(window.FP_WEBFLOW_BOOTSTRAP)addEventListener('fp:webflow-ready',init,{once:true});
 else if(document.readyState==='complete')init();else addEventListener('fp:webflow-ready',init,{once:true});
})();

;

;/* inspection-media.js */
(() => {
 const images=[...document.querySelectorAll('.s4-card-bg-photo[data-media-id]')];
 function apply(){for(const image of images){
  const config=window.FP_MEDIA_CONFIG?.section4?.find(c=>c.id===image.dataset.mediaId);if(!config)continue;
  if(config.image&&image.getAttribute('src')!==config.image)image.src=config.image;
  image.alt=config.alt||config.title||'';
  const card=image.closest('.s4-accordion-card');
  const button=card.querySelector('.s4-btn-watch-video');
  if(button)button.hidden=(config.showVideoButton??window.FP_MEDIA_CONFIG.showVideoButton)!==true;
  for(const label of card.querySelectorAll('.s4-collapsed-title,.s4-expanded-title'))if(config.title)label.textContent=config.title;
  if(config.description)card.querySelector('.s4-expanded-desc').textContent=config.description;
  const slot=image.closest('.s4-accordion-card').querySelector('.s4-card-icon');
  let icon=slot.querySelector('img');
  if(!icon){icon=document.createElement('img');slot.append(icon);}
  icon.hidden=!config.icon;slot.style.backgroundColor=config.icon?'transparent':'';slot.classList.toggle('has-icon',!!config.icon);
  if(config.icon){icon.src=config.icon;icon.alt='';Object.assign(icon.style,{width:'100%',height:'100%',objectFit:'contain',position:'absolute',left:'0',top:'0'});}
  slot.setAttribute('aria-hidden','true');
 }}
 window.fpInspectionMediaUpdate=apply;apply();
 // Delegation works even when this file arrives after DOMContentLoaded in Webflow.
 document.addEventListener('click',event=>{
  if(innerWidth>=768)return;
  const card=event.target.closest?.('.s4-accordion-card');
  if(!card||event.target.closest('.s4-btn-watch-video'))return;
  event.preventDefault();event.stopImmediatePropagation();
  const active=card.classList.contains('active');
  card.closest('.s4-cards-accordion').querySelectorAll('.s4-accordion-card').forEach(item=>item.classList.remove('active'));
  if(!active)card.classList.add('active');
  requestAnimationFrame(()=>window.fpMobileLayoutUpdate?.());
 },true);
})();

;

;/* inspection-video.js */
(() => {
 const modal=document.createElement('dialog');modal.id='inspection-video-modal';modal.setAttribute('aria-label','驗屋服務影片');
 modal.innerHTML='<button type="button" class="inspection-video-close" aria-label="關閉影片"><span class="inspection-close-roll"><span class="inspection-close-row"><img src="https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40991d1fd2cd920b72_video-close.svg" alt=""><span>CLOSE</span></span><span class="inspection-close-row" aria-hidden="true"><img src="https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40991d1fd2cd920b72_video-close.svg" alt=""><span>CLOSE</span></span></span></button><div class="inspection-video-frame"></div>';
 document.body.append(modal);const frame=modal.querySelector('.inspection-video-frame');frame.setAttribute('tabindex','-1');frame.setAttribute('autofocus','');let previousOverflow='';
 function close(){modal.close();}
 modal.querySelector('button').onclick=()=>{modal.querySelector('button').classList.add('is-closing');setTimeout(close,180);};
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 modal.addEventListener('close',()=>{modal.querySelector('button').classList.remove('is-closing');frame.querySelector('video')?.pause();frame.replaceChildren();document.documentElement.style.overflow=previousOverflow;});
 let opening=false;
 function open(button){if(button.hidden||modal.open||opening)return;opening=true;button.classList.add('fp-video-pressed');const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:140;setTimeout(()=>{button.classList.remove('fp-video-pressed');opening=false;if(!button.hidden)show(button);},delay);}
 function show(button){if(modal.open)return;const id=button.closest('.s4-accordion-card').querySelector('.s4-card-bg-photo').dataset.mediaId;
  const card=window.FP_MEDIA_CONFIG?.section4?.find(c=>c.id===id);frame.replaceChildren();modal.setAttribute('aria-label',(card?.title||'驗屋服務')+'影片');
  if(card?.video){const player=document.createElement(card.videoType==='iframe'?'iframe':'video');player.src=card.video;if(player.tagName==='VIDEO'){player.controls=true;player.playsInline=true;}else{player.title=card.title;player.allow='fullscreen; picture-in-picture';player.allowFullscreen=true;}frame.append(player);}
  else{const message=document.createElement('p');message.textContent='影片準備中';frame.append(message);}
  previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';modal.showModal();frame.focus({preventScroll:true});
 }
 window.fpOpenInspectionVideo=open;
 document.querySelectorAll('.s4-btn-watch-video').forEach(button=>button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open(button);}));
})();

;

;/* tablet-figma.js */
(() => {
 const root=document.getElementById('fp-master-root');
 const sections=[['sec1',124,222,771,596],['s2p1',70,723,922,744],['s2p2',226,1467,764,603],['s2p34',32,2070,960,716],['sec4',-48,2778,1120,1237],['sec5',-197,4015,1171,731.38],['sec6',-49,4713,954,873],['sec7',34,5505,977,805.314],['sec8',42,6231,950,1044.553]];
 let queued=false,active=false,railBefore=null;const saved=new Map();const lineSvg=document.querySelector(".s2p34-line-svg"),originalViewBox=lineSvg.getAttribute("viewBox");const curveSvgs=[...document.querySelectorAll(".s2p2-vector1 svg,.s2p2-vector2 svg")],ratios=curveSvgs.map(svg=>svg.getAttribute("preserveAspectRatio"));
 function layout(){queued=false;const tablet=innerWidth>=768&&innerWidth<1200;
  if(!tablet){if(active){root.classList.remove('fp-tablet');root.querySelectorAll('.wf-sec7-balls-container').forEach(el=>el.style.removeProperty('top'));root.querySelectorAll('.wf-sec7-man-push,.wf-sec7-man-shadow,.wf-sec8-man1-group,.wf-sec8-man2-group').forEach(el=>el.style.removeProperty('translate'));root.style.removeProperty('--tablet-family-extra');if(railBefore){if(railBefore[0])root.style.setProperty('--s6-h-y',railBefore[0],railBefore[1]);else root.style.removeProperty('--s6-h-y');}for(const name of ['--tablet-stage-height','--tablet-stage-top','--tablet-page-height','--tablet-world-track-height','--tablet-first-screen-extra'])root.style.removeProperty(name);lineSvg.setAttribute('viewBox',originalViewBox);curveSvgs.forEach((svg,i)=>svg.setAttribute('preserveAspectRatio',ratios[i]||'xMidYMid meet'));root.style.removeProperty('--tablet-scale');root.style.removeProperty('--tablet-scroll-extra');root.style.removeProperty('--tablet-track-height');for(const [el,style]of saved){if(style===null)el.removeAttribute('style');else el.setAttribute('style',style);}saved.clear();active=false;if(innerWidth>=1200)window.fpS6ReapplyPhase?.();if(innerWidth<768)window.fpMobileLayoutUpdate?.();}return;}
  if(!active){railBefore=[root.style.getPropertyValue('--s6-h-y'),root.style.getPropertyPriority('--s6-h-y')];sections.forEach(([id])=>{const el=document.querySelector('.fp-'+id+'-wrapper');saved.set(el,el.getAttribute('style'));});active=true;}
  lineSvg.setAttribute('viewBox','0 0 960 716');curveSvgs.forEach(svg=>svg.setAttribute('preserveAspectRatio','xMinYMin meet'));root.classList.add('fp-tablet');const designWidth=Math.min(innerWidth,1024),scale=designWidth/1024,origin=(innerWidth-designWidth)/2;root.style.setProperty('--tablet-scale',scale);root.style.setProperty('--tablet-scroll-extra','1800px');root.style.setProperty('--tablet-track-height',(760+1800/scale)+'px');
  const stageTop=220,stageHeight=stageTop+560;root.style.setProperty('--tablet-stage-height',stageHeight+'px');root.style.setProperty('--tablet-stage-top',stageTop+'px');root.style.setProperty('--s6-h-y',(stageTop+407)+'px','important');root.style.setProperty('--tablet-page-height',(7053.553+stageHeight-905)+'px');root.style.setProperty('--tablet-track-height',(stageHeight+1800/scale)+'px');root.style.setProperty('--tablet-world-track-height',(stageHeight*scale+1800)+'px');
  root.style.setProperty('--tablet-card-inset',(48+32/scale)+'px');root.style.setProperty('--tablet-card-width',((designWidth-64)/scale)+'px');const firstScreenTop=Math.min(222*scale,Math.max(24,innerHeight-(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110)-596*scale)),firstScreenExtra=0;root.style.setProperty('--tablet-first-screen-extra',(firstScreenTop+firstScreenExtra)+'px');const config=window.FP_PAGE_CONFIG||{},val=k=>parseFloat(config[k])||0;
  for(const [id,x,y,w,h]of sections){const el=document.querySelector('.fp-'+id+'-wrapper');el.style.setProperty('left',(origin+(x+val('--'+id+'-tab-x'))*scale)+'px','important');el.style.setProperty('top',(firstScreenTop+(id==='sec1'?0:firstScreenExtra)+(y-222+val('--'+id+'-tab-y')+val('--'+id+'-tab-mt'))*scale+(id==='sec7'||id==='sec8'?1800+(stageHeight-905)*scale:0))+'px','important');el.style.width=w+'px';el.style.height=(id==='sec6'?stageHeight*scale+1800:h)+'px';}
  window.fpTabletSetPhase?.(Math.max(0,(+document.getElementById('sec6-d-num').textContent||1)-1));
  window.fpTextFlowUpdate?.();
  // Reserve extra space when the actual font wraps beyond the design boxes.
  let extra=0;
  for(const [id,x,y,w,h]of sections){
    const wrapper=document.querySelector('.fp-'+id+'-wrapper');
    wrapper.style.setProperty('top',(parseFloat(wrapper.style.top)+extra*scale)+'px','important');
    if(id==='s2p1'){
      const desc=wrapper.querySelector('.desc-paragraph');
      extra+=Math.max(0,desc.offsetTop+desc.offsetHeight+32-h);
    }
    if(id==='sec7'){
      const desc=wrapper.querySelector('.wf-sec7-description'),balls=wrapper.querySelector('.wf-sec7-balls-container');
      const shift=Math.max(0,desc.offsetTop+desc.offsetHeight+40-(278+139));
      balls.style.setProperty('top',(278+shift)+'px','important');
      wrapper.querySelectorAll('.wf-sec7-man-push,.wf-sec7-man-shadow').forEach(el=>el.style.setProperty('translate',`0 ${shift}px`,'important'));
      extra+=shift;
    }
    if(id==='sec8'){
      const desc=wrapper.querySelector('.wf-sec8-description');
      const shift=Math.max(0,desc.offsetTop+desc.offsetHeight+36-871);
      wrapper.querySelectorAll('.wf-sec8-man1-group,.wf-sec8-man2-group').forEach(el=>el.style.setProperty('translate',`0 ${shift}px`,'important'));
      root.style.setProperty('--tablet-family-extra',shift+'px');
      extra+=shift;
    }
  }
  root.style.setProperty('--tablet-page-height',(7053.553+stageHeight-905+extra)+'px');
  window.fpLinesUpdate?.();window.fpSectionGuidesUpdate?.();
 }
 function soon(){if(!queued){queued=true;requestAnimationFrame(()=>requestAnimationFrame(layout));}}
 window.fpTabletLayoutUpdate=soon;addEventListener('fp:webflow-ready',soon);addEventListener('resize',soon);
 let rotationTimers=[];
 function rotate(){rotationTimers.forEach(clearTimeout);soon();rotationTimers=[120,400,900].map(ms=>setTimeout(soon,ms));}
 addEventListener('orientationchange',rotate);addEventListener('pageshow',rotate);
 window.visualViewport?.addEventListener('resize',soon);
 document.fonts.ready.then(soon);document.fonts.addEventListener?.('loadingdone',soon);soon();
})();

;

;/* tablet-seams.js */
(() => {
 const root=document.getElementById('fp-master-root'),changed=new Set();
 const path=k=>root.querySelector('path[data-k="'+k+'"]');
 const originals=new Map(['s8-arc1','s8-arc2','s8-arc3'].map(k=>[path(k),path(k).getAttribute('d')]));
 const point=(p,last)=>p.getPointAtLength(last?p.getTotalLength():0).matrixTransform(window.fpSvgScreenMatrix(p));
 const local=(p,v)=>v.matrixTransform(window.fpSvgScreenMatrix(p).inverse());
 function join(a,b){if(!a||!b)return;const target=local(b,point(a,true)),start=b.getPointAtLength(0);b.setAttribute('transform',`translate(${target.x-start.x} ${target.y-start.y})`);changed.add(b);}
 function horizontal(p,a,b){if(!p||!a||!b)return;const start=local(p,point(a,true)),finish=local(p,point(b,false));
  p.setAttribute('d',`M ${start.x} ${start.y} H ${finish.x}`);
  join(p,b);
 }
 function update(){if(!root.classList.contains('fp-tablet')){changed.forEach(p=>p.removeAttribute('transform'));changed.clear();return;}
  changed.forEach(p=>p.removeAttribute('transform'));changed.clear();
  originals.forEach((d,p)=>p.setAttribute('d',d));
  path('s2p1-arc1').setAttribute('d','M845.161 2.16C907.499 2.16 958.032 52.6924 958.032 115.031C958.032 177.37 907.499 227.902 845.161 227.902');
  horizontal(path('s2p1-h1'),path('s2p1-arc1'),path('s2p1-arc2'));
  const photo1=document.querySelector('.s2p1-dt-container .circle-photo-box').getBoundingClientRect(),entry2=path('s2p2-arc1');
  const desired2=local(entry2,new DOMPoint(photo1.left+photo1.width/2,photo1.bottom)),first2=entry2.getPointAtLength(0);
  entry2.setAttribute('transform',`translate(${desired2.x-first2.x} ${desired2.y-first2.y})`);changed.add(entry2);
  horizontal(path('s2p2-h1'),path('s2p2-arc1'),path('s2p2-arc2'));
  horizontal(path('s2p2-h2'),path('s2p2-arc2'),path('s2p34-arc1'));
  horizontal(path('s2p34-h1'),path('s2p34-arc1'),path('s2p34-arc2'));
  horizontal(path('s2p34-h2'),path('s2p34-arc2'),path('s2p34-arc3'));
  const seat=path('s5-h2'),seatArc=path('s5-arc3');
  if(seat&&seatArc){const photo=document.querySelector('.s5-d-photo-frame').getBoundingClientRect(),pin=document.querySelector('.wf-sec6-desktop-sticky-inner').getBoundingClientRect().top-document.getElementById('sec6-d-track').getBoundingClientRect().top,desired=local(seatArc,new DOMPoint(photo.left+photo.width/2,photo.bottom+pin)),first=seatArc.getPointAtLength(0);seatArc.setAttribute('transform',`translate(${desired.x-first.x} ${desired.y-first.y})`);changed.add(seatArc);const end=local(seat,point(seatArc,true)),left=local(seat,new DOMPoint(-20,0));seat.setAttribute('d',`M ${end.x} ${end.y} H ${left.x}`);}
  const arc=path('s7-arc1'),rail=path('s6-h4');
  if(arc&&rail){
   const track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
   const y=parseFloat(getComputedStyle(root).getPropertyValue('--s6-h-y'))||627;
   const screenRail=new DOMPoint(0,y).matrixTransform(window.fpSvgScreenMatrix(rail));
   const releaseTop=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height;
   const targetY=releaseTop+screenRail.y-sticky.getBoundingClientRect().top;
   const correction=targetY-point(arc,false).y;
   if(Math.abs(correction)>.1)for(const id of ['sec7','sec8']){
    const wrapper=document.querySelector('.fp-'+id+'-wrapper');
    wrapper.style.setProperty('top',(parseFloat(wrapper.style.top)+correction)+'px','important');
   }
   const entry=local(rail,point(arc,false)),start=rail.getPointAtLength(0);rail.setAttribute('d',`M ${start.x} ${y} H ${entry.x}`);

  }
  if(arc){
   const svg=document.querySelector('.fp-s6-track'),track=document.getElementById('sec6-d-track'),sticky=track.querySelector('.wf-sec6-desktop-sticky-inner');
   const release=track.getBoundingClientRect().bottom-sticky.getBoundingClientRect().height,delta=release-sticky.getBoundingClientRect().top;
   const inverse=window.fpSvgScreenMatrix(svg).inverse(),rect=document.querySelector('#wf-sec7-canvas .wf-sec7-ball-2').getBoundingClientRect();
   const end=new DOMPoint(rect.right,rect.top+rect.height/2-delta).matrixTransform(inverse);
   const y=parseFloat(getComputedStyle(root).getPropertyValue('--s6-h-y'))||627,step3=window.fpS6Steps?.step3||606;
   const right=new DOMPoint(innerWidth-18,0).matrixTransform(inverse).x;
   const desc=document.getElementById('sec6-d-desc'),gap=24/(parseFloat(getComputedStyle(root).getPropertyValue('--tablet-scale'))||1);
   const turn=Math.min(right-8,Math.max(step3,end.x,606+desc.offsetWidth+gap)),far=right;
   window.fpS6ConnectionD=`M ${step3} ${y} H ${turn} C ${far} ${y} ${far} ${end.y} ${turn} ${end.y} H ${end.x}`;
   document.getElementById('sec6-d-baton-arc').setAttribute('d',window.fpS6ConnectionD);
   path('s7-h1').setAttribute('d',`M ${end.x} ${end.y}`);
  }
  window.fpTabletOpticsUpdate?.();
  const incoming8=path('s8-arc1'),circle7=document.querySelector('#wf-sec7-canvas .wf-sec7-ball-4 circle');
  if(incoming8&&circle7){
   const edge=new DOMPoint(+circle7.getAttribute('cx'),+circle7.getAttribute('cy')+(+circle7.getAttribute('r'))).matrixTransform(window.fpSvgScreenMatrix(circle7));
   const target=local(incoming8,edge),start=incoming8.getPointAtLength(0);
   incoming8.setAttribute('transform',`translate(${target.x-start.x} ${target.y-start.y})`);changed.add(incoming8);
   const svg=incoming8.closest('svg'),svgEdge=edge.matrixTransform(window.fpSvgScreenMatrix(svg).inverse()),filter=document.getElementById('fpPencilS8');
   if(filter){const top=Math.min(-200,svgEdge.y-24);filter.setAttribute('y',top);filter.setAttribute('height',Math.max(1600,1200-top));}
  }
  const familyExtra=parseFloat(root.style.getPropertyValue('--tablet-family-extra'))||0;
  if(familyExtra)path('s8-arc3').setAttribute('d',`M1039.16 ${863.16+familyExtra} C1039.16 ${925.5386+familyExtra} 988.574 ${976.103+familyExtra} 926.169 ${976.103+familyExtra}`);
  horizontal(path('s8-h1'),path('s8-arc1'),path('s8-arc2'));
  const vertical=path('s8-v1');if(vertical){const a=local(vertical,point(path('s8-arc2'),true)),b=local(vertical,point(path('s8-arc3'),false));vertical.setAttribute('d',`M ${a.x} ${a.y} V ${b.y}`);join(vertical,path('s8-arc3'));}
  const bottom=path('s8-h2');if(bottom){const end=local(bottom,point(path('s8-arc3'),true));bottom.setAttribute('d',`M ${end.x} ${end.y} H 33.5`);}
 }
 window.fpTabletSeamsUpdate=update;
 const originalUpdate=window.fpLinesUpdate;if(originalUpdate)window.fpLinesUpdate=(...args)=>{originalUpdate(...args);if(root.classList.contains('fp-tablet'))update();};
 addEventListener('resize',()=>{if(innerWidth<768||innerWidth>=1200)update();});
 document.querySelector('#wf-sec7-canvas .wf-sec7-ball-4')?.addEventListener('transitionend',()=>{if(root.classList.contains('fp-tablet'))update();});
})();

;

;/* tablet-interactions.js */
(() => {
 const root=document.getElementById('fp-master-root');
 window.fpTabletSetPhase=phase=>{
  if(innerWidth<768||innerWidth>=1200)return;
  root.dataset.tabletPhase=String(phase);
  phase=Math.max(0,Math.min(2,phase));
  const positions=phase===0?[78,488,732]:[78,338,phase===2?582:732];
  for(let i=0;i<3;i++){
   root.style.setProperty('--tablet-circle'+(i+1)+'-x',positions[i]+'px');
   root.style.setProperty('--tablet-circle'+(i+1)+'-y',((parseFloat(root.style.getPropertyValue('--tablet-stage-top'))||190)+(i===phase?0:150))+'px');
   root.style.setProperty('--tablet-circle'+(i+1)+'-size',(i===phase?372:222)+'px');
  }
  const anchor=positions[phase]+24;
  if(root.dataset.s6TextSwitching==='1')return;
  root.style.setProperty('--tablet-desc-x',anchor+'px');
  const title=document.getElementById('sec6-d-title');
  root.style.setProperty('--tablet-header-x',anchor+'px');
 };
 let outroQueued=false,outroHidden=false;
 const outroDesc=document.getElementById('sec6-d-desc');let savedOpacity=null;
 function applyOutro(hidden){
  if(hidden){
   if(savedOpacity===null)savedOpacity=[outroDesc.style.getPropertyValue('opacity'),outroDesc.style.getPropertyPriority('opacity')];
   outroDesc.style.setProperty('transition',matchMedia('(prefers-reduced-motion:reduce)').matches?'none':'opacity .4s ease','important');
   if(outroDesc.style.getPropertyValue('opacity')!=='0'||outroDesc.style.getPropertyPriority('opacity')!=='important')outroDesc.style.setProperty('opacity','0','important');
  }else if(savedOpacity!==null){
   outroDesc.style.setProperty('transition',matchMedia('(prefers-reduced-motion:reduce)').matches?'none':'opacity .4s ease','important');
   outroDesc.style.setProperty('opacity','1','important');savedOpacity=null;
  }
 }
 new MutationObserver(()=>{if(outroHidden&&outroDesc.style.getPropertyValue('opacity')!=='0')applyOutro(true);}).observe(outroDesc,{attributes:true,attributeFilter:['style']});
 function updateOutro(){
  outroQueued=false;
  if(innerWidth<768){outroHidden=false;applyOutro(false);delete root.dataset.s6TabletOutro;return;}
  const lastPhase=parseInt(document.getElementById('sec6-d-num').textContent,10)===3;
  const next=document.querySelector('.fp-sec7-wrapper').getBoundingClientRect();
  const header=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
  const available=Math.max(1,innerHeight-header);
  const visible=Math.max(0,Math.min(innerHeight,next.bottom)-Math.max(header,next.top));
  // Hysteresis avoids flickering when touch scrolling pauses at the boundary.
  const textTop=outroDesc.getBoundingClientRect().top;
  outroHidden=lastPhase&&(textTop<header+(outroHidden?120:96)||visible/available>=(outroHidden?.25:.35));
  applyOutro(outroHidden);
  root.dataset.s6TabletOutro=outroHidden?'1':'0';
 }
 function scheduleOutro(){if(!outroQueued){outroQueued=true;requestAnimationFrame(updateOutro);}}
 addEventListener('scroll',scheduleOutro,{passive:true});addEventListener('resize',scheduleOutro);
 new MutationObserver(scheduleOutro).observe(document.getElementById('sec6-d-num'),{childList:true,subtree:true,characterData:true});
 scheduleOutro();
})();

;

;/* tablet-final-fixes.js */
(() => {
 // Capture tablet clicks once, before the legacy per-card handlers.
 document.addEventListener('click',event=>{
  if(innerWidth<768||innerWidth>=1200||document.getElementById('inspection-video-modal')?.open)return;
  const watch=event.target.closest('.s4-btn-watch-video')||[...document.querySelectorAll('.s4-tab-panel.active .s4-accordion-card.active .s4-btn-watch-video')].find(b=>{const r=b.getBoundingClientRect();return r.width>0&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;});
  if(watch){event.preventDefault();event.stopImmediatePropagation();window.fpOpenInspectionVideo?.(watch);return;}
  let card=event.target.closest('.s4-accordion-card');
  if(!card&&!event.target.closest('.s4-tab-btn,button,a,input,select,textarea')){card=[...document.querySelectorAll('.s4-tab-panel.active .s4-accordion-card')].find(c=>{const r=c.getBoundingClientRect();return r.width>0&&r.height>0&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;});}
  if(!card)return;
  event.preventDefault();event.stopImmediatePropagation();
  const open=!card.classList.contains('active');
  card.parentElement.querySelectorAll('.s4-accordion-card').forEach(c=>{c.classList.remove('active');c.setAttribute('aria-expanded','false');});
  if(open){card.classList.add('active');card.setAttribute('aria-expanded','true');}
 },true);
 document.querySelectorAll('.s4-accordion-card').forEach(card=>{const button=document.createElement('button');button.type='button';button.className='s4-card-toggle';button.setAttribute('aria-label','展開 '+card.querySelector('.s4-collapsed-title').textContent);card.append(button);});
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
 svg.innerHTML='<defs><filter id="tabletFlowPencil" filterUnits="userSpaceOnUse" x="-2500" y="-2500" width="6000" height="6000"><feTurbulence type="fractalNoise" baseFrequency="1.11" numOctaves="3" seed="5976" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale=".7"/></filter></defs>';
 document.getElementById('fp-master-root').append(svg);
 const paths=[...document.querySelectorAll('.s2p1-dt-container path.fp-seg,.s2p2-dt-layer path.fp-seg,.s2p34-line-svg path.fp-seg')],parents=new Map();
 const styles=new Map(paths.map(p=>[p,[p.style.getPropertyValue('filter'),p.style.getPropertyPriority('filter')]]));
 paths.forEach(p=>{for(let g=p.parentElement;g&&g.tagName.toLowerCase()!=='svg';g=g.parentElement)if(g.hasAttribute('filter'))parents.set(g,g.getAttribute('filter'));});
 function filters(){const tablet=innerWidth>=768&&innerWidth<1200;
  parents.forEach((value,g)=>g.setAttribute('filter',tablet?'none':value));
  paths.forEach(p=>{if(tablet)p.style.setProperty('filter','url(#tabletFlowPencil)','important');else{const [value,priority]=styles.get(p);if(value)p.style.setProperty('filter',value,priority);else p.style.removeProperty('filter');}});
 }
 addEventListener('resize',filters);filters();
})();

;

;/* quote-and-tablet-optics.js */
(() => {
 const root=document.getElementById('fp-master-root');let lastPhase=-1,renderedEnds=[],fromEnds=[],phaseStarted=0;
 const nodeCache=new Map();
 function byId(id){let node=nodeCache.get(id);if(!node){node=document.getElementById(id);if(node)nodeCache.set(id,node);}return node;}
 function writeAttribute(node,key,value){const next=String(value);if(node.getAttribute(key)!==next)node.setAttribute(key,next);}
 function writeStyle(node,key,value){if(node.style.getPropertyValue(key)!==value||node.style.getPropertyPriority(key)!=='important')node.style.setProperty(key,value,'important');}
 function quotes(){
  const updates=[];
  const reference=innerWidth<768?document.querySelector('.s2p1-mb-container .vertical-brown-line'):null;
  const referenceStyle=reference?getComputedStyle(reference):null;
  const extension=key=>referenceStyle?Math.max(0,-(parseFloat(referenceStyle[key])||0)):3;
  const mobileTop=extension('marginTop'),mobileBottom=extension('marginBottom');
  for(const [textSelector,lineSelector]of [['.s5-d-slogan-text','.s5-d-accent-line'],['.s5-m-slogan-text','.s5-m-accent-line'],['.wf-sec8-main-title','.wf-sec8-vert-line'],['.wf-sec8-mob-main-title','.wf-sec8-mob-vert-line']]){
   const text=document.querySelector(textSelector),line=document.querySelector(lineSelector);if(!text||!line)continue;
   const height=text.offsetHeight;if(!height)continue;
   const mobile=innerWidth<768&&(textSelector==='.s5-m-slogan-text'||textSelector==='.wf-sec8-mob-main-title');
   const above=mobile?mobileTop:11,below=mobile?mobileBottom:11;
   updates.push([line,(height+above+below)+'px',(text.offsetTop-above)+'px']);
  }
  for(const [line,height,top]of updates){writeStyle(line,'height',height);writeStyle(line,'top',top);}
 }
 let opticsQueued=false;
 function scheduleOptics(){
  if(opticsQueued)return;
  opticsQueued=true;
  requestAnimationFrame(()=>{opticsQueued=false;optics();});
 }
 function optics(){
  if(innerWidth<768){lastPhase=-1;renderedEnds=[];return;}
  const section=byId('wf-sec6-root').getBoundingClientRect();
  if(section.top>innerHeight+160||section.bottom < -160)return;
  const tablet=root.classList.contains('fp-tablet');
  const seat=root.querySelector('path[data-k="s5-h2"]'),body=byId('sec6-d-asset-tag');
  const rayMatrix=window.fpSvgScreenMatrix(byId('sec6-d-ray-svg'));if(!rayMatrix)return;const scale=Math.hypot(rayMatrix.a,rayMatrix.b);
  if(tablet){
  const seatLocal=seat.getPointAtLength(0),seatTop=parseFloat(getComputedStyle(seat.closest('.s6-seat-line')).top)||0;
  const next=seatTop+seatLocal.y-body.offsetHeight*.46;
  const current=parseFloat(root.style.getPropertyValue('--tablet-seat-shift'))||0;
  if(Math.abs(next-current)>.05)root.style.setProperty('--tablet-seat-shift',next+'px');
  }else{
   const linePoint=seat.getPointAtLength(0).matrixTransform(window.fpSvgScreenMatrix(seat)),rect=body.getBoundingClientRect();
   const current=parseFloat(root.style.getPropertyValue('--desktop-seat-shift'))||0;
   const next=current+(linePoint.y-(rect.top+rect.height*.46))/scale;
   if(Math.abs(next-current)>.1)root.style.setProperty('--desktop-seat-shift',next+'px');
  }
  const lamp=byId('sec6-d-flashlight-icon');
  if(!tablet){const br=body.getBoundingClientRect(),lr0=lamp.getBoundingClientRect();
   for(const [key,difference]of [['--desktop-lamp-adjust-x',br.left+br.width*56/59-lr0.left],['--desktop-lamp-adjust-y',br.top+br.height*30/74.09-lr0.top]]){
    const old=parseFloat(root.style.getPropertyValue(key))||0,next=old+difference/scale;
    if(Math.abs(next-old)>.1)root.style.setProperty(key,next+'px');
   }
  }
  const lr=lamp.getBoundingClientRect();
  const lampStyle=getComputedStyle(lamp),transform=lampStyle.transform,matrix=new DOMMatrix(transform==='none'?undefined:transform);
  const phase=Math.max(0,Math.min(2,+(root.dataset.s6Phase??root.dataset.tabletPhase??0)));
  const circle=byId('sec6-d-circle-'+(phase+1)).getBoundingClientRect();
  const cx=circle.left+circle.width/2,cy=circle.top+circle.height/2,rx=circle.width/2,ry=circle.height/2;
  const ray=byId('sec6-d-ray-svg'),inverse=window.fpSvgScreenMatrix(ray).inverse();
  if(rx<=0||ry<=0)return;
  const lampScale=parseFloat(lampStyle.scale)||1;
  const starts=[[.0133118,20.4006],[8.33629,25.8939]].map(([x,y])=>{const edge=new DOMPoint((x/21-.5)*lamp.offsetWidth,(y/26-.5)*lamp.offsetHeight).matrixTransform(matrix);return new DOMPoint(lr.left+lr.width/2+edge.x*scale*lampScale,lr.top+lr.height/2+edge.y*scale*lampScale);}).sort((a,b)=>a.x-b.x);
  const now=performance.now();if(phase!==lastPhase){fromEnds=renderedEnds.map(p=>({...p}));phaseStarted=now;lastPhase=phase;}const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const fraction=reduced?1:Math.min(1,(now-phaseStarted)/650),ease=1-Math.pow(1-fraction,3);
  for(const [index,id]of ['sec6-d-ray-left','sec6-d-ray-right'].entries()){
   const start=starts[index];
   const x=(start.x-cx)/rx,y=(start.y-cy)/ry,d=x*x+y*y;if(d<=1)continue;
   const k=Math.sqrt(d-1)/d;
   const candidates=[{x:x/d-y*k,y:y/d+x*k},{x:x/d+y*k,y:y/d-x*k}].sort((a,b)=>a.x-b.x);
   const tangent=candidates[index],end=new DOMPoint(cx+rx*tangent.x,cy+ry*tangent.y);
   const a=start.matrixTransform(inverse),b=end.matrixTransform(inverse),line=byId(id);
   writeAttribute(line,'x1',a.x);writeAttribute(line,'y1',a.y);const from=fromEnds[index]||b,finish={x:from.x+(b.x-from.x)*ease,y:from.y+(b.y-from.y)*ease};renderedEnds[index]=finish;writeAttribute(line,'x2',finish.x);writeAttribute(line,'y2',finish.y);
  }
  if(now-phaseStarted<700)scheduleOptics();
 }
 window.fpTabletOpticsUpdate=scheduleOptics;
 const resize=new ResizeObserver(quotes);document.querySelectorAll('.s5-d-slogan-text,.s5-m-slogan-text,.wf-sec8-main-title,.wf-sec8-mob-main-title').forEach(el=>resize.observe(el));
 addEventListener('resize',()=>{quotes();scheduleOptics();});addEventListener('fp:webflow-ready',()=>{quotes();scheduleOptics();});document.fonts.ready.then(()=>{quotes();scheduleOptics();});quotes();
})();

;

;/* flow-speed.js */
(() => {
 const selectors='.s1-line-path,.s2p34-mb-line-svg path,.s2p2-mb-layer .s2p2-line-svg path,.s5-mobile-wrapper .s5-line-path path,.wf-sec7-m-vector-svg path,.wf-sec8-mobile-outer .wf-sec8-line-path path';
 function update(){document.querySelectorAll(selectors).forEach(path=>{
  if(!path.getClientRects().length)return;const matrix=path.getScreenCTM();if(!matrix)return;
  const duration=Math.max(.10,path.getTotalLength()*Math.hypot(matrix.a,matrix.b)/(innerWidth<768?1400:1000));
  path.style.setProperty('transition-duration',duration+'s','important');
  path.style.setProperty('transition-timing-function','linear','important');
 });}
 addEventListener('fp:webflow-ready',update);addEventListener('resize',()=>requestAnimationFrame(update));update();
})();

;

;/* content-motion.js */
(() => {
 const root=document.getElementById('fp-master-root');let pending=false;
 const properties=['transition-duration','transition-delay','animation-duration','animation-delay'];
 const seconds=value=>value.trim().endsWith('ms')?parseFloat(value)/1000:parseFloat(value)||0;
 const touched=new Map(),dirty=new Set([root]);
 function update(){pending=false;
  const elements=new Set();for(const region of dirty)for(const element of region.querySelectorAll('*'))elements.add(element);dirty.clear();for(const element of elements){
   if(element.namespaceURI==='http://www.w3.org/2000/svg'||element.classList.contains('s6-seat-holder'))continue;
   if(!touched.has(element))touched.set(element,properties.map(key=>[element.style.getPropertyValue(key),element.style.getPropertyPriority(key)]));
   const original=touched.get(element);properties.forEach((key,i)=>{const [value,priority]=original[i];if(value)element.style.setProperty(key,value,priority);else element.style.removeProperty(key);});
   const style=getComputedStyle(element);
   for(const [key,field,factor,cap]of [['transition-duration','transitionDuration',.5,.28],['transition-delay','transitionDelay',0,0],['animation-duration','animationDuration',.5,.28],['animation-delay','animationDelay',0,0]]){
    const values=style[field].split(',').map(seconds);if(!values.some(v=>v>0))continue;
    element.style.setProperty(key,values.map(v=>Math.min(innerWidth<768?cap*.8:cap,v*factor)+'s').join(','),'important');
   }
  }
 }
 function soon(){if(!pending){pending=true;requestAnimationFrame(update);}}
 const observer=new MutationObserver(records=>{records.forEach(record=>dirty.add(record.target));soon();});
 for(const id of ['s1-root-container','s2p1-root-container','s2p2-root-container','s2p34-root-container','s4-root-container','s5-global-container','wf-sec6-root','wf-sec7-root','wf-sec8-root'])observer.observe(document.getElementById(id),{attributes:true,attributeFilter:['class']});
 addEventListener('fp:webflow-ready',()=>{dirty.add(root);soon();});addEventListener('resize',()=>{dirty.add(root);soon();});soon();
})();

;

;/* label-pairs.js */
(() => {
 const tabletStyles=new Map();
 function remember(el,key){let values=tabletStyles.get(el);if(!values){values=new Map();tabletStyles.set(el,values);}if(!values.has(key))values.set(key,[el.style.getPropertyValue(key),el.style.getPropertyPriority(key)]);}
 function restore(){for(const [el,values]of tabletStyles)for(const [key,[value,priority]]of values){if(value)el.style.setProperty(key,value,priority);else el.style.removeProperty(key);}tabletStyles.clear();}
 const pairs=[['.s2p1-dt-container .tag-en','.s2p1-dt-container .title-cn'],['.s2p1-mb-container .tag-en','.s2p1-mb-container .title-cn'],['.s5-d-subtitle-en','.s5-d-title-cn'],['.s5-m-subtitle-en','.s5-m-title-cn'],['.wf-sec8-subtitle','.wf-sec8-category-title'],['.wf-sec8-mob-subtitle','.wf-sec8-mob-category-title']];
 function update(){if(innerWidth<768||innerWidth>=1200)restore();const value=parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--label-pair-gap'));const gap=Number.isFinite(value)?value:24;for(const [enSelector,cnSelector]of pairs){const en=document.querySelector(enSelector),cn=document.querySelector(cnSelector);if(!en||!cn||!cn.getClientRects().length)continue;const style=getComputedStyle(cn),x=parseFloat(style.left),y=parseFloat(style.top);if(!Number.isFinite(x)||!Number.isFinite(y))continue;cn.style.setProperty('margin','0','important');en.style.setProperty('left',(x+2)+'px','important');en.style.setProperty('top',(y-gap)+'px','important');en.style.setProperty('margin','0','important');en.style.setProperty('line-height','1.5','important');
 if(innerWidth>=768&&innerWidth<1200){const quoteSelector={'.s2p1-dt-container .title-cn':'.s2p1-dt-container .quote-wrapper','.s5-d-title-cn':'.s5-d-slogan-block','.wf-sec8-category-title':'.wf-sec8-main-title'}[cnSelector];const quote=quoteSelector&&document.querySelector(quoteSelector);const qgap=parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--label-quote-gap'));if(quote){remember(quote,'top');}if(quote)quote.style.setProperty('top',(Math.max(y+cn.offsetHeight,y-gap+en.offsetHeight)+(Number.isFinite(qgap)?qgap:14)+11)+'px','important');if(cnSelector==='.wf-sec8-category-title'&&quote){const line=document.querySelector('.wf-sec8-vert-line');if(line){remember(line,'top');remember(line,'height');line.style.setProperty('top',(parseFloat(quote.style.getPropertyValue('top'))-11)+'px','important');line.style.setProperty('height',(quote.offsetHeight+22)+'px','important');}}}
}}
 addEventListener('fp:webflow-ready',()=>requestAnimationFrame(update));addEventListener('resize',()=>requestAnimationFrame(()=>requestAnimationFrame(update)));document.fonts.ready.then(update);
})();

;

;/* card-motion.js */
(() => {
 const root=document.getElementById('s4-root-container');let visible=false,interacted=false,hinted=false,timer,closeTimer,hintCard;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function cancel(){interacted=true;clearTimeout(timer);clearTimeout(closeTimer);if(hintCard){hintCard.classList.remove('fp-card-hint','active');hintCard=null;}}
 root.addEventListener('pointerdown',cancel,true);root.addEventListener('focusin',cancel,true);
 root.querySelectorAll('.s4-accordion-card').forEach(card=>card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')cancel();}));
 function arm(){if(innerWidth<768)return;if(!visible||interacted||hinted||timer||!root.classList.contains('s4-active'))return;timer=setTimeout(()=>{timer=null;if(!visible||interacted||reduced())return;const card=root.querySelector('.s4-tab-panel.active .s4-accordion-card');if(!card||card.classList.contains('active'))return;hinted=true;hintCard=card;card.classList.add('fp-card-hint','active');closeTimer=setTimeout(()=>{card.classList.remove('fp-card-hint','active');hintCard=null;},850);},2200);}
 const first=root.querySelector('.s4-accordion-card');new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);if(!visible){clearTimeout(timer);timer=null;}else arm();},{threshold:.2}).observe(first);
 function entrance(panel){if(innerWidth<768||reduced()||!root.classList.contains('s4-active'))return;panel.querySelectorAll('.s4-accordion-card').forEach((card,index)=>{card.getAnimations().filter(a=>a.id==='fp-card-entrance').forEach(a=>a.cancel());const animation=card.animate([{opacity:0,translate:'-28px 0',clipPath:'inset(0 100% 0 0 round 25px)'},{opacity:1,translate:'0 0',clipPath:'inset(0 0 0 0 round 25px)'}],{duration:300,delay:index*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});animation.id='fp-card-entrance';});}
 const observer=new MutationObserver(records=>{if(records.some(r=>r.target===root)){const panel=root.querySelector('.s4-tab-panel.active');if(panel)entrance(panel);arm();}for(const r of records)if(r.target.classList.contains('s4-tab-panel')&&r.target.classList.contains('active'))entrance(r.target);});observer.observe(root,{subtree:true,attributes:true,attributeFilter:['class']});
 document.querySelectorAll('.s4-btn-watch-video').forEach(button=>button.addEventListener('pointerdown',()=>{if(innerWidth>=768&&!reduced())button.animate([{scale:1},{scale:.94},{scale:1}],{duration:180,easing:'ease-out'});}));
})();

;

;/* content-arrival.js */
(() => {
 const specs=[
 ['s2p1-root-container','s2p1-active',[['.circle-photo-box','s2p1-arc2'],['.tag-en,.title-cn,.quote-wrapper,.desc-paragraph','s2p1-arc2']]],
 ['s2p2-root-container','s2p2-active',[['.s2p2-card,.s2p2-mb-card1,.s2p2-mb-card2','s2p2-h1']]],
 ['s2p34-root-container','s2p34-active',[['.s2p34-photo-card,.s2p34-mb-photo-card,.s2p34-brand-text,.s2p34-mb-brand-text','s2p34-arc1']]],
 ['s5-global-container','s5-active',[['.s5-d-photo-frame,.s5-m-photo-frame,.s5-d-desc,.s5-m-desc','s5top']]],
 ['wf-sec7-root','wf-sec7-active',[['.wf-sec7-balls-container,.wf-sec7-m-balls-container,.wf-sec7-description,.wf-sec7-m-description','s7-h1']]],
 ['wf-sec8-root','wf-sec8-active',[['.wf-sec8-circles-block,.wf-sec8-mob-circles-block,.wf-sec8-description,.wf-sec8-mob-description','s8-h1']]]];
 const seconds=v=>v.trim().endsWith('ms')?parseFloat(v)/1000:parseFloat(v)||0;
 const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 function finishTime(root,key){if(innerWidth<768||root.dataset.motionCaughtUp==='1')return 0;if(innerWidth<768&&key==='s2p34-arc1'){const path=root.querySelector('#s2p34-mb-master-path');if(path){const length=path.getTotalLength();let best=Infinity,at=0;for(let i=0;i<=160;i++){const point=path.getPointAtLength(length*i/160),distance=Math.hypot(point.x-21.16,point.y-165.16);if(distance<best){best=distance;at=i/160;}}const style=getComputedStyle(path);return (seconds(style.transitionDelay.split(',')[0])+seconds(style.transitionDuration.split(',')[0])*at)*1000;}}const timing=innerWidth>=768&&window.fpSegTiming?.(key);if(timing)return (timing.start+timing.dur)*1000;const paths=[...root.querySelectorAll('path')].filter(visible);let end=0;for(const path of paths){const s=getComputedStyle(path);if(s.strokeDasharray==='none')continue;const d=s.transitionDuration.split(',').map(seconds),delay=s.transitionDelay.split(',').map(seconds);end=Math.max(end,...d.map((v,i)=>(v+(delay[i%delay.length]||0))*1000));}return end;}
 const entries=specs.map(([id,active,groups])=>({root:document.getElementById(id),active,groups:groups.map(([selector,key])=>({key,elements:[...document.getElementById(id).querySelectorAll(selector)]})),started:false,timers:[]}));
 function release(element){element.classList.remove('fp-wait-line');element.style.setProperty('transition-delay','0s','important');element.style.setProperty('opacity','1','important');}
 entries.forEach(entry=>{entry.groups.forEach(g=>g.elements.forEach(el=>el.classList.add('fp-wait-line')));function start(){if(entry.started||!entry.root.classList.contains(entry.active))return;entry.started=true;entry.startedAt=performance.now();requestAnimationFrame(()=>{entry.groups.forEach(g=>{const delay=finishTime(entry.root,g.key);entry.timers.push(setTimeout(()=>g.elements.forEach(release),delay));});});}new MutationObserver(start).observe(entry.root,{attributes:true,attributeFilter:['class']});start();});
 addEventListener('fp:motion-catchup',event=>{const entry=entries.find(e=>e.root.id===event.detail.rootId);if(entry){entry.timers.forEach(clearTimeout);entry.groups.forEach(g=>g.elements.forEach(release));}});
 addEventListener('scroll',()=>entries.forEach(e=>{if(e.started&&e.root.getBoundingClientRect().bottom<0){e.timers.forEach(clearTimeout);e.groups.forEach(g=>g.elements.forEach(release));}}),{passive:true});
 addEventListener('resize',()=>entries.forEach(e=>{if(e.started){e.timers.forEach(clearTimeout);requestAnimationFrame(()=>e.groups.forEach(g=>{const remaining=Math.max(0,finishTime(e.root,g.key)-(performance.now()-e.startedAt));e.timers.push(setTimeout(()=>g.elements.forEach(release),remaining));}));}}));
 const hero=document.getElementById('s1-root-container');let heroStarted=false;window.fpHeroSequenceDone=false;
 const circles=i=>[...hero.querySelectorAll('.s1-circle-node-'+i)];
 const lines=i=>[...hero.querySelectorAll('.s1-line-box-'+i+' path')];
 for(let i=1;i<=3;i++)circles(i).forEach(el=>{el.classList.add('fp-wait-line');el.style.setProperty('opacity','0','important');});
 for(let i=1;i<=2;i++)lines(i).forEach(path=>{path.setAttribute('pathLength','1');path.style.setProperty('transition','none','important');path.style.setProperty('stroke-dasharray','1','important');path.style.setProperty('stroke-dashoffset','1','important');});
 function animate(duration,update,done){const began=performance.now(),reduced=innerWidth<768||matchMedia('(prefers-reduced-motion: reduce)').matches;function frame(now){const t=(reduced||hero.dataset.motionCaughtUp==='1')?1:Math.min(1,(now-began)/(innerWidth<768?duration*.75:duration));update(t);if(t<1)requestAnimationFrame(frame);else done?.();}frame(began);}
 function circle(index,done){if(index===1)window.fpHeroLineProgress?.(0);const elements=circles(index);elements.forEach(el=>{el.classList.remove('fp-wait-line');el.style.setProperty('transition','none','important');});animate(360,t=>{const ease=1-Math.pow(1-t,3);elements.forEach(el=>{el.style.setProperty('opacity',String(ease),'important');el.style.setProperty('scale',String(.88+.12*ease),'important');});},done);}
 function line(index,done){const paths=lines(index),shown=paths.find(visible)||paths[0];if(!shown){done();return;}const matrix=shown.getScreenCTM(),length=shown.getTotalLength()*(matrix?Math.hypot(matrix.a,matrix.b):1);animate(Math.max(180,length),t=>{paths.forEach(path=>path.style.setProperty('stroke-dashoffset',String(1-t),'important'));if(index===1)window.fpHeroLineProgress?.(t);},done);}
 new MutationObserver(()=>{if(heroStarted||!hero.classList.contains('s1-active'))return;heroStarted=true;circle(1,()=>line(1,()=>circle(2,()=>line(2,()=>circle(3,()=>{window.fpHeroSequenceDone=true;})))));}).observe(hero,{attributes:true,attributeFilter:['class']});
})();

;

;/* actor-arrival.js */
(() => {
 const defs=[
 ['s2p1-root-container','s2p1-active','.s2p1-dt-container .figure-woman-body,.s2p1-mb-container .figure-woman-body','.s2p1-dt-container .figure-woman-shadow,.s2p1-mb-container .figure-woman-shadow',-30],
 ['s2p2-root-container','s2p2-active','.s2p2-figure-body,.s2p2-mb-figure','.s2p2-shadow-wrapper,.s2p2-mb-shadow',-30],
 ['s2p34-root-container','s2p34-active','.s2p34-man-body,.s2p34-mb-man-body','.s2p34-man-shadow,.s2p34-mb-man-shadow',30],
 ['s2p34-root-container','s2p34-active','.s2p34-woman-body','.s2p34-woman-shadow',-30],
 ['s4-root-container','s4-active','.s4-top-line','.s4-top-man',-30],
 ['wf-sec7-root','wf-sec7-active','.wf-sec7-man-push,.wf-sec7-m-man-push','.wf-sec7-man-shadow,.wf-sec7-m-man-shadow',-30],
 ['wf-sec8-root','wf-sec8-active','.wf-sec8-man-3,.wf-sec8-mob-man-3','.wf-sec8-shadow-3,.wf-sec8-mob-shadow-3',-30],
 ['wf-sec8-root','wf-sec8-active','.wf-sec8-man-2,.wf-sec8-mob-man-2','.wf-sec8-shadow-2,.wf-sec8-mob-shadow-2',-30],
 ['wf-sec8-root','wf-sec8-active','.wf-sec8-man-1,.wf-sec8-mob-man-1','.wf-sec8-shadow-1,.wf-sec8-mob-shadow-1',-30]];
 const sec=v=>v.trim().endsWith('ms')?parseFloat(v)/1000:parseFloat(v)||0;
 const lineSelector='path.fp-seg,.mobile-pencil-svg path,.s2p2-line-svg path,.s4-top-connector path,.wf-sec7-m-vector-svg path,.wf-sec8-line-path path';
 function nearest(body,paths){const r=body.getBoundingClientRect(),foot={x:r.left+r.width/2,y:r.bottom};let best={distance:Infinity,path:null,fraction:1};for(const path of paths){const m=path.getScreenCTM();if(!m)continue;const length=path.getTotalLength();for(let i=0;i<=64;i++){const p=path.getPointAtLength(length*i/64).matrixTransform(m),distance=Math.hypot(p.x-foot.x,p.y-foot.y);if(distance<best.distance)best={distance,path,fraction:i/64};}}return best;}
 function reveal(bodies,shadows,offset,duration=320,runner=false){
 if(runner){
  if(bodies.some(el=>el.dataset.fpRunnerStarted==='1'))return;
  bodies.forEach(el=>{el.dataset.fpRunnerStarted='1';const group=el.closest('.wf-sec8-man2-group');if(group){group.style.setProperty('transition','none','important');group.style.setProperty('transform','none','important');group.style.setProperty('transition-delay','0s','important');group.style.setProperty('opacity','1','important');if(innerWidth<768){group.style.setProperty('transition','none','important');group.style.setProperty('transform','none','important');}}});
 }
 if(runner)[...bodies,...shadows].forEach(el=>{el.style.setProperty('transition','none','important');});
 const elements=[...bodies,...shadows],began=performance.now(),reduced=innerWidth<768||matchMedia('(prefers-reduced-motion: reduce)').matches;elements.forEach(el=>{el.classList.remove('fp-wait-line');el.style.setProperty('transition-delay','0s','important');const art=el.querySelector('img,svg');if(art)art.style.setProperty('animation','none','important');});function frame(now){const t=(reduced||(!runner&&bodies.some(el=>el.closest('[data-motion-caught-up]'))))?1:Math.min(1,(now-began)/(innerWidth<768?duration*.75:duration)),ease=1-Math.pow(1-t,3);elements.forEach(el=>{el.style.setProperty('opacity',String(ease*(shadows.includes(el)?.6:1)),'important');const art=el.querySelector('img,svg');if(art)art.style.setProperty('translate',(offset*(1-ease))+'px 0','important');});if(t<1)requestAnimationFrame(frame);}frame(began);}
 for(const [id,active,bs,ss,offset]of defs){const root=document.getElementById(id),bodies=[...root.querySelectorAll(bs)],shadows=[...root.querySelectorAll(ss)];let started=false;const runner=id==='wf-sec8-root'&&bs.includes('.wf-sec8-man-2');addEventListener('fp:motion-catchup',event=>{if(event.detail.rootId===id)reveal(bodies,shadows,0,runner?440:1,runner);});[...bodies,...shadows].forEach(el=>{el.classList.add('fp-wait-line');el.style.setProperty('opacity','0','important');});new MutationObserver(()=>{if(started||!root.classList.contains(active))return;started=true;requestAnimationFrame(()=>{const body=bodies.find(b=>b.getClientRects().length);const paths=[...root.querySelectorAll(lineSelector)].filter(p=>p.getClientRects().length&&getComputedStyle(p).visibility!=='hidden');const hit=body?nearest(body,paths):null;let delay=0;if(hit?.path){const timing=innerWidth>=768&&window.fpSegTiming?.(hit.path.dataset.k);if(timing)delay=(timing.start+timing.dur*hit.fraction)*1000;else{const style=getComputedStyle(hit.path);delay=(sec(style.transitionDelay.split(',')[0])+sec(style.transitionDuration.split(',')[0])*hit.fraction)*1000;}}setTimeout(()=>reveal(bodies,shadows,offset,runner?440:320,runner),innerWidth<768?0:delay);});}).observe(root,{attributes:true,attributeFilter:['class']});}
 const hero=document.getElementById('s1-root-container'),bodies=[...hero.querySelectorAll('.s1-figure-man-body')],shadows=[...hero.querySelectorAll('.s1-figure-man-shadow')];[...bodies,...shadows].forEach(el=>{el.classList.add('fp-wait-line');el.style.setProperty('opacity','0','important');});let entered=false;
 window.fpHeroLineProgress=()=>{if(entered)return;entered=true;hero.querySelectorAll('.s1-figure-man-box').forEach(box=>{box.style.setProperty('opacity','1','important');box.style.setProperty('transition','none','important');box.style.setProperty('transform','translateX(0)','important');});reveal(bodies,shadows,-30,160);};
})();

;

;/* card-appearance.js */
(() => {const root=document.getElementById('fp-master-root');function update(){root.dataset.cardLook=Number(window.FP_PAGE_CONFIG?.['--s4-card-look'])===1?'solid':'soft';}addEventListener('resize',update);addEventListener('fp:webflow-ready',update);update();})();

;

;/* mobile-static.js */
(() => {const saved=new Map();let queued=false;function update(){queued=false;if(innerWidth>=768){for(const [element,props]of saved)for(const [key,value,priority]of props){if(value)element.style.setProperty(key,value,priority);else element.style.removeProperty(key);}saved.clear();return;}document.querySelectorAll('#fp-master-root path').forEach(path=>{if(!saved.has(path))saved.set(path,['stroke-dashoffset','transition'].map(key=>[key,path.style.getPropertyValue(key),path.style.getPropertyPriority(key)]));path.style.setProperty('transition','none','important');path.style.setProperty('stroke-dashoffset','0','important');});}function soon(){if(!queued){queued=true;requestAnimationFrame(()=>requestAnimationFrame(update));}}addEventListener('fp:webflow-ready',soon);addEventListener('resize',soon);soon();})();

;

;/* text-flow-layout.js */
(() => {
 const pairs=[['.s2p1-dt-container .quote-wrapper','.s2p1-dt-container .quote-text','.s2p1-dt-container .desc-paragraph'],['.s5-d-slogan-block','.s5-d-slogan-text','.s5-d-desc'],[null,'.s5-m-slogan-text','.s5-m-desc'],[null,'.wf-sec8-main-title','.wf-sec8-description'],[null,'.wf-sec8-mob-main-title','.wf-sec8-mob-description'],[null,'.wf-sec7-main-title','.wf-sec7-description'],[null,'.wf-sec7-m-main-title','.wf-sec7-m-description']];
 const entries=pairs.map(([block,text,desc])=>({block:block&&document.querySelector(block),text:document.querySelector(text),desc:document.querySelector(desc)})).filter(e=>e.text&&e.desc);const originals=new Map();let queued=false;
 function restore(el){const saved=originals.get(el);if(!saved)return;if(saved[0])el.style.setProperty('top',...saved);else el.style.removeProperty('top');}
 function update(){queued=false;for(const {block,text,desc}of entries){if(innerWidth>=1200&&text.closest('#wf-sec8-canvas[data-compact="1"]'))continue;restore(desc);if(!text.getClientRects().length||!desc.getClientRects().length)continue;const baseline=parseFloat(getComputedStyle(desc).top);if(!Number.isFinite(baseline))continue;const top=(block?block.offsetTop:0)+text.offsetTop,bottom=top+text.offsetHeight;const tablet=innerWidth>=768&&innerWidth<1200;const minimum=innerWidth<768?16:tablet?45/(parseFloat(getComputedStyle(document.getElementById('fp-master-root')).getPropertyValue('--tablet-scale'))||1):24;const next=tablet?bottom+minimum:Math.max(baseline,bottom+minimum);if(Math.abs(next-baseline)>.5){if(!originals.has(desc))originals.set(desc,[desc.style.getPropertyValue('top'),desc.style.getPropertyPriority('top')]);desc.style.setProperty('top',next+'px','important');}}}
 window.fpTextFlowUpdate=update;
 function soon(){if(!queued){queued=true;requestAnimationFrame(()=>requestAnimationFrame(update));}}
 addEventListener('fp:webflow-ready',soon);addEventListener('resize',soon);document.fonts.ready.then(soon);document.fonts.addEventListener?.('loadingdone',soon);const observer=new ResizeObserver(soon);entries.forEach(({text,desc})=>{observer.observe(text);observer.observe(desc);});soon();
})();

;

;/* desktop-s2-seams.js */
(() => {
 const root=document.getElementById('fp-master-root'),moved=new Set();
 const originalRailStart=[root.style.getPropertyValue('--s2p34-h2-start'),root.style.getPropertyPriority('--s2p34-h2-start')];let ownsRailStart=false;
 const actor=root.querySelector('.s2p34-man-body'),shadow=root.querySelector('.s2p34-man-shadow');
 const margins=new Map([actor,shadow].filter(Boolean).map(el=>[el,el.style.marginTop]));
 const text=root.querySelector('.s2p34-brand-text'),textMargin=text?.style.marginTop||'';
 const content=root.querySelector('.s4-content-wrapper'),contentPadding=content.style.getPropertyValue('padding-top'),contentPriority=content.style.getPropertyPriority('padding-top');
 const raised=root.querySelector('.s4-top-line'),raisedShadow=root.querySelector('.s4-top-man');
 const raisedMargins=new Map([raised,raisedShadow].filter(Boolean).map(el=>[el,[el.style.marginLeft,el.style.marginTop]]));
 const path=key=>root.querySelector('path[data-k="'+key+'"]');
 const screen=(p,end)=>p.getPointAtLength(end?p.getTotalLength():0).matrixTransform(window.fpSvgScreenMatrix(p));
 const local=(p,point)=>point.matrixTransform(window.fpSvgScreenMatrix(p).inverse());
 function snap(a,b){if(!a||!b)return;const target=local(b,screen(a,true)),start=b.getPointAtLength(0);const existing=b.transform.baseVal.consolidate()?.matrix;b.setAttribute('transform',`translate(${(existing?.e||0)+target.x-start.x} ${(existing?.f||0)+target.y-start.y})`);moved.add(b);}
 function bar(key,a,b){const p=path(key);a=path(a);b=path(b);if(!p||!a||!b)return;const start=local(p,screen(a,true)),end=local(p,screen(b,false));p.setAttribute('d',`M ${start.x} ${start.y} H ${end.x}`);p.dataset.desktopSeam='1';snap(p,b);}
 function update(){
  if(contentPadding)content.style.setProperty('padding-top',contentPadding,contentPriority);else content.style.removeProperty('padding-top');
  moved.forEach(p=>p.removeAttribute('transform'));moved.clear();
  for(const [el,margin]of margins)el.style.marginTop=margin;
  if(text)text.style.marginTop=textMargin;
  for(const [el,[left,top]]of raisedMargins){el.style.marginLeft=left;el.style.marginTop=top;}
  if(innerWidth<1200){root.querySelectorAll('[data-desktop-seam]').forEach(p=>delete p.dataset.desktopSeam);if(ownsRailStart){if(originalRailStart[0])root.style.setProperty('--s2p34-h2-start',...originalRailStart);else root.style.removeProperty('--s2p34-h2-start');ownsRailStart=false;}return;}
  bar('s2p1-h1','s2p1-arc1','s2p1-arc2');
  bar('s2p2-h1','s2p2-arc1','s2p2-arc2');
  // The incoming rail owns the entry height; preserve the original next arc shape.
  const previous=path('s2p2-h2'),bend=path('s2p2-arc2');
  if(previous&&bend){const start=local(previous,screen(bend,true)),end=previous.getPointAtLength(previous.getTotalLength());previous.setAttribute('d',`M ${start.x} ${start.y} H ${end.x}`);}
  snap(previous,path('s2p34-arc1'));
  if(actor&&previous){const rect=actor.getBoundingClientRect(),scale=rect.height/(actor.offsetHeight||rect.height)||1,shift=(screen(previous,true).y-rect.bottom)/scale;
   for(const el of [actor,shadow].filter(Boolean))el.style.marginTop=((parseFloat(getComputedStyle(el).marginTop)||0)+shift)+'px';}
  bar('s2p34-h1','s2p34-arc1','s2p34-arc2');
  bar('s2p34-h2','s2p34-arc2','s2p34-arc3');
  if(raised){
   const arc=path('s2p34-arc3'),corner=screen(arc,false),r=raised.getBoundingClientRect(),scale=r.height/(raised.offsetHeight||r.height)||1;
   const section=document.getElementById('s4-root-container').getBoundingClientRect();
   const dx=(section.left+section.width/2-r.left-r.width/2)/scale,dy=(corner.y-r.top-r.height*.05)/scale;
   for(const el of [raised,raisedShadow].filter(Boolean)){el.style.marginLeft=((parseFloat(getComputedStyle(el).marginLeft)||0)+dx)+'px';el.style.marginTop=((parseFloat(getComputedStyle(el).marginTop)||0)+dy)+'px';}
   const aligned=raised.getBoundingClientRect(),target=new DOMPoint(aligned.left+aligned.width*.9,corner.y);
   const desired=local(arc,target),start=arc.getPointAtLength(0);
   arc.setAttribute('transform',`translate(${desired.x-start.x} ${desired.y-start.y})`);moved.add(arc);
   const rail=path('s2p34-h2'),from=local(rail,screen(path('s2p34-arc2'),true)),to=local(rail,screen(arc,false));
   // Persist the same endpoint in the parameter-driven renderer as well as the SVG.
   const endpoint=to.x+'px';
   if(root.style.getPropertyValue('--s2p34-h2-start')!==endpoint)root.style.setProperty('--s2p34-h2-start',endpoint,'important');
   ownsRailStart=true;
   rail.dataset.s=String(to.x);
   rail.setAttribute('d',`M ${from.x} ${from.y} H ${to.x}`);
   // Raising the actor changes the last arc again after bar() has aligned it.
   // The completed rail endpoint must be the final authority for both axes.
   snap(rail,arc);
  }
  if(raisedShadow){
   const title=root.querySelector('.s4-header-title'),man=raisedShadow.getBoundingClientRect(),heading=title?.getBoundingClientRect();
   if(heading&&man.bottom+24>heading.top){
    const content=root.querySelector('.s4-content-wrapper');
    const scale=heading.width/(title.offsetWidth||heading.width)||1;
    const needed=(man.bottom+24-heading.top)/scale;
    content.style.setProperty('padding-top',(parseFloat(getComputedStyle(content).paddingTop)||0)+needed+'px','important');
   }
  }
  if(text){const line=path('s2p34-h1'),rect=text.getBoundingClientRect(),scale=rect.width/(text.offsetWidth||rect.width)||1;
   const target=screen(line,false).y+24;
   text.style.marginTop=((parseFloat(getComputedStyle(text).marginTop)||0)+(target-rect.top)/scale)+'px';}
 }
 let pending=false;
 function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{pending=false;update();})));}
 const previous=window.fpLinesUpdate;
 if(previous)window.fpLinesUpdate=(...args)=>{const result=previous(...args);if(innerWidth>=1200)update();else schedule();return result;};
 addEventListener('fp:webflow-ready',schedule);addEventListener('resize',schedule);document.fonts.ready.then(schedule);
 schedule();
})();

;

;/* title-motion-toggle.js */
(() => {
 // Set true to restore the preserved original page-heading animation.
 window.FP_SECTION_TITLE_MOTION_ENABLED ??= false;
 const root=document.getElementById('fp-master-root');
 if(root)root.dataset.titleMotion=window.FP_SECTION_TITLE_MOTION_ENABLED?'on':'off';
})();

;

;/* s6-wheel-steps.js */
(() => {
 const root=document.getElementById('fp-master-root'),track=document.getElementById('sec6-d-track');
 if(!root||!track)return;
 function unlock(){busy=false;clearTimeout(timer);delete root.dataset.s6GestureBusy;}
 let busy=false,lastWheel=0,started=0,timer=0;
 function release(){
  const now=performance.now(),remaining=Math.max(110-(now-lastWheel),320-(now-started));
  if(remaining>0&&now-started<900){timer=setTimeout(release,remaining);return;}
  busy=false;delete root.dataset.s6GestureBusy;
 }
 function lock(){busy=true;started=lastWheel=performance.now();root.dataset.s6GestureBusy='1';clearTimeout(timer);timer=setTimeout(release,320);}
 function geometry(){
  const rect=track.getBoundingClientRect(),style=getComputedStyle(root);
  const stage=innerWidth<1200?(parseFloat(style.getPropertyValue('--tablet-stage-height'))||760)*(parseFloat(style.getPropertyValue('--tablet-scale'))||1):innerHeight;
  return {rect,travel:rect.height-stage,top:rect.top+scrollY};
 }
 addEventListener('wheel',event=>{
  if(innerWidth<768||event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY)return;
  if(document.querySelector('dialog[open]')||event.target.closest?.('input,textarea,select,[contenteditable="true"],.w-nav-overlay'))return;
  if(busy){
   const {rect,travel,top}=geometry();
   const passedExit=event.deltaY>0&&travel>0&&scrollY>=top+travel-2;
   if(passedExit||rect.bottom<0||rect.top>innerHeight){unlock();return;}
   if(event.cancelable)event.preventDefault();lastWheel=performance.now();return;
  }
  if(!event.cancelable||!window.fpSequenceStarted?.('wf-sec6-root'))return;
  const {rect,travel,top}=geometry();if(travel<=0)return;
  const direction=Math.sign(event.deltaY),progress=(scrollY-top)/travel;
  const header=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'))||110;
  const pixels=Math.abs(event.deltaY)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(direction>0&&((rect.top>header+24&&pixels<rect.top-header-24)||progress>=1))return;
  if(direction<0&&(progress<=0||progress>1.03))return;
  const phase=Math.max(0,Math.min(2,(parseInt(document.getElementById('sec6-d-num').textContent,10)||1)-1));
  // Once stage 3 is settled, native scrolling draws the arc and continues into S7.
  if(direction>0&&phase===2&&progress>=.45)return;
  event.preventDefault();lock();
  if(direction>0&&progress<.08){window.goToSec6Step(0);return;}
  const next=phase+direction;
  if(next>=0&&next<=2){window.goToSec6Step(next);return;}
  window.scrollTo({top:next<0?top-2:top+travel+2,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 },{passive:false});
 addEventListener('resize',()=>{busy=false;clearTimeout(timer);delete root.dataset.s6GestureBusy;});
})();

;

;/* safari-line-compat.js */
(() => {
 const saved=new Map(),root=document.getElementById('fp-master-root');
 if(!root)return;
 // Cover macOS Safari and iOS WebKit, at every viewport width.
 const ua=navigator.userAgent;
 const webkit=CSS.supports('-webkit-touch-callout','none')||(/AppleWebKit/.test(ua)&&/Safari/.test(ua)&&!/(Chrome|Chromium|Edg|OPR|Android)/.test(ua));
 if(webkit){
  root.dataset.fpSafariNoise='off';
  const ids=[...root.querySelectorAll('filter')].filter(filter=>filter.querySelector('feTurbulence')).map(filter=>filter.id).filter(Boolean);
  const style=document.createElement('style');
  // Attribute selectors also cover subsequently cloned SVG paths and groups.
  style.textContent=ids.flatMap(id=>[
   `#fp-master-root [filter*=${JSON.stringify('#'+id)}]`,
   `#fp-master-root [style*=${JSON.stringify('#'+id)}]`
  ]).join(',')+'{filter:none!important}';
  if(ids.length)document.head.appendChild(style);
 }
 function clearFilter(el){if(!saved.has(el))saved.set(el,[el.style.getPropertyValue('filter'),el.style.getPropertyPriority('filter')]);el.style.setProperty('filter','none','important');}
 function update(){
  if(!webkit){
   for(const [el,[value,priority]]of saved){if(value)el.style.setProperty('filter',value,priority);else el.style.removeProperty('filter');}saved.clear();return;
  }
  const cleanSources={"https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d408b7f6f634c31304c_s8-mobile-circle.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40371ba39dd9aac7dd_s8-mobile-circle.clean.svg", "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40ef85390ad43d32c6_s8-mobile-intersect.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40b12f6a7a2adbc6ae_s8-mobile-intersect.clean.svg", "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40991d1fd2cd920b59_s8-mobile-mask1.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d40d6eb5bc4a9ce9130_s8-mobile-mask1.clean.svg", "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d408b7f6f634c3130b7_s8-mobile-mask2.svg": "https://cdn.prod.website-files.com/66f11d3496b859f0be0769bc/6ad61d405ed6263e17864a46_s8-mobile-mask2.clean.svg"};
  root.querySelectorAll('img[src$=".svg"]').forEach(img=>{if(cleanSources[img.src])img.src=cleanSources[img.src];});
  root.querySelectorAll('path.fp-seg,path.fp-track,.fp-fill-path,.fp-baton-arc,.s1-line-path,.mobile-seam-path,.mobile-s6-track path').forEach(path=>{
   clearFilter(path);
   for(let node=path.parentElement;node&&node!==root&&node.tagName.toLowerCase()!=='svg';node=node.parentElement)if(node.hasAttribute('filter')||node.style.filter)clearFilter(node);
  });
 }
 const previous=window.fpLinesUpdate;
 if(previous)window.fpLinesUpdate=(...args)=>{const value=previous(...args);update();return value;};
 addEventListener('resize',()=>requestAnimationFrame(update));addEventListener('fp:webflow-ready',update);document.fonts.ready.then(update);update();
})();

;
})();
