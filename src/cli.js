#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .command('run')
  .description('Run a Capsula-Hub instance')
  .action(() => {
    const app = require('express')();
    const Bundler = require('parcel-bundler');
    const bundler = new Bundler('src/index.html');

    app.use(bundler.middleware());

    app.listen(3000);
  });

program.parse(process.argv);
