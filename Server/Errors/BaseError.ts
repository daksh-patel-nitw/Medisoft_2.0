export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

export const badRequestError = (msg: string) =>{
    throw new AppError(400, 'BAD_REQUEST', msg);
}

export const unauthorizedError = (msg = 'Unauthorized') =>{
    throw new AppError(401, 'UNAUTHORIZED', msg);
}

export const forbiddenError = (msg = 'Forbidden') =>{
    throw new AppError(403, 'FORBIDDEN', msg);
}

export const notFoundError = (msg: string) =>{
    throw new AppError(404, 'NOT_FOUND', msg);
}

export const conflictError = (msg: string) =>{
    throw new AppError(409, 'CONFLICT', msg);
}

export const serverError = (msg: string) =>{
    throw new AppError(500, '', msg);
}
