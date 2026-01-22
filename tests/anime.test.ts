import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/prisma';
import {cleanupDb, closeDb} from './testUtils';

describe('Anime API', () => {
    beforeAll(async () => {
        await cleanupDb();
    });

    afterAll(async () => {
        await cleanupDb();
        await closeDb();
    });



    it('POST /anime should create anime', async () => {
        const res = await request(app)
            .post('/anime')
            .send({ title: 'Naruto', status: 'finished', year: 2002 });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('Naruto');
    });

    it('GET /anime should return list', async () => {
        const res = await request(app).get('/anime');
        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(Array.isArray(res.body.items)).toBe(true);
    });

    it('GET /anime/:id should return one anime', async () => {
        const created = await prisma.anime.create({
            data: { title: 'Bleach', status: 'finished', year: 2004 },
        });

        const res = await request(app).get(`/anime/${created.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(created.id);
    });

    it('PATCH /anime/:id should update anime', async () => {
        const created = await prisma.anime.create({
            data: { title: 'One Piece', status: 'ongoing', year: 1999 },
        });

        const res = await request(app)
            .patch(`/anime/${created.id}`)
            .send({ status: 'finished' });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('finished');
    });

    it('DELETE /anime/:id should delete anime', async () => {
        const created = await prisma.anime.create({
            data: { title: 'Death Note', status: 'finished', year: 2006 },
        });

        const res = await request(app).delete(`/anime/${created.id}`);
        expect(res.status).toBe(204);
    });
});
