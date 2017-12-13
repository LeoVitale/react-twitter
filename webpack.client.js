const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');

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
    path: path.resolve(__dirname, 'buildClient')
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};

module.exports = merge(baseConfig, config);
