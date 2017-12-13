import axios from 'axios';

export const FETCH_TWEETS = 'tweets/FETCH_TWEETS';

export const fetchTweets = () => async dispatch => {
  const res = await axios.get('http://localhost:3000/search');
  dispatch({
    type: FETCH_TWEETS,
    payload: res
  });
};
