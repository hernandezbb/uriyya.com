const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "development";

module.exports = [
  {
    mode: "development",
    target: "web",
    devtool: "cheap-module-source-map",
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
                minimize: false,
                removeComments: false,
                collapseWhitespace: false
              }
            }
          ]
        },
        {
          test: /(\.css)$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[path][name].[ext]"
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
                name: "[path][name].[ext]"
              }
            }
          ]
        }
      ]
    }
  }
];
