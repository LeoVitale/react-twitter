import React, { PureComponent } from 'react';
import styles from './styles.scss';

export default class SearchBox extends PureComponent {
  state = {
    value: 'IndigoFair'
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('do validate');
    }
  }
  render() {
    const { value } = this.state;
    return (
      <input
        className={styles.searchBox}
        placeholder="Search on Twitter"
        type="text"
        value={value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress} />
    )
  }
}
