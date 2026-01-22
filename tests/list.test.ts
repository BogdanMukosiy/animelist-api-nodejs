import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import {cleanupDb, closeDb} from './testUtils';

describe('My List API', () => {
    let animeId: string;
    let entryId: string;

    beforeAll(async () => {
        await cleanupDb();

        const anime = await prisma.anime.create({
            data: { title: 'Attack on Titan', status: 'finished', year: 2013 },
        });

        animeId = anime.id;
    });

    afterAll(async () => {
        await cleanupDb();
        await closeDb();
    });



    it('POST /me/list should add entry', async () => {
        const res = await request(app)
            .post('/me/list')
            .send({ animeId, status: 'planned' });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.animeId).toBe(animeId);

        entryId = res.body.id;
    });

    it('GET /me/list should return entries', async () => {
        const res = await request(app).get('/me/list');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('PATCH /me/list/:entryId should update entry', async () => {
        const res = await request(app)
            .patch(`/me/list/${entryId}`)
            .send({ status: 'watching', episodesWatched: 3 });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('watching');
        expect(res.body.episodesWatched).toBe(3);
    });

    it('DELETE /me/list/:entryId should delete entry', async () => {
        const res = await request(app).delete(`/me/list/${entryId}`);
        expect(res.status).toBe(204);
    });
});
