const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const mode = argv.mode || process.env.NODE_ENV || "production";
  const isDev = mode === "development";

  process.env.NODE_ENV = mode;

  return {
    target: "electron-renderer",
    mode,
    resolve: {
      extensions: [".js", ".jsx"],
    },
    entry: {
      main: "./src/index.jsx",
      mate: "./src/mate.jsx",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      library: "lib",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|woff2?)$/i,
          type: "asset/resource",
        },
        {
          // 將 .js 與 .jsx 合併為一條規則即可
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                    development: isDev, // 明確同步，絕不會再有 jsxDEV 誤判
                  },
                ],
                "@babel/preset-env",
              ],
            },
          },
        },
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: "style-loader",
              options: { injectType: "singletonStyleTag" },
            },
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "My Electronic Mate",
        filename: "index.html",
        chunks: ["main"],
      }),
      new HtmlWebpackPlugin({
        title: "desktop-mate",
        filename: "mate.html",
        chunks: ["mate"],
      }),
      // 明確將模式注入前端 client-side
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ],
  };
};
