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

export const BookingController = {
  createBooking,
  GetBookings,
};
