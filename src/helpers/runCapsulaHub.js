#!/usr/bin/env node
const app = require('express')();
const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require('fs');
const isPlainObject = require('lodash').isPlainObject;
const allowCrossDomain = require('./utils').allowCrossDomain;
const port = require('../constants').localConfigPort;

const isOptionValid = (options) => {
  return options && isPlainObject(options) && options.token;
};

const runner = (options) => {
  if (!isOptionValid(options)) {
    console.error('Token required !');
    process.exit(1);
  }

  app.use(allowCrossDomain);

  if (options.localConfig && options.path) {
    const workspaceConfig = require(`${process.cwd()}/${options.path}`);
    app.post('/configuration/workspace', (req, res) => {
      res.send(workspaceConfig);
    });
  }

  fs.writeFile('capsulahub.json', `{ "token": ${JSON.stringify(options.token)} }`, () => {
    const entryFiles = Path.resolve(__dirname, '../../lib/index.html');
    const options = {
      outDir: '../dist',
      outFile: 'index.html'
    };

    const bundler = new Bundler(entryFiles, options);
    app.use(bundler.middleware());

    app.listen(port);
    console.log(`CapsulaHub running on port ${port} !`);
  });
};

module.exports = runner;
