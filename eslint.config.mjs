import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...compat.extends('expo', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'),

  {
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // React / React Native
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-constant-condition': 'warn',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Code quality
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['warn'],
      'no-var': 'error',
    },
  },

  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.expo/',
      'coverage/',
      'scripts/_archive/',
      'backend/db/migrations/',
      'backend/db/init/',
      '*.config.js',
      '*.config.mjs',
      'openapi.yaml',
    ],
  },
];
