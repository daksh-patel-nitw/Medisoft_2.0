import { Request, Response, NextFunction } from 'express';
import { AppError } from '../Errors/BaseError';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message: string = 'Internal server error';
  if (err instanceof AppError) {
    console.error(`[${err.code}]`, err.message);
    return res.status(err.statusCode).json({
      show: true,
      message: err.flag ? err.message : message
    });
  }
  console.error('UNHANDLED ERROR:', err);
  return res.status(500).json({
    show: true,
    message
  });
};
