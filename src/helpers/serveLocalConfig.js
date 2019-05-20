#!/usr/bin/env node

const serveLocalConfig = (path) => {
  console.log(process.cwd());
  const express = require('express');
  const workspaceConfig = require(`${process.cwd()}/${path}`);

  const app = express();
  const CONSTANTS = require('../constants');
  const port = CONSTANTS.localConfigPort;

  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  };

  app.use(allowCrossDomain);
  app.use(express.static('public'));

  app.post('/workspace.json', (req, res) => {
    res.send(workspaceConfig);
  });

  app.listen(port, () => console.log(`CapsulaHUB configuration listening on port ${port}!`));
};

module.exports = serveLocalConfig;
