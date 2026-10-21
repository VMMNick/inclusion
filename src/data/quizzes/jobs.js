/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'jobs', icon: '👷', title: 'Професії', label: 'Професії', theme: 'peach',
  desc: 'Хто чим займається?', intro: 'Хто ким працює? Обери правильну професію.',
  skill: 'знає різні професії', hint: 'Подумай, хто цим займається щодня.',
  rounds: [
    { picture: '🏥', prompt: 'Хто лікує людей?', correct: 'doctor',
      options: [ { id: 'doctor', emoji: '🧑‍⚕️', label: 'Лікар' }, { id: 'pilot', emoji: '🧑‍✈️', label: 'Пілот' }, { id: 'baker', emoji: '🧑‍🍳', label: 'Пекар' } ],
      explain: 'Лікар допомагає, коли людина захворіла.' },
    { picture: '🔥', prompt: 'Хто гасить пожежі?', correct: 'fire',
      options: [ { id: 'teacher', emoji: '🧑‍🏫', label: 'Вчитель' }, { id: 'fire', emoji: '🧑‍🚒', label: 'Пожежник' }, { id: 'farmer', emoji: '🧑‍🌾', label: 'Фермер' } ],
      explain: 'Пожежники — сміливі рятувальники.' },
    { picture: '🍞', prompt: 'Хто пече хліб?', correct: 'baker',
      options: [ { id: 'coder', emoji: '🧑‍💻', label: 'Програміст' }, { id: 'doctor', emoji: '🧑‍⚕️', label: 'Лікар' }, { id: 'baker', emoji: '🧑‍🍳', label: 'Пекар' } ],
      explain: 'Пекар щоранку пече свіжий хліб.' },
    { picture: '📚', prompt: 'Хто навчає дітей у школі?', correct: 'teacher',
      options: [ { id: 'teacher', emoji: '🧑‍🏫', label: 'Вчитель' }, { id: 'fire', emoji: '🧑‍🚒', label: 'Пожежник' }, { id: 'pilot', emoji: '🧑‍✈️', label: 'Пілот' } ],
      explain: 'Вчитель допомагає дітям дізнаватись нове.' },
    { picture: '💻', prompt: 'Хто пише програми для комп’ютерів?', correct: 'coder',
      options: [ { id: 'baker', emoji: '🧑‍🍳', label: 'Пекар' }, { id: 'coder', emoji: '🧑‍💻', label: 'Програміст' }, { id: 'farmer', emoji: '🧑‍🌾', label: 'Фермер' } ],
      explain: 'Програміст складає алгоритми — як ти в цій лабораторії!' },
    { picture: '✈️', prompt: 'Хто керує літаком?', correct: 'pilot',
      options: [ { id: 'pilot', emoji: '🧑‍✈️', label: 'Пілот' }, { id: 'teacher', emoji: '🧑‍🏫', label: 'Вчитель' }, { id: 'doctor', emoji: '🧑‍⚕️', label: 'Лікар' } ],
      explain: 'Пілот веде літак небом.' }
  ]
};
