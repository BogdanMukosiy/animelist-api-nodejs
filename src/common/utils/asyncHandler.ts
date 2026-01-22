import type { RequestHandler } from 'express';

export const asyncHandler =
    <P, ResBody, ReqBody, ReqQuery, Locals extends Record<string, any>>(
        fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
    ): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
