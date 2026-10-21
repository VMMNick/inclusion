/**
 * Перевірка всіх навчальних даних. Якщо вчитель додасть задачку з помилкою
 * (наприклад, правильна відповідь не збігається з жодним варіантом) — тест це покаже.
 */
import { describe, it, expect } from 'vitest';
import { QUIZ_CATEGORIES } from '../src/data/quizzes/index.js';
import { SORTING_LEVELS } from '../src/data/sorting-levels.js';
import { ALGO_TOPICS } from '../src/data/algorithm-topics.js';
import { ROBOT_LEVELS, DIRS, ROBOT_MAX_STEPS } from '../src/data/robot-levels.js';
import { CARS } from '../src/data/cars.js';
import { CERTS } from '../src/data/certificates.js';
import { THEMES } from '../src/config/themes.js';
import { buildCarRounds } from '../src/features/cars/cars.js';
import { TASKS } from '../src/tasks/registry.js';

const unique = arr => new Set(arr).size === arr.length;

describe('реєстр завдань', () => {
  it('ключі завдань унікальні', () => {
    expect(unique(TASKS.map(t => t.key))).toBe(true);
  });

  it.each(TASKS.map(t => [t.key, t]))('%s має всі обов’язкові поля і відому тему', (_, t) => {
    for (const field of ['icon', 'title', 'label', 'desc', 'intro']) expect(t[field], field).toBeTruthy();
    expect(THEMES[t.theme], `тема ${t.theme}`).toBeDefined();
    expect(typeof t.mount).toBe('function');
    expect(typeof t.reset).toBe('function');
  });

  it('кожен запис у сертифікатах належить наявному завданню', () => {
    const keys = new Set(TASKS.map(t => t.key));
    for (const key of Object.keys(CERTS)) expect(keys.has(key), key).toBe(true);
  });
});

describe('вікторини', () => {
  const rounds = [
    ...QUIZ_CATEGORIES.flatMap(c => c.rounds.map((r, i) => [`${c.key} #${i + 1}`, r])),
    ...buildCarRounds().map((r, i) => [`cars #${i + 1}`, r])
  ];

  it.each(rounds)('%s: правильна відповідь є серед варіантів', (_, r) => {
    expect(r.options.map(o => o.id)).toContain(r.correct);
  });

  it.each(rounds)('%s: 2–4 варіанти з унікальними id і підписами', (_, r) => {
    expect(r.options.length).toBeGreaterThanOrEqual(2);
    expect(r.options.length).toBeLessThanOrEqual(4);
    expect(unique(r.options.map(o => o.id))).toBe(true);
    r.options.forEach(o => expect(o.label).toBeTruthy());
    expect(r.prompt).toBeTruthy();
    expect(r.explain).toBeTruthy();
  });

  it.each(rounds.filter(([, r]) => r.sequence))('%s: у ряду є опис для екранного читача', (_, r) => {
    expect(r.sequenceLabel).toBeTruthy();
  });
});

describe('сортування', () => {
  it.each(SORTING_LEVELS.map(l => [l.id, l]))('рівень %s: кожна картка має наявну коробку', (_, l) => {
    const cats = new Set(l.categories.map(c => c.id));
    expect(unique(l.items.map(i => i.id))).toBe(true);
    l.items.forEach(i => expect(cats.has(i.category), i.id).toBe(true));
    l.categories.forEach(c => expect(THEMES[c.theme], c.theme).toBeDefined());
  });

  it.each(SORTING_LEVELS.map(l => [l.id, l]))('рівень %s: у кожній коробці є хоча б одна картка', (_, l) => {
    l.categories.forEach(c => expect(l.items.some(i => i.category === c.id), c.id).toBe(true));
  });
});

describe('алгоритми', () => {
  it.each(ALGO_TOPICS.map(t => [t.id, t]))('тема %s: start — це перемішані ті самі кроки', (_, t) => {
    expect([...t.start].sort()).toEqual(t.steps.map(s => s.id).sort());
    expect(t.start).not.toEqual(t.steps.map(s => s.id));
  });
});

describe('робот', () => {
  // Пошук найкоротшого шляху — гарантує, що кожен рівень можна пройти
  const shortestPath = L => {
    const key = p => p.join(',');
    const rocks = new Set(L.rocks.map(key));
    const seen = new Set([key(L.start)]);
    let frontier = [[L.start, 0]];
    while (frontier.length) {
      const next = [];
      for (const [p, d] of frontier) {
        if (key(p) === key(L.star)) return d;
        for (const { d: [dr, dc] } of Object.values(DIRS)) {
          const n = [p[0] + dr, p[1] + dc];
          if (n[0] < 0 || n[1] < 0 || n[0] >= L.size || n[1] >= L.size || rocks.has(key(n)) || seen.has(key(n))) continue;
          seen.add(key(n));
          next.push([n, d + 1]);
        }
      }
      frontier = next;
    }
    return Infinity;
  };

  it.each(ROBOT_LEVELS.map((L, i) => [i + 1, L]))('рівень %s можна пройти в межах ліміту кроків', (_, L) => {
    expect(shortestPath(L)).toBeLessThanOrEqual(ROBOT_MAX_STEPS);
  });
});

describe('машини', () => {
  it('id унікальні, для кожної є стаття Вікіпедії або власне фото', () => {
    expect(unique(CARS.map(c => c.id))).toBe(true);
    CARS.forEach(c => expect(c.wiki || c.photo, c.id).toBeTruthy());
  });
});
