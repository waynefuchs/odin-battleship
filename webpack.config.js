const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // mode: 'production',
  entry: {
    index: "./src/index.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: 'img/[name].[ext]'
            },
          },
        ],
      },
    ],
  },

  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Dynamic User Interface",
      myPageHeader: "Hello World",
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
