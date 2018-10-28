#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const compose = require('docker-compose');
const logger = require('./logger');
const inquirer = require('inquirer');
const questions = require('./inquirer/questions');
const flattenHash = require('flatten-hash');

program
  .option('-v, --verbose', 'Enable verbose output')
  .parse(process.argv);

const { args } = program;
const name = args[0] || 'default';
const destination = path.join(os.homedir(), '.opsdash-server', name);

inquirer.prompt(questions)
  .then((answers) => {
    const result = flattenHash(answers);
    const config = Object.keys(result)
      .filter(key => !key.startsWith('_') && !!result[key])
      .map((key) => {
        let value = result[key];

        if (key.startsWith('listen.')) {
          value = `0.0.0.0:${value}`;
        }

        if (key === 'email.tlswrapper') {
          value = value ? 'yes' : 'no';
        }

        if (key === 'debug') {
          value = value ? 1 : 0;
        }

        return `${key} = ${value}`;
      });

    if (!fs.existsSync(path.join(destination, 'docker-compose.yml'))) {
      logger.info(`Could not found previous data for profile ${chalk.blue(name)}. Creating it from scratch`);
      fs.copySync(path.join(__dirname, 'data'), destination);
    }

    logger.info(`Configuring server with profile ${chalk.blue(name)}`);
    fs.writeFileSync(path.join(destination, 'server.cfg'), config.join('\n'));

    let exposeCounter = 0;
    const dockerFile = String(fs.readFileSync(path.join(destination, 'Dockerfile'))).split('\n')
      .map((line) => {
        if (line.startsWith('EXPOSE')) {
          const lineResult = `EXPOSE ${config[exposeCounter].split(':').slice(-1)[0]}${exposeCounter < 2 ? '' : '/udp'}`;
          exposeCounter += 1;

          return lineResult;
        }

        return line;
      })
      .join('\n');


    fs.writeFileSync(path.join(destination, 'Dockerfile'), dockerFile);

    exposeCounter = 0;
    const dockerComposeFile = String(fs.readFileSync(path.join(destination, 'docker-compose.yml'))).split('\n')
      .map((line) => {
        const regex = /- "\d{4}:\d{4}/;

        if (line.search(regex) > 0) {
          const port = config[exposeCounter].split(':').slice(-1)[0];
          const lineResult = line.replace(regex, `- "${port}:${port}`);
          exposeCounter += 1;

          return lineResult;
        }

        return line.replace(/container_name: .*/, `container_name: opsdash-server-${name}`);
      })
      .join('\n');

    fs.writeFileSync(path.join(destination, 'docker-compose.yml'), dockerComposeFile);
  });
