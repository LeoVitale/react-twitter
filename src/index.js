import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { AppContainer } from 'react-hot-loader';
import reducers from './redux/modules';
// import App from './containers/home';
import App from './components/App';
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
  reducers,
  window.REDUX_STATE ? window.REDUX_STATE : {},
  composeEnhancers(applyMiddleware(thunk))
);
const clientNavigation = getClientNavigation();

const local = loadState();
saveState(window.REDUX_STATE && !clientNavigation ? window.REDUX_STATE : local);

store.subscribe(() => {
  saveState(store.getState());
});

const history = createHistory();

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const App = require('./components/App').default;
    render(App);
  });
}

render(App);
