// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppRouter from './Router';
import store from '../store';
import '../styles/App.css';

type Props = {};

type State = {};

const persistor = getPersistor();

class App extends Component<Props, State> {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
