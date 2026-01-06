import { notFoundError } from '../Errors/BaseError';
import { loginModel } from '../Models/login';
import { ClientSession } from 'mongoose';

/**
 * Creates new user login
 * @param mid
 * @param name 
 * @param role 
 * @param password 
 * @param session 
 * @param dep 
 * @param security_phrase 
 */
export const SignUp = async (
  mid: string,
  name: string,
  role: string,
  password: string,
  session?: ClientSession,
  dep?: string
) => {
  const newLogin = new loginModel({
    mid,
    name,
    password,
    role,
    ...(dep && { dep })
  });
  await newLogin.save({ session });
}

/**
 * Retrieves a user by the specified login identifier.
 *
 * @param key - Field name to query against (e.g., email, mobile)
 * @param value - Value to match for the given field
 * @returns The matched user record
 */
export const login = async (
  key: string,
  value: string
) => {
  const user = await loginModel.findOne({ [key]: value });
  if (!user) {
    throw notFoundError('User not found!');
  }
  return user;
};

/**
 * Blocks the user login
 * @param mid - employee/patient id
 */
export const deleteLogin = async (mid: string) => {
  const deletedUser = await loginModel.findOneAndDelete({ mid: mid });
  if (!deletedUser) {
    throw notFoundError('User not found');
  }
  return deletedUser;
};