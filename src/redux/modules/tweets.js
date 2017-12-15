import axios from 'axios';

export const FETCH_TWEETS = 'tweets/FETCH_TWEETS';

const initialState = {
  listTweets: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return { ...state,
        listTweets: [...state.listTweets, ...action.payload.data]
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
