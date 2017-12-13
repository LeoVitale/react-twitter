import React, { Component } from 'react';
import Tweet from '../tweet';

export default class ListTweets extends Component {

  renderTweets(listTweets){
    return listTweets.map(tweet => {
      return <Tweet key={tweet.id} {...tweet} />
    })
  }

  render() {
    const {listTweets} = this.props;
    return (
      listTweets ?
      <div>
        {this.renderTweets(listTweets)}
      </div>
      : <div>loading</div>
    )
  }
}
