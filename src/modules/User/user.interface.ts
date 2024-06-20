import { USER_ROLE } from './user.constants';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
};

export type TUserRole = keyof typeof USER_ROLE;
