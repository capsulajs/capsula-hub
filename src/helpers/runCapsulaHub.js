#!/usr/bin/env node
const app = require('express')();
const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require('fs');
const allowCrossDomain = require('./utils').allowCrossDomain;

const runner = (token) => {
  if (!token) {
    console.error('Token required !');
    process.exit(1);
  }

  app.use(allowCrossDomain);

  fs.writeFile('capsulahub.json', `{ "token": ${JSON.stringify(token)} }`, () => {
    const entryFiles = Path.join(process.cwd(), './src/index.html');
    const options = {
      outDir: '../dist',
      outFile: `index.html`
    };

    const bundler = new Bundler(entryFiles, options);
    app.use(bundler.middleware());

    app.listen(3000);
  });
};

module.exports = runner;
