import express from 'express';
import { USER_ROLE } from '../User/user.constants';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validate';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/bookings',
  validateRequest(BookingValidation.CreateTBookingSchema),
  auth(USER_ROLE.user),
  BookingController.createBooking,
);

router.get('/bookings', auth(USER_ROLE.admin), BookingController.GetBookings);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingController.GetUserBookings,
);

router.put(
  '/bookings/:id',
  validateRequest(BookingValidation.UpdateTBookingSchema),
  auth(USER_ROLE.admin),
  BookingController.UpdateBookings,
);

router.delete(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingController.UpdateBookings,
);

export const BookingRoutes = router;
