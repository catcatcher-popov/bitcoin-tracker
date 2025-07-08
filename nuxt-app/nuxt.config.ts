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
      inline: [],
      external: ['@prisma/client', '@typescript-eslint/parser', 'oxc-parser'],
    },
  },
  alias: {
    types: fileURLToPath(new URL('./types', import.meta.url)),
    constants: fileURLToPath(new URL('./constants', import.meta.url)),
    utils: fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
