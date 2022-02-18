import { Schema, model } from 'mongoose';

export enum ETodoStatus {
  COMPLETED = 'COMPLETED',
  INPROGRESS = 'INPROGRESS',
}

interface Todo {
  content: string;
  status: string;
  user: any;
}

const todoSchema = new Schema<Todo>({
  content: { type: String, trim: true, required: true },
  status: {
    type: String,
    required: true,
    enum: ETodoStatus,
    default: ETodoStatus.INPROGRESS,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = model<Todo>('Todo', todoSchema);

export default Todo;
