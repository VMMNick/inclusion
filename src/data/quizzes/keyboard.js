/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'keyboard', icon: '⌨️', title: 'Чарівна клавіатура', label: 'Клавіатура', theme: 'lavender',
  desc: 'Яка клавіша потрібна?', intro: 'Яку клавішу натиснути? Обери правильну.',
  skill: 'знає основні клавіші клавіатури', hint: 'Пригадай, що робить кожна клавіша.',
  rounds: [
    { picture: '✍️', prompt: 'Щоб зробити пробіл між словами, натисни…', correct: 'space',
      options: [ { id: 'space', emoji: '␣', label: 'Пробіл' }, { id: 'enter', emoji: '⏎', label: 'Enter' }, { id: 'shift', emoji: '⇧', label: 'Shift' } ],
      explain: 'Пробіл — найдовша клавіша внизу клавіатури.' },
    { picture: '🧽', prompt: 'Щоб стерти останню літеру, натисни…', correct: 'back',
      options: [ { id: 'enter', emoji: '⏎', label: 'Enter' }, { id: 'back', emoji: '⌫', label: 'Backspace' }, { id: 'space', emoji: '␣', label: 'Пробіл' } ],
      explain: 'Backspace стирає літеру зліва від курсора.' },
    { picture: '📄', prompt: 'Щоб почати новий рядок, натисни…', correct: 'enter',
      options: [ { id: 'shift', emoji: '⇧', label: 'Shift' }, { id: 'back', emoji: '⌫', label: 'Backspace' }, { id: 'enter', emoji: '⏎', label: 'Enter' } ],
      explain: 'Enter переносить курсор на новий рядок.' },
    { picture: '🅰️', prompt: 'Щоб написати одну велику літеру, тримай…', correct: 'shift',
      options: [ { id: 'shift', emoji: '⇧', label: 'Shift' }, { id: 'space', emoji: '␣', label: 'Пробіл' }, { id: 'enter', emoji: '⏎', label: 'Enter' } ],
      explain: 'Тримай Shift і натисни літеру — вона стане великою.' },
    { picture: '🔠', prompt: 'Щоб усі літери стали великими, увімкни…', correct: 'caps',
      options: [ { id: 'back', emoji: '⌫', label: 'Backspace' }, { id: 'caps', emoji: '⇪', label: 'Caps Lock' }, { id: 'space', emoji: '␣', label: 'Пробіл' } ],
      explain: 'Caps Lock вмикає великі літери, поки його не вимкнеш.' },
    { picture: '👉', prompt: 'Щоб посунути курсор праворуч, натисни…', correct: 'right',
      options: [ { id: 'left', emoji: '⬅️', label: 'Стрілка ліворуч' }, { id: 'right', emoji: '➡️', label: 'Стрілка праворуч' }, { id: 'up', emoji: '⬆️', label: 'Стрілка вгору' } ],
      explain: 'Стрілки рухають курсор у різні боки.' }
  ]
};
