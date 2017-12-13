import { FETCH_TWEETS } from '../actions';


export default (state = [], action) => {


  switch (action.type) {
    case FETCH_TWEETS:
      //console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
