import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTweets } from '../../redux/actions';

class Home extends Component {

  componentDidMount() {
    this.props.fetchTweets();
  }

  render() {
    return (
      <div>
        Homes
        <button onClick={() => console.log('epaaa')}>ospa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  }
}

function loadData(store) {
  return store.dispatch(fetchTweets());
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchTweets})(Home)
};
