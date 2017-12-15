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

  await axios.get('http://localhost:3000/search')
    .then(response => {
      dispatch({
        type: FETCH_TWEETS,
        payload: response
      });
    }).catch(error => {
      console.log(error);
    });;

};


export const searchTweets = term => async dispatch => {

  dispatch({
    type: SEARCH_TWEETS,
    payload: term
  });
  await axios.post('http://localhost:3000/search', {
    term: term
  }).then(response => {
    dispatch({
      type: FETCH_TWEETS,
      payload: response
    });
  })
  .catch(error => {
    console.log(error);
  });

};
