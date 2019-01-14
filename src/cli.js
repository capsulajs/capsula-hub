#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .command('run')
  .description('Run a Capsula-Hub instance')
  .action(() => {
    const app = require('express')();
    const Bundler = require('parcel-bundler');
    const Path = require('path');

    const entryFiles = Path.join(__dirname, './index.html');
    const options = {
      outDir: '../dist',
      outFile: 'index.html'
    };
    const bundler = new Bundler(entryFiles, options);

    app.use(bundler.middleware());

    app.listen(3000);
  });

program.parse(process.argv);
