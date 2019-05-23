#!/usr/bin/env node

const program = require('commander');


program
  .command('run')
  .description('Run a Capsula-Hub instance')
  .option('-l, --local <path-to-file>', 'Run with local configuration file')
  .action((args) => {
    const runner = require('./helpers/runCapsulaHub');
    if (args.local) {
      const CONSTANTS = require('./constants');
      const options = {
        token: `localhost:${CONSTANTS.localConfigPort}/configuration`,
        localConfig: true,
        path: args.local
      };
      runner(options);
    } else {
      console.error('No flag given to run the app. Please try "capsula-hub run -l <config_file>"');
    }
  });

program.parse(process.argv);
