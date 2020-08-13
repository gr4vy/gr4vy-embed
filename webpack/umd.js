const CompressionPlugin = require(`compression-webpack-plugin`)

const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

module.exports = merge(common, {
  mode: `production`,
  output: {
    filename: `index.js`,
    path: path.resolve(`./umd`),
    libraryTarget: `umd`
  },
  entry: path.resolve(`./src/index.js`),
  externals: {
    'react': {
      root: `React`,
      commonjs2: `react`,
      commonjs: `react`,
      amd: `react`
    },
    'react-dom': {
      root: `ReactDOM`,
      commonjs2: `react-dom`,
      commonjs: `react-dom`,
      amd: `react-dom`
    }
  },
  plugins: [
    new CompressionPlugin()
  ]
})
