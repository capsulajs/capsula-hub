#!/usr/bin/env node

const program = require('commander');

program.version('0.0.1');

program
  .command('run <token>')
  .description('Run a Capsula-Hub instance with a token')
  .option('-l, --local', 'Run with local configuration file')
  .action((token) => {
    const runner = require('./helpers/runCapsulaHub');
    runner(token);
  });

program
  .command('config <path>')
  .description('Serve the local config file for CapsulaHub')
  .action((path) => {
    console.log(process.cwd());
    const express = require('express');
    const workspaceConfig = require(`${process.cwd()}/${path}`);

    const app = express();
    const port = 3001;

    const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    };

    app.use(allowCrossDomain);
    app.use(express.static('public'));

    app.get('/configuration/workspace', (req, res) => {
      res.send(workspaceConfig);
    });

    app.listen(port, () => console.log(`CapsulaHUB configuration listening on port ${port}!`));
  });

program.parse(process.argv);
