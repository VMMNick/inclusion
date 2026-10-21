/**
 * РЕЄСТР ЗАВДАНЬ — єдине місце, яке визначає, які завдання є і в якому порядку.
 *
 * • Нова вікторина  → новий файл у src/data/quizzes/ (див. там index.js) — сюди нічого не треба.
 * • Нове завдання зі своєю механікою → папка в src/features/<назва>/ з модулем,
 *   що має форму TaskModule (src/types.js), і рядок у масиві нижче.
 * • Змінити порядок → переставте елементи масиву.
 */
import sorting from '../features/sorting/sorting.js';
import algorithm from '../features/algorithm/algorithm.js';
import robot from '../features/robot/robot.js';
import cars from '../features/cars/cars.js';
import { createQuizTask } from '../features/quiz/quiz-task.js';
import { CORE_QUIZZES, THEME_QUIZZES } from '../data/quizzes/index.js';

/** @type {import('../types.js').TaskModule[]} */
export const TASKS = [
  sorting,
  algorithm,
  ...CORE_QUIZZES.map(createQuizTask),
  robot,
  cars,
  ...THEME_QUIZZES.map(createQuizTask)
];
