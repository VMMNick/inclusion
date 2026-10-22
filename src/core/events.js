/**
 * Маленька шина подій: модулі повідомляють один одного, не знаючи один про одного.
 *
 * Події застосунку:
 *   'task:completed'  { key }   — завдання виконано
 *   'session:reset'             — «Пройти ще раз»
 *   'name:changed'    { name }  — змінилось ім’я на сертифікаті
 *   'selection:changed'         — змінився набір обраних завдань
 *   'page:changed'    { index } — відкрито інший екран
 *   'answer:correct'  { target } — правильна відповідь (іскорки, +1 ⭐, похвала Робо)
 *   'answer:hint'               — невдала спроба (Робо підбадьорює)
 *   'stars:changed'   { stars, added, target } — змінилась кількість зірочок
 */
const listeners = new Map();

/** Підписатися. Повертає функцію відписки. */
export function on(type, handler) {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(handler);
  return () => listeners.get(type).delete(handler);
}

export function emit(type, detail) {
  (listeners.get(type) || []).forEach(handler => handler(detail));
}

/** Лише для тестів: прибрати всі підписки. */
export function clearAllListeners() {
  listeners.clear();
}
