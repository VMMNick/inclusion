/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'pattern', icon: '🔁', title: 'Що буде далі?', label: 'Що далі?', theme: 'butter',
  desc: 'Продовж закономірність.',
  intro: 'Подивись на ряд. Що має стояти замість знака <b>?</b>',
  skill: 'продовжує закономірності', hint: 'Подивись, що повторюється або як змінюється ряд.',
  rounds: [
    { prompt: 'Що буде далі?', sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'], sequenceLabel: 'Ряд: червоне, синє, червоне, синє, червоне, знак питання',
      correct: 'blue', explain: 'Кольори чергуються: червоне — синє — червоне — синє.',
      options: [ { id: 'red', emoji: '🔴', label: 'Червоне' }, { id: 'blue', emoji: '🔵', label: 'Синє' }, { id: 'green', emoji: '🟢', label: 'Зелене' } ] },
    { prompt: 'Що буде далі?', sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'], sequenceLabel: 'Ряд: зірка, зірка, місяць, зірка, зірка, знак питання',
      correct: 'moon', explain: 'Дві зірки, потім місяць — і знову по колу.',
      options: [ { id: 'star', emoji: '⭐', label: 'Зірка' }, { id: 'sun', emoji: '☀️', label: 'Сонце' }, { id: 'moon', emoji: '🌙', label: 'Місяць' } ] },
    { prompt: 'Що буде далі?', sequence: ['🍎', '🍐', '🍌', '🍎', '🍐'], sequenceLabel: 'Ряд: яблуко, груша, банан, яблуко, груша, знак питання',
      correct: 'banana', explain: 'Повторюються три фрукти: яблуко, груша, банан.',
      options: [ { id: 'banana', emoji: '🍌', label: 'Банан' }, { id: 'apple', emoji: '🍎', label: 'Яблуко' }, { id: 'pear', emoji: '🍐', label: 'Груша' } ] },
    { prompt: 'Яке число буде далі?', sequence: ['1', '3', '5', '7'], sequenceLabel: 'Ряд: 1, 3, 5, 7, знак питання',
      correct: 'n9', explain: 'Кожне наступне число більше на 2: 7 + 2 = 9.',
      options: [ { id: 'n8', emoji: '8', label: 'Вісім' }, { id: 'n9', emoji: '9', label: 'Дев’ять' }, { id: 'n10', emoji: '10', label: 'Десять' } ] },
    { prompt: 'Що буде далі?', sequence: ['🔺', '🔺', '🟦', '🔺', '🔺', '🟦', '🔺'], sequenceLabel: 'Ряд: трикутник, трикутник, квадрат, трикутник, трикутник, квадрат, трикутник, знак питання',
      correct: 'tri', explain: 'Два трикутники, потім квадрат. Після одного трикутника буде ще один.',
      options: [ { id: 'sq', emoji: '🟦', label: 'Квадрат' }, { id: 'tri', emoji: '🔺', label: 'Трикутник' }, { id: 'circle', emoji: '🟢', label: 'Коло' } ] },
    { prompt: 'Яке число буде далі?', sequence: ['10', '20', '30', '40'], sequenceLabel: 'Ряд: 10, 20, 30, 40, знак питання',
      correct: 'n50', explain: 'Кожне наступне число більше на 10: 40 + 10 = 50.',
      options: [ { id: 'n45', emoji: '45', label: 'Сорок п’ять' }, { id: 'n50', emoji: '50', label: 'П’ятдесят' }, { id: 'n60', emoji: '60', label: 'Шістдесят' } ] }
  ]
};
