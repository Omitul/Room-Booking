import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constants';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/api/bookings',
  auth(USER_ROLE.user),
  //validateRequest(RoomValidation.CreateRoomSchema),
  BookingController.createBooking,
);

router.get(
  '/api/bookings',
  auth(USER_ROLE.admin),
  BookingController.GetBookings,
);

router.post(
  '/api/bookings/:id',
  auth(USER_ROLE.admin),
  BookingController.UpdateBookings,
);

router.delete(
  '/api/bookings/:id',
  auth(USER_ROLE.admin),
  BookingController.UpdateBookings,
);

export const BookingRoutes = router;
