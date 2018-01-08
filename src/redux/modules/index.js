import { combineReducers } from 'redux';
import tweets from './tweets';

export default asyncReducers =>
  combineReducers({
    tweets,
    ...asyncReducers
  });
