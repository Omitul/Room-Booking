import { Schema, model, Document } from 'mongoose';
import { TSlot } from './slot.interface';

const TSlotSchema: Schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

TSlotSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
TSlotSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const SlotModel = model<TSlot>('Slot', TSlotSchema);
