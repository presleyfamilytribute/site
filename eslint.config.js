import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
