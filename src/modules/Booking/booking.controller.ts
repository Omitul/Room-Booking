import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const GetBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.GetBookingsFromDb();

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

const DeleteBookin = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await BookingServices.DeleteBookingFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  GetBookings,
  UpdateBookings,
};
