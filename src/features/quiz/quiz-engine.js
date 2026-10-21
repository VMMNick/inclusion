/**
 * Рушій вікторини: задачки по одній, без автопереходів.
 * Неправильний варіант м'яко позначається й вимикається — дитина рано чи пізно знайде правильний.
 * Наступна задачка відкривається лише кнопкою.
 */
import { $, focusQuietly } from '../../core/dom.js';
import { sounds } from '../../core/audio.js';
import { themeOf } from '../../config/themes.js';
import { feedbackHTML, progressDotsHTML } from '../../ui/feedback.js';

/**
 * @param {Object} opts
 * @param {HTMLElement} opts.root                  Куди малювати вікторину
 * @param {{ theme: string, hint: string, rounds: import('../../types.js').QuizRound[] }} opts.config
 * @param {() => void} opts.onComplete             Усі задачки розв’язано
 * @param {() => HTMLElement | null} [opts.getFocusAfterComplete]
 * @param {(round: import('../../types.js').QuizRound) => string} [opts.renderPicture]  Власна картинка (напр. фото машини)
 */
export function createQuiz({ root, config, onComplete, getFocusAfterComplete, renderPicture }) {
  let st;

  function reset() {
    st = { round: 0, solved: false, wrong: new Set(), done: false, msg: null };
    render();
  }

  function pictureHTML(r) {
    if (renderPicture) {
      const custom = renderPicture(r);
      if (custom) return custom;
    }
    return r.picture ? `<div class="text-6xl sm:text-7xl mb-3" aria-hidden="true">${r.picture}</div>` : '';
  }

  function sequenceHTML(r) {
    if (!r.sequence) return '';
    const correctOpt = r.options.find(o => o.id === r.correct);
    const box = 'flex items-center justify-center rounded-2xl text-3xl sm:text-4xl font-extrabold w-14 h-14 sm:w-16 sm:h-16';
    return `<div class="flex flex-wrap items-center gap-2 sm:gap-3 my-5" role="img" aria-label="${r.sequenceLabel}">
        ${r.sequence.map(e => `<span class="${box} bg-white border-2 border-lavender-mid">${e}</span>`).join('')}
        <span class="${box} border-4 border-dashed ${st.solved ? 'border-mint-deep bg-mint-soft' : 'border-lavender-deep bg-lavender-soft'}">${st.solved ? correctOpt.emoji : '?'}</span>
      </div>`;
  }

  function optionsHTML(r) {
    return r.options.map(o => {
      const isWrong = st.wrong.has(o.id);
      const isRight = st.solved && o.id === r.correct;
      const look = isRight ? 'bg-mint-soft border-mint-deep border-4'
        : isWrong ? 'needs-review opacity-70'
        : 'bg-white border-lavender-mid hover:bg-lavender-soft';
      const disabled = st.solved || isWrong;
      return `<button type="button" data-opt="${o.id}" ${disabled ? 'disabled' : ''}
          aria-label="${o.label}${isRight ? ', правильно' : ''}${isWrong ? ', спробуй іншу відповідь' : ''}"
          class="card flex flex-col items-center justify-center gap-2 border-2 ${look} rounded-3xl p-4 ${o.emoji ? 'min-h-[8rem]' : 'min-h-[5rem]'} font-bold shadow-sm disabled:cursor-default">
          ${o.emoji ? `<span class="text-5xl font-extrabold" aria-hidden="true">${o.emoji}</span>` : ''}
          <span class="${o.emoji ? 'text-lg' : 'text-xl sm:text-2xl font-extrabold'} text-center">${o.label}</span>
          ${isRight ? '<span aria-hidden="true">✅</span>' : ''}
        </button>`;
    }).join('');
  }

  function render() {
    const r = config.rounds[st.round];
    const n = r.options.length;
    const cols = n === 2 ? 'grid-cols-2' : n === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4';
    const dots = progressDotsHTML(config.rounds.length, st.round, i => i < st.round || (i === st.round && st.solved));
    const nextRound = st.solved && !st.done
      ? '<button type="button" data-quiz-next class="mt-4 px-6 py-3 rounded-full bg-sky-deep text-white font-extrabold hover:opacity-90">Наступна задачка ▶</button>'
      : '';

    root.innerHTML = `
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <div class="flex gap-2" aria-hidden="true">${dots}</div>
        <span class="font-bold">Задачка ${st.round + 1} з ${config.rounds.length}</span>
      </div>
      <div class="rounded-4xl border-2 ${themeOf(config.theme).zone} p-5 sm:p-8 text-center">
        ${pictureHTML(r)}
        <p class="text-xl sm:text-2xl font-extrabold">${r.prompt}</p>
        ${sequenceHTML(r)}
        <div class="grid ${cols} gap-3 sm:gap-4 mt-5 max-w-3xl mx-auto">${optionsHTML(r)}</div>
      </div>
      <div class="mt-5" role="status" aria-live="polite">${feedbackHTML(st.msg)}${nextRound}</div>`;
  }

  function answer(optId) {
    const r = config.rounds[st.round];
    if (optId === r.correct) {
      st.solved = true;
      const last = st.round === config.rounds.length - 1;
      if (last) {
        st.done = true;
        sounds.success();
        st.msg = { tone: 'ok', text: `${r.explain}<br>Усі задачки розв’язано! 🎉 Натисни «Далі».` };
        render();
        onComplete();
        focusQuietly(getFocusAfterComplete ? getFocusAfterComplete() : null);
      } else {
        sounds.right();
        st.msg = { tone: 'ok', text: `Правильно! ${r.explain}` };
        render();
        focusQuietly($('[data-quiz-next]', root));
      }
    } else {
      st.wrong.add(optId);
      sounds.hint();
      st.msg = { tone: 'hint', text: `Спробуй ще раз. ${config.hint}` };
      render();
      focusQuietly($('[data-opt]:not([disabled])', root));
    }
  }

  function nextRound() {
    st.round += 1;
    st.solved = false;
    st.wrong = new Set();
    st.msg = null;
    render();
    focusQuietly($('[data-opt]', root));
  }

  root.addEventListener('click', e => {
    const opt = e.target.closest('[data-opt]');
    if (opt && !opt.disabled) { answer(opt.dataset.opt); return; }
    if (e.target.closest('[data-quiz-next]')) nextRound();
  });

  reset();
  return { reset, render };
}
