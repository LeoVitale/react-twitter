import React, { PureComponent } from 'react';
import styles from './styles.scss';

export default class SearchBox extends PureComponent {
  constructor() {
    super();
    this.state = {
      value: ''
    };
    this.timerText = null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.term });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleKeyUp = event => {
    const { searchHandle } = this.props;
    const { value } = this.state;
    clearTimeout(this.timerText);

    this.timerText = setTimeout(() => {
      searchHandle && value !== '' && searchHandle(value);
    }, 1000);

    if (event.key === 'Enter') {
      clearTimeout(this.timerText);
      searchHandle && value !== '' && searchHandle(value);
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
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}
