// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  mode: 'production',
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
    filename: 'index.js',
    path: path.resolve('./lib'),
    libraryTarget: 'umd',
    library: 'gr4vy',
  },
  entry: path.resolve('./src'),
}
