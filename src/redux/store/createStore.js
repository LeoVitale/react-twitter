import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from '../modules/index';

const configureStore = initialState => {
  const store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(thunk)
  );

  store.injectReducers = asyncReducers =>
    store.replaceReducer(createReducer(asyncReducers));

  if (module.hot) {
    module.hot.accept('../modules', () =>
      store.replaceReducer(require('../modules').default));
  }

  return store;
};

export default configureStore;
