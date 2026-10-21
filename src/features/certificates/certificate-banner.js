/**
 * Банер «Ти отримуєш сертифікат…» під завданням — з’являється, щойно його виконано.
 */
import { on } from '../../core/events.js';
import { session } from '../../core/session.js';
import { themeOf } from '../../config/themes.js';
import { certFor } from './certificate.js';

/** @param {HTMLElement} slot @param {import('../../types.js').TaskModule} task */
export function mountCertificateBanner(slot, task) {
  const render = () => {
    if (!session.completed.has(task.key)) { slot.innerHTML = ''; return; }
    const th = themeOf(task.theme);
    slot.innerHTML = `
      <div class="flex flex-wrap items-center gap-4 border-2 ${th.zone} rounded-3xl px-5 py-4">
        <span class="text-4xl" aria-hidden="true">🏅</span>
        <p class="flex-1 text-lg font-bold">Ти отримуєш сертифікат «${certFor(task).title}»!</p>
        <button type="button" data-open-cert="${task.key}"
          class="px-5 py-3 rounded-full bg-white border-2 ${th.card} font-extrabold hover:opacity-90">📜 Подивитись і надрукувати</button>
      </div>`;
  };
  on('task:completed', ({ key }) => { if (key === task.key) render(); });
  on('session:reset', render);
  render();
}
