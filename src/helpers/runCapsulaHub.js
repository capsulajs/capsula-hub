#!/usr/bin/env node
const app = require('express')();
const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require('fs');
const isPlainObject = require('lodash').isPlainObject;
const allowCrossDomain = require('./utils').allowCrossDomain;

const isOptionValid = (options) => {
  return options && isPlainObject(options) && options.token;
};

const runner = (args) => {
  console.log(JSON.stringify(args));
  if (!isOptionValid(args)) {
    console.error('Token required !');
    process.exit(1);
  }

  app.use(allowCrossDomain);

  if (args.localConfig && args.path) {
    const workspaceConfig = require(`${process.cwd()}/${args.path}`);
    app.post('/configuration/workspace', (req, res) => {
      res.send(workspaceConfig);
    });
  }

  fs.writeFile('capsulahub.json', `{ "token": ${JSON.stringify(args.token)} }`, () => {
    const entryFiles = Path.resolve(__dirname, '../../lib/index.html');
    const options = {
      outDir: '../dist',
      outFile: 'index.html',
    };

    const bundler = new Bundler(entryFiles, options);
    app.use(bundler.middleware());

    app.listen(args.port);
    console.log(`CapsulaHub running on port ${args.port} !`);
  });
};

module.exports = runner;
