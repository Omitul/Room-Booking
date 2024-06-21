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
    const StartTime = minutesToTime(StartTimeMinutes + i * 60);
    const EndTime = minutesToTime(StartTimeMinutes + (i + 1) * 60);

    const slot = {
      room,
      date,
      startTime,
      endTime,
      isBooked,
    };
    await SlotModel.create(slot);
    Slots.push(slot);
  }

  function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  return Slots;
};

export const SlotServices = {
  CreateSlotsIntoDb,
};
