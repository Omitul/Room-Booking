import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUserintoDb(req.body);

  res.send({
    success: true,
    statusCode: 200,
    message: 'User registered Succesfully!',
    data: result,
  });
});

export const UserController = {
  createUser,
};
