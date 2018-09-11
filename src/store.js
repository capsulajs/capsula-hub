import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import selectPlugin from '@rematch/select';
import * as models from './models';

const persistPlugin = createRematchPersist({
  whitelist: ['user'],
  throttle: 5000,
  serialize: true,
  version: 1
});

export default init({
  models,
  plugins: [persistPlugin, selectPlugin()]
});
