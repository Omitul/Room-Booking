import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';
import { required } from 'joi';

const TRoomSchema: Schema = new Schema({
  image: { type: [String], default: [], required: true },
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], default: [], required: true },
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
