#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const logger = require('./logger');
const chalk = require('chalk');
const Dockerode = require('dockerode');

program
  .parse(process.argv);

const destination = path.join(os.homedir(), '.opsdash-server');

const profiles = fs.readdirSync(destination)
  .map(name => path.join(destination, name))
  .filter(profile => fs.lstatSync(profile).isDirectory() && fs.existsSync(path.join(profile, 'docker-compose.yml')))
  .map(profile => path.basename(profile));

if (profiles.length > 0) {
  logger.info('Found the following opsdash server profiles:\n');
  profiles
    .sort()
    .forEach(async (profile) => {
      const status = ((await new Dockerode().listContainers())
        .filter(container => container.Names.some(name => name === `/opsdash-server-${profile}`))[0] || { State: 'not running' })
        .State;

      logger.info(`* ${chalk.blue(profile)} (${status})`);
    });
} else {
  logger.info('There are no profiles yet. Create on using the start command');
}
