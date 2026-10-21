/**
 * «Мозок» робота без жодного DOM: обчислює, куди він піде за програмою.
 * Інтерфейс (robot.js) лише анімує готовий результат. Це легко тестувати.
 */
import { DIRS } from '../../data/robot-levels.js';

const same = (a, b) => a[0] === b[0] && a[1] === b[1];

/**
 * @param {import('../../types.js').RobotLevel} level
 * @param {(keyof typeof DIRS)[]} program
 * @returns {{
 *   path: [number, number][],                 позиції після кожного вдалого кроку
 *   blocked: null | { step: number, reason: 'edge' | 'rock' },
 *   reachedStar: boolean
 * }}
 */
export function runProgram(level, program) {
  let pos = /** @type {[number, number]} */ ([...level.start]);
  const path = [];
  for (let i = 0; i < program.length; i++) {
    const [dr, dc] = DIRS[program[i]].d;
    const next = /** @type {[number, number]} */ ([pos[0] + dr, pos[1] + dc]);
    const outside = next[0] < 0 || next[1] < 0 || next[0] >= level.size || next[1] >= level.size;
    if (outside) return { path, blocked: { step: i + 1, reason: 'edge' }, reachedStar: false };
    if (level.rocks.some(r => same(r, next))) return { path, blocked: { step: i + 1, reason: 'rock' }, reachedStar: false };
    pos = next;
    path.push(pos);
  }
  return { path, blocked: null, reachedStar: same(pos, level.star) };
}
