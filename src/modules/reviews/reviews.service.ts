import { ApiError } from '../../common/errors/ApiError';
import { reviewStore } from './reviews.store';
import { CreateReviewDto, Review } from './reviews.types';
import { newId } from '../../common/utils/id';
import { getAnime } from '../anime/anime.service';

const now = () => new Date().toISOString();
const DEMO_USER_ID = 'user-1'; // для ЛР3 спрощено

export function listReviewsByAnime(animeId: string) {
    // переконаємось, що аніме існує
    getAnime(animeId);

    const items = reviewStore.filter(r => r.animeId === animeId);
    return { items, total: items.length };
}


export function createReview(animeId: string, dto: CreateReviewDto): Review {
    console.log('[createReview] animeId =', animeId);

    getAnime(animeId);

    const details = [];
    if (typeof dto.rating !== 'number' || dto.rating < 1 || dto.rating > 10) {
        details.push({ field: 'rating', issue: 'must be 1..10' });
    }
    if (!dto.text || dto.text.trim().length === 0) {
        details.push({ field: 'text', issue: 'required' });
    }
    if (details.length) throw ApiError.validation('Validation failed', details);

    // правило: 1 user -> 1 review на 1 anime
    const exists = reviewStore.find(r => r.animeId === animeId && r.userId === DEMO_USER_ID);
    if (exists) throw ApiError.conflict('Review already exists for this anime by this user');

    const item: Review = {
        id: newId(),
        animeId,
        userId: DEMO_USER_ID,
        rating: dto.rating,
        text: dto.text.trim(),
        createdAt: now()
    };

    reviewStore.push(item);
    return item;
}
