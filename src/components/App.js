// @flow

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import getAsyncComponent from '../utils/getAsyncComponent';
import store from '../store';
import '../styles/App.css';

const loadHomeComponent = () => import('./Home');
const loadTodoComponent = () => import('./Todo');

type Props = {};

type State = {
  test: number
};

class App extends Component<Props, State> {
  state = {
    test: 777
  };

  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route
            exact
            path="/"
            component={getAsyncComponent(loadHomeComponent)}
          />
          <Route
            exact
            path="/todo"
            component={getAsyncComponent(loadTodoComponent)}
          />
        </Switch>
      </Provider>
    );
  }
}

export default App;
