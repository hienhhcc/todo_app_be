import httpStatus from 'http-status';
import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

const register = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ success: false });
});

export default { register };
