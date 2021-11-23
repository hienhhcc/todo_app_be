import { Schema, model } from 'mongoose';

import Todo from './todo.model';

interface User {
  username: string;
  password: string;
  todos: Array<string | Todo>;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 8 },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
});

const User = model<User>('User', userSchema);

export default User;
