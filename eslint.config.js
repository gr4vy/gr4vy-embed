const { defineConfig, globalIgnores } = require('eslint/config')

const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const importPlugin = require('eslint-plugin-import')
const jestPlugin = require('eslint-plugin-jest')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const eslintPluginReactRecommended = require('eslint-plugin-react/configs/recommended')
const storybook = require('eslint-plugin-storybook')
const globals = require('globals')

const tseslintRecommended = Array.isArray(tseslint.configs.recommended)
  ? tseslint.configs.recommended
  : [tseslint.configs.recommended]

module.exports = defineConfig([
  {
    files: ['**/*.{mjs,cjs,ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslintRecommended,
      eslintPluginReactRecommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      eslintPluginPrettierRecommended,
    ],

    languageOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-restricted-types': 0,
      '@typescript-eslint/no-unsafe-function-type': 0,
      '@typescript-eslint/no-wrapper-object-types': 0,
      'no-shadow': 0,
      'import/named': 0,
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },

          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          'newlines-between': 'never',
        },
      ],

      'react/prop-types': 0,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

  {
    files: ['packages/embed/**'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },
  },

  {
    files: ['packages/embed-react/**'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },
  },

  ...storybook.configs['flat/recommended'],

  globalIgnores([
    '**/.devcontainer',
    '**/.github',
    '**/.vscode',
    '**/node_modules',
    '**/dist',
    '!.storybook',
    '**/*.js',
  ]),
])
