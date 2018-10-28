#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');
const os = require('os');

program
  .parse(process.argv);

const destination = path.join(os.homedir(), '.opsdash-server');
console.log(`Lazy creating profile under ${destination}`);

mkdirp(destination);

const profiles = fs.readdirSync(destination)
  .map(name => path.join(destination, name))
  .filter(profile => fs.lstatSync(profile).isDirectory() && fs.existsSync(path.join(profile, 'docker-compose.yml')))
  .map(profile => path.basename(profile));

if (profiles.length > 0) {
  console.log(`Found the following opsdash server profiles:\n\n* ${profiles.join('\n* ')}`);
} else {
  console.log('There are no profiles yet. Create on using the start command');
}
