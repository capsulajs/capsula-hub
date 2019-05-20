#!/usr/bin/env node

const runner = () => {
  const args = process.argv;
  const token = args.length > 2 ? args[args.length - 1] : undefined;
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
    const options = {
      outDir: '../dist',
      outFile: `index.html`
    };
    const bundler = new Bundler(entryFiles, options);

    app.use(bundler.middleware());

    app.listen(3000);
  });
};

if (process.argv.includes('start')) {
  runner();
}

module.exports = runner;
