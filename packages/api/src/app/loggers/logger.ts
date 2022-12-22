// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import winston from "winston";

const transports = [
  new winston.transports.Console({
    exitOnError: false,
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: false,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.simple(),
      winston.format.printf((info) => {
        if (info.message?.value && typeof info.message?.value !== "string") {
          const value = JSON.stringify(info.message?.value, null, 4);
          return `${info.timestamp} [${info.level}]  ${info.message.label}: ${value}`;
        }

        return `${info.timestamp} [${info.level}]  ${info.message}`;
      })
    ),
  }),
];

export const logger = winston.createLogger({
  transports,
});
