/**
 * М'які візуальні ефекти успіху.
 *
 * Правила (зважаючи на дітей з РАС):
 *  • лише пастельні кольори, без спалахів і миготіння;
 *  • короткі (до ~1.5 с) і завжди як відповідь на дію дитини — нічого «саме по собі»;
 *  • вимикаються кнопкою «✨ Ефекти» і автоматично, якщо в системі ввімкнено «менше руху»;
 *  • нічого не блокують: pointer-events: none, aria-hidden.
 */
import { $, prefersReducedMotion } from '../core/dom.js';
import { on } from '../core/events.js';
import { session } from '../core/session.js';

const PASTELS = ['#C5E0F7', '#C3EBD3', '#DCD0F2', '#FBE7AE', '#F6D5C2', '#F3D0DC', '#BDE5E1', '#DAECB6',
  '#4F7FA8', '#3F8A63', '#6E5A9C', '#D9B44A'];

export const effectsOn = () => session.effectsEnabled && !prefersReducedMotion();

/** Центр елемента у координатах вікна. */
function centerOf(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** Короткий «стрибок» елемента (картка лягла в коробку, правильна відповідь). */
export function pop(el) {
  if (!el || !effectsOn()) return;
  el.classList.remove('fx-pop');
  void el.offsetWidth;               // перезапуск анімації
  el.classList.add('fx-pop');
  el.addEventListener('animationend', () => el.classList.remove('fx-pop'), { once: true });
}

/** Іскорки навколо елемента. */
export function sparkle(el) {
  if (!el || !effectsOn()) return;
  const { x, y } = centerOf(el);
  const count = 10;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const dist = 46 + (i % 3) * 14;
    const s = document.createElement('span');
    s.className = 'fx-spark';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = i % 2 ? '✦' : '•';
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.color = PASTELS[(i * 5) % PASTELS.length];
    s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    document.body.append(s);
    setTimeout(() => s.remove(), 800);
  }
}

/** Зірочка «летить» від елемента до лічильника у шапці. */
export function flyStar(fromEl, toEl) {
  if (!fromEl || !toEl || !effectsOn()) return Promise.resolve();
  const from = centerOf(fromEl);
  const to = centerOf(toEl);
  const star = document.createElement('span');
  star.className = 'fx-fly';
  star.setAttribute('aria-hidden', 'true');
  star.textContent = '⭐';
  star.style.left = `${from.x}px`;
  star.style.top = `${from.y}px`;
  document.body.append(star);
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      star.style.transform = `translate(${to.x - from.x}px, ${to.y - from.y}px) scale(.6)`;
      star.style.opacity = '0.2';
    });
    setTimeout(() => { star.remove(); resolve(); }, 750);
  });
}

/** Легке пастельне конфеті на весь екран (~1.6 с). */
export function confetti() {
  if (!effectsOn()) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;                    // напр. у тестовому середовищі
  canvas.className = 'fx-confetti';
  canvas.setAttribute('aria-hidden', 'true');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);
  document.body.append(canvas);

  const pieces = Array.from({ length: 90 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.5,
    y: innerHeight * 0.35 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 7,
    vy: -4 - Math.random() * 6,
    size: 6 + Math.random() * 7,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2,
    color: PASTELS[Math.floor(Math.random() * PASTELS.length)],
    round: Math.random() < 0.4
  }));

  const duration = 1600;
  const start = performance.now();
  function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - duration * 0.6) / (duration * 0.4));
    for (const p of pieces) {
      p.vy += 0.22;                    // м'яка гравітація
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      ctx.restore();
    }
    if (t < duration) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}

/**
 * Кнопка «✨ Ефекти», лічильник зірочок і підписка на події.
 * За замовчуванням ефекти ввімкнені, але якщо в системі обрано «менше руху» — вимкнені.
 */
export function mountEffects() {
  session.effectsEnabled = !prefersReducedMotion();

  const btn = $('#effects-toggle');
  const counter = $('#star-counter');
  const count = $('#star-count');

  const renderToggle = () => {
    btn.setAttribute('aria-pressed', String(session.effectsEnabled));
    $('#effects-icon').textContent = session.effectsEnabled ? '✨' : '⏸️';
    $('#effects-label').textContent = session.effectsEnabled ? 'Ефекти увімкнено' : 'Ефекти вимкнено';
  };
  btn.addEventListener('click', () => {
    session.effectsEnabled = !session.effectsEnabled;
    renderToggle();
  });
  renderToggle();

  on('stars:changed', async ({ added, target }) => {
    if (added > 0 && target) await flyStar(target, counter);
    count.textContent = String(session.stars);   // актуальне значення (поки летіла зірка, могли додатись інші)
    if (added > 0) pop(counter);
  });
  on('answer:correct', ({ target }) => { sparkle(target); pop(target); });
  on('task:completed', confetti);
}
