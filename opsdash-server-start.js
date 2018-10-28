#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');
const os = require('os');
const chalk = require('chalk');
const compose = require('docker-compose');

program
  .parse(process.argv);

const { args } = program;
const name = args[0] || 'default';

console.log(`Starting server with profile ${chalk.blue(name)}`);

const destination = path.join(os.homedir(), '.opsdash-server', name);
console.log(`Lazy creating profile under ${destination}`);

mkdirp(destination);

if (!fs.existsSync(path.join(destination, 'docker-compose.yml'))) {
  console.log(`Could not found previous data for profile ${chalk.blue(name)}. Creating it from scratch`);
  fs.copySync(path.join(__dirname, 'data'), destination);
} else {
  console.log(`There already is data for profile ${chalk.blue(name)}`);
}

const options = {
  cwd: destination,
  log: true
};

console.log('Stopping opsdash server');

compose.buildAll(options)
  .then(() => compose.upAll(options))
  .then(() => console.log(`Successfully built and started opsdash server with profile ${chalk.blue(name)}`))
  .catch((error) => {
    console.warn(`There was an error starting opsdash server for profile ${chalk.blue(name)}`);
    console.error(error);
  });
