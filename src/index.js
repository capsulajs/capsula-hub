import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
