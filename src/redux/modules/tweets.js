import axios from 'axios';

const FETCH_TWEETS = 'tweets/FETCH_TWEETS';
const SEARCH_TWEETS = 'tweets/SEARCH_TWEETS';

const initialState = {
  listTweets: [],
  term: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return { ...state,
        listTweets: [...state.listTweets, ...action.payload.data]
      };
    case SEARCH_TWEETS:
      return { ...state,
        term: action.payload,
        listTweets: []
      };

    default:
      return state;
  }
}

export const fetchTweets = () => async dispatch => {
  const res = await axios.get('http://localhost:3000/search');
  dispatch({
    type: FETCH_TWEETS,
    payload: res
  });
};

export const searchTweets = term => async dispatch => {

  dispatch({
    type: SEARCH_TWEETS,
    payload: term
  });
  const res = await axios.post('http://localhost:3000/search', {
    term: term
  }).catch(error => {
    console.log(error);
  });
  dispatch({
    type: FETCH_TWEETS,
    payload: res
  });

};
