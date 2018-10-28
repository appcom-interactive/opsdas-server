#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const compose = require('docker-compose');
const logger = require('./logger');

program
  .option('-v, --verbose', 'Enable verbose output')
  .parse(process.argv);

const { args } = program;
const name = args[0] || 'default';

logger.info(`Stopping server with profile ${chalk.blue(name)}`);

const destination = path.join(os.homedir(), '.opsdash-server', name);

const options = {
  cwd: destination,
  log: program.verbose
};

logger.info('Stopping opsdash server');

compose.down(options)
  .then(() => logger.info(`Successfully stopped opsdash server with profile ${chalk.blue(name)}`))
  .catch((error) => {
    logger.warn(`There was an error starting opsdash server for profile ${chalk.blue(name)}`);
    console.error(error);
  });
