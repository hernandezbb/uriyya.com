const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClosurePlugin = require("closure-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = "production";

module.exports = [
  {
    mode: "production",
    target: "web",
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: __dirname + "/dist"
    },
    resolve: {
      extensions: [".js", ".json"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "bundle.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
              }
            }
          ]
        },
        {
          test: /(\.css)$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                publicPath: "assets"
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
                publicPath: "assets"
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: [new ClosurePlugin({ mode: "STANDARD" }, {}), new OptimizeCSSAssetsPlugin({})]
    }
  }
];
