import { Request, Response, NextFunction } from 'express';
import { AppError } from '../Errors/BaseError';

/**
 * Express error middleware that processes AppError instances
 * and returns standardized error responses to the client.
 */
export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message: string = 'Internal server error';
  if (err instanceof AppError) {
    console.log("catched.");
    console.error(`[${err.code}]`, err.message);

    return res.status(err.statusCode).json({
      show: true,
      message: err.showFlag ? err.message : message
    });
  }
  console.error('UNHANDLED ERROR:', err);
  return res.status(500).json({
    show: true,
    message
  });
};
