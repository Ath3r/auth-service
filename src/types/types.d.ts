import { User } from '@/resource/user/user.interface';
import { Request } from 'express';
declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
