import express from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import validateRequest from '../../middlewares/validateRequest';
import CreateUserSchema from './user.validate';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUserintoDb(req.body);

  const userData = {
    name: result.name,
    email: result.email,
    phone: result.phone,
    role: result.role,
    address: result.address,
    _id: result._id,
  };

  res.status(201).send({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: userData,
  });
});

const getUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await UserServices.GetUserFromDb(userId);

  const userData = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
    _id: user._id,
  };

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data: userData,
  });
});

export const UserController = {
  createUser,
  getUser,
};
