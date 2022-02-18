import httpStatus from 'http-status';

import ApiError from '../utils/ApiError';
import { Todo, User } from '../models';

interface ISaveNewTodo {
  todoName: string;
  userId: string;
}

const addNewTodo = async ({ todoName, userId }: ISaveNewTodo) => {
  const user = await User.getUserById(userId);

  const newTodo = new Todo({ content: todoName });
  newTodo.user = user;
  user.todos.push(newTodo);

  await Promise.all([user.save(), newTodo.save()]);

  return newTodo;
};

const getAllTodosOfUser = async ({ userId }: { userId: string }) => {
  const user = await User.findById(userId).populate('todos').exec();

  return user.todos;
};

const todoService = { addNewTodo, getAllTodosOfUser };

export default todoService;
