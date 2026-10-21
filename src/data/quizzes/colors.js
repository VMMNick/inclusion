/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'colors', icon: '🎨', title: 'Кольори та фігури', label: 'Кольори', theme: 'rose',
  desc: 'Змішуй кольори, впізнавай фігури.', intro: 'Що вийде, якщо змішати фарби? Які бувають фігури?',
  skill: 'змішує кольори і впізнає фігури', hint: 'Уяви, що малюєш фарбами, і подумай ще раз.',
  rounds: [
    { picture: '🔵➕🟡', prompt: 'Синій + жовтий = ?', correct: 'green',
      options: [ { id: 'green', emoji: '🟢', label: 'Зелений' }, { id: 'purple', emoji: '🟣', label: 'Фіолетовий' }, { id: 'orange', emoji: '🟠', label: 'Помаранчевий' } ],
      explain: 'Синя і жовта фарби разом дають зелену — як трава!' },
    { picture: '🔴➕🟡', prompt: 'Червоний + жовтий = ?', correct: 'orange',
      options: [ { id: 'brown', emoji: '🟤', label: 'Коричневий' }, { id: 'orange', emoji: '🟠', label: 'Помаранчевий' }, { id: 'green', emoji: '🟢', label: 'Зелений' } ],
      explain: 'Червоний і жовтий дають помаранчевий — як апельсин.' },
    { picture: '🔴➕🔵', prompt: 'Червоний + синій = ?', correct: 'purple',
      options: [ { id: 'purple', emoji: '🟣', label: 'Фіолетовий' }, { id: 'yellow', emoji: '🟡', label: 'Жовтий' }, { id: 'green', emoji: '🟢', label: 'Зелений' } ],
      explain: 'Червоний і синій разом — фіолетовий.' },
    { picture: '🟥', prompt: 'Скільки сторін у квадрата?', correct: 'n4',
      options: [ { id: 'n3', emoji: '3', label: 'Три' }, { id: 'n4', emoji: '4', label: 'Чотири' }, { id: 'n5', emoji: '5', label: 'П’ять' } ],
      explain: 'У квадрата 4 однакові сторони.' },
    { picture: '❓', prompt: 'Яка фігура не має жодного кута?', correct: 'circle',
      options: [ { id: 'tri', emoji: '🔺', label: 'Трикутник' }, { id: 'circle', emoji: '🔵', label: 'Коло' }, { id: 'square', emoji: '🟦', label: 'Квадрат' } ],
      explain: 'Коло кругле — у нього немає кутів.' },
    { picture: '⚽', prompt: 'На яку фігуру схожий м’яч?', correct: 'ball',
      options: [ { id: 'cube', emoji: '🎲', label: 'Куб' }, { id: 'ball', emoji: '🔮', label: 'Куля' }, { id: 'pyr', emoji: '🔺', label: 'Піраміда' } ],
      explain: 'М’яч круглий з усіх боків — це куля.' }
  ]
};
