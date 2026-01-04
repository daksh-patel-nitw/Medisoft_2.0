import bcrypt from 'bcryptjs';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import { login } from '../Repository/Auth.Repo';
import { forbiddenError, unauthorizedError } from '../Errors/BaseError';
import { authTokenInterface, AuthTokenPayload } from '../Dtos/auth/Token.DTO';
import { LoginDTO } from '../Dtos/auth/Login.Dto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

if (!SECRET_KEY || !REFRESH_SECRET_KEY)
  throw new Error('Secret Keys not Configured');

export const loginUserService = async (body: LoginDTO) => {

  let key: string;
  let value: string;
  if (body.email) {
    key = 'email';
    value = body.email;
  } else {
    key = 'mid';
    value = body.id!;
  }

  const user = await login(key, value);

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    throw unauthorizedError("Invalid credentials",true)
  }

  const data: authTokenInterface = {
    mid: user.mid,
    name: user.name,
    role: user.role,
  }
  const accessToken = jwt.sign(data, SECRET_KEY, { expiresIn: '10m' });

  const refreshToken = jwt.sign(data, REFRESH_SECRET_KEY, { expiresIn: '12h' });

  return {
    refreshToken,
    user: {
      mid: user.mid,
      name: user.name,
      role: user.role,
      accessToken
    },
  };

};

export const refreshToken = async (refreshToken: string) => {

  if (!refreshToken) {
    throw new Error('Refresh Token Not Found.')
  }

  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as AuthTokenPayload;

    const data: authTokenInterface = {
      mid: user.mid,
      name: user.name,
      role: user.role,
    }
    const newAccessToken = jwt.sign(
      data,
      SECRET_KEY,
      { expiresIn: '10m' }
    );

    return newAccessToken
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw forbiddenError("Session expired. Please log in again.",true);
    }

    throw unauthorizedError("Invalid Refresh Token");
  }
};