/**
 * Опис форм даних (JSDoc). Редактор (VS Code) підказуватиме поля й підсвічуватиме помилки
 * у файлах src/data/*. На роботу застосунку цей файл не впливає.
 */

/** @typedef {'sky'|'mint'|'lavender'|'butter'|'peach'|'rose'|'teal'|'lime'} ThemeName */

/**
 * @typedef {Object} QuizOption
 * @property {string} id      Унікальний у межах задачки
 * @property {string} emoji   Картинка-емодзі або число ('' — лише текст)
 * @property {string} label   Підпис (його читає екранний читач)
 */

/**
 * @typedef {Object} QuizRound
 * @property {string} prompt            Питання
 * @property {string} correct           id правильного варіанта
 * @property {string} explain           Пояснення після правильної відповіді
 * @property {QuizOption[]} options     2–4 варіанти
 * @property {string} [picture]         Велике емодзі над питанням
 * @property {string[]} [sequence]      Ряд для «Що буде далі?»
 * @property {string} [sequenceLabel]   Опис ряду для екранного читача
 * @property {string} [carId]           Фото машини замість picture (лише для «Машин»)
 */

/**
 * @typedef {Object} QuizCategory
 * @property {string} key        Унікальний ключ (латиницею)
 * @property {string} icon       Емодзі категорії
 * @property {string} title      Назва розділу
 * @property {string} label      Коротка назва для панелі кроків
 * @property {ThemeName} theme   Колір
 * @property {string} desc       Опис у меню вибору
 * @property {string} intro      Інструкція під заголовком (можна з <b>)
 * @property {string} skill      Що вміє учень (продовжує фразу «за те, що …»)
 * @property {string} hint       Підказка після неправильної відповіді
 * @property {QuizRound[]} rounds
 */

/**
 * @typedef {Object} SortingLevel
 * @property {string} id
 * @property {string} icon
 * @property {string} label
 * @property {string} grade
 * @property {string} skill
 * @property {{id:string,name:string,emoji:string,theme:ThemeName,hint:string}[]} categories
 * @property {{id:string,name:string,emoji:string,category:string}[]} items
 */

/**
 * @typedef {Object} AlgorithmTopic
 * @property {string} id
 * @property {string} icon
 * @property {string} short
 * @property {string} title
 * @property {{id:string,text:string,emoji:string}[]} steps   У правильному порядку
 * @property {string[]} start                                  Початкове перемішування (id кроків)
 */

/**
 * @typedef {Object} RobotLevel
 * @property {number} size
 * @property {[number,number]} start
 * @property {[number,number]} star
 * @property {[number,number][]} rocks
 */

/**
 * @typedef {Object} Car
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {string} wiki
 * @property {string} country
 * @property {string} fact
 * @property {string} [photo]
 * @property {string} [credit]
 */

/**
 * @typedef {Object} CertificateStyle
 * @property {string} title
 * @property {string[]} decor
 */

/**
 * Модуль завдання. Кожне завдання в src/tasks/registry.js має таку форму.
 * @typedef {Object} TaskModule
 * @property {string} key
 * @property {string} icon
 * @property {string} title
 * @property {string} label
 * @property {string} desc
 * @property {ThemeName} theme
 * @property {string} intro
 * @property {string | (() => string)} skill
 * @property {string} [template]   HTML тіла розділу
 * @property {string} [actions]    Додаткові кнопки поруч із «Далі»
 * @property {(ctx: TaskContext) => void} mount   Викликається один раз при старті
 * @property {() => void} reset                   «Пройти ще раз»
 * @property {() => void} [onEnter]               Коли учень відкриває розділ
 * @property {() => string} [awardNote]           Додатковий рядок на фінальній нагороді
 */

/**
 * @typedef {Object} TaskContext
 * @property {HTMLElement} section      Розділ завдання
 * @property {HTMLElement} body         Контейнер тіла (з template)
 * @property {HTMLButtonElement} nextButton
 * @property {() => void} complete      Позначити завдання виконаним
 */

export {};
