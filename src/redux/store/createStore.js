import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../modules';

export default req => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
