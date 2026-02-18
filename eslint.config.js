const { defineConfig, globalIgnores } = require('eslint/config')

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat')

const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const jest = require('eslint-plugin-jest')
const prettier = require('eslint-plugin-prettier')
const storybook = require('eslint-plugin-storybook')
const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
      )
    ),

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...jest.environments.globals.globals,
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      jest,
      prettier: fixupPluginRules(prettier),
    },

    rules: {
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-function': 0,
      'no-shadow': 0,
      '@typescript-eslint/no-extra-semi': 0,
      'import/named': 0,
      'prettier/prettier': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
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
