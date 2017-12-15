import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersList extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    });
  }

  render() {
    return (
      <div>
        Users List
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

export default {
  component: UsersList
};
