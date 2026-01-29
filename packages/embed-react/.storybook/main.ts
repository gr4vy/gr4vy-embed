// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module'
import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'
import custom from '../webpack.dev.js'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: [`../**/*.stories.tsx`],
  addons: [getAbsolutePath('@storybook/addon-webpack5-compiler-babel')],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    }
  },
  framework: getAbsolutePath('@storybook/react-webpack5'),
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
