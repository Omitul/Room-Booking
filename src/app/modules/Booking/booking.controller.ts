import httpStatus from 'http-status';
import { BookingServices } from './booking.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import { RoomModel } from '../Room/room.model';
import { BookingModel } from './booking.model';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDb(req.body);

  const { room, slots } = result;
  const howManySlots = slots.length;
  const query = await RoomModel.findById(room).select('pricePerSlot');
  // console.log(query);
  const pricePerSlot = query?.pricePerSlot as number;
  // console.log(pricePerSlot);
  // console.log(howManySlots);
  const totalAmount = howManySlots * pricePerSlot;

  result.totalAmount = totalAmount;
  //saving the updated result
  await BookingModel.findByIdAndUpdate(
    result._id,
    { totalAmount: totalAmount },
    { new: true },
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const GetBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.GetBookingsFromDb();

  if (result.length == 0) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});
const UpdateBookings = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await BookingServices.UpdateRoomIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const DeleteBooking = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await BookingServices.DeleteBookingFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const GetUserBookings = catchAsync(async (req, res) => {
  const authHead = req.headers.authorization;
  let token;

  if (authHead && authHead.startsWith('Bearer ')) {
    token = authHead.split(' ')[1];
  }

  if (!token) {
    success: httpStatus.UNAUTHORIZED;
    throw new Error('You are not authorized!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;
  console.log('user:' + userId);

  const result = await BookingServices.GetUserBooking(userId);
  if (result.length == 0) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  GetBookings,
  UpdateBookings,
  GetUserBookings,
  DeleteBooking,
};
