import passport from 'passport';
import httpStatus from 'http-status';

import ApiError from '../utils/ApiError';

const verifyCallback =
  (req: any, resolve: any, reject: any) =>
  async (err: any, user: { _id: string }, info: any) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
      );
    }

    req.user = user;

    resolve();
  };

export const auth = () => async (req: any, res: any, next: any) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};
