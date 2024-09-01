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

const GetRoomFromDb = async (searchTerm = '', sortOption = '') => {
  searchTerm = searchTerm.trim().replace(/"/g, '');
  sortOption = sortOption.trim().replace(/"/g, '');

  console.log('Search Term:', searchTerm);
  console.log('Sort Option:', sortOption);

  const query = {
    $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
  };

  let sortDirection = {};

  if (sortOption === 'priceAscending') {
    sortDirection = { pricePerSlot: 1 };
  } else if (sortOption === 'priceDescending') {
    sortDirection = { pricePerSlot: -1 };
  } else if (sortOption === 'random' || '') {
    return await RoomModel.aggregate([{ $match: query }]).exec(); /// if clear filter or random.
  }

  console.log('Query:', query);
  console.log('Sort Direction:', sortDirection);

  try {
    let result;
    if (Object.keys(sortDirection).length > 0) {
      result = await RoomModel.find(query).sort(sortDirection).exec();
    } else {
      result = await RoomModel.find(query).exec();
    }
    console.log('Query Result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Error fetching rooms');
  }
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
