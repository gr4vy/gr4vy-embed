const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

// Builds the standard common JS version of the library,
// which is exposed to Node environments without ES6.
module.exports = merge(common, {
  mode: `production`,
  output: {
    filename: `index.js`,
    path: path.resolve(`./cjs`),
    libraryTarget: `commonjs2`
  },
  entry: path.resolve(`./src/umd/index.js`)
})
