import React from 'react';
import Home from './containers/home';
import UsersList from './containers/users-list';

export default [{
    ...Home,
    path: '/',
    exact: true
  },
  {
    ...UsersList,
    path: '/users',
  }
];
