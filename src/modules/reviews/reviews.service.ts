import { prisma } from '../../config/prisma';
import { ApiError } from '../../common/errors/ApiError';
import type { CreateReviewDto } from './reviews.types';

const DEMO_USER_ID = 'demo-user';

async function ensureDemoUser() {
    await prisma.user.upsert({
        where: { id: DEMO_USER_ID },
        update: {},
        create: { id: DEMO_USER_ID },
    });
}

function normalizeRating(value: any) {
    const rating = Number(value);
    if (Number.isNaN(rating)) throw ApiError.badRequest('rating must be a number');
    if (rating < 1 || rating > 10) throw ApiError.badRequest('rating must be between 1 and 10');
    return rating;
}

function normalizeText(value: any) {
    const text = String(value ?? '').trim();
    if (!text) throw ApiError.badRequest('text is required');
    if (text.length > 2000) throw ApiError.badRequest('text is too long (max 2000 chars)');
    return text;
}

export async function listReviewsByAnime(animeId: string) {
    const id = String(animeId ?? '').trim();
    if (!id) throw ApiError.badRequest('animeId is required');

    const anime = await prisma.anime.findUnique({ where: { id } });
    if (!anime) throw ApiError.notFound('Anime not found');

    return prisma.review.findMany({
        where: { animeId: id },
        orderBy: { createdAt: 'desc' },
    });
}

export async function createReview(animeId: string, data: CreateReviewDto) {
    const id = String(animeId ?? '').trim();
    if (!id) throw ApiError.badRequest('animeId is required');

    const anime = await prisma.anime.findUnique({ where: { id } });
    if (!anime) throw ApiError.notFound('Anime not found');

    // ✅ ключовий фікс P2003
    await ensureDemoUser();

    const rating = normalizeRating((data as any)?.rating);
    const text = normalizeText((data as any)?.text);

    // ✅ 1 review на 1 anime (для demo-user)
    const existing = await prisma.review.findFirst({
        where: { animeId: id, userId: DEMO_USER_ID },
    });

    if (existing) throw ApiError.conflict('You already left a review for this anime');

    return prisma.review.create({
        data: {
            animeId: id,
            userId: DEMO_USER_ID,
            rating,
            text,
        },
    });
}
