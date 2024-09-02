import { z } from 'zod';

export const CreateOrderValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid Email Format'),
    phone: z.string().min(1, 'Phone is required'),
    address: z.string().min(1, 'Address is required'),
    date: z.string().min(1, 'Date is required'),
    timeSlot: z.string().min(1, 'TimeSlot is required'),
    payment: z.string(),
  }),
});

export const OrderValidation = {
  CreateOrderValidationSchema,
};
