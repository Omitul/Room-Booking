import httpStatus from 'http-status';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { UserModel } from '../modules/User/user.model';
import AppError from '../Error/AppError';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHead = req.headers.authorization;

    if (!authHead) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    let token;

    if (authHead && authHead.startsWith('Bearer ')) {
      token = authHead.split(' ')[1];
    }

    if (!token) {
      success: httpStatus.UNAUTHORIZED;
      throw new Error('You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    //console.log(decoded);

    const { role, userId } = decoded;
    console.log(userId);

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user doesnt exits');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
