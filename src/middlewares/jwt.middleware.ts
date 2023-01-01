import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions';
import httpStatus from 'http-status';
import { verifyToken } from '@/utils';
import { Token } from '@/utils/interface/token.interface';
import User from '@/resource/user/user.model';

export async function isProtected(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers['authorization'];
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(
      new HttpException(
        httpStatus.UNAUTHORIZED,
        'Unauthorized - No token provided'
      )
    );
  }
  const token = bearer.split(' ')[1].trim();
  try {
    const decoded: Token | jwt.JsonWebTokenError = await verifyToken(token);
    if (decoded instanceof jwt.JsonWebTokenError) {
      return next(
        new HttpException(
          httpStatus.UNAUTHORIZED,
          'Unauthorized - Invalid token'
        )
      );
    }
    const user = await User.findById(decoded.id).select('-password').exec();
    if (!user) {
      return next(
        new HttpException(
          httpStatus.UNAUTHORIZED,
          'Unauthorized - User not found'
        )
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      new HttpException(httpStatus.INTERNAL_SERVER_ERROR, 'Something is wrong')
    );
  }
}
