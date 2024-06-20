import { TRoom } from './room.interface';
import { RoomModel } from './room.model';

const CreateRoomIntoDb = async (payload: TRoom) => {
  const result = await RoomModel.create(payload);
  return result;
};

const GetRoomFromDb = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};

export const RoomServices = {
  CreateRoomIntoDb,
  GetRoomFromDb,
};
