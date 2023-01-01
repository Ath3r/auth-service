import UserModel from './user.model';
import { DBUser, User } from './user.interface';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/utils';
import HttpException from '@/utils/exceptions';
import httpStatus from 'http-status';
import { Logger } from '@/utils/logger';

class UserService {
  public users = UserModel;
  // Get all users
  public async createUser(user: User): Promise<string> {
    try {
      const userExists = await this.checkIfUserExists(user.username);
      if (userExists) {
        throw new HttpException(httpStatus.BAD_REQUEST, 'User already exists');
      }
      const dbUser = await this.users.create({
        ...user,
        password: await this.hashPassword(user.password),
      });
      const token = await this.generateToken(dbUser as DBUser);
      return token as string;
    } catch (error: any) {
      throw new HttpException(httpStatus.BAD_REQUEST, error.message);
    }
  }
  private async hashPassword(password: string): Promise<string | void> {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error: any) {
      Logger.error(`Hashing failed: ${error}`);
      throw error;
    }
  }
  private async generateToken(user: DBUser): Promise<string | void> {
    try {
      return generateToken(user);
    } catch (error) {
      Logger.error(`Token generation failed: ${error}`);
      throw error;
    }
  }

  public async login(username: string, password: string): Promise<string> {
    try {
      const dbUser = await this.users.findOne({
        username,
      });
      if (!dbUser) {
        throw new HttpException(httpStatus.NOT_FOUND, 'User not found');
      }
      const isPasswordMatching = await bcrypt.compare(
        password,
        dbUser.password
      );
      if (!isPasswordMatching) {
        throw new HttpException(httpStatus.BAD_REQUEST, 'Wrong password');
      }
      const token = await this.generateToken(dbUser);
      return token as string;
    } catch (error) {
      throw error;
    }
  }

  private async checkIfUserExists(username: string): Promise<boolean> {
    const user = await this.users.findOne({
      username,
    });
    return !!user;
  }
}

export default UserService;
