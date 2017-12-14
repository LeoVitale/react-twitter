import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import bodyParser from 'body-parser';
import {searchTweets, formatTweets} from './twitter';
import renderer from './renderer.js';
import Routes from '../src/routes';
import createStore from '../src/redux/store/createStore';
import { error } from 'util';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.client';
const compiler = webpack(config);

const webpackConfig = require('../webpack.client');

const app = express();
let next_query = '?q=@carolmoreira3&result_type=recent';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const options = {
  quiet: true,
  noInfo: true,
  hot: true,
  host: "localhost",
  stats: { colors: true }
};

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('buildClient'));

app.get('/', (req, res) => {
  const store = createStore();
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });

});

app.get('/search', function (req, res) {
  console.log('====================================');
  console.log('app.get');
  console.log('====================================');
  searchTweets(next_query)
    .then(response => {
      if (response.data) {
        next_query = response.data.search_metadata.next_results;
        const tweets = formatTweets(response.data.statuses);
        res.send(tweets);
      } else {
        res.send('Nenhum resultado encontrado');
      }
    })
});

app.post('/search', function (req, res) {
  console.log('====================================');
  console.log('app.post');
  console.log('====================================');
  searchTweets(next_query)
    .then(response => {
      if (response.data) {
        next_query = response.data.search_metadata.next_results;
        const tweets = formatTweets(response.data.statuses);
        res.send(tweets);
      } else {
        res.send('Nenhum resultado encontrado');
      }
    })
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
