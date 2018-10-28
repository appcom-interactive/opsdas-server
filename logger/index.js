/**
 * Created by s.neidig on 23/09/16.
 */

const { createLogger, format, transports } = require('winston');
const os = require('os');
const path = require('path');

const { combine, timestamp, printf, colorize } = format;
const destination = path.join(os.homedir(), '.opsdash-server');

const consoleFormat = printf(info => info.message);
const fileFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = createLogger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      format: combine(colorize(), consoleFormat)
    }),
    new transports.File({
      filename: path.join(destination, 'logs.txt'),
      format: combine(timestamp(), fileFormat)
    })
  ]
});

module.exports = logger;
