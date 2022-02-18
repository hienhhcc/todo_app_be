import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';

import ApiError from '../utils/ApiError';

import { User } from '../models';

//* Create User
interface IUserCres {
  username: string;
  password: string;
}

const createUser = async ({ username, password }: IUserCres) => {
  if (await User.isUsernameTaken(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username đã có người sử dụng');
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hashPassword,
  });
  await user.save();
  return user;
};

//* Check Login User
const tryLoginUser = async ({ username, password }: IUserCres) => {
  const user = await User.getUserByUsername(username);

  //TODO: Nếu mật khẩu không khớp
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai username hoặc mật khẩu!');
  }

  return user;
};

const userService = { createUser, tryLoginUser };

export default userService;
