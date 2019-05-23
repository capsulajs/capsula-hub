#!/usr/bin/env node

const program = require('commander');

program.version('0.0.1');

program
  .command('run')
  .description('Run a Capsula-Hub instance')
  .option('-l, --local <path-to-file>', 'Run with local configuration file')
  .action((args) => {
    if (args.local && args.token) {
      console.error(`Please choose only one option`);
      process.exit(1);
    }

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
      console.error(`No flag given to run the app. Please try 'capsula-hub run -l <config_file>'`)
    }
  });

program.parse(process.argv);
