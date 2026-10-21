/**
 * Завдання «Машини та марки»: галерея-знайомство + вікторина «Яка це марка?».
 * Вікторина будується з src/data/cars.js автоматично; фото — з Вікіпедії або власні.
 */
import template from './cars.html?raw';
import { CARS } from '../../data/cars.js';
import { createQuiz } from '../quiz/quiz-engine.js';
import { fetchWikiPhoto } from './wiki-photos.js';
import { $, $$, focusQuietly } from '../../core/dom.js';
import { sounds } from '../../core/audio.js';

const carById = id => CARS.find(c => c.id === id);

/**
 * Задачки вікторини з даних про машини: правильна марка + дві інші,
 * варіанти перемішані детерміновано (однаково щоразу).
 * @returns {import('../../types.js').QuizRound[]}
 */
export function buildCarRounds(cars = CARS) {
  return cars.map((car, i) => {
    const others = [cars[(i + 3) % cars.length], cars[(i + 5) % cars.length]];
    const opts = [car, ...others].map(c => ({ id: c.id, emoji: '', label: c.brand }));
    const shift = i % 3;
    return {
      prompt: 'Яка марка цієї машини?',
      carId: car.id,
      correct: car.id,
      options: [...opts.slice(shift), ...opts.slice(0, shift)],
      explain: `Це ${car.brand} ${car.model} (${car.country}). ${car.fact}`
    };
  });
}

/** @type {Record<string, {status: 'loading'|'ok'|'fail', src?: string, fallback?: string|null, credit?: string|null}>} */
const photos = {};
let photosStarted = false;
let quiz = null;
let view = null;

function photoInner(id, hideName) {
  const car = carById(id);
  const p = photos[id];
  if (p && p.status === 'ok') {
    const alt = hideName ? 'Фото машини' : `Фото: ${car.brand} ${car.model}`;
    return `<img src="${p.src}" ${p.fallback ? `data-fallback="${p.fallback}"` : ''} data-car-img="${id}"
        alt="${alt}" loading="lazy" referrerpolicy="no-referrer" class="w-full h-full object-cover" />`;
  }
  if (p && p.status === 'fail') {
    return `<div class="w-full h-full flex flex-col items-center justify-center bg-lime-soft text-6xl" role="img" aria-label="Фото недоступне">🚗
        <span class="text-sm font-semibold text-ink/60 mt-2 px-3 text-center">Фото не завантажилось — потрібен інтернет</span></div>`;
  }
  return `<div class="w-full h-full flex flex-col items-center justify-center bg-lime-soft text-5xl animate-pulse" role="img" aria-label="Фото завантажується">🚗
      <span class="text-sm font-semibold text-ink/60 mt-2">Завантажую фото…</span></div>`;
}

function creditInner(id) {
  const p = photos[id];
  return p && p.status === 'ok' && p.credit
    ? `<a href="${p.credit}" target="_blank" rel="noopener" class="text-xs underline text-ink/60 hover:text-ink">Фото: Wikimedia Commons</a>`
    : '';
}

function refreshPhoto(id) {
  $$(`[data-car-photo="${id}"]`).forEach(el => (el.innerHTML = photoInner(id, el.dataset.hideName === '1')));
  $$(`[data-car-credit="${id}"]`).forEach(el => (el.innerHTML = creditInner(id)));
}

function loadPhotos() {
  if (photosStarted) return;
  photosStarted = true;
  CARS.forEach(car => {
    if (car.photo) {
      photos[car.id] = { status: 'ok', src: car.photo, fallback: null, credit: car.credit || null };
      refreshPhoto(car.id);
      return;
    }
    photos[car.id] = { status: 'loading' };
    fetchWikiPhoto(car.wiki)
      .then(p => { photos[car.id] = p; })
      .catch(() => { photos[car.id] = { status: 'fail' }; })
      .finally(() => refreshPhoto(car.id));
  });
}

