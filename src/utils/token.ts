import jwt from 'jsonwebtoken';
import { DBUser } from '@/resource/user/user.interface';
import { Token } from './interface/token.interface';
import { config } from './config';

export const generateToken = (user: DBUser): string => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    config.jwt.secret as jwt.Secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

export const verifyToken = (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret as jwt.Secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as Token);
    });
  });
};
