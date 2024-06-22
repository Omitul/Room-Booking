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

const GetRoomFromDb = async () => {
  const result = await RoomModel.find();
  return result;
};

const UpdateRoomIntoDb = async (id: string, payload: Partial<TRoom>) => {
  const result = await RoomModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const DeleteRoomFromDb = async (id: string) => {
  const result = await RoomModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const RoomServices = {
  CreateRoomIntoDb,
  GetRoomFromDbById,
  GetRoomFromDb,
  UpdateRoomIntoDb,
  DeleteRoomFromDb,
};
