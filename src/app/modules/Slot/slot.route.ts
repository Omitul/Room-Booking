import express from 'express';

import { USER_ROLE } from '../User/user.constants';
import { SlotsController } from './slot.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/slots', auth(USER_ROLE.admin), SlotsController.CreateSlot);
router.get('/slots/availability', SlotsController.getSlot);

// router.get('/api/slots/availability', SlotsController.getSlot);

// router.get(
//   '/api/rooms/:id',
//   auth(USER_ROLE.admin, USER_ROLE.admin, USER_ROLE.user),
//   RoomController.GetRoomById,
// );

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

export const SlotRoutes = router;
