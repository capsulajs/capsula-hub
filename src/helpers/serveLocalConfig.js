#!/usr/bin/env node

const express = require('express');
const CONSTANTS = require('../constants');
const allowCrossDomain = require('./utils').allowCrossDomain;

const serveLocalConfig = (path) => {
  const app = express();
  const port = CONSTANTS.localConfigPort;
  const workspaceConfig = require(`${process.cwd()}/${path}`);

  app.use(allowCrossDomain);

  app.post('/configuration/workspace', (req, res) => {
    res.send(workspaceConfig);
  });

  app.listen(port, () => console.log(`CapsulaHUB configuration listening on port ${port}!`));
};

module.exports = serveLocalConfig;
