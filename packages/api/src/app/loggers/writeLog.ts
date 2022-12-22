import { LogEntry } from 'winston';

import winston from './initWinston';

export const applicationLogger = winston.loggers.get('applicationLogs');
export const securityLogger = winston.loggers.get('securityLogs');

export const writeLog = ({
  level = 'info',
  message = 'NA',
  referer = null,
  errorData = null,
  sessionId = null,
  method = null,
  url = null,
  statusCode = null,
  correlationID = null,
  userId = null,
  requestBody = null,
  responseBody = null,
  responseUrl = null,
}: LogEntry): void => {
  applicationLogger.log(level, message, {
    http_referer: referer,
    session_id: sessionId,
    url: method && url && `${method} ${url}`,
    response_url: responseUrl,
    ...(errorData && { error_data: JSON.stringify(errorData, null, 2) }),
    response_status: statusCode,
    request_body: requestBody && JSON.stringify(requestBody),
    response_body: responseBody && JSON.stringify(responseBody),
    correlation_id: correlationID,
    user_id: userId,
  });
};

export const writeSecurityLog = ({
  level = 'info',
  message = 'NA',
  referer = null,
  errorData = null,
  sessionId = null,
  method = null,
  url = null,
  statusCode = null,
  correlationID = null,
  userId = null,
  requestBody = null,
  responseBody = null,
}: LogEntry): void => {
  securityLogger.log(level, message, {
    http_referer: referer,
    session_id: sessionId,
    url: method && url && `${method} ${url}`,
    path: method && url && `${method} ${url.split('?')[0]}`,
    ...(errorData && { error_data: JSON.stringify(errorData, null, 2) }),
    response_status: statusCode,
    request_body: requestBody && JSON.stringify(requestBody),
    response_body: responseBody && JSON.stringify(responseBody),
    correlation_id: correlationID,
    user_id: userId,
  });
};
