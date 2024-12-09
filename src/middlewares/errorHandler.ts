import { Request, Response, NextFunction } from 'express';
import { JsonApiError } from '@/interfaces/jsonApi';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { HttpError } from 'http-errors';
import { logger } from '@/utils';
import { CustomHttpError } from '@/interfaces/customHttpError';

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpError) {
    const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

    let title = '';
    let detail = '';

    if (statusCode === StatusCodes.NOT_FOUND) {
      const customError = err as CustomHttpError;
      if (customError.type === 'resource_not_found') {
        title = 'Resource not found';
        detail = `The requested resource was not found on the server.`;
      } else {
        title = 'Route not found';
        detail = `The requested route ${req.method} ${req.url} was not found.`;
      }
    } else {
      title = err.message || getReasonPhrase(statusCode);
      detail = err.expose ? err.message : 'An unexpected error occurred.';
    }

    const errorResponse: JsonApiError = {
      status: statusCode.toString(),
      title,
      detail,
    };

    logger.error(err);
    res.status(statusCode).json({
      errors: [errorResponse],
    });
  } else {
    next(err);
  }
};
