import globals from 'globals';
import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: [
      'node_modules/',
      'android/',
      'ios/',
      'build/',
      'dist/',
      'coverage/',
      '*.lock',
      '.DS_Store',
      '.vscode/',
      '*.config.js',
      '__tests__/',
      '.prettierrc.js',
    ],
  },

  pluginJs.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals['react-native'],
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-native': pluginReactNative,
    },
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals['react-native'],
      },
    },
    rules: {
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/display-name': 'off',
      'react/jsx-filename-extension': ['warn', {extensions: ['.jsx', '.tsx']}],
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['warn', {}, {usePrettierrc: true}],
    },
  },

  configPrettier,
];
