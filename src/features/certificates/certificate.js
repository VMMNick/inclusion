/**
 * Тематичний сертифікат категорії: дані й розмітка.
 */
import { CERTS } from '../../data/certificates.js';
import { themeOf } from '../../config/themes.js';
import { escapeHTML, todayText } from '../../core/dom.js';
import { session } from '../../core/session.js';

/** Звання й орнамент для завдання (з запасним варіантом). */
export function certFor(task) {
  return CERTS[task.key] || { title: `Знавець: ${task.title}`, decor: [task.icon, '⭐', task.icon, '⭐'] };
}

export const skillText = task => (typeof task.skill === 'function' ? task.skill() : task.skill);

/**
 * Ім’я на сертифікаті. Якщо порожньо — лінія для вписування ручкою;
 * сіра підказка «тут буде ім’я» видна лише на екрані (на друк не йде).
 */
export function nameHTML(name = session.studentName) {
  const clean = (name || '').trim();
  return clean
    ? escapeHTML(clean)
    : '<span class="no-print text-ink/30 text-lg font-semibold">тут буде ім’я</span>';
}

/** @param {import('../../types.js').TaskModule} task */
export function certificateCardHTML(task) {
  const c = certFor(task);
  const th = themeOf(task.theme);
  const row = Array.from({ length: 8 }, (_, i) => `<span>${c.decor[i % c.decor.length]}</span>`).join('');
  return `
    <div class="rounded-4xl border-[10px] border-double ${th.zone} px-4 py-6 sm:p-10 text-center bg-white overflow-hidden">
      <p class="cert-decor mb-4 select-none" aria-hidden="true">${row}</p>
      <div class="text-7xl mb-2" aria-hidden="true">${task.icon}</div>
      <p class="uppercase tracking-widest font-bold ${th.title} mb-1">Сертифікат</p>
      <h2 id="cm-title" tabindex="-1" class="cert-title font-extrabold mb-4 ${th.title}">${c.title}</h2>
      <p class="text-lg mb-2">вручається</p>
      <p class="cm-name cert-name-line font-extrabold border-b-2 ${th.card} block w-full max-w-md mx-auto pb-1 mb-4">${nameHTML()}</p>
      <p class="text-lg mb-1">за те, що ${skillText(task)}.</p>
      <p class="text-base text-ink/70 mb-4">Категорія: «${task.title}» · Лабораторія логіки</p>
      <p class="text-base text-ink/70">${todayText()}</p>
      <p class="cert-decor mt-4 select-none" aria-hidden="true">${row}</p>
    </div>`;
}
