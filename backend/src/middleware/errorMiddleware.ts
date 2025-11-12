import { Request, Response, NextFunction } from 'express';

type GenericError = Error & {
  statusCode?: number;
};

export const errorMiddleware = (
  err: GenericError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Внутренняя ошибка сервера';

  res.status(statusCode).json({
    success: false,
    error: message,
    status: statusCode,
  });
};
