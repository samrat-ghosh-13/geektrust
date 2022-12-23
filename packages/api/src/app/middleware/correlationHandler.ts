import { NextFunction, Request, Response } from 'express';

export const correlationIdHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.headers['X-Correlation-ID'] = req?.correlationId();
  next();
};
