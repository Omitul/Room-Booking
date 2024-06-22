import httpStatus from 'http-status';
import { RoomServices } from './room.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.CreateRoomIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room Added succesfully',
    data: result,
  });
});

const GetAllRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.GetRoomFromDb();
  console.log(result);
  console.log(result.length);

  if (result.length == 0) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

const GetRoomById = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await RoomServices.GetRoomFromDbById(id);

  if (result?.isDeleted == true) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });
});

const UpdateRoom = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await RoomServices.UpdateRoomIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});

const DeleteRoom = catchAsync(async (req, res) => {
  const id = req.params.id.trim();
  const result = await RoomServices.DeleteRoomFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomController = {
  createRoom,
  GetRoomById,
  GetAllRoom,
  UpdateRoom,
  DeleteRoom,
};
