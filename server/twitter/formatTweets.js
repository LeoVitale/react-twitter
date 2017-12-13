function formatTweets(tweets = []) {
  let formatedTweets = tweets.map(tweet => {
    return {
      created_at: tweet.created_at,
      text: tweet.text,
      profile_background_image_url: tweet.user.profile_background_image_url,
      profile_image_url: tweet.user.profile_image_url
    }
  });

  return formatedTweets;
}

export default formatTweets;
