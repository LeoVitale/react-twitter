import React from 'react';

const RichLink = props => {
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
      return <span>creating link</span>
      break;
  }
};

export default RichLink;
