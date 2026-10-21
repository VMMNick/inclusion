/**
 * М'які синтезовані звуки (Web Audio API) — без аудіофайлів.
 * Звук вимкнено за замовчуванням, щоб не було несподіванок.
 */
import { session } from './session.js';
import { $ } from './dom.js';

let audioCtx = null;

function playChime(freqs, { gap = 0.11, dur = 0.5, vol = 0.07 } = {}) {
  if (!session.soundEnabled) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    freqs.forEach((f, i) => {
      const t = now + i * gap;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    });
  } catch {
    /* браузер без Web Audio — просто мовчимо */
  }
}

export const sounds = {
  select:  () => playChime([659.25], { dur: 0.25, vol: 0.05 }),
  place:   () => playChime([523.25, 659.25], { dur: 0.35 }),
  move:    () => playChime([587.33], { dur: 0.2, vol: 0.04 }),
  hint:    () => playChime([440, 392], { dur: 0.45, vol: 0.05 }),
  right:   () => playChime([659.25, 783.99], { dur: 0.4 }),
  success: () => playChime([523.25, 659.25, 783.99, 1046.5], { gap: 0.13, dur: 0.7 }),
  toggle:  () => playChime([783.99], { dur: 0.25, vol: 0.05 })
};

/** Кнопка «Звук» у верхній панелі. */
export function mountSoundToggle() {
  const btn = $('#sound-toggle');
  const render = () => {
    btn.setAttribute('aria-pressed', String(session.soundEnabled));
    $('#sound-icon').textContent = session.soundEnabled ? '🔈' : '🔇';
    $('#sound-label').textContent = session.soundEnabled ? 'Звук увімкнено' : 'Звук вимкнено';
  };
  btn.addEventListener('click', () => {
    session.soundEnabled = !session.soundEnabled;
    render();
    sounds.toggle();
  });
  render();
}
