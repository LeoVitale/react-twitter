import React, { Component } from 'react';
import Tweet from '../tweet';
import styles from './styles.scss';

export default class Tweets extends Component {

  renderTweets(listTweets){
    return listTweets.map(tweet => {
      return <Tweet key={tweet.id} {...tweet} />
    })
  }

  render() {
    const {listTweets} = this.props;
    return (
      listTweets ?
      <div className={styles.tweets}>
        {this.renderTweets(listTweets)}
      </div>
      : <div>loading</div>
    )
  }
}
