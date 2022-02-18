import { ErrorRequestHandler } from 'express';

import httpStatus from 'http-status';

import ApiError from '../utils/ApiError';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({ success: false, message: err.message });
};
