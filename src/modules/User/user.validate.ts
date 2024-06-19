import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().max(40).min(1),
  email: z.string().email().max(40),
  password: z.string().max(40),
  phone: z.string().max(40),
  address: z.string().max(100).optional(),
  role: z.enum(['admin', 'user']),
});
