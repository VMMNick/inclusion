/**
 * Завдання «Розклади картки».
 * Два способи керування: перетягування (drag-and-drop) і «натисни картку → натисни коробку».
 * Клавіатура: Tab до картки → Enter, Tab до коробки → Enter; Esc скасовує вибір.
 */
import template from './sorting.html?raw';
import { SORTING_LEVELS } from '../../data/sorting-levels.js';
import { $, $$, focusQuietly } from '../../core/dom.js';
import { sounds } from '../../core/audio.js';
import { themeOf } from '../../config/themes.js';
import { setFeedback } from '../../ui/feedback.js';
import { reportCorrect, reportHint } from '../../core/session.js';
import { pop } from '../../ui/effects.js';

const ACTIONS = `
  <button type="button" data-action="reset" class="px-6 py-3 rounded-full bg-white border-2 border-peach-mid font-bold hover:bg-peach-soft">↺ Почати знову</button>
  <button type="button" data-action="check" class="px-6 py-3 rounded-full bg-sky-deep text-white font-extrabold hover:opacity-90">🔍 Перевірити</button>`;

// Детерміноване «перемішування» — однаковий старт щоразу (передбачуваність)
const hash = str => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const state = {
  levelId: SORTING_LEVELS[0].id,
  /** @type {Record<string, string>} itemId → 'pool' | categoryId */
  placements: {},
  selected: /** @type {string|null} */ (null),
  review: new Set()
};

/** Посилання на внутрішні функції після mount() */
let view = null;

const level = () => SORTING_LEVELS.find(l => l.id === state.levelId);
const itemById = id => level().items.find(i => i.id === id);
const categoryById = id => level().categories.find(c => c.id === id);
const poolOrder = () => level().items.map(i => i.id).sort((a, b) => hash(a) - hash(b));

/** Перевірка розкладки — чиста функція, її використовують тести. */
export function checkPlacements(lvl, placements) {
  const left = lvl.items.filter(i => placements[i.id] === 'pool');
  const wrong = left.length ? [] : lvl.items.filter(i => placements[i.id] !== i.category);
  return { left, wrong, solved: left.length === 0 && wrong.length === 0 };
}

