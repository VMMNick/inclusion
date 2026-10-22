/**
 * Завдання «Робот-помічник»: дитина складає програму зі стрілок і запускає робота.
 * Логіку руху обчислює robot-engine.js, тут — лише відображення й анімація.
 */
import template from './robot.html?raw';
import { ROBOT_LEVELS, DIRS, ROBOT_MAX_STEPS } from '../../data/robot-levels.js';
import { runProgram } from './robot-engine.js';
import { $, $$, sleep, prefersReducedMotion, focusQuietly } from '../../core/dom.js';
import { sounds } from '../../core/audio.js';
import { setBusy, reportCorrect, reportHint } from '../../core/session.js';
import { feedbackHTML, progressDotsHTML } from '../../ui/feedback.js';

const cellKey = (r, c) => `${r},${c}`;

const state = {
  level: 0,
  /** @type {(keyof typeof DIRS)[]} */
  program: [],
  pos: /** @type {[number, number]} */ ([0, 0]),
  trail: new Set(),
  running: false,
  activeIdx: -1,
  msg: null,
  showNextLevel: false,
  done: false
};

let view = null;

const currentLevel = () => ROBOT_LEVELS[state.level];

/** @type {import('../../types.js').TaskModule} */
export default {
  key: 'robot',
  icon: '🤖',
  title: 'Робот-помічник',
  label: 'Робот',
  desc: 'Проведи робота до зірочки.',
  theme: 'teal',
  intro: 'Склади програму зі стрілок, щоб робот 🤖 дійшов до зірочки ⭐. Каміння 🪨 треба обходити.',
  skill: 'програмує робота',
  template,

  mount({ body, nextButton, complete }) {
    const el = {
      dots: $('[data-role="dots"]', body),
      levelLabel: $('[data-role="level-label"]', body),
      grid: $('[data-role="grid"]', body),
      program: $('[data-role="program"]', body),
      count: $('[data-role="count"]', body),
      feedback: $('[data-role="feedback"]', body),
      run: $('[data-action="run"]', body),
      undo: $('[data-action="undo"]', body),
      clear: $('[data-action="clear"]', body)
    };

    function toStart() {
      const L = currentLevel();
      state.pos = [...L.start];
      state.trail = new Set([cellKey(...L.start)]);
      state.activeIdx = -1;
    }

    function startLevel(idx) {
      state.level = idx;
      state.program = [];
      state.msg = null;
      state.showNextLevel = false;
      toStart();
      render();
    }

    function render() {
      const L = currentLevel();
      const isRock = (r, c) => L.rocks.some(([rr, cc]) => rr === r && cc === c);

      el.dots.innerHTML = progressDotsHTML(ROBOT_LEVELS.length, state.level,
        i => i < state.level || (i === state.level && state.showNextLevel) || state.done);
      el.levelLabel.textContent = `Рівень ${state.level + 1} з ${ROBOT_LEVELS.length}`;

      let cells = '';
      for (let r = 0; r < L.size; r++) {
        for (let c = 0; c < L.size; c++) {
          const here = state.pos[0] === r && state.pos[1] === c;
          const star = L.star[0] === r && L.star[1] === c;
          const rock = isRock(r, c);
          const trail = state.trail.has(cellKey(r, c));
          const bg = rock ? 'bg-peach-mid' : star ? 'bg-butter-mid' : trail ? 'bg-lavender-mid' : 'bg-white';
          const robotFace = state.running ? '<span class="fx-hop">🤖</span>' : '🤖';   // «стрибок» на кожному кроці
          const content = here ? (star ? `${robotFace}<span class="text-base">⭐</span>` : robotFace) : star ? '⭐' : rock ? '🪨' : '';
          cells += `<div ${here ? 'data-robot-here' : ''} class="robot-cell aspect-square rounded-xl ${bg} flex items-center justify-center text-2xl sm:text-4xl">${content}</div>`;
        }
      }
      el.grid.style.gridTemplateColumns = `repeat(${L.size}, minmax(0, 1fr))`;
      el.grid.innerHTML = cells;
      const rocksText = L.rocks.length
        ? `Каміння: ${L.rocks.map(([r, c]) => `рядок ${r + 1} стовпчик ${c + 1}`).join('; ')}.`
        : 'Каміння немає.';
      el.grid.setAttribute('aria-label',
        `Поле ${L.size} на ${L.size}. Робот: рядок ${state.pos[0] + 1}, стовпчик ${state.pos[1] + 1}. ` +
        `Зірочка: рядок ${L.star[0] + 1}, стовпчик ${L.star[1] + 1}. ${rocksText}`);

      el.program.innerHTML = state.program.length
        ? state.program.map((cmd, i) => `<li class="flex items-center gap-1 px-2 py-1 rounded-xl border-2 text-2xl
              ${i === state.activeIdx ? 'bg-lavender-mid border-lavender-deep' : 'bg-sky-soft border-sky-mid'}">
              <span class="text-xs font-bold text-ink/60" aria-hidden="true">${i + 1}</span>
              <span aria-hidden="true">${DIRS[cmd].e}</span><span class="sr-only">${DIRS[cmd].name}</span>
            </li>`).join('')
        : '<li class="text-ink/50 italic self-center">Тут з’явиться програма. Натискай стрілки ⬆️⬇️⬅️➡️</li>';
      el.count.textContent = String(state.program.length);

      $$('[data-cmd]', body).forEach(b => (b.disabled = state.running));
      el.run.disabled = state.running;
      el.undo.disabled = state.running || !state.program.length;
      el.clear.disabled = state.running || !state.program.length;

      const nextLevelBtn = state.showNextLevel
        ? '<button type="button" data-action="next-level" class="mt-4 px-6 py-3 rounded-full bg-sky-deep text-white font-extrabold hover:opacity-90">Наступний рівень ▶</button>'
        : '';
      el.feedback.innerHTML = feedbackHTML(state.msg) + nextLevelBtn;
    }

    function editProgram(change) {
      if (state.running) return;
      change();
      state.msg = null;
      state.showNextLevel = false;
      toStart();
      render();
    }

    async function run() {
      if (state.running) return;
      if (!state.program.length) {
        sounds.hint();
        state.msg = { tone: 'hint', text: 'Спочатку склади програму — натискай стрілки.' };
        render();
        return;
      }
      const L = currentLevel();
      const result = runProgram(L, state.program);
      const delay = prefersReducedMotion() ? 120 : 450;

      state.running = true;
      setBusy(true);                       // поки робот іде, навігація вимкнена
      state.msg = { tone: 'info', text: 'Робот виконує програму…' };
      state.showNextLevel = false;
      toStart();
      render();
      await sleep(delay);

      for (let i = 0; i < result.path.length; i++) {
        state.activeIdx = i;
        state.pos = result.path[i];
        state.trail.add(cellKey(...state.pos));
        render();
        sounds.move();
        await sleep(delay);
      }
      if (result.blocked) { state.activeIdx = result.blocked.step - 1; render(); }

      state.running = false;
      setBusy(false);

      if (result.blocked) {
        sounds.hint();
        reportHint();
        const what = result.blocked.reason === 'edge' ? 'край поля' : 'камінь 🪨';
        state.msg = { tone: 'hint', text: `Ой! На кроці ${result.blocked.step} робот уперся в ${what}. Зміни програму і запусти ще раз.` };
      } else if (result.reachedStar) {
        state.activeIdx = -1;
        reportCorrect($('[data-robot-here]', body));
        if (state.level === ROBOT_LEVELS.length - 1) {
          state.done = true;
          sounds.success();
          complete();
          state.msg = { tone: 'ok', text: 'Ура! Робот дійшов до зірочки на всіх рівнях 🎉 Натисни «Далі».' };
        } else {
          sounds.right();
          state.showNextLevel = true;
          state.msg = { tone: 'ok', text: `Чудово! Робот дійшов до зірочки за ${state.program.length} кроків ⭐` };
        }
      } else {
        sounds.hint();
        reportHint();
        state.activeIdx = -1;
        state.msg = { tone: 'hint', text: 'Робот зупинився, а до зірочки ще треба дійти. Додай ще команди.' };
      }
      render();
      focusQuietly(state.done ? nextButton : state.showNextLevel ? $('[data-action="next-level"]', body) : el.run);
    }

    body.addEventListener('click', e => {
      const cmdBtn = e.target.closest('[data-cmd]');
      if (cmdBtn && !cmdBtn.disabled) {
        if (state.program.length >= ROBOT_MAX_STEPS) {
          state.msg = { tone: 'hint', text: `Програма вже має ${ROBOT_MAX_STEPS} кроків. Спробуй коротший шлях 🙂` };
          render();
          return;
        }
        editProgram(() => state.program.push(/** @type {any} */ (cmdBtn.dataset.cmd)));
        sounds.move();
        return;
      }
      if (e.target.closest('[data-action="next-level"]')) {
        startLevel(state.level + 1);
        focusQuietly($('[data-cmd]', body));
      }
    });
    el.run.addEventListener('click', run);
    el.undo.addEventListener('click', () => editProgram(() => state.program.pop()));
    el.clear.addEventListener('click', () => editProgram(() => (state.program = [])));

    view = { startLevel };
    startLevel(0);
  },

  reset() {
    state.done = false;
    view?.startLevel(0);
  }
};
