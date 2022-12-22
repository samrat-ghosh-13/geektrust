declare namespace Express {
  export interface Request {
    correlationId(): string;
  }
}

declare module "express-correlation-id";
