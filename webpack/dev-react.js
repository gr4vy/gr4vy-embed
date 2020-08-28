const HtmlWebpackPlugin = require(`html-webpack-plugin`)

const path = require(`path`)
const { merge } = require(`webpack-merge`)
const common = require(`./common.js`)

// Builds and spins up a version of the integration for the
// dev server
module.exports = merge(common, {
  mode: `development`,
  output: {
    filename: `gr4vy-embed.js`,
  },
  entry: path.resolve(`./src/dev/react.js`),
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    host: `127.0.0.1`,
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
