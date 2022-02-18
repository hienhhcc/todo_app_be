import httpStatus from 'http-status';
import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

import { userService, todoService } from '../services';

//* Fetch all todo
const getAllTodo = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const todos = await todoService.getAllTodosOfUser({ userId });

  return res.status(httpStatus.OK).json({ success: true, todos });
});

//* Add Todo
const addTodo = catchAsync(async (req: Request, res: Response) => {
  const { todoName } = req.body;
  const userId = req.params.userId;

  console.log(todoName, userId);

  const todo = await todoService.addNewTodo({ todoName, userId });

  return res.status(httpStatus.OK).json({ success: true, todo });
});

//* Edit Todo
const editTodo = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await userService.createUser({ username, password });

  return res.status(httpStatus.OK).json({ success: true });
});

//* Remove Todo
const removeTodo = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await userService.createUser({ username, password });

  return res.status(httpStatus.OK).json({ success: true });
});

export default { addTodo, editTodo, removeTodo, getAllTodo };
