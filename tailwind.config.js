/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind шукає класи в усіх шаблонах і модулях.
  // Класи збираються лише з ПОВНИХ рядків, тому кольори тем описані цілими рядками в src/config/themes.js.
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Nunito Variable"', 'Nunito', 'system-ui', 'sans-serif'] },
      colors: {
        cream: '#FFFBF5',
        ink: '#3C4858',
        // Пастельна палітра (8 тем) — без різких контрастів і агресивного червоного
        sky:      { soft: '#E8F3FC', mid: '#C5E0F7', deep: '#4F7FA8' },
        mint:     { soft: '#E8F6EE', mid: '#C3EBD3', deep: '#3F8A63' },
        lavender: { soft: '#F2EDFA', mid: '#DCD0F2', deep: '#6E5A9C' },
        butter:   { soft: '#FFF8E3', mid: '#FBE7AE', deep: '#8A6A12' },
        peach:    { soft: '#FDF0E8', mid: '#F6D5C2', deep: '#9C5F3F' },
        rose:     { soft: '#FCEFF3', mid: '#F3D0DC', deep: '#94566E' },
        teal:     { soft: '#E6F5F4', mid: '#BDE5E1', deep: '#367A73' },
        lime:     { soft: '#F2F8E4', mid: '#DAECB6', deep: '#5B7623' }
      },
      borderRadius: { '4xl': '2rem' }
    }
  },
  plugins: []
};
