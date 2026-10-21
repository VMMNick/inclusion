/**
 * Завдання «Розклади картки»: рівні складності.
 * Кожен рівень — це набір коробок (categories) і карток (items).
 * Щоб додати рівень або коробку — допишіть об'єкт; theme — одна з тем у src/config/themes.js.
 * @type {import('../types.js').SortingLevel[]}
 */
export const SORTING_LEVELS = [
  {
    id: 'easy', icon: '🌱', label: 'Легко', grade: '3 клас',
    skill: 'розрізняє апаратне і програмне забезпечення',
    categories: [
      { id: 'hardware', name: 'Апаратне забезпечення', emoji: '🖐️', theme: 'sky',  hint: 'Те, що можна торкнутися рукою.' },
      { id: 'software', name: 'Програмне забезпечення', emoji: '💿', theme: 'mint', hint: 'Програми, що працюють усередині комп’ютера.' }
    ],
    items: [
      { id: 'monitor',  name: 'Монітор',                emoji: '🖥️', category: 'hardware' },
      { id: 'keyboard', name: 'Клавіатура',             emoji: '⌨️', category: 'hardware' },
      { id: 'mouse',    name: 'Мишка',                  emoji: '🖱️', category: 'hardware' },
      { id: 'printer',  name: 'Принтер',                emoji: '🖨️', category: 'hardware' },
      { id: 'headset',  name: 'Навушники',              emoji: '🎧', category: 'hardware' },
      { id: 'browser',  name: 'Браузер',                emoji: '🌐', category: 'software' },
      { id: 'game',     name: 'Комп’ютерна гра',        emoji: '👾', category: 'software' },
      { id: 'paint',    name: 'Програма для малювання', emoji: '🎨', category: 'software' },
      { id: 'writer',   name: 'Текстовий редактор',     emoji: '📝', category: 'software' },
      { id: 'player',   name: 'Музичний плеєр',         emoji: '🎵', category: 'software' }
    ]
  },
  {
    id: 'medium', icon: '🌿', label: 'Середньо', grade: '4 клас',
    skill: 'розрізняє пристрої введення, виведення і програми',
    categories: [
      { id: 'input',    name: 'Пристрої введення',  emoji: '📥', theme: 'peach',    hint: 'Передають інформацію В комп’ютер.' },
      { id: 'output',   name: 'Пристрої виведення', emoji: '📤', theme: 'teal',     hint: 'Показують або озвучують інформацію З комп’ютера.' },
      { id: 'software', name: 'Програми',           emoji: '💿', theme: 'lavender', hint: 'Їх не можна торкнутися — вони всередині.' }
    ],
    items: [
      { id: 'keyboard', name: 'Клавіатура',             emoji: '⌨️', category: 'input' },
      { id: 'mouse',    name: 'Мишка',                  emoji: '🖱️', category: 'input' },
      { id: 'mic',      name: 'Мікрофон',               emoji: '🎤', category: 'input' },
      { id: 'camera',   name: 'Вебкамера',              emoji: '📷', category: 'input' },
      { id: 'monitor',  name: 'Монітор',                emoji: '🖥️', category: 'output' },
      { id: 'printer',  name: 'Принтер',                emoji: '🖨️', category: 'output' },
      { id: 'speakers', name: 'Колонки',                emoji: '🔊', category: 'output' },
      { id: 'headset',  name: 'Навушники',              emoji: '🎧', category: 'output' },
      { id: 'browser',  name: 'Браузер',                emoji: '🌐', category: 'software' },
      { id: 'game',     name: 'Комп’ютерна гра',        emoji: '👾', category: 'software' },
      { id: 'paint',    name: 'Програма для малювання', emoji: '🎨', category: 'software' },
      { id: 'writer',   name: 'Текстовий редактор',     emoji: '📝', category: 'software' }
    ]
  },
  {
    id: 'hard', icon: '🌳', label: 'Складніше', grade: '5 клас',
    skill: 'розрізняє пристрої введення, виведення, зберігання і програми',
    categories: [
      { id: 'input',    name: 'Пристрої введення',   emoji: '📥', theme: 'peach',  hint: 'Передають інформацію В комп’ютер.' },
      { id: 'output',   name: 'Пристрої виведення',  emoji: '📤', theme: 'teal',   hint: 'Показують або озвучують інформацію З комп’ютера.' },
      { id: 'storage',  name: 'Пристрої зберігання', emoji: '🗄️', theme: 'butter', hint: 'Зберігають файли, навіть коли комп’ютер вимкнено.' },
      { id: 'software', name: 'Програми',            emoji: '💿', theme: 'rose',   hint: 'Їх не можна торкнутися — вони всередині.' }
    ],
    items: [
      { id: 'keyboard',  name: 'Клавіатура',         emoji: '⌨️', category: 'input' },
      { id: 'mouse',     name: 'Мишка',              emoji: '🖱️', category: 'input' },
      { id: 'mic',       name: 'Мікрофон',           emoji: '🎤', category: 'input' },
      { id: 'camera',    name: 'Вебкамера',          emoji: '📷', category: 'input' },
      { id: 'monitor',   name: 'Монітор',            emoji: '🖥️', category: 'output' },
      { id: 'printer',   name: 'Принтер',            emoji: '🖨️', category: 'output' },
      { id: 'speakers',  name: 'Колонки',            emoji: '🔊', category: 'output' },
      { id: 'flash',     name: 'Флешка',             emoji: '💾', category: 'storage' },
      { id: 'hdd',       name: 'Жорсткий диск',      emoji: '💽', category: 'storage' },
      { id: 'dvd',       name: 'Оптичний диск',      emoji: '📀', category: 'storage' },
      { id: 'browser',   name: 'Браузер',            emoji: '🌐', category: 'software' },
      { id: 'game',      name: 'Комп’ютерна гра',    emoji: '👾', category: 'software' },
      { id: 'antivirus', name: 'Антивірус',          emoji: '🛡️', category: 'software' },
      { id: 'writer',    name: 'Текстовий редактор', emoji: '📝', category: 'software' }
    ]
  }
];
