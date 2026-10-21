/**
 * Усі категорії-вікторини в порядку показу.
 * Щоб додати нову категорію:
 *   1) створіть файл у цій папці за зразком будь-якого наявного (наприклад, space.js);
 *   2) імпортуйте його тут і допишіть у масив QUIZ_CATEGORIES;
 *   3) за бажанням додайте звання сертифіката в src/data/certificates.js.
 * Розділ, картка у виборі завдань, кнопки навігації й сертифікат з'являться самі.
 */
import odd from './odd.js';
import pattern from './pattern.js';
import truth from './truth.js';
import safety from './safety.js';
import keyboard from './keyboard.js';
import math from './math.js';
import animals from './animals.js';
import time from './time.js';
import ukraine from './ukraine.js';
import colors from './colors.js';
import space from './space.js';
import jobs from './jobs.js';
import traffic from './traffic.js';
import music from './music.js';

/** Вікторини, що йдуть одразу після «Алгоритму» */
export const CORE_QUIZZES = [odd, pattern, truth];

/** Тематичні категорії, що йдуть після «Машин» */
export const THEME_QUIZZES = [safety, keyboard, math, animals, time, ukraine, colors, space, jobs, traffic, music];

export const QUIZ_CATEGORIES = [...CORE_QUIZZES, ...THEME_QUIZZES];
