import { SlotModel } from '../Slot/slot.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  const slotIds = payload.slots.map((slot) => slot.toString());

  // const SearchSlots = SlotModel.find({ _id: { $in: slotIds } });
  // if (!SearchSlots) {
  //   return [];
  // }

  await SlotModel.updateMany(
    { _id: { $in: slotIds } },
    { $set: { isBooked: true } }, /// making true after booking
  );

  return result;
};

const GetBookingsFromDb = async () => {
  try {
    const result = await BookingModel.find({})
      .populate({
        path: 'slots',
        populate: {
          path: 'room',
        },
      })
      .populate('room')
      .populate('user')
      .exec();
    return result;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

const GetUserBooking = async (id: string) => {
  console.log(id);
  const result = await BookingModel.find({ user: id })
    .populate('slots')
    .populate('room')
    .select('-user');
  return result;
};

const UpdateRoomIntoDb = async (id: string, payload: Partial<TBooking>) => {
  console.log(payload);
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
  GetUserBooking,
  DeleteBookingFromDb,
};
