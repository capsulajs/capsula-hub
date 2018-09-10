// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './Router';
import store from '../store';
import '../styles/App.css';

type Props = {};

type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
