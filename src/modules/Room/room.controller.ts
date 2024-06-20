import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RoomrServices } from './room.service';
import sendResponse from '../../utils/sendResponse';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomrServices.CreateRoomIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Added succesfully',
    data: result,
  });
});

export const RoomController = {
  createRoom,
};
