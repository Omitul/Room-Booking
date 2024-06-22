import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  return result;
};

const GetBookingsFromDb = async () => {
  const result = await BookingModel.find()
    .populate('Slot')
    .populate('Room')
    .populate('User');
  return result;
};

const UpdateRoomIntoDb = async (id: string, payload: Partial<TBooking>) => {
  const result = await BookingModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const DeleteBookingFromDb = async (id: string) => {
  const result = await BookingModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDb,
  GetBookingsFromDb,
  UpdateRoomIntoDb,
  DeleteBookingFromDb,
};
