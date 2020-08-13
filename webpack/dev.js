const HtmlWebpackPlugin = require(`html-webpack-plugin`)

const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

module.exports = merge(common, {
  mode: `development`,
  output: {
    filename: `gr4vy-embeded.js`,
  },
  entry: path.resolve(`./src/public/index.js`),
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    host: `0.0.0.0`,
    port: 8081,
    open: true,
    progress: true,
    disableHostCheck: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `Gr4vy - Embed`
    })
  ]
})
