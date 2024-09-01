import { TUser } from './user.interface';
import { UserModel } from './user.model';

const CreateUserintoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const GetUserFromDb = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password'); // password baade
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const UserServices = {
  CreateUserintoDb,
  GetUserFromDb,
};
