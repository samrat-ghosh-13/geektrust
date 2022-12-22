import { Request } from 'express';
import axios from 'axios';

import { apiMembersUrl } from '../config';

import { buildResponseStatus, logStatus } from './logStatusHelper';

export const getMemberServiceStatus = async (req: Request) => {
  logStatus({
    level: 'info',
    message: 'Liveness request - Member Services health check request',
    req,
  });

  const response = await axios.get(apiMembersUrl);

  if (!response.statusText && response.status !== 404) {
    logStatus({
      level: 'error',
      message: 'Member Services is UNHEALTHY',
      req,
      statusCode: response.status,
      responseUrl: response.config.url,
    });

    return buildResponseStatus({
      healthy: false,
      message: response.statusText,
      error: { message: response.statusText, statusCode: response.status },
    });
  }

  logStatus({
    level: 'info',
    message: 'Member Services is HEALTHY!',
    req,
    statusCode: response.status,
    responseUrl: response.config.url,
  });

  return buildResponseStatus({ healthy: true });
};
