import config from '../../config';
import { UserModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User does not exist!');
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect password!');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );

  return {
    token,
    user,
  };
};

export const AuthServices = {
  loginUser,
};
