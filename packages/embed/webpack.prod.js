/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const path = require('path')
const { DefinePlugin } = require('webpack')

const getCommitHash = () => {
  try {
    return `#${execSync(
      'cat ../../.git/`cat ../../.git/HEAD | cut -d \\  -f 2`'
    )
      .toString()
      .trim()}`
  } catch (err) {
    return ''
  }
}

const PACKAGE_VERSION = JSON.stringify(
  process.env.PACKAGE_VERSION || getCommitHash()
)
console.log('Building version', PACKAGE_VERSION)

module.exports = {
  mode: 'production',
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
  performance: {
    hints: 'warning',
    maxEntrypointSize: 30000,
  },
  output: {
    filename: 'index.js',
    path: path.resolve('./lib'),
    libraryTarget: 'umd',
    library: 'gr4vy',
    globalObject: 'this',
  },
  entry: path.resolve('./src'),
  plugins: [
    new DefinePlugin({
      PACKAGE_VERSION,
    }),
  ],
}
