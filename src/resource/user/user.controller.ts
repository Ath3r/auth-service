import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interface/controller.interface';
import { config } from '@/utils';
import UserService from './user.service';
import ResponseHandler from '@/utils/response';
import { validationMiddleware } from '@/middlewares';
import { createUserValidation, loginValidation } from './user.validation';
import HttpException from '@/utils/exceptions';
import { isProtected } from '@/middlewares/jwt.middleware';

class UserController implements Controller {
  public path = `${config.api.prefix}/users`;
  public router = Router();
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`/me`, isProtected, this.getDetails);
    this.router.post(
      `/`,
      validationMiddleware(createUserValidation),
      this.createUser
    );
    this.router.post(
      `/login`,
      validationMiddleware(loginValidation, 'body'),
      this.login
    );
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, username, password } = req.body;
      const token = await this.userService.createUser({
        name,
        username,
        password,
      });
      ResponseHandler.success(
        res,
        {
          token,
        },
        'User created successfully'
      );
    } catch (error: any) {
      if (error instanceof HttpException) return next(error);
      next(new HttpException(500, error.message || 'Something went wrong'));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const token = await this.userService.login(username, password);
      ResponseHandler.success(
        res,
        {
          token,
        },
        'User logged in successfully'
      );
    } catch (error: any) {
      if (error instanceof HttpException) return next(error);
      next(new HttpException(500, error.message || 'Something went wrong'));
    }
  };

  private getDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;
      console.log(user);
      ResponseHandler.success(
        res,
        {
          user,
        },
        'User fetched successfully'
      );
    } catch (error: any) {
      if (error instanceof HttpException) return next(error);
      next(new HttpException(500, error.message || 'Something went wrong'));
    }
  };
}

export default UserController;
