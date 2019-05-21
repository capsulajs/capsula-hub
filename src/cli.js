#!/usr/bin/env node

const program = require('commander');

program.version('0.0.1');

program
  .command('run')
  .description('Run a Capsula-Hub instance')
  .option('-l, --local <path-to-file>', 'Run with local configuration file')
  .option('-t, --token <token>', 'Run with token')
  .action((args) => {
    if (args.local && args.token) {
      console.error(`Please choose only one option`);
      process.exit(1);
    }

    const runner = require('./helpers/runCapsulaHub');

    if (args.local) {
      const CONSTANTS = require('./constants');
      const serveConfig = require('./helpers/serveLocalConfig');
      serveConfig(args.local);
      runner(`localhost:${CONSTANTS.localConfigPort}/configuration`);
    }

    if (args.token) {
      runner(args.token);
    }
  });

program.parse(process.argv);
