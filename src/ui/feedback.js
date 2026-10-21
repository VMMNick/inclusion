/**
 * М'які повідомлення: зелене (вдалося), жовте (підказка), лавандове (інформація).
 * Червоного «помилка» немає свідомо — без покарань.
 */
const TONES = {
  ok:   { cls: 'bg-mint-soft border-mint-mid text-mint-deep',             icon: '🌟' },
  hint: { cls: 'bg-butter-soft border-butter-mid text-butter-deep',       icon: '💡' },
  info: { cls: 'bg-lavender-soft border-lavender-mid text-lavender-deep', icon: '👉' }
};

/**
 * @typedef {{ tone: 'ok'|'hint'|'info', text: string }} Message
 * @param {Message | null} msg
 */
export function feedbackHTML(msg) {
  if (!msg) return '';
  const t = TONES[msg.tone];
  return `<div class="flex gap-3 items-start border-2 rounded-3xl px-5 py-4 text-lg font-bold ${t.cls}">
      <span class="text-2xl" aria-hidden="true">${t.icon}</span><span>${msg.text}</span></div>`;
}

/** @param {HTMLElement} el @param {Message | null} msg */
export function setFeedback(el, msg) {
  el.innerHTML = feedbackHTML(msg);
}

/**
 * Рядок крапочок прогресу (задачки вікторини, рівні робота).
 * @param {number} total @param {number} current @param {(i:number)=>boolean} isDone
 */
export function progressDotsHTML(total, current, isDone) {
  return Array.from({ length: total }, (_, i) => {
    const cls = isDone(i) ? 'bg-mint-mid border-mint-deep' : i === current ? 'bg-lavender-mid border-lavender-deep' : 'bg-white border-lavender-mid';
    return `<span class="w-4 h-4 rounded-full border-2 ${cls}"></span>`;
  }).join('');
}
