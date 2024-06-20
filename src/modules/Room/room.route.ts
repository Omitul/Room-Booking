import express from 'express';
import { RoomController } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constants';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidation } from './room.validate';

const router = express.Router();

router.post(
  '/api/rooms',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.CreateRoomSchema),
  RoomController.createRoom,
);

export const RoomRoutes = router;
