/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'traffic', icon: '🚦', title: 'Безпечна дорога', label: 'Дорога', theme: 'butter',
  desc: 'Світлофор, зебра, шолом.', intro: 'Як безпечно поводитися на дорозі?',
  skill: 'знає правила безпечної дороги', hint: 'Подумай, як зробити так, щоб нікому не було небезпечно.',
  rounds: [
    { picture: '🚦', prompt: 'На яке світло світлофора можна переходити дорогу?', correct: 'green',
      options: [ { id: 'red', emoji: '🔴', label: 'Червоне' }, { id: 'yellow', emoji: '🟡', label: 'Жовте' }, { id: 'green', emoji: '🟢', label: 'Зелене' } ],
      explain: 'Зелене світло — можна йти, але все одно уважно.' },
    { picture: '🛑', prompt: 'Що означає червоне світло?', correct: 'stop',
      options: [ { id: 'stop', emoji: '✋', label: 'Стій' }, { id: 'go', emoji: '🚶', label: 'Йди' }, { id: 'run', emoji: '🏃', label: 'Біжи' } ],
      explain: 'Червоне світло — стоп! Чекаємо.' },
    { picture: '🛣️', prompt: 'Де правильно переходити дорогу?', correct: 'zebra',
      options: [ { id: 'any', emoji: '🚗', label: 'Будь-де між машинами' }, { id: 'zebra', emoji: '🦓', label: 'По пішохідному переходу' }, { id: 'corner', emoji: '↩️', label: 'Через поворот' } ],
      explain: 'Пішохідний перехід ще називають «зеброю» — через смужки.' },
    { picture: '👀', prompt: 'Що зробити перед тим, як переходити дорогу?', correct: 'look',
      options: [ { id: 'look', emoji: '⬅️➡️', label: 'Подивитися ліворуч і праворуч' }, { id: 'phone', emoji: '📱', label: 'Дивитися в телефон' }, { id: 'run', emoji: '🏃', label: 'Швидко бігти' } ],
      explain: 'Спочатку переконайся, що машин немає.' },
    { picture: '🚲', prompt: 'Що треба вдягнути, коли їдеш на велосипеді?', correct: 'helmet',
      options: [ { id: 'hat', emoji: '🎩', label: 'Капелюх' }, { id: 'helmet', emoji: '⛑️', label: 'Шолом' }, { id: 'crown', emoji: '👑', label: 'Корону' } ],
      explain: 'Шолом захищає голову.' },
    { picture: '⚽', prompt: 'Де можна гратися з м’ячем?', correct: 'park',
      options: [ { id: 'road', emoji: '🛣️', label: 'На дорозі' }, { id: 'park', emoji: '🏞️', label: 'На майданчику' }, { id: 'parking', emoji: '🅿️', label: 'На парковці' } ],
      explain: 'Гратися треба на майданчику, подалі від машин.' }
  ]
};
