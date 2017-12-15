import React, { PureComponent } from 'react';
import { dateDiff } from '../../utils/formats';
import RichText from '../rich-text';
import styles from './styles.scss';

class Tweet extends PureComponent {

  formatImage = (img) => {
    const formatedImage = img.replace('_normal', '_bigger');
    return <img src={formatedImage} alt="" />
  }

  formatTime = (dateTime) => {
    const Now = new Date();
    const TweetTime = new Date(dateTime);
    let formatedTime = `${dateDiff('s', TweetTime, Now)}`;
    return <div className={styles.time}>{formatedTime}</div>
  }

  render() {
    const { text, user, created_at } = this.props;
    return (
      <div className={styles.tweet}>
        <div className={styles.image}>
          {this.formatImage(user.profile_image_url)}
        </div>
        <div className={styles.textContent}>
          <div className={styles.accountGroup}>
            <a className={styles.accountGroupLink} href={`https://twitter.com/${user.screen_name}`} target="blank">
              <span className={styles.fullName}>{user.name}</span>
              <span className={styles.userName}>@{user.screen_name}</span>
            </a>
          </div>
          {this.formatTime(created_at)}
          <RichText text={text} />
        </div>
      </div>
    )
  }
}

export default Tweet;
