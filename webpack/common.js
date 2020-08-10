const StylelintPlugin = require(`stylelint-webpack-plugin`)

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
            loader: `svg-url-loader`,
            options: {
              limit: 10000,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new StylelintPlugin()
  ]
}
