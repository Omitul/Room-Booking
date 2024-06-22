import express from 'express';
import { RoomController } from './room.controller';
import { USER_ROLE } from '../User/user.constants';
import { RoomValidation } from './room.validate';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/rooms',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.CreateRoomSchema),
  RoomController.createRoom,
);

router.get(
  '/rooms/:id',
  auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.user),
  RoomController.GetRoomById,
);

router.get(
  '/rooms',
  auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.user),
  RoomController.GetAllRoom,
);

router.put(
  '/rooms/:id',
  validateRequest(RoomValidation.UpdateRoomSchema),
  auth(USER_ROLE.admin),
  RoomController.UpdateRoom,
);

router.delete('/rooms/:id', auth(USER_ROLE.admin), RoomController.DeleteRoom);

export const RoomRoutes = router;
