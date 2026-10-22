/**
 * Наскрізна перевірка: застосунок збирається в DOM, учень обирає завдання,
 * проходить їх, отримує сертифікати, вписує ім’я і починає знову.
 */
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const click = s => { const el = typeof s === 'string' ? $(s) : s; expect(el, String(s)).toBeTruthy(); el.click(); };
const visibleSection = () => $$('.step-section').find(s => !s.classList.contains('hidden'))?.id;

/** Розв’язує вікторину, натискаючи варіанти по черзі. */
function solveQuiz(root) {
  for (let guard = 0; guard < 100; guard++) {
    const free = root.querySelector('[data-opt]:not([disabled])');
    const next = root.querySelector('[data-quiz-next]');
    if (next) { next.click(); continue; }
    if (!free) return;
    free.click();
  }
}

let app;

beforeAll(async () => {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8');
  document.body.innerHTML = html.split('<body')[1].split('>').slice(1).join('>').split('</body>')[0];
  window.scrollTo = () => {};
  window.print = vi.fn();
  Element.prototype.scrollIntoView = () => {};
  HTMLCanvasElement.prototype.getContext = () => null;   // у jsdom немає canvas — конфеті просто пропускається
  globalThis.fetch = vi.fn(async () => { throw new Error('offline'); });

  const { createApp } = await import('../src/app.js');
  const { TASKS } = await import('../src/tasks/registry.js');
  app = createApp(TASKS);
});

