import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import CreateUserSchema from './user.validate';

const router = express.Router();

router.post(
  '/api/auth/signup',
  validateRequest(CreateUserSchema),
  UserController.createUser,
);

export const UserRoutes = router;
