const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV;
const isDevelopment = mode === "development";

const regex = {
  script: /\.(js)$/i,
  style: /\.(css|scss)$/i,
  html: /\.html$/i,
  font: /\.(eot|otf|ttf|woff|woff2)$/i,
  image: /\.(png|jpg|jpeg|svg)$/i,
  icon: /(icon-)(.*)(\.(png|jpg|jpeg|svg)$)/i,
};

module.exports = () => {
  return {
    mode,
    entry: {
      main: [
        "./src/scripts/index.js",
        "./src/styles/index.scss",
        "./src/index.html",
      ],
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: regex.script,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
        {
          test: regex.style,
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
          test: regex.html,
          use: [
            "file-loader?name=[name].[ext]",
            "extract-loader",
            {
              loader: "html-loader",
              options: {
                minimize: !isDevelopment,
                attributes: {
                  list: [
                    {
                      tag: "img",
                      attribute: "src",
                      type: "src",
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          test: regex.image,
          exclude: regex.icon,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4096,
                fallback: {
                  loader: "file-loader",
                  options: {
                    name: "images/[name].[ext]",
                  },
                },
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
          test: regex.icon,
          use: "url-loader",
        },
        {
          test: regex.font,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
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
      },
    },
  };
};
