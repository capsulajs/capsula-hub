import '@babel/polyfill';
// import capsulahub from '../capsulahub.json';
import CONSTANTS from './constants';

import(CONSTANTS.workspaceService)
  .then((module) => module.default)
  .then((WorkspaceFactory) => {
    const workspaceFactory = new WorkspaceFactory();
    const port = window.location.port;
    const token = `localhost:${port}/configuration`;
    return workspaceFactory.createWorkspace({ token });
  });
