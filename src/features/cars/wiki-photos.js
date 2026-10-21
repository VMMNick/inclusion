/**
 * Фото машин з Вікіпедії (Wikimedia Commons).
 * Окремий модуль, щоб джерело фото легко замінити (наприклад, на власні файли).
 */

/**
 * Перетворює відповідь Wikipedia REST API (page/summary) на опис фото.
 * Чиста функція — перевіряється тестами без мережі.
 * @returns {{ status: 'ok', src: string, fallback: string|null, credit: string|null }}
 */
export function photoFromSummary(data) {
  const orig = data.originalimage;
  const thumb = data.thumbnail;
  if (!orig && !thumb) throw new Error('no image');

  // Беремо мініатюру 500px: досить чітко і швидко вантажиться
  let src = thumb ? thumb.source : orig.source;
  if (thumb && orig && orig.width >= 500 && /\/\d+px-/.test(thumb.source)) {
    src = thumb.source.replace(/\/\d+px-/, '/500px-');
  }

  // Посилання на сторінку файлу з автором і ліцензією
  const fileUrl = (orig || thumb).source;
  let credit = data.content_urls?.desktop?.page ?? null;
  if (fileUrl.includes('/wikipedia/commons/')) {
    const parts = fileUrl.split('/');
    const name = fileUrl.includes('/thumb/') ? parts[parts.length - 2] : parts[parts.length - 1];
    credit = `https://commons.wikimedia.org/wiki/File:${name}`;
  }

  return { status: 'ok', src, fallback: thumb && src !== thumb.source ? thumb.source : null, credit };
}

/** Завантажує опис фото для статті Вікіпедії (тайм-аут 9 с). */
export async function fetchWikiPhoto(article) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`, { signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return photoFromSummary(await res.json());
  } finally {
    clearTimeout(timer);
  }
}
