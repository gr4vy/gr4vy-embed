const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

module.exports = merge(common, {
  mode: `development`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(`./dev`)
  },
  entry: path.resolve(`./dev/app.js`),
  devServer: {
    contentBase: `./dev`,
    overlay: {
      warnings: true,
      errors: true,
      port: 8081
    },
    open: true,
    progress: true,
    disableHostCheck: true
  }
})
