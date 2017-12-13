import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Routes from './routes';

class RenderRoutes extends Component {
  render() {
    return (
      <div>
        {renderRoutes(Routes)}
      </div>
    );
  }
}

export default RenderRoutes;
