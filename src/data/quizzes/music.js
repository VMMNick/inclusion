/** @type {import('../../types.js').QuizCategory} */
export default {
  key: 'music', icon: '🎵', title: 'Музична скринька', label: 'Музика', theme: 'teal',
  desc: 'Ноти та інструменти.', intro: 'Послухай серцем! Що ти знаєш про музику?',
  skill: 'знає ноти й музичні інструменти', hint: 'Уяви, як грає цей інструмент.',
  rounds: [
    { picture: '🎼', prompt: 'Скільки нот: до, ре, мі, фа, соль, ля, сі?', correct: 'n7',
      options: [ { id: 'n5', emoji: '5', label: 'П’ять' }, { id: 'n7', emoji: '7', label: 'Сім' }, { id: 'n10', emoji: '10', label: 'Десять' } ],
      explain: 'Нот сім — як днів у тижні.' },
    { picture: '🎶', prompt: 'У якого інструмента є чорні й білі клавіші?', correct: 'piano',
      options: [ { id: 'piano', emoji: '🎹', label: 'Піаніно' }, { id: 'drum', emoji: '🥁', label: 'Барабан' }, { id: 'trumpet', emoji: '🎺', label: 'Труба' } ],
      explain: 'На піаніно грають, натискаючи клавіші.' },
    { picture: '🏹', prompt: 'На якому інструменті грають смичком?', correct: 'violin',
      options: [ { id: 'trumpet', emoji: '🎺', label: 'Труба' }, { id: 'violin', emoji: '🎻', label: 'Скрипка' }, { id: 'drum', emoji: '🥁', label: 'Барабан' } ],
      explain: 'Смичок ковзає по струнах скрипки.' },
    { picture: '💨', prompt: 'У який інструмент треба дмухати?', correct: 'trumpet',
      options: [ { id: 'piano', emoji: '🎹', label: 'Піаніно' }, { id: 'violin', emoji: '🎻', label: 'Скрипка' }, { id: 'trumpet', emoji: '🎺', label: 'Труба' } ],
      explain: 'Труба — духовий інструмент.' },
    { picture: '🥢', prompt: 'По якому інструменту б’ють паличками?', correct: 'drum',
      options: [ { id: 'drum', emoji: '🥁', label: 'Барабан' }, { id: 'violin', emoji: '🎻', label: 'Скрипка' }, { id: 'piano', emoji: '🎹', label: 'Піаніно' } ],
      explain: 'Барабан — ударний інструмент.' },
    { picture: '💙💛', prompt: 'Який інструмент — український народний, з багатьма струнами?', correct: 'bandura',
      options: [ { id: 'bandura', emoji: '🪕', label: 'Бандура' }, { id: 'drum', emoji: '🥁', label: 'Барабан' }, { id: 'trumpet', emoji: '🎺', label: 'Труба' } ],
      explain: 'Бандура — славетний український інструмент, на ній грали кобзарі.' }
  ]
};
