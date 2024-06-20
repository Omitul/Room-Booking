import { TRoom } from './room.interface';
import { RoomModel } from './room.model';

const CreateRoomIntoDb = async (payload: TRoom) => {
  const result = await RoomModel.create(payload);
  return result;
};

const GetRoomFromDbById = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};

const GetRoom = async () => {
  const result = await RoomModel.find();
  return result;
};
export const RoomServices = {
  CreateRoomIntoDb,
  GetRoomFromDbById,
  GetRoom,
};
