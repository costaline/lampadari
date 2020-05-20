const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV;
const isDevelopment = mode === "development";

module.exports = () => {
  return {
    mode,
    entry: {
      main: ["./src/scripts/index.js", "./src/styles/index.scss"],
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            {
              loader: "css-loader",
              options: { sourceMap: isDevelopment },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: isDevelopment,
                plugins: [require("autoprefixer")],
              },
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                prependData: `@import './src/styles/global/variables.scss';`,
              },
            },
          ],
        },
        {
          test: /\.(img|jpg|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 95,
                },
                optipng: {
                  enabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(ttf|woff2?)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: "src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "main.css",
        ignoreOrder: false,
      }),
    ],
    stats: {
      all: false,
      timings: true,
      assets: true,
      errors: true,
      warnings: true,
      colors: true,
    },
    devtool: isDevelopment ? "source-map" : false,
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      overlay: true,
      stats: "minimal",
      contentBase: path.resolve(__dirname, "src"),
      watchContentBase: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@assets": path.resolve(__dirname, "assets/"),
      },
    },
  };
};
