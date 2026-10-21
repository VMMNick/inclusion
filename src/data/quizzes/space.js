/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'space', icon: '🚀', title: 'Космічна подорож', label: 'Космос', theme: 'lavender',
  desc: 'Планети, зорі, космонавти.', intro: 'Полетімо в космос! Обери правильну відповідь.',
  skill: 'знає цікаве про космос', hint: 'Подивись уважно на картинки-підказки.',
  rounds: [
    { picture: '🏠', prompt: 'На якій планеті ми живемо?', correct: 'earth',
      options: [ { id: 'mars', emoji: '🔴', label: 'Марс' }, { id: 'earth', emoji: '🌍', label: 'Земля' }, { id: 'saturn', emoji: '🪐', label: 'Сатурн' } ],
      explain: 'Наш дім — планета Земля.' },
    { picture: '🌤️', prompt: 'Яка зоря світить нам удень?', correct: 'sun',
      options: [ { id: 'sun', emoji: '☀️', label: 'Сонце' }, { id: 'moon', emoji: '🌙', label: 'Місяць' }, { id: 'comet', emoji: '☄️', label: 'Комета' } ],
      explain: 'Сонце — це зоря, найближча до Землі.' },
    { picture: '🚀', prompt: 'Хто літає в космос?', correct: 'astro',
      options: [ { id: 'cook', emoji: '🧑‍🍳', label: 'Кухар' }, { id: 'farmer', emoji: '🧑‍🌾', label: 'Фермер' }, { id: 'astro', emoji: '🧑‍🚀', label: 'Космонавт' } ],
      explain: 'Космонавти літають у космос на ракетах.' },
    { picture: '💍', prompt: 'Яка планета має красиві кільця?', correct: 'saturn',
      options: [ { id: 'saturn', emoji: '🪐', label: 'Сатурн' }, { id: 'earth', emoji: '🌍', label: 'Земля' }, { id: 'mars', emoji: '🔴', label: 'Марс' } ],
      explain: 'Кільця Сатурна складаються з льоду і каміння.' },
    { picture: '🔄', prompt: 'Що обертається навколо Землі?', correct: 'moon',
      options: [ { id: 'sun', emoji: '☀️', label: 'Сонце' }, { id: 'moon', emoji: '🌙', label: 'Місяць' }, { id: 'saturn', emoji: '🪐', label: 'Сатурн' } ],
      explain: 'Місяць — супутник Землі, він обертається навколо неї.' },
    { picture: '🟥', prompt: 'Яку планету називають червоною?', correct: 'mars',
      options: [ { id: 'earth', emoji: '🌍', label: 'Земля' }, { id: 'saturn', emoji: '🪐', label: 'Сатурн' }, { id: 'mars', emoji: '🔴', label: 'Марс' } ],
      explain: 'Марс червоний через іржавий пил на поверхні.' }
  ]
};
