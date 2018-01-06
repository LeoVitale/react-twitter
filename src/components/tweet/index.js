import React, { PureComponent } from 'react';
import { dateDiff } from '../../utils/formats';
import RichText from '../rich-text';
import styles from './styles.scss';

class Tweet extends PureComponent {
  formatImage = (img = '') => img.replace('_normal', '_bigger')

  formatTime = (dateTime = '') => {
    const Now = new Date();
    const TweetTime = new Date(dateTime);
    return `${dateDiff('s', TweetTime, Now)}`;
  }

  render() {
    const { text, user, created_at } = this.props;
    return (
      <div className={styles.tweet}>
        <div className={styles.image}>
          <img src={this.formatImage(user.profile_image_url)} alt={user} />
        </div>
        <div className={styles.textContent}>
          <div className={styles.accountGroup}>
            <a
              className={styles.accountGroupLink}
              href={`https://twitter.com/${user.screen_name}`}
              target="blank"
            >
              <span className={styles.fullName}>{user.name}</span>
              <span className={styles.userName}>@{user.screen_name}</span>
            </a>
          </div>
          <div className={styles.time}>{this.formatTime(created_at)}</div>
          <RichText text={text} />
        </div>
      </div>
    );
  }
}

export default Tweet;
