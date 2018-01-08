import axios from 'axios';

const FETCH_TWEETS = 'tweets/FETCH_TWEETS';
const FETCH_LOCAL_TWEETS = 'tweets/FETCH_LOCAL_TWEETS';
const SEARCH_TWEETS = 'tweets/SEARCH_TWEETS';

const initialState = {
  listTweets: [],
  term: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return {
        ...state,
        listTweets: [...state.listTweets, ...action.payload.data]
      };
    case SEARCH_TWEETS:
      return {
        ...state,
        term: action.payload,
        listTweets: []
      };
    case FETCH_LOCAL_TWEETS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const fetchTweets = () => dispatch => {
  axios
    .get('http://localhost:3005/search')
    .then(response => {
      dispatch({
        type: FETCH_TWEETS,
        payload: response
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const fecthLocalTweets = tweets => dispatch => {
  dispatch({
    type: FETCH_LOCAL_TWEETS,
    payload: tweets
  });
};

export const searchTweets = term => dispatch => {
  dispatch({
    type: SEARCH_TWEETS,
    payload: term
  });
  axios
    .post('http://localhost:3005/search', {
      term
    })
    .then(response => {
      dispatch({
        type: FETCH_TWEETS,
        payload: response
      });
    })
    .catch(error => {
      console.log(error);
    });
};
