
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


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(reducers, window.REDUX_STATE ? window.REDUX_STATE : {}, composeEnhancers(applyMiddleware(thunk)));

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

// Webpack Hot Module Replacement API
if (module.hot) {
  console.log('Accepting the updated printMe module!');
  module.hot.accept('./renderRoutes.js', () => { render(RenderRoutes) });
}
