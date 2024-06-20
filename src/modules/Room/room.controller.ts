import catchAsync from '../../utils/catchAsync';
import { RoomrServices } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomrServices.CreateRoomIntoDb(req.body);

  res.send({
    success: true,
    statusCode: 200,
    message: 'Room added Succesfully!',
    data: result,
  });
});

export const RoomController = {
  createRoom,
};
