const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({ path: './.env' })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server')
        ],
        loaders: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'client'),
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'assets/[name].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: true
                },
                optipng: {
                  optimizationLevel: 7
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
};
