/**
 * Фінальна нагорода «Магістр Логіки» + список зароблених тематичних сертифікатів.
 */
import template from './final-award.html?raw';
import { $, htmlToElement, todayText } from '../../core/dom.js';
import { on } from '../../core/events.js';
import { session, setStudentName } from '../../core/session.js';
import { themeOf } from '../../config/themes.js';
import { certFor, nameHTML, skillText } from './certificate.js';

/**
 * @param {import('../../types.js').TaskModule[]} tasks
 * @param {{ onRestart: () => void }} handlers
 */
export function createFinalAward(tasks, { onRestart }) {
  const section = htmlToElement(template);
  const nameInput = /** @type {HTMLInputElement} */ ($('#student-name', section));
  const el = {
    name: $('[data-role="name"]', section),
    skills: $('[data-role="skills"]', section),
    summary: $('[data-role="summary"]', section),
    badges: $('[data-role="badges"]', section),
    date: $('[data-role="date"]', section)
  };

  function render() {
    const earned = tasks.filter(t => session.selected.has(t.key) && session.completed.has(t.key));

    el.name.innerHTML = nameHTML();
    el.skills.innerHTML = earned.length
      ? earned.map(t => `<li>✅ ${skillText(t)} <span aria-hidden="true">${t.icon}</span></li>`).join('')
      : '<li>🌱 сміливо досліджує світ логіки</li>';

    const notes = earned.filter(t => t.awardNote).map(t => t.awardNote());
    el.summary.textContent = [`🏅 Виконано завдань: ${earned.length} з ${session.selected.size}`, `⭐ Зірочок: ${session.stars}`, ...notes].join(' · ');

    el.badges.innerHTML = earned.map(t => `<button type="button" data-open-cert="${t.key}"
        class="flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold ${themeOf(t.theme).zone} hover:opacity-90">
        <span aria-hidden="true">${t.icon}</span> ${certFor(t).title}</button>`).join('')
      || '<p class="text-ink/60">Пройди будь-яку категорію — і тут з’явиться сертифікат.</p>';

    el.date.textContent = todayText();
  }

  nameInput.addEventListener('input', () => setStudentName(nameInput.value));
  on('name:changed', ({ name }) => {
    if (nameInput.value !== name) nameInput.value = name;
    el.name.innerHTML = nameHTML();
  });
  $('[data-action="print"]', section).addEventListener('click', () => window.print());
  $('[data-action="restart"]', section).addEventListener('click', onRestart);

  return { section, render };
}
