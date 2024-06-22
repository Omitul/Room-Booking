import { Types } from 'mongoose';

export type TBooking = {
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  data: string;
  totalAmount: number;
  isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled';
  isDeleted: boolean;
};
