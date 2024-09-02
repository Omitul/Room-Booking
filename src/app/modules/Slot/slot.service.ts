import { object } from 'joi';
import { TSlot } from './slot.interface';
import { SlotModel } from './slot.model';

const CreateSlotsIntoDb = async (payload: TSlot) => {
  const { room, startTime, endTime, date, isBooked } = payload;
  const [hours1, minutes1] = startTime.split(':').map(Number);
  const StartTimeMinutes = hours1 * 60 + minutes1;
  const [hours2, minutes2] = endTime.split(':').map(Number);
  const EndTimeMinutes = hours2 * 60 + minutes2;
  const total_duration = EndTimeMinutes - StartTimeMinutes;

  const numberOfSlots = Math.floor(total_duration / 60);
  const Slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const startTime = minutesToTime(StartTimeMinutes + i * 60);
    const endTime = minutesToTime(StartTimeMinutes + (i + 1) * 60);

    const slot = {
      room,
      date,
      startTime,
      endTime,
      isBooked,
    };
    const result = await SlotModel.create(slot);
    Slots.push(result);
  }

  function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  return Slots;
};

const FindSlotsFromDb = async (req: any) => {
  console.log(req);
  if (Object.keys(req).length) {
    const { date, roomId } = req;

    const query: any = { isBooked: false };
    if (date) {
      query.date = date.trim();
    }

    if (roomId) {
      query.room = roomId.trim();
    }

    const result = SlotModel.find(req).populate('room').exec();
    return result;
  } else {
    const result = SlotModel.find().populate('room').exec();
    return result;
  }
};

const DeleteSlotFromDb = async (_id: string) => {
  const result = await SlotModel.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const UpdateDSlotIntoDb = async (id: string, payload: Partial<TSlot>) => {
  const result = await SlotModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const SlotServices = {
  CreateSlotsIntoDb,
  FindSlotsFromDb,
  DeleteSlotFromDb,
  UpdateDSlotIntoDb,
};
