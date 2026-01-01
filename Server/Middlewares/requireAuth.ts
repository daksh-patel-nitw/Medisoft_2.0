import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../Errors/BaseError';
interface UserPayload {
  id: string;
  username: string;
  role: string;
  mobile: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * Authentication middleware.
 * Verifies whether the incoming request contains a valid JWT.
 * If valid, attaches the decoded user payload to `req.currentUser`
 * and allows the request to proceed.
 * Throws an unauthorized error if authentication fails.
 *
 * @param req - Express request object
 * @param res - Express response object (not used directly)
 * @param next - Callback to pass control to the next middleware
 */

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw unauthorizedError('Authentication required',true);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw unauthorizedError('Log in again.',true);
  }

  next();
};