#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');

const { description, version } = require('./package.json');

const destination = path.join(os.homedir(), '.opsdash-server');
mkdirp(destination);

program
  .version(version)
  .description(description)
  .command('start [name]', 'start the opsdash server')
  .command('stop [name]', 'stop the opsdash server')
  .command('configure [name]', 'configures the opsdash server')
  .command('list', 'lists all profiles');

program.parse(process.argv);
