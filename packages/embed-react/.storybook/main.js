const custom = require(`../webpack.dev.js`)

module.exports = {
  stories: [`../**/*.stories.tsx`],
  addons: [
    `@storybook/addon-actions`,
    `@storybook/addon-links`,
    `@storybook/addon-knobs/register`,
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    }
  },
}
