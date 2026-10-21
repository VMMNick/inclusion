/**
 * Навігація між екранами: «Далі», «Назад», панель кроків.
 * Невибрані завдання пропускаються. Перший (вітання) і останній (нагорода) екрани є завжди.
 */
import { $, $$, focusQuietly } from './dom.js';
import { emit } from './events.js';
import { session } from './session.js';

/**
 * Наступний доступний екран у напрямку dir (+1 / −1). Чиста функція — її перевіряють тести.
 * @param {{key?: string}[]} pages
 * @param {number} from
 * @param {1|-1} dir
 * @param {(page: {key?: string}) => boolean} isIncluded
 */
export function nextIncluded(pages, from, dir, isIncluded) {
  let i = from + dir;
  while (i > 0 && i < pages.length - 1 && !isIncluded(pages[i])) i += dir;
  return Math.min(pages.length - 1, Math.max(0, i));
}

/**
 * @typedef {Object} Page
 * @property {string} id         id елемента <section>
 * @property {string} label
 * @property {string} icon
 * @property {string} [key]      ключ завдання (у вітання й нагороди немає)
 * @property {() => void} [onEnter]
 */

/** @param {Page[]} pages */
export function createRouter(pages) {
  let current = 0;
  const isIncluded = page => !page.key || session.selected.has(page.key);

  function renderStepper() {
    const visible = pages.map((p, idx) => ({ ...p, idx })).filter(isIncluded);
    $('#stepper').innerHTML = visible.map((p, i) => {
      const active = p.idx === current;
      const done = p.key ? session.completed.has(p.key) : p.idx < current;
      const cls = active
        ? 'bg-lavender-deep text-white border-lavender-deep'
        : done ? 'bg-mint-mid border-mint-mid hover:bg-mint-soft' : 'bg-white border-lavender-mid text-ink/70 hover:bg-lavender-soft';
      const sep = i < visible.length - 1 ? '<li aria-hidden="true" class="hidden sm:block w-2 h-1 rounded bg-lavender-mid"></li>' : '';
      return `<li><button type="button" data-jump="${p.idx}" ${active ? 'aria-current="step"' : ''} title="${p.label}"
          class="flex items-center gap-1 px-2 py-1 rounded-full border-2 font-bold text-sm ${cls}">
          <span aria-hidden="true">${done && !active ? '✓' : p.icon}</span>
          <span class="hidden 2xl:inline">${p.label}</span>
          <span class="2xl:hidden" aria-hidden="true">${i + 1}</span>
          <span class="sr-only">Перейти: ${p.label}${done ? ', виконано' : ''}</span>
        </button></li>${sep}`;
    }).join('');
  }

  function goTo(index) {
    if (session.busy) return;
    current = index;
    const page = pages[index];
    $$('.step-section').forEach(sec => sec.classList.add('hidden'));
    const section = $(`#${page.id}`);
    section.classList.remove('hidden');
    renderStepper();
    if (page.onEnter) page.onEnter();
    window.scrollTo({ top: 0 });
    focusQuietly(section.querySelector('[tabindex="-1"]'));
    emit('page:changed', { index });
  }

  const step = dir => goTo(nextIncluded(pages, current, dir, isIncluded));

  // Кнопки «Далі» / «Назад» у будь-якому розділі
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn && !btn.disabled) step(btn.dataset.nav === 'next' ? 1 : -1);
  });
  // Панель кроків
  $('#stepper').addEventListener('click', e => {
    const btn = e.target.closest('[data-jump]');
    if (btn) goTo(Number(btn.dataset.jump));
  });

  return {
    goTo,
    next: () => step(1),
    /** Перший обраний розділ після вітання */
    start: () => goTo(nextIncluded(pages, 0, 1, isIncluded)),
    renderStepper,
    get current() { return current; }
  };
}
