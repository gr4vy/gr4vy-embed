const custom = require(`../webpack.dev.js`)

module.exports = {
  stories: [`../**/*.stories.tsx`],
  addons: [`@storybook/addon-essentials`],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    }
  },
  framework: '@storybook/react-webpack5',
}
