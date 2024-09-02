import { Torder } from './order.interface';
import TOrderModel from './order.model';

const CreateOrderIntoDb = async (orderData: Torder) => {
  const newOrder = new TOrderModel(orderData);
  await newOrder.save();
  return newOrder;
};

export const OrderServices = {
  CreateOrderIntoDb,
};
