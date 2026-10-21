import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// Збірка дає ОДИН самодостатній файл dist/index.html:
// його можна і викласти на GitHub Pages, і просто відкрити з флешки без інтернету.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  // Версія з package.json показується у футері
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js']
  }
});
