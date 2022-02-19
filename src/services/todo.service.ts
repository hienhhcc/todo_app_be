import httpStatus from 'http-status';

import ApiError from '../utils/ApiError';
import { Todo, User } from '../models';
import { ETodoStatus } from '../models/todo.model';

interface ISaveNewTodo {
  todoName: string;
  userId: string;
}
interface IPatchTodo {
  todoId: string;
  userId: string;
  isChecked: boolean;
}
interface IRemoveTodo {
  todoId: string;
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

const patchTodo = async ({ todoId, userId, isChecked }: IPatchTodo) => {
  const todo = await Todo.findById(todoId);
  if (isChecked) {
    todo.status = ETodoStatus.COMPLETED;
  } else {
    todo.status = ETodoStatus.INPROGRESS;
  }
  await todo.save();

  return todo;
};

const removeTodo = async ({ todoId, userId }: IRemoveTodo) => {
  const todo = await Todo.findByIdAndDelete(todoId);

  return todo;
};

const getAllTodosOfUser = async ({ userId }: { userId: string }) => {
  const user = await User.findById(userId).populate('todos').exec();

  return user.todos;
};

const todoService = { addNewTodo, getAllTodosOfUser, patchTodo, removeTodo };

export default todoService;
