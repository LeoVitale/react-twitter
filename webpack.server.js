const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  name: 'server',
  target: 'node',
  devtool: 'eval',

  // Tell webpack the root file of our
  // server application
  entry: ['babel-polyfill', './server/index.js'],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'buildServer')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
