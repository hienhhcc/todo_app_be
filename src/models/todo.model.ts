import { Schema, model } from 'mongoose';

interface Todo {
  content: string;
}

const todoSchema = new Schema<Todo>({
  content: { type: String, trim: true, required: true },
});

const Todo = model<Todo>('Todo', todoSchema);

export default Todo;
