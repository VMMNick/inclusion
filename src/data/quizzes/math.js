/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'math', icon: '🔢', title: 'Математична логіка', label: 'Математика', theme: 'butter',
  desc: 'Порахуй і подумай.', intro: 'Подумай і обери правильну відповідь. Можна рахувати на пальчиках!',
  skill: 'розв’язує логічні задачі з числами', hint: 'Порахуй ще раз повільно 🙂',
  rounds: [
    { picture: '🐱🐱', prompt: 'Скільки лапок у двох котиків?', correct: 'n8',
      options: [ { id: 'n6', emoji: '6', label: 'Шість' }, { id: 'n8', emoji: '8', label: 'Вісім' }, { id: 'n10', emoji: '10', label: 'Десять' } ],
      explain: 'У кожного котика 4 лапки: 4 + 4 = 8.' },
    { picture: '⚖️', prompt: 'Яке число більше?', correct: 'n74',
      options: [ { id: 'n47', emoji: '47', label: 'Сорок сім' }, { id: 'n74', emoji: '74', label: 'Сімдесят чотири' } ],
      explain: 'У числі 74 сім десятків, а в 47 — лише чотири.' },
    { picture: '🖐️🖐️🖐️', prompt: 'Скільки буде 5 + 5 + 5?', correct: 'n15',
      options: [ { id: 'n10', emoji: '10', label: 'Десять' }, { id: 'n15', emoji: '15', label: 'П’ятнадцять' }, { id: 'n20', emoji: '20', label: 'Двадцять' } ],
      explain: 'Три рази по 5 — це 15.' },
    { picture: '🍎🍎🍎', prompt: 'У Олі 3 яблука. Одне вона з’їла. Скільки лишилось?', correct: 'n2',
      options: [ { id: 'n1', emoji: '1', label: 'Одне' }, { id: 'n2', emoji: '2', label: 'Два' }, { id: 'n4', emoji: '4', label: 'Чотири' } ],
      explain: '3 − 1 = 2.' },
    { picture: '🔺', prompt: 'Скільки кутів у трикутника?', correct: 'n3',
      options: [ { id: 'n3', emoji: '3', label: 'Три' }, { id: 'n4', emoji: '4', label: 'Чотири' }, { id: 'n5', emoji: '5', label: 'П’ять' } ],
      explain: 'Три-кутник — у самій назві є відповідь: три кути.' },
    { picture: '🔟', prompt: 'Яке число стоїть між 9 і 11?', correct: 'n10',
      options: [ { id: 'n8', emoji: '8', label: 'Вісім' }, { id: 'n10', emoji: '10', label: 'Десять' }, { id: 'n12', emoji: '12', label: 'Дванадцять' } ],
      explain: '9, 10, 11 — число 10 посередині.' }
  ]
};
