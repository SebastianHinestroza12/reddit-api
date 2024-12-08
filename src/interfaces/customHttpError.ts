import { HttpError } from 'http-errors';

export interface CustomHttpError extends HttpError {
  type?: string;
}
