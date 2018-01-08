import React from 'react';
import ReactDOM from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import createStore from '../src/redux/store/createStore';
import Home from '../src/containers/home';

const store = createStore();

export default ({ clientStats }) => (req, res) => {
  const initialState = JSON.stringify(store.getState());
  const history = createHistory({ initialEntries: [req.path] });
  const app = ReactDOM.renderToString(<Provider store={store}>
    <Home />
                                      </Provider>);

  const chunkNames = flushChunkNames();

  const {
    js, styles, cssHash, scripts, stylesheets
  } = flushChunks(
    clientStats,
    { chunkNames }
  );

  res.send(`<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          ${cssHash}
          ${js}
        </body>
      </html>`);
};
