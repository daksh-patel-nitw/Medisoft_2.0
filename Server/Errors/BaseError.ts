export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public flag: boolean
  ) {
    super(message);
  }
}

export const badRequestError = (msg: string, flag: boolean = false) => {
  new AppError(400, 'BAD_REQUEST', msg, flag);
}

export const unauthorizedError = (msg = 'Unauthorized', flag: boolean = false) => {
  new AppError(401, 'UNAUTHORIZED', msg, flag);
}

export const forbiddenError = (msg = 'Forbidden', flag: boolean = false) => {
  new AppError(403, 'FORBIDDEN', msg, flag);
}

export const notFoundError = (msg: string, flag: boolean = false) => {
  new AppError(404, 'NOT_FOUND', msg, flag);
}

export const conflictError = (msg: string, flag: boolean = false) => {
  new AppError(409, 'CONFLICT', msg, flag);
}

export const serverError = (msg: string, flag: boolean = false) => {
  new AppError(500, '', msg, flag);
}