/** @type {import('../../types.js').TaskModule} */
export default {
  key: 'sorting',
  icon: '🗂️',
  title: 'Розклади картки',
  label: 'Сортування',
  desc: 'Поклади кожну картку у свою коробку.',
  theme: 'mint',
  intro: '<b>Як?</b> Перетягни картку в коробку. <b>Або</b> натисни на картку, а потім — на коробку.',
  skill: () => level().skill,
  awardNote: () => `${level().icon} сортування: ${level().label}`,
  template,
  actions: ACTIONS,

  mount({ section, body, nextButton, complete }) {
    const el = {
      levels: $('[data-role="levels"]', body),
      zones: $('[data-role="zones"]', body),
      poolCount: $('[data-role="pool-count"]', body),
      feedback: $('[data-role="feedback"]', body)
    };
    const say = msg => setFeedback(el.feedback, msg);

    function renderLevels() {
      el.levels.innerHTML = SORTING_LEVELS.map(l => {
        const active = l.id === state.levelId;
        const chips = l.categories.map(c => `<span class="inline-block w-3 h-3 rounded-full ${themeOf(c.theme).chip}" aria-hidden="true"></span>`).join('');
        return `<button type="button" data-level="${l.id}" aria-pressed="${active}"
            class="flex flex-col items-start gap-1 px-5 py-3 rounded-3xl border-2 font-bold text-left
              ${active ? 'bg-lavender-soft border-lavender-deep' : 'bg-white border-lavender-mid hover:bg-lavender-soft'}">
            <span class="text-lg">${l.icon} ${l.label} · ${l.categories.length} коробки</span>
            <span class="flex items-center gap-1 text-sm font-semibold text-ink/70">${chips}<span class="ml-1">${l.grade}</span></span>
          </button>`;
      }).join('');
    }

    function renderZones() {
      const cats = level().categories;
      const cols = { 2: 'sm:grid-cols-2', 3: 'md:grid-cols-3', 4: 'sm:grid-cols-2 xl:grid-cols-4' }[cats.length] || 'sm:grid-cols-2 lg:grid-cols-3';
      el.zones.className = `grid gap-5 ${cols}`;
      el.zones.innerHTML = cats.map(c => {
        const t = themeOf(c.theme);
        return `<div data-zone="${c.id}" role="button" tabindex="0"
            aria-label="Коробка: ${c.name}. ${c.hint}"
            class="zone rounded-3xl border-4 border-dashed ${t.zone} p-4 min-h-[14rem] flex flex-col">
            <p class="font-extrabold text-xl ${t.title}"><span aria-hidden="true">${c.emoji}</span> ${c.name}</p>
            <p class="text-base mb-3 text-ink/80">${c.hint}</p>
            <div class="zone-items flex flex-wrap gap-3"></div>
          </div>`;
      }).join('');
    }

    function cardHTML(item, zoneId) {
      const selected = state.selected === item.id;
      const review = state.review.has(item.id);
      const cat = zoneId !== 'pool' ? categoryById(zoneId) : null;
      const border = cat ? themeOf(cat.theme).card : 'border-lavender-mid';
      return `<button type="button" draggable="true" data-card="${item.id}"
          aria-pressed="${selected}"
          aria-label="${item.name}${selected ? ', обрано' : ''}${review ? ', варто переглянути' : ''}"
          class="card ${selected ? 'is-selected' : ''} ${review ? 'needs-review' : ''} flex items-center gap-2 bg-white border-2 ${border} rounded-2xl px-4 py-3 text-lg font-bold shadow-sm cursor-grab min-h-[3.5rem]">
          <span class="text-3xl" aria-hidden="true">${item.emoji}</span>
          <span>${item.name}</span>
          ${review ? '<span aria-hidden="true">🔍</span>' : ''}
        </button>`;
    }

    function renderCards() {
      ['pool', ...level().categories.map(c => c.id)].forEach(zoneId => {
        const order = zoneId === 'pool' ? poolOrder() : level().items.map(i => i.id);
        const ids = order.filter(id => state.placements[id] === zoneId);
        $(`[data-zone="${zoneId}"] .zone-items`, body).innerHTML = ids.length
          ? ids.map(id => cardHTML(itemById(id), zoneId)).join('')
          : `<p class="text-ink/50 italic py-2">${zoneId === 'pool' ? 'Усі картки розкладено 👍' : 'Поклади картки сюди'}</p>`;
      });
      const left = Object.values(state.placements).filter(z => z === 'pool').length;
      el.poolCount.textContent = `(залишилось: ${left} з ${level().items.length})`;
      $$('[data-zone]', body).forEach(z => z.classList.toggle('is-target', !!state.selected));
    }

    function restart() {
      state.placements = {};
      level().items.forEach(i => (state.placements[i.id] = 'pool'));
      state.selected = null;
      state.review.clear();
      say(null);
      renderLevels();
      renderZones();
      renderCards();
    }

    function moveItem(id, zone) {
      if (!id || !(id in state.placements)) return;
      const changed = state.placements[id] !== zone;
      state.placements[id] = zone;
      state.selected = null;
      state.review.delete(id);
      renderCards();
      const placed = $(`[data-card="${id}"]`, body);
      if (changed) { sounds.place(); pop(placed); }
      focusQuietly(placed);
      say(null);
    }

    function check() {
      const result = checkPlacements(level(), state.placements);
      if (result.left.length) {
        sounds.hint();
        reportHint();
        say({ tone: 'hint', text: `Ще залишились картки: <b>${result.left.length}</b>. Розклади їх у коробки 🙂` });
        return;
      }
      state.review = new Set(result.wrong.map(i => i.id));
      renderCards();
      if (result.solved) {
        sounds.success();
        reportCorrect($('[data-action="check"]', section));
        complete();
        say({ tone: 'ok', text: 'Чудово! Усі картки на своїх місцях 🎉 Натисни «Далі».' });
        focusQuietly(nextButton);
      } else {
        sounds.hint();
        reportHint();
        say({ tone: 'hint', text: `Майже! Картки з позначкою 🔍 (${result.wrong.length}) варто перенести в іншу коробку.
          <br><span class="text-base">Підказка: прочитай опис під назвою кожної коробки.</span>` });
      }
    }

    // --- Події ---
    el.levels.addEventListener('click', e => {
      const btn = e.target.closest('[data-level]');
      if (!btn || btn.dataset.level === state.levelId) return;
      state.levelId = btn.dataset.level;
      restart();
      sounds.select();
      const l = level();
      say({ tone: 'info', text: `Рівень «${l.label}»: ${l.categories.length} коробки і ${l.items.length} карток. Картки розкладаємо з початку.` });
      focusQuietly($(`[data-level="${l.id}"]`, body));
    });

    body.addEventListener('click', e => {
      if (e.target.closest('[data-role="levels"]')) return;
      const card = e.target.closest('[data-card]');
      if (card) {
        const id = card.dataset.card;
        state.selected = state.selected === id ? null : id;
        if (state.selected) sounds.select();
        renderCards();
        focusQuietly($(`[data-card="${id}"]`, body));
        say(state.selected ? { tone: 'info', text: `Обрано: <b>${itemById(id).name}</b>. Тепер натисни на коробку.` } : null);
        return;
      }
      const zone = e.target.closest('[data-zone]');
      if (zone && state.selected) moveItem(state.selected, zone.dataset.zone);
    });

    body.addEventListener('keydown', e => {
      const zone = e.target.closest('[data-zone]');
      if (zone && e.target === zone && (e.key === 'Enter' || e.key === ' ') && state.selected) {
        e.preventDefault();
        moveItem(state.selected, zone.dataset.zone);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && state.selected) {
        state.selected = null;
        renderCards();
        say(null);
      }
    });

    const clearOver = () => $$('[data-zone]', body).forEach(z => z.classList.remove('is-over'));
    body.addEventListener('dragstart', e => {
      const card = e.target.closest('[data-card]');
      if (!card) return;
      e.dataTransfer.setData('text/plain', card.dataset.card);
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('is-dragging');
    });
    body.addEventListener('dragend', e => {
      const card = e.target.closest('[data-card]');
      if (card) card.classList.remove('is-dragging');
      clearOver();
    });
    body.addEventListener('dragover', e => {
      const zone = e.target.closest('[data-zone]');
      if (!zone) return;
      e.preventDefault();
      if (!zone.classList.contains('is-over')) { clearOver(); zone.classList.add('is-over'); }
    });
    body.addEventListener('drop', e => {
      const zone = e.target.closest('[data-zone]');
      if (!zone) return;
      e.preventDefault();
      clearOver();
      moveItem(e.dataTransfer.getData('text/plain'), zone.dataset.zone);
    });

    $('[data-action="check"]', section).addEventListener('click', check);
    $('[data-action="reset"]', section).addEventListener('click', restart);

    view = { restart };
    restart();
  },

  /** «Пройти ще раз»: картки — у пул, обраний рівень залишається. */
  reset() {
    view?.restart();
  }
};
