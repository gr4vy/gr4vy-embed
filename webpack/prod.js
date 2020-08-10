const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

module.exports = merge(common, {
  mode: `production`,
  output: {
    filename: `index.js`,
    path: path.resolve(`./dist`),
    chunkFilename: `[name].bundle.js`,
    libraryTarget: `commonjs2`
  },
  entry: path.resolve(`./src/index.js`),
  externals: {
    'react': `commonjs react`,
    'react-dom': `commonjs react-dom`
  }
})
