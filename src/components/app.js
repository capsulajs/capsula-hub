// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import styled from 'styled-components';
import AppRouter from './router';
import store from '../store';

type Props = {};
type State = {};

const persistor = getPersistor();

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  background: #f7f7f7;
  height: 44px;
`;

class App extends Component<Props, State> {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Container>
            <Header>Header</Header>
            <AppRouter />
          </Container>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
