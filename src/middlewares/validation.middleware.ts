import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import status from 'http-status';
import { Logger } from '@/utils';
import HttpException from '@/utils/exceptions';

type property = 'body' | 'query' | 'params';

export const validationMiddleware = (
  schema: Joi.ObjectSchema,
  property: property = 'body'
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    const { error } = schema.validate(req[property], validationOptions);
    if (error) {
      const message = error.details
        .map((details) => details.message)
        .join(', ');
      Logger.error(`Validation error: ${message}`);
      next(new HttpException(status.BAD_REQUEST, message));
    }
    next();
  };
};
