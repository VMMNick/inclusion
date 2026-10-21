/**
 * Однаковий «каркас» розділу для кожного завдання:
 *   заголовок → інструкція → тіло завдання → банер сертифіката → кнопки «Назад / … / Далі».
 * Кнопка «Далі» вмикається автоматично, коли завдання виконано.
 */
import { htmlToElement, $ } from '../core/dom.js';
import { on } from '../core/events.js';
import { session } from '../core/session.js';

export const sectionId = key => `sec-${key}`;

/** @param {import('../types.js').TaskModule} task */
export function createTaskSection(task) {
  const section = htmlToElement(`
    <section id="${sectionId(task.key)}" aria-labelledby="h-${task.key}" class="step-section hidden">
      <h2 id="h-${task.key}" tabindex="-1" class="text-2xl sm:text-3xl font-extrabold mb-2">${task.icon} ${task.title}</h2>
      <p class="text-lg mb-5">${task.intro}</p>
      <div data-role="body">${task.template || ''}</div>
      <div data-role="cert-slot" data-cert-slot="${task.key}" class="mt-5"></div>
      <div class="mt-6 flex flex-wrap gap-3 justify-between">
        <button type="button" data-nav="prev" class="px-6 py-3 rounded-full bg-white border-2 border-lavender-mid font-bold hover:bg-lavender-soft">◀ Назад</button>
        <div class="flex flex-wrap gap-3">
          ${task.actions || ''}
          <button id="${task.key}-next" type="button" data-nav="next" disabled
            class="px-6 py-3 rounded-full bg-lavender-deep text-white font-extrabold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed">Далі ▶</button>
        </div>
      </div>
    </section>`);

  const nextButton = /** @type {HTMLButtonElement} */ ($('[data-nav="next"]', section));
  const sync = () => { nextButton.disabled = !session.completed.has(task.key); };
  on('task:completed', ({ key }) => { if (key === task.key) sync(); });
  on('session:reset', sync);

  return {
    section,
    body: /** @type {HTMLElement} */ ($('[data-role="body"]', section)),
    certSlot: /** @type {HTMLElement} */ ($('[data-role="cert-slot"]', section)),
    nextButton
  };
}
