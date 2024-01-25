const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  context: path.resolve(__dirname, "development/pages"),
  entry: {
    index: "./index.js",
    main: "./main.js",
    production: "./production",
    "about-us": "./about-us.js",
    favorites: "./favorites.js",
    partnership: "./partnership.js",
    contacts: "./contacts.js",
    product: "./product.js",
    cabinet: "./cabinet.js",
    basket: "./basket.js",
    thank_you: "./thank_you.js",
    delivery: "./delivery.js",
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname, "source/pages/"),
    clean: true,
  },
  mode: isProduction ? "production" : "development",
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, "../templates"),
  //     staticOptions: {
  //       prefix: "/static/source/pages/index",
  //     },
  //     serveIndex: true,
  //     watch: true,
  //   },
  // },

  devtool: isProduction ? false : "inline-source-map",
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/index.css",
    }),
  ],
};
