import { Types } from 'mongoose';

export interface User {
  name: string;
  username: string;
  password: string;
}

export interface DBUser extends User {
  _id: Types.ObjectId;
}
