/**
 * Колірні теми. Класи записані ЦІЛИМИ рядками, щоб Tailwind їх знайшов під час збірки
 * (рядок на кшталт `bg-${name}-soft` він не побачить).
 * Щоб додати тему: додайте кольори в tailwind.config.js і запис сюди.
 */
export const THEMES = {
  sky:      { zone: 'bg-sky-soft border-sky-mid',           title: 'text-sky-deep',      card: 'border-sky-mid',      chip: 'bg-sky-mid' },
  mint:     { zone: 'bg-mint-soft border-mint-mid',         title: 'text-mint-deep',     card: 'border-mint-mid',     chip: 'bg-mint-mid' },
  lavender: { zone: 'bg-lavender-soft border-lavender-mid', title: 'text-lavender-deep', card: 'border-lavender-mid', chip: 'bg-lavender-mid' },
  butter:   { zone: 'bg-butter-soft border-butter-mid',     title: 'text-butter-deep',   card: 'border-butter-mid',   chip: 'bg-butter-mid' },
  peach:    { zone: 'bg-peach-soft border-peach-mid',       title: 'text-peach-deep',    card: 'border-peach-mid',    chip: 'bg-peach-mid' },
  rose:     { zone: 'bg-rose-soft border-rose-mid',         title: 'text-rose-deep',     card: 'border-rose-mid',     chip: 'bg-rose-mid' },
  teal:     { zone: 'bg-teal-soft border-teal-mid',         title: 'text-teal-deep',     card: 'border-teal-mid',     chip: 'bg-teal-mid' },
  lime:     { zone: 'bg-lime-soft border-lime-mid',         title: 'text-lime-deep',     card: 'border-lime-mid',     chip: 'bg-lime-mid' }
};

/** Тема за назвою; невідома назва → лавандова. */
export const themeOf = name => THEMES[name] || THEMES.lavender;
