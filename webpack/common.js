module.exports = {
  module: {
    rules: [
      {
        enforce: `pre`,
        test: /\.jsx?$/,
        loader: `eslint-loader`,
        exclude: /(node_modules|bower_components)/,
        options: {
          parser: `babel-eslint`
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      }
    ]
  }
}
