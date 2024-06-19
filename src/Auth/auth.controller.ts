import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { AuthServices } from './auth.service';
import { UserModel } from '../modules/User/user.model';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  //const { accessToken } = result;

  console.log(result);

  const { accessToken, user } = result;

  //console.log(req.body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in succesfully!',
    token: accessToken,
    data: {
      user,
    },
  });
});

export const AuthController = {
  loginUser,
};
