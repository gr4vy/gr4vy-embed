const HtmlWebpackPlugin = require(`html-webpack-plugin`)

const path = require(`path`)

module.exports = {
  mode: `development`,
  output: {
    filename: `gr4vy-embed.js`,
  },
  entry: path.resolve(`./dev/index.ts`),
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    host: `127.0.0.1`,
    port: 8081,
    open: true,
    progress: true,
    disableHostCheck: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `Gr4vy - Embed`,
    }),
  ],
  module: {
    rules: [

      {
        enforce: `pre`,
        test: /\.ts(x)?$/,
        loader: `eslint-loader`,
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  resolve: {
    extensions: [`.tsx`, `.ts`, `.js`],
  }
}
