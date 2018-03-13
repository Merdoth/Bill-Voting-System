import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';
import Dotenv from 'dotenv-webpack';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

export default {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/index.html'),

  target: 'web',
  output: {
    path: path.join(__dirname, '/dist/client'),
    /** Note: Physical files are only output by
     * the production build task `npm run build`.* */
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin(),
    extractSass,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'client/index'),
      inject: 'body',
      minify: false,
      excludeAssets: [/.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new Dotenv({ path: './.env' })
  ],
  module: {
    loaders: [
      {
        test: /.(js|jsx)$/,
        include: [path.join(__dirname, 'client')],
        loaders: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?minimize=true',
          'sass-loader'
        ]),
        include: [path.join(__dirname, 'client')]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
