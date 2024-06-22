import { z } from 'zod';

const CreateTBookingSchema = z.object({
  room: z.string().max(50),
  slots: z.string().max(50),
  user: z.string().max(50),
  date: z.string(),
  totalAmount: z.number().positive(),
  isConfirmed: z.boolean(),
  isDeleted: z.boolean(),
});

const UpdateTBookingSchema = z.object({
  room: z.string().max(50).optional(),
  slots: z.string().max(50).optional(),
  user: z.string().max(50).optional(),
  date: z.string().optional(),
  totalAmount: z.number().positive().optional(),
  isConfirmed: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const BookingValidation = {
  CreateTBookingSchema,
  UpdateTBookingSchema,
};
