import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const TBookingSchema: Schema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  slots: { type: Schema.Types.ObjectId, ref: 'Slot' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

TBookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

TBookingSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { $isDeleted: { $ne: true } } });
  next();
});

export const BookingModel = model<TBooking>('Booking', TBookingSchema);
