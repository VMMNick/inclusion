/**
 * Збирає застосунок: вітання → розділи завдань із реєстру → нагорода.
 * Тут немає логіки окремих завдань — лише «склеювання» модулів.
 */
import { $ } from './core/dom.js';
import { on } from './core/events.js';
import { session, completeTask, setSelected, setStudentName, resetProgress } from './core/session.js';
import { mountSoundToggle } from './core/audio.js';
import { createRouter } from './core/router.js';
import { createTaskSection, sectionId } from './ui/task-section.js';
import { createWelcome } from './features/welcome/welcome.js';
import { createFinalAward } from './features/certificates/final-award.js';
import { mountCertificateBanner } from './features/certificates/certificate-banner.js';
import { mountCertificateModal } from './features/certificates/certificate-modal.js';

/** @param {import('./types.js').TaskModule[]} tasks */
export function createApp(tasks) {
  const main = $('#app');
  const taskByKey = key => tasks.find(t => t.key === key);

  // За замовчуванням обрано все
  setSelected(tasks.map(t => t.key));

  // 1. Вітання
  const welcome = createWelcome(tasks, { onStart: () => router.start() });
  main.append(welcome.section);

  // 2. Розділи завдань
  for (const task of tasks) {
    const { section, body, certSlot, nextButton } = createTaskSection(task);
    main.append(section);
    mountCertificateBanner(certSlot, task);
    task.mount({ section, body, nextButton, complete: () => completeTask(task.key) });
  }

  // 3. Нагорода
  const award = createFinalAward(tasks, {
    onRestart: () => {
      resetProgress();
      tasks.forEach(t => t.reset());
      setStudentName('');
      router.goTo(0);
    }
  });
  main.append(award.section);

  // Порядок екранів
  const pages = [
    { id: welcome.section.id, label: 'Привіт', icon: '👋' },
    ...tasks.map(t => ({ id: sectionId(t.key), key: t.key, label: t.label, icon: t.icon, onEnter: t.onEnter })),
    { id: award.section.id, label: 'Нагорода', icon: '🏅', onEnter: award.render }
  ];
  const router = createRouter(pages);

  mountSoundToggle();
  mountCertificateModal(taskByKey);

  // Панель кроків оновлюється, коли щось змінюється
  on('task:completed', router.renderStepper);
  on('selection:changed', router.renderStepper);
  on('session:reset', router.renderStepper);

  $('#app-version').textContent = __APP_VERSION__;
  router.goTo(0);

  return { router, session, tasks };
}
