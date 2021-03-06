const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    mode: "development",
    devtool: "eval",
    entry: "./src/index.js",
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
    },
    output: {
      filename: "index.js",
      path: __dirname + "/dist"
    },

    resolve: {
      extensions: [".js", ".json"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /[\\/]node_modules[\\/]/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /(\.css)$/,
          use: [
            'style-loader', 'css-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    }
  }
];
