export type ErrorCode =
    | 'validation_error'
    | 'not_found'
    | 'conflict'
    | 'unauthorized'
    | 'forbidden'
    | 'internal_error';

export type ErrorDetail = { field?: string; issue: string };

export class ApiError extends Error {
    public status: number;
    public code: ErrorCode;
    public details?: ErrorDetail[];

    constructor(status: number, code: ErrorCode, message: string, details?: ErrorDetail[]) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }

    static validation(message = 'Validation failed', details: ErrorDetail[] = []) {
        return new ApiError(400, 'validation_error', message, details);
    }

    static notFound(message = 'Not found') {
        return new ApiError(404, 'not_found', message);
    }

    static conflict(message = 'Conflict') {
        return new ApiError(409, 'conflict', message);
    }
}
