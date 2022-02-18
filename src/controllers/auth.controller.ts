import httpStatus from 'http-status';
import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

import { userService, tokenService } from '../services';

//* Register User
const register = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await userService.createUser({ username, password });

  return res.status(httpStatus.OK).json({ success: true });
});

//* Login User
const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  //TODO Check if credentials correct
  const user = await userService.tryLoginUser({ username, password });

  //TODO Generate auth token
  const token = tokenService.generateAuthToken(user);

  return res.status(httpStatus.OK).json({
    success: true,
    token,
    user: { _id: user._id, username: user.username },
  });
});

export default { register, login };
