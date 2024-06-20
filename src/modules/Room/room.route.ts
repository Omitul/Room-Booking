import express from 'express';
import { RoomController } from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constants';

const router = express.Router();

router.post('/api/rooms', auth(USER_ROLE.admin), RoomController.createRoom);

export const RoomRoutes = router;
