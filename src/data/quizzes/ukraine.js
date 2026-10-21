/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'ukraine', icon: '💙', title: 'Моя Україна', label: 'Україна', theme: 'sky',
  desc: 'Символи, міста, річки.', intro: 'Що ти знаєш про нашу країну?',
  skill: 'знає символи і цікавинки України', hint: 'Подумай ще раз — ти точно це знаєш!',
  rounds: [
    { picture: '🏙️', prompt: 'Яке місто — столиця України?', correct: 'kyiv',
      options: [ { id: 'lviv', emoji: '🏛️', label: 'Львів' }, { id: 'kyiv', emoji: '⭐', label: 'Київ' }, { id: 'odesa', emoji: '⚓', label: 'Одеса' } ],
      explain: 'Київ — столиця України.' },
    { picture: '🚩', prompt: 'Які кольори має прапор України?', correct: 'by',
      options: [ { id: 'by', emoji: '💙💛', label: 'Синій і жовтий' }, { id: 'rw', emoji: '❤️🤍', label: 'Червоний і білий' }, { id: 'gw', emoji: '💚🤍', label: 'Зелений і білий' } ],
      explain: 'Синій — як небо, жовтий — як пшеничне поле.' },
    { picture: '🛡️', prompt: 'Що зображено на гербі України?', correct: 'trident',
      options: [ { id: 'lion', emoji: '🦁', label: 'Лев' }, { id: 'trident', emoji: '🔱', label: 'Тризуб' }, { id: 'eagle', emoji: '🦅', label: 'Орел' } ],
      explain: 'Герб України — золотий тризуб на синьому щиті.' },
    { picture: '🌊', prompt: 'Яка найбільша річка України?', correct: 'dnipro',
      options: [ { id: 'dnipro', emoji: '🏞️', label: 'Дніпро' }, { id: 'desna', emoji: '💧', label: 'Десна' }, { id: 'rosa', emoji: '🌿', label: 'Рось' } ],
      explain: 'Дніпро перетинає всю Україну з півночі на південь.' },
    { picture: '🏖️', prompt: 'Яке з цих морів омиває Україну?', correct: 'black',
      options: [ { id: 'red', emoji: '🔴', label: 'Червоне' }, { id: 'north', emoji: '🧊', label: 'Північне' }, { id: 'black', emoji: '⚫', label: 'Чорне' } ],
      explain: 'Україну омивають Чорне та Азовське моря.' },
    { picture: '🗣️', prompt: 'Яка мова — державна в Україні?', correct: 'uk',
      options: [ { id: 'uk', emoji: '💙💛', label: 'Українська' }, { id: 'en', emoji: '🔤', label: 'Англійська' }, { id: 'pl', emoji: '📖', label: 'Польська' } ],
      explain: 'Українська — державна мова України.' }
  ]
};
