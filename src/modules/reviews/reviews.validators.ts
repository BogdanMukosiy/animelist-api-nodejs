import { ApiError } from '../../common/errors/ApiError';

export function normalizeRating(value: any) {
    const rating = Number(value);
    if (Number.isNaN(rating)) throw ApiError.badRequest('rating must be a number');
    if (rating < 1 || rating > 10) throw ApiError.badRequest('rating must be between 1 and 10');
    return rating;
}

export function normalizeText(value: any) {
    const text = String(value ?? '').trim();
    if (!text) throw ApiError.badRequest('text is required');
    if (text.length > 2000) throw ApiError.badRequest('text is too long (max 2000 chars)');
    return text;
}
