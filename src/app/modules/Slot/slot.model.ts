import { Schema, model, Document } from 'mongoose';
import { TSlot } from './slot.interface';

const TSlotSchema: Schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export const SlotModel = model<TSlot>('Slot', TSlotSchema);
