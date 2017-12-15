import React, { Component } from 'react';
import RichText from '../rich-text';
import styles from './styles.scss';

class Tweet extends Component {


  formatImage = (img) => {
    const formatedImage = img.replace('_normal', '');
    return <img src={formatedImage} alt=""/>
  }
  render() {
    const {text} = this.props;
    //console.log(this.props);

    return (
      <div className={styles.tweet}>
          <RichText text={text}/>
      </div>
    )
  }
}

export default Tweet;
