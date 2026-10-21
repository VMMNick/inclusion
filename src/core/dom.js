/** Дрібні DOM-утиліти, спільні для всіх модулів. */

/** Перший елемент за селектором (у root або в документі). */
export const $ = (sel, root = document) => root.querySelector(sel);

/** Усі елементи за селектором як масив. */
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Безпечне вставлення тексту користувача в HTML. */
export const escapeHTML = str =>
  String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Чи просить система «менше руху». */
export const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Фокус без прокручування (щоб сторінка не «стрибала»). */
export const focusQuietly = el => { if (el) el.focus({ preventScroll: true }); };

/** Сьогоднішня дата українською: «8 жовтня 2026 р.» */
export const todayText = () =>
  new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

/** Розмітка з рядка (перший елемент). */
export function htmlToElement(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return /** @type {HTMLElement} */ (tpl.content.firstElementChild);
}
