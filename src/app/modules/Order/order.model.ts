import mongoose, { Schema, model } from 'mongoose';
import { Torder } from './order.interface';

const TOrderSchema = new Schema<Torder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  payment: {
    type: String,
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
});

const TOrderModel = model<Torder>('TOrder', TOrderSchema);

export default TOrderModel;
