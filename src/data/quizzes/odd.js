/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'odd', icon: '🔎', title: 'Знайди зайве', label: 'Зайве', theme: 'sky',
  desc: 'Що тут не підходить?',
  intro: 'Одна картинка тут не підходить до інших. Натисни на неї.',
  skill: 'знаходить зайве', hint: 'Подумай, що об’єднує інші картинки.',
  rounds: [
    { prompt: 'Що тут зайве?', correct: 'apple', explain: 'Яблуко — не частина комп’ютера. А монітор, клавіатура і мишка — так!',
      options: [ { id: 'monitor', emoji: '🖥️', label: 'Монітор' }, { id: 'keyboard', emoji: '⌨️', label: 'Клавіатура' },
                 { id: 'apple', emoji: '🍎', label: 'Яблуко' }, { id: 'mouse', emoji: '🖱️', label: 'Мишка' } ] },
    { prompt: 'Що тут зайве?', correct: 'car', explain: 'Машина — не тварина. Кіт, пес і кролик — тварини.',
      options: [ { id: 'cat', emoji: '🐱', label: 'Кіт' }, { id: 'car', emoji: '🚗', label: 'Машина' },
                 { id: 'dog', emoji: '🐶', label: 'Пес' }, { id: 'rabbit', emoji: '🐰', label: 'Кролик' } ] },
    { prompt: 'Що тут зайве?', correct: 'printer', explain: 'Принтер — це пристрій, його можна торкнутися. Інші — програми.',
      options: [ { id: 'paint', emoji: '🎨', label: 'Малювалка' }, { id: 'writer', emoji: '📝', label: 'Текстовий редактор' },
                 { id: 'browser', emoji: '🌐', label: 'Браузер' }, { id: 'printer', emoji: '🖨️', label: 'Принтер' } ] },
    { prompt: 'Яке число зайве?', correct: 'n8', explain: 'Числа 1, 3 і 5 — непарні, а 8 — парне.',
      options: [ { id: 'n1', emoji: '1', label: 'Один' }, { id: 'n3', emoji: '3', label: 'Три' },
                 { id: 'n8', emoji: '8', label: 'Вісім' }, { id: 'n5', emoji: '5', label: 'П’ять' } ] },
    { prompt: 'Що тут зайве?', correct: 'monitor', explain: 'Навушники, колонки й мікрофон працюють зі звуком, а монітор — із зображенням.',
      options: [ { id: 'headset', emoji: '🎧', label: 'Навушники' }, { id: 'speakers', emoji: '🔊', label: 'Колонки' },
                 { id: 'monitor', emoji: '🖥️', label: 'Монітор' }, { id: 'mic', emoji: '🎤', label: 'Мікрофон' } ] },
    { prompt: 'Що тут зайве?', correct: 'carrot', explain: 'Морква — овоч, а яблуко, банан і груша — фрукти.',
      options: [ { id: 'carrot', emoji: '🥕', label: 'Морква' }, { id: 'apple', emoji: '🍎', label: 'Яблуко' },
                 { id: 'banana', emoji: '🍌', label: 'Банан' }, { id: 'pear', emoji: '🍐', label: 'Груша' } ] }
  ]
};
