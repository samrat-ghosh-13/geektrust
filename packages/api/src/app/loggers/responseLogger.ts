import { Request, Response } from 'express';

import { writeLog, writeSecurityLog } from './writeLog';

export const responseLogger = (
  req: Request,
  res: Response,
  responseBody: any
): void => {
  const isError = !!responseBody?.errors;
  let message = '';
  if (isError) {
    const [error] = responseBody.errors;
    message = error?.extensions?.errorType;
  }

  const logPayload = {
    level: isError ? 'error' : 'info',
    message,
    responseBody,
    referer: req.header('Referer') as string,
    method: req.method,
    url: req.originalUrl,
    requestBody: req.body,
    statusCode: res.statusCode,
    correlationID: String(req?.headers['X-Correlation-ID']),
    userId: res.locals?.decodedToken?.sub,
  };

  writeLog(logPayload);

  if (isError) {
    writeSecurityLog(logPayload);
  }
};
