import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweets from '../../components/tweets';
import SearchBox from '../../components/search-box';
import { fetchTweets, searchTweets, fecthLocalTweets } from '../../redux/modules/tweets';
import { loadState, setClientNavigation } from '../../utils/localStorage';
import styles from './styles.scss';

class Home extends Component {
  constructor() {
    super();
    this.scrolling = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    const persitedState = loadState();
    persitedState && this.props.fecthLocalTweets(persitedState.tweets);
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
    this.props.searchTweets(term);
    setClientNavigation();
  }

  render() {
    const { listTweets, term } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <SearchBox term={term} searchHandle={this.searchTweets} />
        </div>
        {listTweets ? <Tweets listTweets={listTweets} /> : 'loading'}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTweets: state.tweets.listTweets,
    term: state.tweets.term
  }
}

function loadData(store) {
  console.log('====================================');
  console.log('server');
  console.log('====================================');
  return store.dispatch(searchTweets('@IndigoFair'));
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchTweets, searchTweets, fecthLocalTweets })(Home)
};
