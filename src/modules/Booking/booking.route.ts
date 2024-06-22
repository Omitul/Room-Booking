import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constants';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validate';

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
