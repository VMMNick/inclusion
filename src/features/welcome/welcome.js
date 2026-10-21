/**
 * Вітальний екран: вибір завдань для проходження.
 */
import template from './welcome.html?raw';
import { $, htmlToElement, focusQuietly } from '../../core/dom.js';
import { on } from '../../core/events.js';
import { session, toggleSelected, setSelected } from '../../core/session.js';
import { sounds } from '../../core/audio.js';
import { themeOf } from '../../config/themes.js';

/**
 * @param {import('../../types.js').TaskModule[]} tasks
 * @param {{ onStart: () => void }} handlers
 */
export function createWelcome(tasks, { onStart }) {
  const section = htmlToElement(template);
  const picker = $('[data-role="picker"]', section);
  const count = $('[data-role="count"]', section);
  const startBtn = /** @type {HTMLButtonElement} */ ($('[data-action="start"]', section));

  function render() {
    picker.innerHTML = tasks.map(t => {
      const selected = session.selected.has(t.key);
      const look = selected ? `${themeOf(t.theme).zone} border-4` : 'bg-white border-2 border-dashed border-lavender-mid opacity-70';
      return `<button type="button" data-task-key="${t.key}" aria-pressed="${selected}"
          class="card flex gap-4 items-start rounded-3xl p-5 text-left ${look}">
          <span class="text-4xl" aria-hidden="true">${t.icon}</span>
          <span class="flex-1"><b class="block text-lg">${t.title}</b>${t.desc}</span>
          <span class="text-2xl" aria-hidden="true">${selected ? '✅' : '⬜'}</span>
        </button>`;
    }).join('');
    const n = session.selected.size;
    count.textContent = n ? `Обрано завдань: ${n} з ${tasks.length}` : 'Обери хоча б одне завдання 🙂';
    startBtn.disabled = n === 0;
  }

  picker.addEventListener('click', e => {
    const btn = e.target.closest('[data-task-key]');
    if (!btn) return;
    const key = btn.dataset.taskKey;
    toggleSelected(key);
    sounds.select();
    focusQuietly($(`[data-task-key="${key}"]`, picker));
  });
  $('[data-action="pick-all"]', section).addEventListener('click', () => setSelected(tasks.map(t => t.key)));
  $('[data-action="pick-none"]', section).addEventListener('click', () => setSelected([]));
  startBtn.addEventListener('click', () => { if (session.selected.size) onStart(); });

  on('selection:changed', render);
  render();

  return { section };
}
