#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const mkdirp = require('mkdirp');
const os = require('os');
const chalk = require('chalk');
const compose = require('docker-compose');

program
  .option('-v, --verbose', 'Enable verbose output')
  .parse(process.argv);

const { args } = program;
const name = args[0] || 'default';

console.log(`Stopping server with profile ${chalk.blue(name)}`);

const destination = path.join(os.homedir(), '.opsdash-server', name);
console.log(`Lazy creating profile under ${destination}`);

mkdirp(destination);

const options = {
  cwd: destination,
  log: program.verbose
};

console.log('Building and running opsdash server');

compose.down(options)
  .then(() => console.log(`Successfully stopped opsdash server with profile ${chalk.blue(name)}`))
  .catch((error) => {
    console.warn(`There was an error starting opsdash server for profile ${chalk.blue(name)}`);
    console.error(error);
  });
