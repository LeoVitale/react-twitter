import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListTweets from '../../components/list-tweets';
import { fetchTweets } from '../../redux/actions';

class Home extends Component {
  constructor(){
    super();
    this.scrolling = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    window.clearTimeout(this.scrolling);
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.listTweets.length
    ) {

      this.scrolling = setTimeout(() => {
        this.props.fetchTweets();
      }, 60);
    }
  }

  render() {
    const { listTweets } = this.props;
    return (
      <div>
        Home {listTweets ? <ListTweets listTweets={listTweets}/> : 'loading'}
        <button onClick={() => this.props.fetchTweets()}>ospa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTweets: state.tweets.listTweets
  }
}

function loadData(store) {
  return store.dispatch(fetchTweets());
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchTweets})(Home)
};
