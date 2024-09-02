import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validate';

const router = express.Router();

router.post(
  '/order',
  validateRequest(OrderValidation.CreateOrderValidationSchema),
  OrderController.CreateOrder,
);

export const OrderRoutes = router;
