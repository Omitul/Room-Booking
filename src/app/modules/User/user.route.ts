import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import CreateUserSchema from './user.validate';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(CreateUserSchema),
  UserController.createUser,
);

router.get('/auth/signup/:id', UserController.getUser);

export default router;
