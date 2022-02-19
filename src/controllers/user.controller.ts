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

  const todo = await todoService.addNewTodo({ todoName, userId });

  return res.status(httpStatus.OK).json({ success: true, todo });
});

//* Check and uncheck complete Todo
const editTodo = catchAsync(async (req: Request, res: Response) => {
  const { isChecked } = req.body;
  const { userId, todoId } = req.params;

  const todo = await todoService.patchTodo({ todoId, userId, isChecked });

  return res.status(httpStatus.OK).json({ success: true, todo });
});

//* Remove Todo
const removeTodo = catchAsync(async (req: Request, res: Response) => {
  const { userId, todoId } = req.params;

  const todo = await todoService.removeTodo({ todoId, userId });

  return res.status(httpStatus.OK).json({ success: true, todo });
});

export default { addTodo, editTodo, removeTodo, getAllTodo };
