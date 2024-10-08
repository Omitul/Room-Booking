import { z } from 'zod';

export const CreateRoomSchema = z.object({
  body: z.object({
    image: z.array(z.string()).default([]),
    roomNo: z.number().int().positive(),
    floorNo: z.number().int().positive(),
    name: z.string().max(50),
    capacity: z.number().int().positive(),
    pricePerSlot: z.number().positive(),
    amenities: z.array(z.string()).default([]),
    isDeleted: z.boolean().default(false),
  }),
});
export const UpdateRoomSchema = z.object({
  body: z.object({
    image: z.array(z.string()).default([]).optional(),
    name: z.string().max(50).optional(),
    roomNo: z.number().int().positive().optional(),
    floorNo: z.number().int().positive().optional(),
    capacity: z.number().int().positive().optional(),
    pricePerSlot: z.number().positive().optional(),
    amenities: z.array(z.string()).default([]).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const RoomValidation = {
  CreateRoomSchema,
  UpdateRoomSchema,
};