// Якщо фото не відкрилось — пробуємо запасний розмір, далі — заглушка
function handleImageError(e) {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.dataset.carImg) return;
  const id = img.dataset.carImg;
  if (img.dataset.fallback && img.src !== img.dataset.fallback) {
    photos[id].src = img.dataset.fallback;
    photos[id].fallback = null;
    img.removeAttribute('data-fallback');
    img.src = photos[id].src;
  } else {
    photos[id] = { status: 'fail' };
    refreshPhoto(id);
  }
}

/** Фото в задачці вікторини (без назви в описі — щоб не підказувати). */
const quizPicture = round => round.carId
  ? `<div class="max-w-md mx-auto mb-4">
       <div data-car-photo="${round.carId}" data-hide-name="1" class="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-lime-mid bg-white">${photoInner(round.carId, true)}</div>
       <div data-car-credit="${round.carId}" class="mt-1 text-right">${creditInner(round.carId)}</div>
     </div>`
  : '';

/** @type {import('../../types.js').TaskModule} */
export default {
  key: 'cars',
  icon: '🚗',
  title: 'Машини та марки',
  label: 'Машини',
  desc: 'Відгадай марку машини за фото.',
  theme: 'lime',
  intro: 'Спочатку познайомся з машинами. Потім відгадай марку за фото.',
  skill: 'знає марки автомобілів',
  template,

  mount({ section, body, nextButton, complete }) {
    const gallery = $('[data-role="gallery"]', body);

    function renderGallery() {
      gallery.innerHTML = CARS.map(car => `
        <article class="bg-white rounded-3xl border-2 border-lime-mid overflow-hidden shadow-sm flex flex-col">
          <div data-car-photo="${car.id}" class="aspect-[4/3] bg-lime-soft">${photoInner(car.id, false)}</div>
          <div class="p-4 flex flex-col gap-1 flex-1">
            <h3 class="text-2xl font-extrabold text-lime-deep">${car.brand}</h3>
            <p class="font-bold">${car.model}</p>
            <p class="text-sm font-semibold text-ink/70">🌍 Країна: ${car.country}</p>
            <p class="text-base mt-1">${car.fact}</p>
            <div data-car-credit="${car.id}" class="mt-auto pt-2">${creditInner(car.id)}</div>
          </div>
        </article>`).join('');
    }

    function setTab(tab, focus) {
      $('#cars-learn', body).classList.toggle('hidden', tab !== 'learn');
      $('#cars-quiz', body).classList.toggle('hidden', tab !== 'quiz');
      [['learn', '#tab-learn'], ['quiz', '#tab-quiz']].forEach(([t, sel]) => {
        const b = $(sel, body);
        const on = t === tab;
        b.setAttribute('aria-selected', String(on));
        b.className = `px-5 py-3 rounded-full border-2 font-bold text-lg ${on ? 'bg-lime-mid border-lime-deep' : 'bg-white border-lime-mid hover:bg-lime-soft'}`;
      });
      if (focus) focusQuietly($(tab === 'learn' ? '#tab-learn' : '#tab-quiz', body));
    }

    body.addEventListener('click', e => {
      const t = e.target.closest('[data-car-tab]');
      if (!t) return;
      setTab(t.dataset.carTab, true);
      sounds.select();
      if (t.dataset.carTab === 'quiz') section.scrollIntoView({ block: 'start' });
    });
    body.addEventListener('error', handleImageError, true);

    quiz = createQuiz({
      root: $('[data-role="quiz"]', body),
      config: { theme: 'lime', hint: 'Повернись до «Знайомства» і подивись на фото ще раз 🙂', rounds: buildCarRounds() },
      renderPicture: quizPicture,
      onComplete: complete,
      getFocusAfterComplete: () => nextButton
    });

    renderGallery();
    view = { setTab };
    setTab('learn', false);
  },

  /** Фото вантажимо лише тоді, коли учень відкрив розділ */
  onEnter: loadPhotos,

  reset() {
    quiz?.reset();
    view?.setTab('learn', false);
  }
};
