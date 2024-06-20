import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import sendResponse from '../../utils/sendResponse';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.CreateRoomIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Added succesfully',
    data: result,
  });
});

const GetRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.GetRoomFromDb(req.params.id.trim());

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });
});

export const RoomController = {
  createRoom,
  GetRoom,
};
