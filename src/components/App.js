import React, { Component } from 'react';
import universal from 'react-universal-component';
import NotFound from '../containers/not-found';
import { pages, nextIndex, indexFromPath } from '../utils';
import Home from '../containers/home';

const UniversalComponent = universal(
  props => import(`../containers/${props.page}`),
  {
    minDelay: 1200,
    error: NotFound
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    const { history } = props;
    const index = indexFromPath(history.location.pathname);

    this.state = {
      index,
      loading: false,
      done: false,
      error: false
    };

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname);
      this.setState({ index });
    });
  }

  handleError = error => {
    this.setState({ error: true, loading: false });
  }

  changePage = () => {
    if (this.state.loading) return;

    const index = nextIndex(this.state.index);
    const page = pages[index];

    this.props.history.push(`/${page}`);
  }

  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({ loading: true, error: false });
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false, error: false });
    } else if (!isServer && !isMount) {
      this.setState({ done: true, error: false });
    }
  }

  render() {
    const { index, done, loading } = this.state;
    const page = pages[index] ? pages[index] : 'home';
    return (
      <div>
        <UniversalComponent
          page={page}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />
      </div>
    );
  }
}

export default App;
