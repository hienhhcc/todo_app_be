import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION_MINUTES, JWT_SECRET } from '../configs/config';

const generateAuthToken = ({
  _id,
  username,
}: {
  _id: string;
  username: string;
}) => {
  return jwt.sign(
    {
      username,
      _id: _id.toString(),
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION_MINUTES,
    }
  );
};

const tokenService = { generateAuthToken };

export default tokenService;
