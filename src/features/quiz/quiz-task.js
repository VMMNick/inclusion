/**
 * Перетворює категорію-вікторину з src/data/quizzes/ на повноцінне завдання.
 * Саме тому нова категорія — це лише новий файл з даними.
 */
import { createQuiz } from './quiz-engine.js';

/**
 * @param {import('../../types.js').QuizCategory} category
 * @returns {import('../../types.js').TaskModule}
 */
export function createQuizTask(category) {
  let quiz;
  return {
    key: category.key,
    icon: category.icon,
    title: category.title,
    label: category.label,
    desc: category.desc,
    theme: category.theme,
    intro: category.intro,
    skill: category.skill,
    template: '<div data-role="quiz"></div>',

    mount({ body, nextButton, complete }) {
      quiz = createQuiz({
        root: body.querySelector('[data-role="quiz"]'),
        config: category,
        onComplete: complete,
        getFocusAfterComplete: () => nextButton
      });
    },

    reset() {
      quiz.reset();
    }
  };
}
