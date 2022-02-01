import { Request, Response, NextFunction } from 'express';
import models from '../database/models';
import {
  status, messages, hashPassword, successResponse, errorResponse, 
  conflictResponse, Jwt, bcrypt
} from '../utils/index';

export default class AuthControllers {
  static async signUpUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const userExits = await models.users.findOne({ where: { email } });
      if (userExits) {
        return conflictResponse(res, status.conflict, messages.signUp.conflict);
      }
      req.body.password = await hashPassword(req.body.password);
      const user = await models.users.create(req.body);
      const response = user.toJSON();
      delete response.password;
      const { id, first_name } = user;
      const token = await Jwt.generateToken({ id, first_name, email });
      return successResponse(res, status.created, messages.signUp.success, response, token);
    } catch (error) {
      return errorResponse(res, status.error, messages.signUp.error);
    }
  }

  static async signInUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        return errorResponse(res, status.unauthorized, messages.signIn.invalid);
      }
      const isPasswordValid = await bcrypt.comparePassword(user.password, password);

      if (!isPasswordValid) {
        return errorResponse(res, status.unauthorized, messages.signIn.invalid);
      }
      const {
        id, first_name
      } = user;
      const response = {
        id, first_name, email
      };
      const token = await Jwt.generateToken({ id, first_name, email });
      return successResponse(res, status.success, messages.signIn.success, response, token);
    } catch (error) {
      return errorResponse(res, status.error, messages.signIn.error);
    }
  }
}