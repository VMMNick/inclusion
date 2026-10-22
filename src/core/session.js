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
  /** м'які анімації успіху (конфеті, іскорки, реакції Робо) */
  effectsEnabled: true,
  /** зірочки, зароблені за урок */
  stars: 0,
  /** true, поки триває анімація (наприклад, робот іде) — навігація тимчасово вимкнена */
  busy: false
};

export function completeTask(key) {
  if (session.completed.has(key)) return;
  session.completed.add(key);
  emit('task:completed', { key });
  addStars(3);
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

/**
 * Правильна відповідь / вдалий крок. target — елемент, від якого «злітає» зірочка.
 * @param {HTMLElement | null} [target]
 */
export function reportCorrect(target = null) {
  addStars(1, target);
  emit('answer:correct', { target });
}

/** Невдала спроба — лише м'яка підтримка, без покарань. */
export function reportHint() {
  emit('answer:hint');
}

export function addStars(count, target = null) {
  session.stars += count;
  emit('stars:changed', { stars: session.stars, added: count, target });
}

export function setBusy(value) {
  session.busy = value;
}

/** Скидає прогрес (обрані завдання залишаються). */
export function resetProgress() {
  session.completed.clear();
  session.busy = false;
  session.stars = 0;
  emit('session:reset');
  emit('stars:changed', { stars: 0, added: 0, target: null });
}
