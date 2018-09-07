import React, { Component } from 'react';

export default function getAsyncComponent(loadComponent) {
  return class AsyncComponent extends Component {
    state = { Component: null };

    async componentDidMount() {
      const { default: Component } = await loadComponent();
      this.setState({ Component });
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : <p>Loading...</p>;
    }
  };
}
