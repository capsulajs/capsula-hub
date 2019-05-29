#!/usr/bin/env node
import { RunOptions } from './types';
import { allowCrossDomain } from './utils';
import { isPlainObject } from 'lodash';

const app = require('express')();
const Bundler = require('parcel-bundler');
const Path = require('path');

const isOptionValid = (options: RunOptions) => {
  return options && isPlainObject(options) && options.port;
};

const runner = (args: RunOptions) => {
  if (!isOptionValid(args)) {
    console.error('Port required !');
    process.exit(1);
  }

  app.use(allowCrossDomain);

  if (args.localConfig && args.path) {
    const workspaceConfig = require(`${process.cwd()}/${args.path}`);
    app.post('/configuration/workspace', (req: any, res: any) => {
      res.send(workspaceConfig);
    });
  }

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
      \n
      +--------------------------------------------------+
      |               CapsulaHub running on              |
      |               http://localhost:${args.port}             |
      +--------------------------------------------------+
      \n
  `);
};

module.exports = runner;
