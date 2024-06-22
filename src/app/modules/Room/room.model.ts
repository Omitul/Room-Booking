import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const TRoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  roomNo: { type: String, required: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  isDeleted: { type: Boolean, default: false },
});

TRoomSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
TRoomSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { $isDeleted: { $ne: true } } });
  next();
});

export const RoomModel = model<TRoom>('Room', TRoomSchema);
