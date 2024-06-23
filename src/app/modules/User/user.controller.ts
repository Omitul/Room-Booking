import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUserintoDb(req.body);

  const userData = {
    /// excluding password field
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
    address: result.address,
    _id: result._id,
  };
  res.send({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: userData,
  });
});

export const UserController = {
  createUser,
};
