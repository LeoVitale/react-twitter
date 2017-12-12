const axios = require('axios').default;

var key = '3I7jUHJhEzCIBOxLNFj3lIFja';
var secret = 'ZMGNRiOLg59s7odGyLTDK6klR0BDJpphqf4AWmE11wKJB4skFn';
var cat = key + ":" + secret;
var credentials = new Buffer(cat).toString('base64');
var url = 'https://api.twitter.com/1.1/search/tweets.json';
var token = 'AAAAAAAAAAAAAAAAAAAAADRt3gAAAAAA1u7X%2BVjtZ%2BzUVF%2B%2F0ZUPGlR0wSw%3Dc7fz7JxaGAlFDkQqorsURcMZXKlu3mxr8vJMG8nNJnb4SAmvXQ';

function searchTweets(next_query = '') {
    console.log(`${url}${next_query}`);
    return axios.get(`${url}${next_query}`, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
}

module.exports = searchTweets;