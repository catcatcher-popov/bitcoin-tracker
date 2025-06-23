import { fileURLToPath } from 'node:url';

import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    externals: {
      // SRP: Nitro не бандлит нативные аддоны и парсеры
      inline: [],
      external: [
        // уже стоявший @prisma/client
        '@prisma/client',
        // исключаем TS-парсер и его oxc-parser
        '@typescript-eslint/parser',
        'oxc-parser',
      ],
    },
  },
  alias: {
    // Строгая типизация: теперь import … from 'types' найдёт types/index.ts
    types: fileURLToPath(new URL('./types', import.meta.url)),
    constants: fileURLToPath(new URL('./constants', import.meta.url)),
    utils: fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
