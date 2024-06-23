import config from '../../config';
import { UserModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new Error('User is not exists!');
  }

  console.log(user);

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
