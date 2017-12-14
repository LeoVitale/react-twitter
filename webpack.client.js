const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // Tell webpack the root file of our
  // server application
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'buildClient'),
    publicPath: "/buildClient/"
  },
  module: {
    rules: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions']
              }
            }],
            'es2015',
            'react',
            'stage-0'
          ]
        }
      },
      {
        test: /\.[s]css$/,
        include: __dirname + '/src',
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                importLoaders: 2,
                minimize: false,
                sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                modules: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            { loader: 'postcss-loader' }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "bundle.css",
      allChunks: true,
      disable: false
    })
  ],
};

module.exports = config;
