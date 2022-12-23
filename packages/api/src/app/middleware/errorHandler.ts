import { NextFunction, Request, Response } from 'express';

import { writeLog, writeSecurityLog } from '../loggers';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const logPayload = {
    level: "error",
    message: error && error.message,
    referer: req.header("Referer") as string,
    method: req.method,
    url: req?.originalUrl,
    requestBody: req.body,
    statusCode: res?.statusCode,
    correlationID: String(req?.headers["X-Correlation-ID"]),
    userId: res.locals?.decodedToken.sub,
  };

  writeLog(logPayload);
  writeSecurityLog(logPayload);

  res.status(500).send(error?.message);
};
