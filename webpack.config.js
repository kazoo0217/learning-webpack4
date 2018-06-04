const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: `./src/index.js`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  devServer: {
    contentBase: 'dist',
    open: true,
    port: 9000
  },

  module: {
    rules: [
      {
        // 対象となるファイルの拡張子
        test: /\.scss/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: true,
              // 空白文字やコメントを削除する
              minimize: true,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              plugins: [
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require('autoprefixer')({
                  browsers: ['last 2 versions','ie>=11'],
                  grid: true
                })
              ]
            },
          },
          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: true,
            }
          }
        ],
      },
    ],
  }
};
