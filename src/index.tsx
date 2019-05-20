import React from 'react'
import ReactDOM from 'react-dom'
// import { WorkspaceFactory as workspace } from 'https://capsulajs.s3.amazonaws.com/core/capsulahub-core-workspace/PR/feature/implement-workspace-factory/src/index.js';
import capsulahub from '../capsulahub.json';

console.log(`Hello from tsx!\nMy token is ${capsulahub.token}`);
// workspace.createWorkspace({ token: capsulahub.token}).then(() => console.log(`Workspace loaded !`));


ReactDOM.render(
  <div id="workspace"></div>,
  document.getElementById('root'),
);
