import { NextFunction, Request, Response } from 'express';

const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      next(error);
    });
  };

export default catchAsync;
