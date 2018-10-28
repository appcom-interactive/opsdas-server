#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const logger = require('./logger');
const chalk = require('chalk');

program
  .parse(process.argv);

const destination = path.join(os.homedir(), '.opsdash-server');

const profiles = fs.readdirSync(destination)
  .map(name => path.join(destination, name))
  .filter(profile => fs.lstatSync(profile).isDirectory() && fs.existsSync(path.join(profile, 'docker-compose.yml')))
  .map(profile => path.basename(profile));

if (profiles.length > 0) {
  logger.info('Found the following opsdash server profiles:\n');
  profiles.forEach(profile => logger.info(`* ${chalk.blue(profile)}`));
} else {
  logger.info('There are no profiles yet. Create on using the start command');
}
