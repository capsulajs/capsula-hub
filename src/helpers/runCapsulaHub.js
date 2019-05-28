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

  // let jsonToken;
  // fs.readFile(Path.resolve(__dirname, '../../capsulahub.json'), (err, data) => {
  //   if (err) console.log('No file yet');
  //   jsonToken = data || {token: {}};
  // });

  fs.writeFile(
    Path.resolve(__dirname, '../../capsulahub.json'),
    `{ ${JSON.stringify('token' + args.port)}: ${JSON.stringify(args.token)} }`,
    () => {
      const entryFiles = Path.resolve(__dirname, '../../src/index.html');
      const options = {
        outDir: '../dist',
        outFile: 'index.html',
        noCache: true,
      };

      const bundler = new Bundler(entryFiles, options);
      app.use(bundler.middleware());

      app.listen(args.port);
      console.log(`
      \n\n
      +--------------------------------------------------+
      |               CapsulaHub running on              |
      |               http://localhost:${args.port}             |
      +--------------------------------------------------+
      \n\n
    `);
    }
  );
};

module.exports = runner;
