/**
 * Вікно сертифіката: перегляд, поле «Кому видається», друк.
 * Фокус утримується всередині вікна; Esc або клік по фону — закрити.
 */
import { $, $$, focusQuietly } from '../../core/dom.js';
import { on } from '../../core/events.js';
import { session, setStudentName } from '../../core/session.js';
import { sounds } from '../../core/audio.js';
import { certificateCardHTML, nameHTML } from './certificate.js';

/** @param {(key: string) => import('../../types.js').TaskModule} getTask */
export function mountCertificateModal(getTask) {
  const modal = $('#cert-modal');
  const nameInput = /** @type {HTMLInputElement} */ ($('#cm-name'));
  let openKey = null;
  let lastFocus = null;

  function open(key) {
    openKey = key;
    lastFocus = document.activeElement;
    $('#cm-card').innerHTML = certificateCardHTML(getTask(key));
    nameInput.value = session.studentName;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    sounds.success();
    focusQuietly($('#cm-title'));
  }

  function close() {
    if (!openKey) return;
    openKey = null;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    if (lastFocus && document.contains(lastFocus)) focusQuietly(lastFocus);
  }

  // Будь-яка кнопка з data-open-cert="<key>" відкриває сертифікат
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-open-cert]');
    if (btn) open(btn.dataset.openCert);
  });
  $('#cm-close').addEventListener('click', close);
  $('#cm-print').addEventListener('click', () => window.print());
  nameInput.addEventListener('input', () => setStudentName(nameInput.value));
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  document.addEventListener('keydown', e => {
    if (!openKey) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const focusables = $$('button, input, [tabindex="-1"]', modal);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); focusQuietly(last); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); focusQuietly(first); }
    }
  });

  // Ім’я змінили деінде (наприклад, на фінальній нагороді) — оновлюємо вікно
  on('name:changed', ({ name }) => {
    $$('.cm-name', modal).forEach(el => (el.innerHTML = nameHTML()));
    if (nameInput.value !== name) nameInput.value = name;
  });

  return { open, close };
}
