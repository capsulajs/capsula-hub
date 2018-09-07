import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import getAsyncComponent from '../utils/getAsyncComponent';
import '../styles/App.css';

const loadHomeComponent = () => import('./Home');
const loadTodoComponent = () => import('./Todo');

class App extends Component {
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
