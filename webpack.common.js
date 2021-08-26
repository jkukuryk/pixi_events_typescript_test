const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    hot: true,
    contentBase: "./",
    historyApiFallback: true,
  },
  stats: "errors-only",
  module: getLoaders(),
  resolve: {
    extensions: [
      ".ts",
      ".js",
      ".json",
      ".png",
      ".glb",
      ".jpg",
      "mp3",
      "svg",
      "css",
    ],
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      classes: path.resolve(__dirname, "./src/classes"),
      stages: path.resolve(__dirname, "./src/stages"),
      sounds: path.resolve(__dirname, "./src/sounds"),
      constants: path.resolve(__dirname, "./src/constants"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  entry: path.join(__dirname, "/src/index.ts"),
  plugins: [
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
    }),
    new webpack.ProvidePlugin({ "window.decomp": "poly-decomp" }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      title: "Parking jam ad",
      inlineSource: ".(js|css|png|jpg|glb|mp3|css)$",
    }),
  ],
};

/**
 * Loaders used by the application.
 */
function getLoaders() {
  const esbuild = {
    test: /\.ts$/,
    loader: "esbuild-loader",
    options: {
      loader: "ts",
      target: "es2015",
    },
    exclude: /node_modules/,
  };
  const fileLoader = [
    {
      test: /\.(png|jpg|svg|glb|mp3)$/,
      loader: "url-loader",
    },
  ];
  //remove css
  const cssLoader = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  };
  const lessLoader = {
    test: /\.less$/i,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            strictMath: true,
          },
        },
      },
    ],
  };

  const loaders = {
    rules: [...fileLoader, lessLoader, esbuild],
  };

  return loaders;
}
