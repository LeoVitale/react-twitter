
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducers from './redux/modules';
import RenderRoutes from './renderRoutes';
import {loadState, saveState, setClientNavigation, getClientNavigation } from './utils/localStorage';
import './sass/app.scss';


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});



const store = createStore(reducers, window.REDUX_STATE ? window.REDUX_STATE : {} , composeEnhancers(applyMiddleware(thunk)));
const clientNavigation = getClientNavigation();

const local = loadState();
saveState((window.REDUX_STATE && !clientNavigation) ? window.REDUX_STATE : local);

store.subscribe(() => {
  saveState(store.getState());
});

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.querySelector('#root')
  )
}

render(RenderRoutes);

if (module.hot) {
  module.hot.accept('./renderRoutes.js', () => { render(RenderRoutes) });
}
