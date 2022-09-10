# odin-battleship

The Odin Project Battleship Project

[Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>)

## AI Pieces

| No. | Class of Ship | Size |
| --- | ------------- | ---- |
| 1.  | Carrier       | 5    |
| 2.  | Battleship    | 4    |
| 3.  | Cruiser       | 3    |
| 4.  | Submarine     | 3    |
| 5.  | Destroyer     | 2    |

## Human Pieces

| No. | Class of Ship | Size |
| --- | ------------- | ---- |
| 1.  | Carrier       | 5    |
| 2.  | Battleship    | 4    |
| 3.  | Destroyer     | 3    |
| 4.  | Submarine     | 3    |
| 5.  | Patrol Boat   | 2    |


## Webpack Setup Documentation

```
npm install --save-dev jest
curl https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore > .gitignore
npm install webpack webpack-cli --save-dev
npm install css-loader --save-dev
npm install style-loader --save-dev
mkdir dist

```

Make the `packajge.json` look like this:

``` json
{
  "name": "<project name>",
  "author": "<me>",
  "private": true,
  "license": "ISC",
  "version": "1.0.0",
  "description": "<description>",
  "main": "index.js",
  "devDependencies": {
    "html-webpack-plugin": "^5.5.0",
    "jest": "^29.0.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  },
  "scripts": {
    "test": "jest",
    "watch": "webpack --watch",
    "build": "webpack"
  }
}
```

And then the `webpack.config.js` looks like this:

``` js
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
```

Then, finally, the `index.js` should look something like this:

``` js
import {dropdownAttach} from 'dropdown';
import {carouselAttach} from 'carousel';
import "./style.css";

import ci1 from "./img/bailey-zindel-NRQV-hBF10M-unsplash.jpg";
import ci2 from "./img/john-fowler-aaIN3y2zcMQ-unsplash.jpg";
import ci3 from "./img/jasper-boer-LJD6U920zVo-unsplash.jpg";
import ci4 from "./img/mark-harpur-K2s_YE031CA-unsplash.jpg";

dropdownAttach();
carouselAttach([ci1, ci2, ci3, ci4]);
```