import '@babel/polyfill';
import capsulahub from '../capsulahub.json';
import CONSTANTS from './constants';
import(CONSTANTS.workspaceService).then((module) => console.log(module));

const workspaceFactory = new WorkspaceFactory();
let workspace;
workspaceFactory
  .createWorkspace({ token: capsulahub.token })
  .then((createdWorkspace) => {
    workspace = createdWorkspace;
  })
  .then(() => {
    document.getElementById('root').innerHTML = '<web-grid></web-grid><web-request-form></web-request-form>';
  })
  .then(() => {
    return workspace.services({});
  })
  .then((services) => {
    console.log('services', services);
    return services.ServiceA;
  })
  .then((serviceA) => {
    return serviceA.proxy.greet('Superuser');
  })
  .then((greeting) => {
    const serviceResEl = document.createElement('h2');
    serviceResEl.innerText = greeting;
    document.getElementById('request-form').appendChild(serviceResEl);
  });
