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
  '/api/rooms/:id',
  auth(USER_ROLE.user),
  BookingController.GetBookings,
);

// router.get(
//   '/api/rooms',
//   auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.user),
//   RoomController.GetAllRoom,
// );

// router.put('/api/rooms/:id', auth(USER_ROLE.admin), RoomController.DeleteRoom);
// router.delete(
//   '/api/rooms/:id',
//   auth(USER_ROLE.admin),
//   RoomController.DeleteRoom,
// );

export const BookingRoutes = router;
