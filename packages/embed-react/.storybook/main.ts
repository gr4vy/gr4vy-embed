import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'
import custom from '../webpack.dev.js'

const config: StorybookConfig = {
  stories: [`../**/*.stories.tsx`],
  addons: [
    `@storybook/addon-essentials`,
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    }
  },
  framework: '@storybook/react-webpack5',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
