/**
 * Завдання «Склади алгоритм»: кроки переставляються кнопками ⬆️ / ⬇️.
 * Достатньо скласти одну тему, щоб перейти далі; інші — за бажанням.
 */
import template from './algorithm.html?raw';
import { ALGO_TOPICS } from '../../data/algorithm-topics.js';
import { $, focusQuietly } from '../../core/dom.js';
import { sounds } from '../../core/audio.js';
import { setFeedback } from '../../ui/feedback.js';
import { reportCorrect, reportHint } from '../../core/session.js';
import { pop } from '../../ui/effects.js';

const ACTIONS = `
  <button type="button" data-action="reset" class="px-6 py-3 rounded-full bg-white border-2 border-peach-mid font-bold hover:bg-peach-soft">↺ Почати знову</button>
  <button type="button" data-action="check" class="px-6 py-3 rounded-full bg-sky-deep text-white font-extrabold hover:opacity-90">🔍 Перевірити</button>`;

const state = {
  topicId: ALGO_TOPICS[0].id,
  /** @type {string[]} поточний порядок id кроків */
  order: [],
  checked: false,
  solved: new Set()
};

let view = null;

const topic = () => ALGO_TOPICS.find(t => t.id === state.topicId);
const stepById = id => topic().steps.find(s => s.id === id);
const correctIndex = id => topic().steps.findIndex(s => s.id === id);

/** Скільки кроків стоять на своїх місцях — чиста функція для тестів. */
export function countCorrect(topicData, order) {
  return order.filter((id, idx) => topicData.steps[idx] && topicData.steps[idx].id === id).length;
}

