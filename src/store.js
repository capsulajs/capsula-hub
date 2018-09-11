import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import * as models from './models';

const persistPlugin = createRematchPersist({
  key: 'capsula-hub-state',
  whitelist: ['user'],
  throttle: 5000,
  serialize: true,
  version: 1
});

export default init({
  models,
  plugins: [persistPlugin]
});
