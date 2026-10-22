/**
 * Робо-друг: маленький помічник у кутку екрана.
 *  • Натиснув на нього — нова цікавинка (інтерактив за бажанням дитини).
 *  • Реагує на відповіді: хвалить або підбадьорює (лише коли «Ефекти» ввімкнені).
 *  • Фрази — у src/data/mascot.js.
 *  • Хмаринка «прозора» для натискань (pointer-events: none), тож ніколи не заважає
 *    натиснути кнопку під нею; закрити її можна хрестиком.
 */
import { MASCOT } from '../../data/mascot.js';
import { $, htmlToElement } from '../../core/dom.js';
import { on } from '../../core/events.js';
import { session } from '../../core/session.js';
import { sounds } from '../../core/audio.js';
import { effectsOn, pop } from '../../ui/effects.js';

/** Наступна фраза зі списку без повторів підряд (по колу). */
function cycler(list) {
  let i = -1;
  return () => list[(i = (i + 1) % list.length)];
}

export function mountMascot() {
  const root = htmlToElement(`
    <div id="mascot" class="no-print fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex items-end gap-2 pointer-events-none">
      <div data-role="bubble" class="hidden max-w-[12rem] sm:max-w-xs bg-white border-2 border-lavender-mid rounded-3xl rounded-br-md px-3 py-2 sm:px-4 sm:py-3 shadow-md text-sm sm:text-base font-bold relative">
        <span data-role="text"></span>
        <button type="button" data-role="close" aria-label="Сховати повідомлення Робо"
          class="pointer-events-auto absolute -top-3 -left-3 w-7 h-7 rounded-full bg-white border-2 border-lavender-mid text-sm leading-none hover:bg-lavender-soft">✕</button>
      </div>
      <button type="button" data-role="robo" aria-label="${MASCOT.name}: натисни, щоб почути цікавинку"
        class="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-lavender-mid shadow-md text-3xl sm:text-4xl hover:bg-lavender-soft">
        <span data-role="face" class="inline-block" aria-hidden="true">🤖</span>
      </button>
    </div>`);
  document.body.append(root);

  const bubble = $('[data-role="bubble"]', root);
  const text = $('[data-role="text"]', root);
  const face = $('[data-role="face"]', root);
  // Окремий «голос» для екранних читачів лише для цікавинок, які дитина попросила сама
  const live = htmlToElement('<div class="sr-only" role="status" aria-live="polite"></div>');
  root.append(live);

  const nextFact = cycler(MASCOT.facts);
  const nextPraise = cycler(MASCOT.praise);
  const nextEncourage = cycler(MASCOT.encourage);
  const nextCompleted = cycler(MASCOT.completed);
  let hideTimer = null;

  function say(message, { announce = false, keep = false } = {}) {
    text.textContent = message;
    bubble.classList.remove('hidden', 'mascot-bubble');
    void bubble.offsetWidth;
    bubble.classList.add('mascot-bubble');
    if (effectsOn()) {
      face.classList.remove('mascot-wave');
      void face.offsetWidth;
      face.classList.add('mascot-wave');
    }
    if (announce) live.textContent = message;
    clearTimeout(hideTimer);
    // Реакції зникають самі; цікавинка лишається, доки дитина її не закриє
    if (!keep) hideTimer = setTimeout(hide, 5000);
  }
  function hide() {
    clearTimeout(hideTimer);
    bubble.classList.add('hidden');
  }

  $('[data-role="robo"]', root).addEventListener('click', () => {
    sounds.select();
    say(nextFact(), { announce: true, keep: true });
  });
  $('[data-role="close"]', root).addEventListener('click', hide);

  // Реакції — лише коли «Ефекти» ввімкнені (інакше Робо мовчить, поки його не натиснуть)
  on('answer:correct', () => { if (session.effectsEnabled) say(nextPraise()); });
  on('answer:hint', () => { if (session.effectsEnabled) say(nextEncourage()); });
  on('task:completed', () => { if (session.effectsEnabled) { say(nextCompleted()); pop(face); } });
  on('page:changed', ({ index }) => { if (index === 0) say(MASCOT.hello); else hide(); });

  return { say, hide };
}
