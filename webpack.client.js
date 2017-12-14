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
  devtool: 'inline-source-map',
  devServer: {
    host: "localhost",
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
  },
  entry: [
    'babel-polyfill',
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/only-dev-server",
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, "buildServer"),
    publicPath: "http://localhost:3001/",
    filename: "client.js",
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
      filename: "[name].css",
      allChunks: true,
      disable: false
    })
  ],
};

module.exports = config;
