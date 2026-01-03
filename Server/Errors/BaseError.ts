export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public showFlag: boolean
  ) {
    super(message);
  }
}

export const badRequestError = (msg: string, flag: boolean = false) => {
  return new AppError(400, 'BAD_REQUEST', msg, flag);
}

export const unauthorizedError = (msg = 'Unauthorized', flag: boolean = false) => {
  return new AppError(401, 'UNAUTHORIZED', msg, flag);
}

export const forbiddenError = (msg = 'Forbidden', flag: boolean = false) => {
  return new AppError(403, 'FORBIDDEN', msg, flag);
}

export const notFoundError = (msg: string, flag: boolean = false) => {
  console.log("notfound:",flag)
  return new AppError(404, 'NOT_FOUND', msg, flag);
}

export const conflictError = (msg: string, flag: boolean = false) => {
  return new AppError(409, 'CONFLICT', msg, flag);
}


