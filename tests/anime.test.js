'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const app_1 = __importDefault(require('../src/app'));
const prisma_1 = require('../src/config/prisma');
const testUtils_1 = require('./testUtils');
describe('Anime API', () => {
    beforeAll(async () => {
        await (0, testUtils_1.cleanupDb)();
    });
    afterAll(async () => {
        await (0, testUtils_1.cleanupDb)();
        await (0, testUtils_1.closeDb)();
    });
    it('POST /anime should create anime', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/anime')
            .send({ title: 'Naruto', status: 'finished', year: 2002 });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe('Naruto');
    });
    it('GET /anime should return list', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/anime');
        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(Array.isArray(res.body.items)).toBe(true);
    });
    it('GET /anime/:id should return one anime', async () => {
        const created = await prisma_1.prisma.anime.create({
            data: { title: 'Bleach', status: 'finished', year: 2004 },
        });
        const res = await (0, supertest_1.default)(app_1.default).get(`/anime/${created.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(created.id);
    });
    it('PATCH /anime/:id should update anime', async () => {
        const created = await prisma_1.prisma.anime.create({
            data: { title: 'One Piece', status: 'ongoing', year: 1999 },
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/anime/${created.id}`)
            .send({ status: 'finished' });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('finished');
    });
    it('DELETE /anime/:id should delete anime', async () => {
        const created = await prisma_1.prisma.anime.create({
            data: { title: 'Death Note', status: 'finished', year: 2006 },
        });
        const res = await (0, supertest_1.default)(app_1.default).delete(`/anime/${created.id}`);
        expect(res.status).toBe(204);
    });
});
//# sourceMappingURL=anime.test.js.map
