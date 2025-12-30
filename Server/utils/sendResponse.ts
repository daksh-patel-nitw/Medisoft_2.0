// src/utils/responseHelper.ts
import { Response } from 'express';
import { ApiResponseDTO } from '../Dtos/ApiResponse.dto.js';

/**
 * Standardized success response helper.
 * @param res - Express Response object
 * @param data - The payload to send
 * @param message - A human-readable message
 * @param statusCode - HTTP Status code (default 200)
 * @param show - Variable to show the message (default true)
 */
export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  show: boolean = true,
  statusCode: number = 200
): void => {
  const responseBody: ApiResponseDTO<T> = {
    show: show,
    ...(message != null && { message: message }),
    ...(data != null && { data: data }),
  };

  res.status(statusCode).json(responseBody);
};