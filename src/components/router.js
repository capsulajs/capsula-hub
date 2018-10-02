// @flow

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { getAsyncComponent } from '../utils/getAsyncComponent';

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
            component={getAsyncComponent(() => import('./views/projects'))}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
