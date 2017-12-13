import React, { Component } from 'react';


function parseTwit(str) {
  str = str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function (s) {
    return s.link(s);
  });
  str = str.replace(/[@]+[A-Za-z0-9_]+/g, function (s) {
    var user_name = s.replace('@', '');
    return s.link("http://twitter.com/" + user_name);
  });
  str = str.replace(/[#]+[A-Za-z0-9_]+/g, function (s) {
    var hashtag = s.replace('#', '');
    return s.link("http://search.twitter.com/search?q=" + hashtag);
  });
  return str;
}

class Tweet extends Component {
  state = {
    tweet: []
  };
  componentDidMount() {
    this.parseTweet(this.props.text);
    const { created_at, text, profile_background_image_url, profile_image_url } = this.props;

  }

  parseTweet = (tweet) => {
    let tempTweet = tweet;
    const mentions = [];
    const links = [];
    tempTweet = tempTweet.replace(/[@]+[A-Za-z0-9_]+/g, (result, index) => {
      mentions.push(result);
      return '__MENTIONS__';
    });

    tempTweet = tempTweet.split('__MENTIONS__');
    let lastMention = 0;
    tempTweet = tempTweet.map((tweet, index) => {
      const mention = mentions[lastMention];
      tweet = mention ? <span>{tweet}<a href={`http://twitter.com/${mention}`}>{mention}</a></span> : tweet;
      lastMention = lastMention + 1;
      return tweet;
    });


    console.log('====================================');
    console.log(tempTweet);
    console.log('====================================');
    this.setState({
      tweet: tempTweet
    });
  };

  render() {

    return <div>{this.state.tweet.map((tweet, index) => <span key={index}>{tweet}</span>)}</div>
  }
}

export default Tweet;





// const Tweet = ({ created_at, text, profile_background_image_url, profile_image_url }) => {
//   console.log(parseTwit(text));
//   return (
//     <div>
//       <img src={profile_image_url} alt="teste" />
//       <div>{created_at}</div>
//       <div>
//         <TEMP />
//         <div dangerouslySetInnerHTML={{
//           __html: parseTwit(text)
//         }} /></div>
//     </div>
//   );
// };

// export default Tweet;
