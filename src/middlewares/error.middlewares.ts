import HttpException from '@/utils/exceptions';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Logger } from '../utils/logger';

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `Cannot ${req.method} ${req.path}`;
  next(new HttpException(httpStatus.NOT_FOUND, message));
};

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status;
  const message = err.message || 'Something went wrong';
  Logger.error(err);
  res.status(status).send({
    status,
    message,
  });
};
