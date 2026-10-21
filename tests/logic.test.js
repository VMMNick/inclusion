/** Перевірка «чистої» логіки без інтерфейсу. */
import { describe, it, expect } from 'vitest';
import { nextIncluded } from '../src/core/router.js';
import { runProgram } from '../src/features/robot/robot-engine.js';
import { photoFromSummary } from '../src/features/cars/wiki-photos.js';
import { countCorrect, moveStep } from '../src/features/algorithm/algorithm.js';
import { checkPlacements } from '../src/features/sorting/sorting.js';
import { SORTING_LEVELS } from '../src/data/sorting-levels.js';

describe('навігація: nextIncluded', () => {
  const pages = [{}, { key: 'a' }, { key: 'b' }, { key: 'c' }, {}];
  const only = keys => p => !p.key || keys.includes(p.key);

  it('пропускає невибрані завдання вперед і назад', () => {
    expect(nextIncluded(pages, 0, 1, only(['c']))).toBe(3);
    expect(nextIncluded(pages, 3, 1, only(['c']))).toBe(4);
    expect(nextIncluded(pages, 4, -1, only(['a']))).toBe(1);
    expect(nextIncluded(pages, 1, -1, only(['a']))).toBe(0);
  });

  it('без вибраних завдань одразу веде на нагороду', () => {
    expect(nextIncluded(pages, 0, 1, only([]))).toBe(4);
  });
});

describe('робот: runProgram', () => {
  const level = { size: 3, start: [0, 0], star: [0, 2], rocks: [[1, 1]] };

  it('доходить до зірочки', () => {
    const r = runProgram(level, ['right', 'right']);
    expect(r).toEqual({ path: [[0, 1], [0, 2]], blocked: null, reachedStar: true });
  });

  it('зупиняється на краю поля', () => {
    expect(runProgram(level, ['up']).blocked).toEqual({ step: 1, reason: 'edge' });
  });

  it('зупиняється перед каменем', () => {
    const r = runProgram(level, ['down', 'right']);
    expect(r.blocked).toEqual({ step: 2, reason: 'rock' });
    expect(r.path).toEqual([[1, 0]]);
  });

  it('не дійшов — reachedStar = false', () => {
    expect(runProgram(level, ['right']).reachedStar).toBe(false);
  });
});

describe('алгоритм', () => {
  const topic = { steps: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] };
  it('рахує кроки на своїх місцях', () => {
    expect(countCorrect(topic, ['a', 'c', 'b'])).toBe(1);
    expect(countCorrect(topic, ['a', 'b', 'c'])).toBe(3);
  });
  it('міняє крок із сусіднім і не виходить за межі', () => {
    expect(moveStep(['a', 'b', 'c'], 'b', 'up')).toEqual(['b', 'a', 'c']);
    expect(moveStep(['a', 'b', 'c'], 'c', 'down')).toEqual(['a', 'b', 'c']);
  });
});

describe('сортування: checkPlacements', () => {
  const lvl = SORTING_LEVELS[0];
  const all = zone => Object.fromEntries(lvl.items.map(i => [i.id, zone(i)]));

  it('вимагає розкласти всі картки', () => {
    const r = checkPlacements(lvl, all(() => 'pool'));
    expect(r.left.length).toBe(lvl.items.length);
    expect(r.solved).toBe(false);
  });
  it('знаходить неправильні картки', () => {
    const r = checkPlacements(lvl, all(() => lvl.categories[0].id));
    expect(r.wrong.length).toBeGreaterThan(0);
  });
  it('правильна розкладка розв’язана', () => {
    expect(checkPlacements(lvl, all(i => i.category)).solved).toBe(true);
  });
});

describe('фото з Вікіпедії: photoFromSummary', () => {
  it('бере мініатюру 500px і посилання на сторінку файлу в Commons', () => {
    const p = photoFromSummary({
      thumbnail: { source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Car.jpg/320px-Car.jpg' },
      originalimage: { source: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Car.jpg', width: 2000 }
    });
    expect(p.src).toContain('/500px-Car.jpg');
    expect(p.fallback).toContain('/320px-Car.jpg');
    expect(p.credit).toBe('https://commons.wikimedia.org/wiki/File:Car.jpg');
  });

  it('без зображення — помилка (покажеться заглушка)', () => {
    expect(() => photoFromSummary({})).toThrow();
  });
});
