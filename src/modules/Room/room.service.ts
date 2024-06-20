import { TRoom } from './room.interface';
import { RoomModel } from './room.model';

const CreateRoomIntoDb = async (payload: TRoom) => {
  const result = await RoomModel.create(payload);
  return result;
};

export const RoomrServices = {
  CreateRoomIntoDb,
};
