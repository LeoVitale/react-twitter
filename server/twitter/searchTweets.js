import request from 'request';
import axios from 'axios';

const key = 'WbQOXtxwMAvdhzr1AhMdfLbaO';
const secret = 'mOSpDRG5CJmPg9TM5XaNKDM2hL9QMaPeDQSV9LtisD6qMp2Y21';
const cat = key + ":" + secret;
const credentials = new Buffer(cat).toString('base64');
const url = 'https://api.twitter.com/1.1/search/tweets.json';
const token = 'AAAAAAAAAAAAAAAAAAAAADRt3gAAAAAA1u7X%2BVjtZ%2BzUVF%2B%2F0ZUPGlR0wSw%3Dc7fz7JxaGAlFDkQqorsURcMZXKlu3mxr8vJMG8nNJnb4SAmvXQ';

function generateToken() {
  request({
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    headers: {
      "Authorization": "Basic " + credentials,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"

  }, function (err, resp, body) {
    console.dir(body); //the bearer token...
  });
}

function searchTweets(next_query = '') {
  console.log(`${url}${next_query}`);
  return axios.get(`${url}${next_query}`, {
    headers: {
      "Authorization": "Bearer " + token,
    }
  });
}

export default searchTweets;
