const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

// Builds a bundled React UMD which can be used in React projects
// without needing to add config to that project to bundle all our assets
module.exports = merge(common, {
  mode: `production`,
  output: {
    filename: `index.js`,
    path: path.resolve(`./react-umd`),
    libraryTarget: `umd`,
  },
  entry: path.resolve(`./src/index.ts`),
  externals: {
    react: {
      root: `React`,
      commonjs2: `react`,
      commonjs: `react`,
      amd: `react`,
    },
    'react-dom': {
      root: `ReactDOM`,
      commonjs2: `react-dom`,
      commonjs: `react-dom`,
      amd: `react-dom`,
    },
  },
})
