import React from 'react';

const Tweet = ({created_at, text, profile_background_image_url, profile_image_url}) => {
  return (
    <div>
      <img src={profile_image_url} alt="teste"/>
      <div>{created_at}</div>
      <div>{text}</div>
    </div>
  );
};

export default Tweet;
