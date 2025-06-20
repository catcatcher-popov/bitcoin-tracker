// nuxt-app/.eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: { extensions: ['.js', '.ts', '.vue'] },
    },
  },
  rules: {
    // Превращаем Prettier-форматирование в ошибки ESLint
    'prettier/prettier': 'error',

    // TS: type вместо interface, и игнор unused args, начинающихся с _
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Общее
    'no-console': 'warn',
    'no-debugger': 'error',

    // Vue-3
    'vue/html-indent': ['error', 2],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/max-attributes-per-line': ['error', { singleline: 3 }],

    // import-порядок
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
