import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          gold: '#F7931A',
          'gold-secondary': '#F7931A60',
        },
        background: {
          DEFAULT: '#121212',
          dark: '#0E0E0E',
        },
        text: {
          primary: '#E0E0E0',
          secondary: '#A0A0A0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
