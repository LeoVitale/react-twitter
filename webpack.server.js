const path = require('path');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  name: 'server',
  target: 'node',
  devtool: 'eval',
  entry: ['babel-polyfill', './server/index.js'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'buildServer'),
    publicPath: "/buildServer/"
  },

  // Tell webpack where to put the output file
  // that is generated]
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
                camelCase: 'dashes',
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
  externals: [webpackNodeExternals()],
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      allChunks: true,
      disable: false
    })
  ]
};

module.exports = config;
