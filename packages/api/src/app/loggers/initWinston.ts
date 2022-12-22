import path from 'path';

import winston from 'winston';

import { isProduction } from '../config';

const logFilename = 'express-api.log';
const applicationLogDirectory = isProduction ? '/logs/app' : './logs/app';
const securityLogDirectory = isProduction
  ? '/logs/security'
  : './logs/security';

const handleWinstonTransports = (applicationLogDirectory: string) => {
  return [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf(
          (info) =>
            `\n ${info.timestamp} [${info.level}]: ${Object.entries(info)
              .filter(([key]) => key !== 'timestamp' && key !== 'level')
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n ')} \n`
        )
      ),
    }),
    new winston.transports.File({
      level: 'info',
      handleExceptions: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.json()
      ),
      filename: path.join(applicationLogDirectory, logFilename),
    }),
  ];
};

winston.loggers.add('applicationLogs', {
  exitOnError: false,
  format: winston.format.json(),
  transports: handleWinstonTransports(applicationLogDirectory),
});

winston.loggers.add('securityLogs', {
  exitOnError: false,
  format: winston.format.json(),
  transports: handleWinstonTransports(securityLogDirectory),
});

export default winston;
