import { RequestHandler } from "express";
import { loginUserService } from "../Services/Auth.Service";
import { sendSuccess } from "../utils/sendResponse";
import { createLoginBodyDTO } from "../Dtos/auth/Login.Dto";
import dotenv from 'dotenv';
import path from 'path';
import { AppError } from "../Errors/BaseError";
dotenv.config({ path: path.resolve(__dirname, '../.env') });
/**
 * Controller to login the user
 */
export const loginUserController: RequestHandler = async (
  req,
  res,
  next) => {
  try {
    const body = createLoginBodyDTO(req.body);
    const { refreshToken, user } = await loginUserService(body);
    res.cookie('refreshToken', refreshToken, {
      maxAge: 43200000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    sendSuccess(res, user, `${user.name} Logged in Successfully.`, true,201)
  } catch (error) {
    if(error instanceof AppError){
      error.statusCode=401
      console.log(error.message)
      error.message="User Unauthorized"
    }
    next(error);
  }
};

export const forgotPasswordController: RequestHandler = async (
  req,
  res,
  next) => {

}