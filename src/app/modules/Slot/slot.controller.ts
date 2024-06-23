import httpStatus from 'http-status';
import { SlotServices } from './slot.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const CreateSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.CreateSlotsIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created succesfully',
    data: result,
  });
});

const getSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.FindSlotsFromDb(req.query);
  if (result.length == 0) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

export const SlotsController = {
  CreateSlot,
  getSlot,
};
