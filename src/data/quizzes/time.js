/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'time', icon: '🗓️', title: 'Пори року і час', label: 'Час', theme: 'peach',
  desc: 'Дні, місяці, пори року.', intro: 'Що ти знаєш про час і пори року?',
  skill: 'орієнтується в днях тижня і порах року', hint: 'Пригадай, як іде час по порядку.',
  rounds: [
    { picture: '❄️', prompt: 'Яка пора року настає після зими?', correct: 'spring',
      options: [ { id: 'summer', emoji: '☀️', label: 'Літо' }, { id: 'spring', emoji: '🌸', label: 'Весна' }, { id: 'autumn', emoji: '🍂', label: 'Осінь' } ],
      explain: 'Зима → весна → літо → осінь.' },
    { picture: '🍁', prompt: 'Коли з дерев опадає листя?', correct: 'autumn',
      options: [ { id: 'autumn', emoji: '🍂', label: 'Восени' }, { id: 'spring', emoji: '🌸', label: 'Навесні' }, { id: 'summer', emoji: '☀️', label: 'Влітку' } ],
      explain: 'Восени листя жовтіє і опадає.' },
    { picture: '📅', prompt: 'Скільки днів у тижні?', correct: 'n7',
      options: [ { id: 'n5', emoji: '5', label: 'П’ять' }, { id: 'n7', emoji: '7', label: 'Сім' }, { id: 'n10', emoji: '10', label: 'Десять' } ],
      explain: 'Понеділок, вівторок, середа, четвер, п’ятниця, субота, неділя — сім днів.' },
    { picture: '🗓️', prompt: 'Який день настає після понеділка?', correct: 'tue',
      options: [ { id: 'sun', emoji: '7️⃣', label: 'Неділя' }, { id: 'tue', emoji: '2️⃣', label: 'Вівторок' }, { id: 'wed', emoji: '3️⃣', label: 'Середа' } ],
      explain: 'Понеділок — перший день, вівторок — другий.' },
    { picture: '✨', prompt: 'Коли на небі видно зірки?', correct: 'night',
      options: [ { id: 'morning', emoji: '🌅', label: 'Вранці' }, { id: 'day', emoji: '☀️', label: 'Вдень' }, { id: 'night', emoji: '🌙', label: 'Вночі' } ],
      explain: 'Удень зірки є, але сонце світить яскравіше, тому їх видно вночі.' },
    { picture: '🎂', prompt: 'Скільки місяців у році?', correct: 'n12',
      options: [ { id: 'n7', emoji: '7', label: 'Сім' }, { id: 'n10', emoji: '10', label: 'Десять' }, { id: 'n12', emoji: '12', label: 'Дванадцять' } ],
      explain: 'Від січня до грудня — 12 місяців.' }
  ]
};
