#!/usr/bin/env node

const runner = (token) => {
  if (!token) {
    console.error('Token required !');
    process.exit(1);
  }
  const app = require('express')();
  const Bundler = require('parcel-bundler');
  const Path = require('path');
  const fs = require('fs');

  fs.writeFile('capsulahub.json', `{ "token": ${JSON.stringify(token)} }`, () => {
    const entryFiles = Path.join(process.cwd(), './src/index.html');
    console.log(entryFiles);
    const options = {
      outDir: '../dist',
      outFile: `index.html`
    };
    const bundler = new Bundler(entryFiles, options);

    app.use(bundler.middleware());

    app.listen(3000);
  });
};

const token = process.argv[2];

module.exports.runner = runner(token);
