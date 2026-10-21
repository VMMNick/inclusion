/**
 * Стан уроку, спільний для всіх модулів.
 * Власний стан кожного завдання (картки, програма робота…) живе в модулі завдання.
 * Нічого не зберігається між відкриттями сторінки — це свідомо (приватність дітей).
 */
import { emit } from './events.js';

export const session = {
  /** @type {Set<string>} обрані для проходження завдання */
  selected: new Set(),
  /** @type {Set<string>} виконані завдання */
  completed: new Set(),
  /** ім’я на сертифікатах ('' — лінія для вписування ручкою) */
  studentName: '',
  soundEnabled: false,
  /** true, поки триває анімація (наприклад, робот іде) — навігація тимчасово вимкнена */
  busy: false
};

export function completeTask(key) {
  if (session.completed.has(key)) return;
  session.completed.add(key);
  emit('task:completed', { key });
}

export const isCompleted = key => session.completed.has(key);

export function setStudentName(name) {
  session.studentName = name;
  emit('name:changed', { name });
}

export function setSelected(keys) {
  session.selected = new Set(keys);
  emit('selection:changed');
}

export function toggleSelected(key) {
  session.selected.has(key) ? session.selected.delete(key) : session.selected.add(key);
  emit('selection:changed');
}

export function setBusy(value) {
  session.busy = value;
}

/** Скидає прогрес (обрані завдання залишаються). */
export function resetProgress() {
  session.completed.clear();
  session.busy = false;
  emit('session:reset');
}
