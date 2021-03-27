const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");

const config = {
  entry: {
    app: "./public/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("/", "./public/index.html");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget Tracker",
      description: "An app that allows you to track a budget.",
      start_url: "./public/index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("./public/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("public", "icons"),
        },
      ],
    }),
  ],
  mode: "development",
};

module.exports = config;
