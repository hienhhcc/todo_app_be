import passportJWT from 'passport-jwt';

import { User } from '../models';
import { JWT_SECRET } from '../configs/config';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const passportJWTStrategy = new JWTStrategy(opts, (jwtPayload, done) => {
  const _id = jwtPayload._id;
  User.findOne({ _id })
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((error) => done(error, false));
});

export const requirePassportJWT = (passport: any) => {
  passport.use(passportJWTStrategy);

  return passport;
};