describe('застосунок', () => {
  it('стартує з вибором усіх завдань, Робо вітається', () => {
    expect(visibleSection()).toBe('sec-welcome');
    expect($('#mascot [data-role="text"]').textContent).toContain('Привіт');
    expect($('#star-count').textContent).toBe('0');
    expect($$('[data-task-key]').length).toBe(app.tasks.length);
    expect($('[data-role="count"]').textContent).toContain(`${app.tasks.length} з ${app.tasks.length}`);
  });

  it('«Зняти всі» вимикає кнопку «Почати»', () => {
    click('[data-action="pick-none"]');
    expect($('[data-action="start"]').disabled).toBe(true);
    expect($$('#stepper [data-jump]').length).toBe(2);
  });

  it('пропускає невибрані завдання', () => {
    ['sorting', 'algo', 'odd', 'robot', 'cars', 'space'].forEach(k => click(`[data-task-key="${k}"]`));
    click('[data-action="start"]');
    expect(visibleSection()).toBe('sec-sorting');
  });

  it('сортування: підказка, помилка без покарання, правильне розв’язання', async () => {
    const sec = $('#sec-sorting');
    click(sec.querySelector('[data-action="check"]'));
    expect(sec.textContent).toContain('Ще залишились картки');

    // Спершу кладемо все в одну коробку — отримуємо м'яку підказку 🔍
    const { SORTING_LEVELS } = await import('../src/data/sorting-levels.js');
    const items = SORTING_LEVELS[0].items;
    for (const item of items) {
      click(sec.querySelector(`[data-card="${item.id}"]`));
      click(sec.querySelector('[data-zone="hardware"]'));
    }
    click(sec.querySelector('[data-action="check"]'));
    expect(sec.querySelectorAll('.needs-review').length).toBe(items.filter(i => i.category !== 'hardware').length);
    expect(sec.querySelector('[data-nav="next"]').disabled).toBe(true);

    // Тепер правильно
    for (const item of items) {
      click(sec.querySelector(`[data-card="${item.id}"]`));
      click(sec.querySelector(`[data-zone="${item.category}"]`));
    }
    click(sec.querySelector('[data-action="check"]'));
    expect(sec.querySelector('[data-nav="next"]').disabled).toBe(false);
    expect(sec.querySelector('[data-cert-slot]').textContent).toContain('Майстер сортування');
    click(sec.querySelector('[data-nav="next"]'));
    expect(visibleSection()).toBe('sec-algo');
  });

  it('алгоритм: складаємо правильний порядок', async () => {
    const sec = $('#sec-algo');
    const { ALGO_TOPICS } = await import('../src/data/algorithm-topics.js');
    const want = ALGO_TOPICS[0].steps.map(s => s.id);
    for (let i = 0; i < 30; i++) {
      const order = $$('#sec-algo [data-move="up"]').map(b => b.dataset.id);
      const wrongAt = order.findIndex((id, k) => id !== want[k]);
      if (wrongAt < 0) break;
      click(sec.querySelector(`[data-move="up"][data-id="${want[wrongAt]}"]`));
    }
    click(sec.querySelector('[data-action="check"]'));
    expect(sec.querySelector('[data-nav="next"]').disabled).toBe(false);
    click(sec.querySelector('[data-nav="next"]'));
    expect(visibleSection()).toBe('sec-odd');
  });

  it('вікторина: підказка прибирає зайвий варіант, але лишає щонайменше два', () => {
    const root = $('#sec-odd [data-role="quiz"]');
    click(root.querySelector('[data-quiz-hint]'));
    click(root.querySelector('[data-quiz-hint]'));
    expect(root.querySelectorAll('.option-hidden').length).toBe(2);
    expect(root.querySelector('[data-quiz-hint]')).toBeNull();
    expect(root.querySelectorAll('[data-opt]:not([disabled])').length).toBe(2);
  });

  it('вікторина: неправильна відповідь — підтримка Робо, правильна — зірочка', () => {
    const root = $('#sec-odd [data-role="quiz"]');
    const before = app.session.stars;
    click(root.querySelector('[data-opt]:not([disabled]):not([data-opt="apple"])'));
    expect($('#mascot [data-role="bubble"]').classList.contains('hidden')).toBe(false);
    click(root.querySelector('[data-opt="apple"]'));
    expect(app.session.stars).toBe(before + 1);
  });

  it('вікторина: неправильна відповідь не блокує, правильна веде далі', () => {
    const root = $('#sec-odd [data-role="quiz"]');
    solveQuiz(root);
    expect($('#sec-odd [data-nav="next"]').disabled).toBe(false);
    click('#sec-odd [data-nav="next"]');
    expect(visibleSection()).toBe('sec-robot');
  });

  it('робот: проходить усі рівні', async () => {
    vi.useFakeTimers();
    const sec = $('#sec-robot');
    const programs = [['right', 'right', 'right'], ['up', 'up', 'up', 'right', 'right'], ['down', 'down', 'right', 'right', 'right', 'right', 'up', 'up']];
    for (const program of programs) {
      program.forEach(cmd => click(sec.querySelector(`[data-cmd="${cmd}"]`)));
      click(sec.querySelector('[data-action="run"]'));
      expect(app.session.busy).toBe(true);
      await vi.runAllTimersAsync();
      const nextLevel = sec.querySelector('[data-action="next-level"]');
      if (nextLevel) click(nextLevel);
    }
    vi.useRealTimers();
    expect(app.session.busy).toBe(false);
    expect(sec.querySelector('[data-nav="next"]').disabled).toBe(false);
    click(sec.querySelector('[data-nav="next"]'));
    expect(visibleSection()).toBe('sec-cars');
  });

  it('машини: без інтернету — заглушка, вікторина проходиться', async () => {
    await Promise.resolve();
    await new Promise(r => setTimeout(r, 0));
    expect($('#sec-cars [data-car-photo="toyota"]').textContent).toContain('потрібен інтернет');
    click('#sec-cars [data-car-tab="quiz"]');
    expect($('#cars-quiz').classList.contains('hidden')).toBe(false);
    solveQuiz($('#sec-cars [data-role="quiz"]'));
    click('#sec-cars [data-nav="next"]');
    expect(visibleSection()).toBe('sec-space');
  });

  it('сертифікат: ім’я з поля потрапляє на сертифікат, порожнє — лінія', () => {
    solveQuiz($('#sec-space [data-role="quiz"]'));
    click('#sec-space [data-open-cert="space"]');
    expect($('#cert-modal').classList.contains('hidden')).toBe(false);
    expect($('#cm-card').textContent).toContain('Юний космонавт');
    expect($('#cm-card').textContent).toContain('тут буде ім’я');

    const input = $('#cm-name');
    input.value = 'Олеся <Коваленко>';
    input.dispatchEvent(new Event('input'));
    expect($('#cm-card .cm-name').innerHTML).toBe('Олеся &lt;Коваленко&gt;');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect($('#cert-modal').classList.contains('hidden')).toBe(true);
  });

  it('нагорода: усі обрані завдання виконано, ім’я підставлено', () => {
    click('#sec-space [data-nav="next"]');
    expect(visibleSection()).toBe('sec-award');
    expect($('#student-name').value).toBe('Олеся <Коваленко>');
    expect($('[data-role="summary"]').textContent).toContain('Виконано завдань: 6 з 6');
    expect($$('#sec-award [data-open-cert]').length).toBe(6);
  });

  it('Робо розповідає цікавинку на натискання', () => {
    click('#mascot [data-role="robo"]');
    expect($('#mascot [data-role="text"]').textContent.length).toBeGreaterThan(10);
    click('#mascot [data-role="close"]');
    expect($('#mascot [data-role="bubble"]').classList.contains('hidden')).toBe(true);
  });

  it('перемикач «Ефекти» вимикає реакції Робо', () => {
    click('#effects-toggle');
    expect(app.session.effectsEnabled).toBe(false);
    expect($('#effects-label').textContent).toContain('вимкнено');
    click('#effects-toggle');
    expect(app.session.effectsEnabled).toBe(true);
  });

  it('«Пройти ще раз» скидає прогрес, зірочки і ім’я', () => {
    expect(app.session.stars).toBeGreaterThan(0);
    click('[data-action="restart"]');
    expect(app.session.stars).toBe(0);
    expect(visibleSection()).toBe('sec-welcome');
    expect(app.session.completed.size).toBe(0);
    expect(app.session.studentName).toBe('');
    expect($('#sec-sorting [data-nav="next"]').disabled).toBe(true);
    expect($('#sec-sorting [data-cert-slot]').textContent.trim()).toBe('');
    expect($$('#sec-sorting [data-zone="pool"] [data-card]').length).toBe(10);
  });
});
