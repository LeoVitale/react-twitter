
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var searchTweets = require('./twitter/index');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var next_query = '?q=nando moura';

app.get('/search', function (req, res) {  
    searchTweets(next_query)
        .then(response => {
            next_query = response.data.search_metadata.next_results;
            res.send(response.data);
        });
});

app.post('/search', function (req, res) {
    console.log(req.body.query);
    
    searchTweets(next_query)
        .then(response => {
            //console.log(response.data.search_metadata.next_results);
            next_query = response.data.search_metadata.next_results;            
            res.send(response.data);
        });
});

app.listen(3000, function () {
    console.log("My API is running...");
});