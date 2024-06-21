import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

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
  //   const result = await SlotServices.FindSlotsFromDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: 
  });
});

export const SlotsController = {
  CreateSlot,
  getSlot,
};
