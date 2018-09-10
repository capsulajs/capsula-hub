import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import baseStore from '../store';
import Router, { componentLoaders } from '../components/Router';

export const renderApp = async ({
  store = baseStore,
  route = '/',
  Component,
  componentLoaderName
}) => {
  let loadComponentPromise;
  componentLoaders[componentLoaderName] = jest.fn(() => {
    loadComponentPromise = Promise.resolve({ default: Component });
    return loadComponentPromise;
  });

  const renderUtils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>
    </Provider>
  );
  await loadComponentPromise;
  return renderUtils;
};
