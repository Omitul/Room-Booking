import { z } from 'zod';
const CreateSlotSchema = z.object({
  body: z.object({
    room: z.string().max(40),
    date: z.string().max(40),
    startTime: z.string().max(40),
    endTime: z.string().max(40),
    isBooked: z.boolean(),
  }),
});

export default CreateSlotSchema;