/** Поміняти крок із сусіднім. Повертає новий масив або той самий, якщо рух неможливий. */
export function moveStep(order, id, dir) {
  const i = order.indexOf(id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= order.length) return order;
  const next = [...order];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** @type {import('../../types.js').TaskModule} */
export default {
  key: 'algo',
  icon: '🪜',
  title: 'Склади алгоритм',
  label: 'Алгоритм',
  desc: 'Постав кроки по порядку.',
  theme: 'peach',
  intro: '<b>Алгоритм</b> — це кроки, які йдуть один за одним. Став кроки по порядку кнопками ⬆️ і ⬇️.',
  skill: 'вміє складати алгоритм',
  template,
  actions: ACTIONS,

  mount({ section, body, nextButton, complete }) {
    const el = {
      topics: $('[data-role="topics"]', body),
      title: $('[data-role="topic-title"]', body),
      steps: $('[data-role="steps"]', body),
      feedback: $('[data-role="feedback"]', body)
    };
    const say = msg => setFeedback(el.feedback, msg);

    function renderTopics() {
      el.topics.innerHTML = ALGO_TOPICS.map(t => {
        const active = t.id === state.topicId;
        const solved = state.solved.has(t.id);
        return `<button type="button" data-topic="${t.id}" aria-pressed="${active}"
            aria-label="Тема: ${t.title}${solved ? ', виконано' : ''}"
            class="flex items-center gap-2 px-5 py-3 rounded-3xl border-2 font-bold text-lg
              ${active ? 'bg-peach-soft border-peach-deep' : 'bg-white border-peach-mid hover:bg-peach-soft'}">
            <span aria-hidden="true">${t.icon}</span> ${t.short} ${solved ? '<span aria-hidden="true">✅</span>' : ''}
          </button>`;
      }).join('');
      el.title.textContent = topic().title;
    }

    function renderSteps() {
      const last = state.order.length - 1;
      el.steps.innerHTML = state.order.map((id, idx) => {
        const s = stepById(id);
        const correct = state.checked && correctIndex(id) === idx;
        const look = state.checked
          ? (correct ? 'border-mint-mid bg-mint-soft' : 'border-butter-mid bg-butter-soft')
          : 'border-lavender-mid bg-white';
        return `<li class="flex items-center gap-3 border-2 ${look} rounded-3xl p-3 sm:p-4 shadow-sm">
            <span class="flex-none w-10 h-10 rounded-full bg-lavender-soft border-2 border-lavender-mid flex items-center justify-center font-extrabold text-lg" aria-hidden="true">${idx + 1}</span>
            <span class="text-3xl" aria-hidden="true">${s.emoji}</span>
            <span class="flex-1 text-lg font-bold">${s.text}</span>
            ${state.checked ? `<span aria-hidden="true" class="text-xl">${correct ? '✅' : '🔍'}</span>` : ''}
            <span class="flex gap-2">
              <button type="button" data-move="up" data-id="${id}" ${idx === 0 ? 'disabled' : ''}
                aria-label="Підняти крок «${s.text}» вище"
                class="w-12 h-12 rounded-2xl bg-sky-soft border-2 border-sky-mid text-xl hover:bg-sky-mid disabled:opacity-30 disabled:cursor-not-allowed">⬆️</button>
              <button type="button" data-move="down" data-id="${id}" ${idx === last ? 'disabled' : ''}
                aria-label="Опустити крок «${s.text}» нижче"
                class="w-12 h-12 rounded-2xl bg-sky-soft border-2 border-sky-mid text-xl hover:bg-sky-mid disabled:opacity-30 disabled:cursor-not-allowed">⬇️</button>
            </span>
          </li>`;
      }).join('');
    }

    function restart() {
      state.order = [...topic().start];
      state.checked = false;
      say(null);
      renderTopics();
      renderSteps();
    }

    function check() {
      state.checked = true;
      const total = state.order.length;
      const correct = countCorrect(topic(), state.order);
      renderSteps();
      if (correct === total) {
        sounds.success();
        state.solved.add(state.topicId);
        reportCorrect($('[data-action="check"]', section));
        complete();
        renderTopics();
        const more = ALGO_TOPICS.length > state.solved.size;
        say({ tone: 'ok', text: `Так! Алгоритм складено правильно 🎉
          <br><span class="text-base">${more ? 'Можеш спробувати іншу тему вгорі або натиснути «Далі».' : 'Усі теми виконано! Натисни «Далі».'}</span>` });
        focusQuietly(nextButton);
      } else {
        sounds.hint();
        reportHint();
        say({ tone: 'hint', text: `На своїх місцях: <b>${correct} з ${total}</b> ✅. Кроки з 🔍 спробуй пересунути.
          <br><span class="text-base">Підказка: що треба зробити найпершим?</span>` });
      }
    }

    el.topics.addEventListener('click', e => {
      const btn = e.target.closest('[data-topic]');
      if (!btn || btn.dataset.topic === state.topicId) return;
      state.topicId = btn.dataset.topic;
      restart();
      sounds.select();
      focusQuietly($(`[data-topic="${state.topicId}"]`, body));
    });

    el.steps.addEventListener('click', e => {
      const btn = e.target.closest('[data-move]');
      if (!btn || btn.disabled) return;
      const { id, move: dir } = btn.dataset;
      state.order = moveStep(state.order, id, dir);
      state.checked = false;
      say(null);
      renderSteps();
      sounds.move();
      // Фокус лишається на кроці, який рухали
      let target = $(`[data-move="${dir}"][data-id="${id}"]`, body);
      if (!target || target.disabled) target = $(`[data-move="${dir === 'up' ? 'down' : 'up'}"][data-id="${id}"]`, body);
      focusQuietly(target);
      pop(target?.closest('li'));
    });

    $('[data-action="check"]', section).addEventListener('click', check);
    $('[data-action="reset"]', section).addEventListener('click', restart);

    view = { restart };
    restart();
  },

  /** «Пройти ще раз»: перша тема, усе з початку. */
  reset() {
    state.solved.clear();
    state.topicId = ALGO_TOPICS[0].id;
    view?.restart();
  }
};
