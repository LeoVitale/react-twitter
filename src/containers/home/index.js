import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweets from '../../components/tweets';
import SearchBox from '../../components/search-box';
import { fetchTweets } from '../../redux/modules/tweets';
import styles from './styles.scss';

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
      <div className={styles.page}>
        <div className={styles.header}>
          <SearchBox/>
        </div>
        {listTweets ? <Tweets listTweets={listTweets}/> : 'loading'}
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
