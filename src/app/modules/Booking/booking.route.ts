import express from 'express';
import { USER_ROLE } from '../User/user.constants';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validate';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/api/bookings',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.CreateTBookingSchema),
  BookingController.createBooking,
);

router.get(
  '/api/bookings',
  auth(USER_ROLE.admin),
  BookingController.GetBookings,
);

router.put(
  '/api/bookings/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.UpdateTBookingSchema),
  BookingController.UpdateBookings,
);

router.delete(
  '/api/bookings/:id',
  auth(USER_ROLE.admin),
  BookingController.UpdateBookings,
);

export const BookingRoutes = router;
