#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .command('run <token>')
  .description('Run a Capsula-Hub instance with a token')
  .action((token) => {
    const app = require('express')();
    const Bundler = require('parcel-bundler');
    const Path = require('path');
    const fs = require('fs');

    fs.writeFile('capsulahub.json', `{ "token": ${JSON.stringify(token)} }`, (response) => {
      console.log(response);
      const entryFiles = Path.join(__dirname, './index.html');
      const options = {
        outDir: '../dist',
        outFile: 'index.html'
      };
      const bundler = new Bundler(entryFiles, options);

      app.use(bundler.middleware());

      app.listen(3000);
    });
  });

program.parse(process.argv);
