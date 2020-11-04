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
        test: /\.s?css$/,
        use: [
          { loader: `style-loader` },
          {
            loader: `css-loader`,
            options: {
              modules: {
                localIdentName: `[path]___[name]__[local]___[hash:base64:5]`
              }
            }
          },
          { loader: `postcss-loader` },
          {
            loader: `sass-loader`,
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: `svg-url-loader`
          },
        ]
      }
    ]
  }
}
