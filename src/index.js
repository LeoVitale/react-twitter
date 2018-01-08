import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { AppContainer } from 'react-hot-loader';
import createReducer from './redux/modules';
import Home from './containers/home';

import {
  loadState,
  saveState,
  setClientNavigation,
  getClientNavigation
} from './utils/localStorage';
import './sass/app.scss';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  createReducer(),
  window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {},
  composeEnhancers(applyMiddleware(thunk))
);
const clientNavigation = getClientNavigation();

const local = loadState();
saveState(window.__INITIAL_STATE__ && !clientNavigation
  ? window.__INITIAL_STATE__
  : local);

store.subscribe(() => {
  saveState(store.getState());
});

const history = createHistory();

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

render(Home);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./containers/home/index.js', () => {
    const Home = require('./containers/home').default;
    render(Home);
  });
}
