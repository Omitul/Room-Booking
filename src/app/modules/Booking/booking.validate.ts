import { z } from 'zod';

const CreateTBookingSchema = z.object({
  body: z.object({
    room: z.string().max(50),
    slots: z.array(z.string().max(50)),
    user: z.string().max(50),
    date: z.string(),
  }),
});

const UpdateTBookingSchema = z.object({
  body: z.object({
    room: z.string().max(50).optional(),
    slots: z.array(z.string().max(50)).optional(),
    user: z.string().max(50).optional(),
    date: z.string().optional(),
    isConfirmed: z.string().optional(),
  }),
});

export const BookingValidation = {
  CreateTBookingSchema,
  UpdateTBookingSchema,
};
