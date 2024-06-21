import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  return result;
};

const GetBookingsFromDb = async () => {
  const result = await BookingModel.find()
    .populate('User')
    .populate('Room')
    .populate('Slot');
  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  GetBookingsFromDb,
};
