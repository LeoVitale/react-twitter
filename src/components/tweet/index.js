import React from 'react';

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

const renderHtml = () => <div>teste</div>

const TEMP = props => `
    ${renderHtml(...props)}
`;

const Tweet = ({ created_at, text, profile_background_image_url, profile_image_url }) => {
  console.log(parseTwit(text));
  return (
    <div>
      <img src={profile_image_url} alt="teste" />
      <div>{created_at}</div>
      <div>
        <TEMP />
        <div dangerouslySetInnerHTML={{
          __html: parseTwit(text)
        }} /></div>
    </div>
  );
};

export default Tweet;
