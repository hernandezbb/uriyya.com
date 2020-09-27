const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    mode: "production",
    entry: "./src/index.js",
    output: {
      filename: "index.[contenthash].js",
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
      new MiniCssExtractPlugin({
        filename: "bundle.[contenthash].css"
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
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images"
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
                outputPath: "fonts"
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
      }), new OptimizeCSSAssetsPlugin({})]
    }
  }
];
