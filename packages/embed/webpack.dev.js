/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  output: {
    filename: 'gr4vy-embed.js',
  },
  entry: './dev/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [`style-loader`, `css-loader`],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            exclude: /node_modules/,
          },
        },
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    host: '127.0.0.1',
    port: 8081,
    open: true,
    allowedHosts: 'all',
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
    new DefinePlugin({
      PACKAGE_VERSION: JSON.stringify('dev'),
    }),
  ],
}
