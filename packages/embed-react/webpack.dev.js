/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  output: {
    filename: 'gr4vy-embed.js',
  },
  entry: './dev/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
            plugins: [
              '@babel/plugin-transform-typescript',
              '@babel/plugin-transform-runtime',
            ],
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
    port: 8083,
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
      templateContent: `
        <html>
          <head>
            <title>Gr4vy - React</title>
          </head>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `,
    }),
  ],
}
