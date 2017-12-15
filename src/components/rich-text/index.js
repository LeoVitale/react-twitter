import React, { Component } from 'react';
import RichLink from '../rich-link';
import styles from './styles.scss';

const regex = /([@]+[A-Za-z0-9_]+)|([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+)|([#]+[A-Za-z0-9_]+)/g;

export default class RichText extends Component {

  state = {
    rich: []
  };

  componentDidMount() {
    this.parseText(this.props.text);
  }

  parseText = (text) => {
    let tempText = text;
    const richItems = [];
    const links = [];
    tempText = tempText.replace(regex, (result, index) => {
      if (result.startsWith('#')) {
        richItems.push({ result: result.replace('#', ''), original: result, type: 'HASH' });
      } else if (result.startsWith('http')) {
        richItems.push({ result: result, original: result, type: 'LINK' });
      } else if (result.startsWith('@')) {
        richItems.push({ result: result.replace('@', ''), original: result, type: 'MENTION' });
      }
      return '__MARKUP__';
    })
    tempText = tempText.split('__MARKUP__');
    let richIndex = 0;
    tempText = tempText.map((text, index) => {
      const richItem = richItems[richIndex];
      text = richItem ? <span key={index}>{text} <RichLink {...richItem} /> </span> : text;
      richIndex = richIndex + 1;
      return text;
    });
    this.setState({
      rich: tempText
    });
  };
  render() {
    return (
      <div className={styles.richText}>
        {this.state.rich}
      </div>
    )
  }
}
