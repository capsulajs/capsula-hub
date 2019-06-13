import '@babel/polyfill';
import CONSTANTS from './constants';

import(CONSTANTS.workspaceService)
  .then((module) => module.default)
  .then((WorkspaceFactory) => {
    const workspaceFactory = new WorkspaceFactory();
    const port = window.location.port;
    const token = `http://localhost:${port}/configuration`;
    return workspaceFactory.createWorkspace({ token }).catch(e => console.error(Error(e)));
  });
