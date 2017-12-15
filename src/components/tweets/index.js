import React from 'react';
import Tweet from '../tweet';
import styles from './styles.scss';

const Tweets = props => {
  return (
    props.listTweets ?
    <div className={styles.tweets}>
      {
        props.listTweets.map(tweet => {
          return <Tweet key={tweet.id} {...tweet} />
        })
      }
    </div>
    : <div>loading</div>
  )
};

export default Tweets;
