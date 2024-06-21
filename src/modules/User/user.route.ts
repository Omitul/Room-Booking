import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/api/auth/signup', UserController.createUser);

export const UserRoutes = router;
