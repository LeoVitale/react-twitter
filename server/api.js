require('colors');
const express = require('express');
const twitter = require('./twitter');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let nextQuery = '?q=carol&result_type=recent&&include_entities=0';

app.get('/search', (req, res) => {
  twitter
    .searchTweets(nextQuery)
    .then(response => {
      if (response.data) {
        nextQuery = response.data.search_metadata.next_results;
        const tweets = twitter.formatTweets(response.data.statuses);
        console.log(tweets);
        res.send(response.data.statuses);
      } else {
        res.send('Nenhum resultado encontrado');
      }
    })
    .catch(error => {
      res.status(400).sendStatus(error.response.status);
    });
});

app.post('/search', (req, res) => {
  console.log(req.body.term);
  nextQuery = `?q=${
    req.body ? req.body.term : ''
  }&result_type=recent&&include_entities=0`;
  twitter
    .searchTweets(nextQuery)
    .then(response => {
      if (response.data) {
        nextQuery = response.data.search_metadata.next_results;
        const tweets = twitter.formatTweets(response.data.statuses);
        res.send(response.data.statuses);
      } else {
        res.send('Nenhum resultado encontrado');
      }
    })
    .catch(error => {
      res.status(400).sendStatus(error.response.status);
    });
});

app.listen(3005, () => {
  console.log('listening on port 3005');
});
