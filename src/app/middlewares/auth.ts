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
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    let token;

    if (authHead && authHead.startsWith('Bearer ')) {
      token = authHead.split(' ')[1];
    }

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    } else {
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
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: 'You have no access to this route',
        });
      }

      req.user = decoded as JwtPayload;
      next();
    }
  });
};

export default auth;
