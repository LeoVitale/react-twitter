import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import RenderRoutes from '../src/renderRoutes';


export default (req, store) => {
  const stateJson = serialize(store.getState());
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <RenderRoutes/>
      </StaticRouter>
    </Provider>
  );

  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <link rel="stylesheet" href="main.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.REDUX_STATE = ${stateJson}</script>
        <script src="main.js"></script>
      </body>
    </html>
  `;
};
