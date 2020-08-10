module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    '@storybook/addon-knobs/register'
  ],
  webpackFinal: async config => {
    return config;
  },
};
