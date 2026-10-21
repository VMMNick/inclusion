import { TRUE_FALSE } from './shared-options.js';

/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'truth', icon: '🤔', title: 'Правда чи ні?', label: 'Правда чи ні', theme: 'rose',
  desc: 'Перевір твердження.',
  intro: 'Прочитай речення. Якщо воно правильне — натисни 👍, якщо ні — 👎.',
  skill: 'відрізняє правду від неправди', hint: 'Прочитай речення ще раз уважно 🙂',
  rounds: [
    { picture: '🖱️', prompt: 'Мишкою можна керувати курсором на екрані.', correct: 'yes',
      explain: 'Так! Коли рухаєш мишку — рухається курсор.', options: TRUE_FALSE },
    { picture: '🖨️', prompt: 'Принтер — це програма.', correct: 'no',
      explain: 'Принтер — це пристрій. Його можна торкнутися рукою.', options: TRUE_FALSE },
    { picture: '💾', prompt: 'Свою роботу на комп’ютері варто зберігати, щоб вона не загубилась.', correct: 'yes',
      explain: 'Так! Збережений файл можна відкрити знову.', options: TRUE_FALSE },
    { picture: '🔑', prompt: 'Свій пароль можна розповідати всім друзям.', correct: 'no',
      explain: 'Пароль — це секрет. Його знаєш тільки ти і твої батьки.', options: TRUE_FALSE },
    { picture: '🤖', prompt: 'Комп’ютер виконує команди, які йому дали люди.', correct: 'yes',
      explain: 'Так! Комп’ютер працює за програмами, які написали люди.', options: TRUE_FALSE },
    { picture: '🪜', prompt: 'В алгоритмі кроки можна робити в будь-якому порядку.', correct: 'no',
      explain: 'Порядок кроків дуже важливий! Спочатку видавлюємо пасту, а потім чистимо зуби.', options: TRUE_FALSE }
  ]
};
