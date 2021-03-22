const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
      const: false
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
},
  module: {
    rules: [
      {
        test:  /\.ts?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env",
                {
                  targets: {
                    "chrome" : "88"
                  },
                  "corejs": "3",
                  "useBuiltIns": "usage"
                }]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node-modules/
      },
      {
        test: /\.less$/,
        use: [ //从下向上执行
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      options = {
      // title: "贪吃蛇"
      template: "./src/index.html"
    }
    )
  ]
}