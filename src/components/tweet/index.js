import React, { Component } from 'react';

const regex = /([@]+[A-Za-z0-9_]+)|([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+)|([#]+[A-Za-z0-9_]+)/g;

const Link = props => {
  switch (props.type) {
    case 'HASH':
      return <a href={`http://twitter.com/hashtag/${props.result}`}>{props.original}</a>;
      break;
    case 'LINK':
      return <a href={props.original}>{props.original}</a>;
      break;
    case 'MENTION':
      return <a href={`http://twitter.com/${props.result}`}>{props.original}</a>;
      break;
    default:
      break;
  }
  return (
    <div>

    </div>
  );
};

class Tweet extends Component {

  state = {
    tweet: []
  };

  componentDidMount() {
    this.parseTweet(this.props.text);
  }

  parseTweet = (tweet) => {
    let tempTweet = tweet;
    const mentions = [];
    const links = [];
    tempTweet = tempTweet.replace(regex, (result, index) => {
      if (result.startsWith('#')) {
        mentions.push({ result: result.replace('#', ''), original: result, type: 'HASH' });
      } else if (result.startsWith('http')) {
        mentions.push({ result: result, original: result , type: 'LINK'});
      } else if (result.startsWith('@')) {
        mentions.push({ result: result.replace('@', ''), original: result, type: 'MENTION' });
      }
      return '__MARKUP__';
    })
    tempTweet = tempTweet.split('__MARKUP__');
    let lastMention = 0;
    tempTweet = tempTweet.map((tweet, index) => {
      const mention = mentions[lastMention];
      tweet = mention ? <span key={index}>{tweet} <Link {...mention}/> </span> : tweet;
      lastMention = lastMention + 1;
      return tweet;
    });
    this.setState({
      tweet: tempTweet
    });
  };

  render() {
    return <div>{this.state.tweet}</div>
  }
}

export default Tweet;
