import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweets from '../../components/tweets';
import SearchBox from '../../components/search-box';
import { fetchTweets, searchTweets } from '../../redux/modules/tweets';
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

  searchTweets = term => {
    console.log(term);
    this.props.searchTweets(term);
  }

  render() {
    const { listTweets } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <SearchBox searchHandle={this.searchTweets}/>
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
  return store.dispatch(searchTweets('@IndigoFair'));
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchTweets, searchTweets})(Home)
};
