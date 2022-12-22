import { Request } from "express";

import { writeLog } from "../loggers";

interface Response {
  healthy: boolean;
  message?: string;
  error?: {
    message: string;
    statusCode: number;
  };
}

interface LogStatusProps {
  level: string;
  message: string;
  req: Request;
  statusCode?: number;
  responseUrl?: string;
}

export const buildResponseStatus = ({ healthy, message, error }: Response) => ({
  healthy,
  timestamp: new Date().toUTCString(),
  message,
  error,
});

export const logStatus = ({
  level,
  message,
  req,
  statusCode,
  responseUrl,
}: LogStatusProps) => {
  writeLog({
    level,
    referer: req.header("Referer"),
    method: req.method,
    url: req.originalUrl,
    responseUrl,
    message,
    requestBody: req.body,
    ...(statusCode && { statusCode }),
  });
};
