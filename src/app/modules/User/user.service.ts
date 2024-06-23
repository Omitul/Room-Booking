import { TUser } from './user.interface';
import { UserModel } from './user.model';

const CreateUserintoDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  return result;
};

export const UserServices = {
  CreateUserintoDb,
};
