const path = require(`path`)

module.exports = {
  mode: `development`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(`./src`)
  },
  entry: path.resolve(`./src/index.js`),
  devServer: {
    contentBase: `./src`,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8081,
    open: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      },
    ]
  }
}
