// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const { DefinePlugin } = require('webpack')
const { execSync } = require("child_process");

const getCommitHash = () => {
  try {
    return `#${execSync('cat .git/`cat .git/HEAD | cut -d \\  -f 2`')
      .toString()
      .trim()}`
  } catch (err) {
    return ''
  }
}

const PACKAGE_VERSION = JSON.stringify(process.env.PACKAGE_VERSION || undefined) || getCommitHash()
console.log('Building version', PACKAGE_VERSION)

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            exclude: /node_modules/,
          },
        },
      },
    ],
  },
  output: {
    filename: 'gr4vy-embed.js',
    path: path.resolve('./lib'),
    libraryTarget: 'umd',
    library: 'gr4vy',
  },
  entry: path.resolve('./src'),
  plugins: [
    new DefinePlugin({
      PACKAGE_VERSION,
    }),
  ],
}
