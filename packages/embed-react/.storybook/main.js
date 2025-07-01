import { dirname, join } from 'path'
const custom = require(`../webpack.dev.js`)

module.exports = {
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

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
