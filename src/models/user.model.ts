import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import Todo from './todo.model';

interface IUser {
  _id: string;
  username: string;
  password: string;
  todos: Array<string | Todo>;
  isPasswordMatch: (password: string) => Promise<boolean>;
  save: () => any;
}
interface UserModel extends Model<IUser> {
  isUsernameTaken(username: string): Promise<boolean>;
  getUserByUsername(username: string): Promise<IUser | null | undefined>;
  getUserById(id: string): Promise<IUser | null | undefined>;
}

const userSchema = new Schema<IUser, UserModel>({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 8 },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

//* Statics
userSchema.static('isUsernameTaken', async function isUsernameTaken(username) {
  const user = await this.findOne({ username });
  return !!user;
});

userSchema.static(
  'getUserByUsername',
  async function getUserByUsername(username) {
    const user = await this.findOne({ username });
    return user;
  }
);

userSchema.static('getUserById', async function getUserById(id) {
  const user = await this.findById(id);
  return user;
});

//* Document Methods
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
