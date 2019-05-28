#!/usr/bin/env node

const program = require('commander');

program
  .command('run')
  .description('Run a Capsula-Hub instance')
  .option('-l, --local <path-to-file>', 'Run with local configuration file')
  .option('-p, --port <port>', 'Run on specified port (default 55555)')
  .action((args: { port: number; local: string }) => {
    const runner = require('./helpers/runCapsulaHub');
    console.log(`port --------> ${args.port}`);
    const port = args.port || 55555;
    if (args.local) {
      const options = {
        token: `localhost:${port}/configuration`,
        localConfig: true,
        path: args.local,
        port,
      };
      runner(options);
    } else {
      console.error('No flag given to run the app. Please try "capsula-hub run -l <config_file>"');
    }
  });

program.parse(process.argv);
