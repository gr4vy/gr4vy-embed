/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  output: {
    filename: 'gr4vy-embed.js',
  },
  entry: './dev/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-typescript'],
            exclude: /node_modules/,
          },
        },
      },
    ],
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    host: '127.0.0.1',
    port: 8081,
    open: true,
    disableHostCheck: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  plugins: [
    new Dotenv({ path: '../../.env' }),
    new HtmlWebpackPlugin({
      title: 'Gr4vy - Embed',
    }),
  ],
}
