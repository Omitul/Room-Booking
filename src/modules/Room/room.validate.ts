import { z } from 'zod';

export const CreateRoomSchema = z.object({
  body: z.object({
    name: z.string().max(50),
    roomNo: z.number().int().positive(),
    floorNo: z.number().int().positive(),
    capacity: z.number().int().positive(),
    pricePerSlot: z.number().positive(),
    amenities: z.array(z.string()).default([]),
    isDeleted: z.boolean().default(false),
  }),
});

export const RoomValidation = {
  CreateRoomSchema,
};
