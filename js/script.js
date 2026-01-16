const revealOnScroll = () => {
  // 実行されるたびに、最新の状態で .reveal 要素を探し直す
  const elements = document.querySelectorAll('.reveal');
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.85;
    
    if (isVisible) {
      el.classList.add('is-show');
    }
  });
};

// スクロールと読み込み完了時に実行
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- 既存のヘッダー・バー切り替え ---
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('#scroll-trigger');
  const header = document.querySelector('#global-header');
  const bar = document.querySelector('#sticky-bar');

  if (trigger && header && bar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('is-show');
          bar.classList.add('is-hide');
        } else {
          header.classList.remove('is-show');
          bar.classList.remove('is-hide');
        }
      });
    }, { threshold: 0 });
    observer.observe(trigger);
  }
});

// --- 2. バッジの切り替え（時間判定付き） ---
const statusBadge = document.getElementById('shop-status');
if (statusBadge) {
  const now = new Date();
  const hour = now.getHours(); // 現在の「時」を取得
  
  const todayStatus = 'open'; // 'open', 'holiday', 'temp'

  if (todayStatus === 'holiday') {
    statusBadge.textContent = '定休日';
    statusBadge.className = 'badge-status status-holiday';
  } else if (todayStatus === 'temp') {
    statusBadge.textContent = '臨時休業';
    statusBadge.className = 'badge-status status-temp-close';
  } else if (hour < 10 || hour >= 18) {
    // ★ 10時より前、または18時以降の場合
    statusBadge.textContent = '営業時間外';
    statusBadge.className = 'badge-status status-close'; // 新しいクラス
  } else {
    // それ以外（10:00〜17:59）かつ open の場合
    statusBadge.textContent = '営業中';
    statusBadge.className = 'badge-status status-open';
  }
}