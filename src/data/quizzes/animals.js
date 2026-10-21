/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'animals', icon: '🐾', title: 'Світ тварин', label: 'Тварини', theme: 'mint',
  desc: 'Хто де живе і що вміє?', intro: 'Що ти знаєш про тварин? Обери правильну відповідь.',
  skill: 'знає цікаве про тварин', hint: 'Уяви цю тварину і подумай ще раз.',
  rounds: [
    { picture: '🐟', prompt: 'Де живе рибка?', correct: 'water',
      options: [ { id: 'forest', emoji: '🌳', label: 'У лісі' }, { id: 'water', emoji: '🌊', label: 'У воді' }, { id: 'desert', emoji: '🏜️', label: 'У пустелі' } ],
      explain: 'Риби дихають зябрами і живуть у воді.' },
    { picture: '🥛', prompt: 'Хто дає нам молоко?', correct: 'cow',
      options: [ { id: 'hen', emoji: '🐔', label: 'Курка' }, { id: 'cow', emoji: '🐄', label: 'Корова' }, { id: 'fish', emoji: '🐟', label: 'Риба' } ],
      explain: 'Корова дає молоко, а курка — яйця.' },
    { picture: '☁️', prompt: 'Хто вміє літати?', correct: 'eagle',
      options: [ { id: 'turtle', emoji: '🐢', label: 'Черепаха' }, { id: 'elephant', emoji: '🐘', label: 'Слон' }, { id: 'eagle', emoji: '🦅', label: 'Орел' } ],
      explain: 'Орел — птах, у нього є крила.' },
    { picture: '📏', prompt: 'У кого найдовша шия?', correct: 'giraffe',
      options: [ { id: 'giraffe', emoji: '🦒', label: 'Жирафа' }, { id: 'horse', emoji: '🐎', label: 'Кінь' }, { id: 'dog', emoji: '🐕', label: 'Пес' } ],
      explain: 'Жирафа дістає листя з високих дерев завдяки довгій шиї.' },
    { picture: '🐻‍❄️', prompt: 'Де живе білий ведмідь?', correct: 'arctic',
      options: [ { id: 'island', emoji: '🏝️', label: 'На тропічному острові' }, { id: 'arctic', emoji: '🧊', label: 'В Арктиці' }, { id: 'desert', emoji: '🏜️', label: 'У пустелі' } ],
      explain: 'Білий ведмідь живе серед льоду і снігу.' },
    { picture: '🐛', prompt: 'Хто з них — комаха?', correct: 'bee',
      options: [ { id: 'bird', emoji: '🐦', label: 'Пташка' }, { id: 'frog', emoji: '🐸', label: 'Жабка' }, { id: 'bee', emoji: '🐝', label: 'Бджілка' } ],
      explain: 'У комах шість ніжок. Бджілка — комаха.' }
  ]
};
