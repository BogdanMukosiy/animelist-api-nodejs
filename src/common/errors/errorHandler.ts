import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    const e = err instanceof ApiError
        ? err
        : new ApiError(500, 'internal_error', 'Internal server error');

    res.status(e.status).json({
        error: e.code,
        message: e.message,
        ...(e.details ? { details: e.details } : {})
    });
}
