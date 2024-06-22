import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const TUserSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'name is required'],
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: 40,
  },
  password: {
    type: String,
    required: [true, 'passoword is required'],
    maxlength: 40,
    select: 0,
  },
  phone: {
    type: String,
    required: [true, 'phone  is required'],
    maxlength: 40,
  },
  role: {
    type: String,
    required: [true, 'role  is required'],
  },
  address: {
    type: String,
    required: [true, 'phone  is required'],
    maxlength: 40,
  },
});

TUserSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

TUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', TUserSchema);
