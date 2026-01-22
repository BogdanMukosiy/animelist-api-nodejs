import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import { cleanupDb, closeDb } from './testUtils';

describe('Reviews API', () => {
    let animeId: string;

    beforeAll(async () => {
        await cleanupDb();

        const anime = await prisma.anime.create({
            data: { title: 'Jujutsu Kaisen', status: 'ongoing', year: 2020 },
        });

        animeId = anime.id;
    });

    afterAll(async () => {
        await cleanupDb();
        await closeDb();
    });

    it('POST /anime/:id/reviews should create review', async () => {
        const res = await request(app)
            .post(`/anime/${animeId}/reviews`)
            .send({ rating: 9, text: 'Very good anime' });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.rating).toBe(9);
    });

    it('GET /anime/:id/reviews should list reviews', async () => {
        const res = await request(app).get(`/anime/${animeId}/reviews`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /anime/:id/reviews should return 409 on duplicate', async () => {
        const res = await request(app)
            .post(`/anime/${animeId}/reviews`)
            .send({ rating: 8, text: 'Second review' });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe('conflict');
    });
});
