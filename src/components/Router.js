// @flow

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { getAsyncComponent } from '../utils/getAsyncComponent';

export const componentLoaders = {
  loadHomeComponent: () => import('./Home'),
  loadTodoComponent: () => import('./Todo')
};

type Props = {};

type State = {};

class AppRouter extends Component<Props, State> {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={getAsyncComponent(componentLoaders.loadHomeComponent)}
          />
          <Route
            exact
            path="/todo"
            component={getAsyncComponent(componentLoaders.loadTodoComponent)}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
