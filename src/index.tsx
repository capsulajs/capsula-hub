import React from 'react'
import ReactDOM from 'react-dom'
import { WorkspaceFactory } from '@capsulajs/capsulahub-core-workspace/lib/src';
import capsulahub from '../capsulahub.json';

console.log(`Hello from tsx!\nMy token is ${capsulahub.token}`);
const workspaceFactory = new WorkspaceFactory();
workspaceFactory.createWorkspace({ token: capsulahub.token})
  .then(() => console.log(`Workspace loaded !`))
  .catch((err: Error) => console.error(err));


ReactDOM.render(
  <div id="workspace"></div>,
  document.getElementById('root'),
);
