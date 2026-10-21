import { SAFE_UNSAFE } from './shared-options.js';

/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'safety', icon: '🛡️', title: 'Безпека в інтернеті', label: 'Безпека', theme: 'sky',
  desc: 'Безпечно чи ні?', intro: 'Прочитай, що робить дитина. Це безпечно чи ні?',
  skill: 'знає правила безпеки в інтернеті', hint: 'Подумай: чи сказав би ти це незнайомій людині на вулиці?',
  rounds: [
    { picture: '🏠', prompt: 'Незнайомець у грі питає твою адресу. Сказати йому?', correct: 'unsafe', options: SAFE_UNSAFE,
      explain: 'Адресу, телефон і школу незнайомцям не кажемо ніколи.' },
    { picture: '👨‍👩‍👧', prompt: 'В інтернеті щось налякало — розповісти про це батькам.', correct: 'safe', options: SAFE_UNSAFE,
      explain: 'Так! Дорослі завжди допоможуть.' },
    { picture: '🎁', prompt: 'Натиснути на яскраву рекламу «Ти виграв телефон!».', correct: 'unsafe', options: SAFE_UNSAFE,
      explain: 'Така реклама часто обманює. Краще її закрити.' },
    { picture: '🔑', prompt: 'Мати пароль, який знаєш тільки ти і батьки.', correct: 'safe', options: SAFE_UNSAFE,
      explain: 'Так! Пароль — це секрет.' },
    { picture: '📸', prompt: 'Надіслати своє фото незнайомому другові з гри.', correct: 'unsafe', options: SAFE_UNSAFE,
      explain: 'Свої фото надсилаємо тільки тим, кого знаємо в житті, і з дозволу батьків.' },
    { picture: '📥', prompt: 'Спитати дорослого, перш ніж завантажити нову гру.', correct: 'safe', options: SAFE_UNSAFE,
      explain: 'Так! Дорослий допоможе перевірити, чи гра безпечна.' }
  ]
};
