import { notFoundMiddleware } from './middlewares/error.middlewares';
import express from 'express';
import { config } from './utils';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Logger } from './utils/logger';
import compression from 'compression';
import mongoose from 'mongoose';
import { errorMiddleware } from './middlewares';
import UserController from './resource/user/user.controller';

export class ExpressApp {
  private app: express.Application;

  constructor() {
    this.app = express();

    this.initMiddlewares();
    this.initDatabase();
    this.initControllers();
    this.healthCheck();
    this.initErrorHandling();
  }

  public async start() {
    this.app.listen(config.port, () => {
      Logger.info(`Server listening on port: ${config.port}`);
    });
  }

  private initMiddlewares(): void {
    // Basic middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }

  private initControllers(): void {
    const userController = new UserController();
    this.app.use(userController.path, userController.router);
  }

  private initErrorHandling(): void {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private async initDatabase(): Promise<void> {
    try {
      await mongoose.connect(config.mongoUri!);
      Logger.info('MongoDB connected');
    } catch (error: any) {
      Logger.error(
        `MongoDB connection error. Please make sure MongoDB is running. ${error}`
      );
    }
  }

  private healthCheck(): void {
    this.app.get('/health', (req, res) => {
      res.send('OK');
    });
  }
}
