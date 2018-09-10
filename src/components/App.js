// @flow

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import getAsyncComponent from '../utils/getAsyncComponent';
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
    );
  }
}

export default App;
