import type { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';

function mapPrismaError(err: any): ApiError | null {
  const code = err?.code;

  if (!code) return null;

  if (code === 'P2002') {
    return ApiError.conflict('Conflict: unique constraint failed');
  }

  if (code === 'P2003') {
    return ApiError.badRequest('Foreign key constraint failed');
  }

  if (code === 'P2025') {
    return ApiError.notFound('Record not found');
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: err.code,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  const prismaMapped = mapPrismaError(err);
  if (prismaMapped) {
    return res.status(prismaMapped.status).json({
      error: prismaMapped.code,
      message: prismaMapped.message,
      ...(prismaMapped.details ? { details: prismaMapped.details } : {}),
    });
  }

  console.error('[ERROR]', err);

  const fallback = ApiError.internal('Internal server error');
  return res.status(fallback.status).json({
    error: fallback.code,
    message: fallback.message,
  });
}
