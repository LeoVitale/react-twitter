import { FETCH_TWEETS } from '../actions';

const initialState = {
  listTweets: []
}


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TWEETS:
      return { ...state,
        listTweets: [...state.listTweets, ...action.payload.data]
      };
    default:
      return state;
  }
}
