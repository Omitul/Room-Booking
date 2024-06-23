import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { user } = result;

  //console.log(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.token,
    data: user,
  });
});

export const AuthController = {
  loginUser,
};
