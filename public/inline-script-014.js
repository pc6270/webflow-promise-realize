
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

  window.addEventListener('resize', function() {
    var activeBtn = document.querySelector('.s4-tab-btn.active');
    var btns = Array.from(document.querySelectorAll('.s4-tab-btn'));
    if (activeBtn) {
      var index = btns.indexOf(activeBtn);
      if (index >= 0) switchS4Tab(index);
    }
  });

  // 僅在手機版 (<= 768px) 啟用直向卡片點擊展合 Toggle
  document.addEventListener('DOMContentLoaded', function() {
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
