import { model, Schema } from 'mongoose';
import { User } from './user.interface';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<User>('User', UserSchema);
