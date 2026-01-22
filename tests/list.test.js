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
describe('My List API', () => {
    let animeId;
    let entryId;
    beforeAll(async () => {
        await (0, testUtils_1.cleanupDb)();
        const anime = await prisma_1.prisma.anime.create({
            data: { title: 'Attack on Titan', status: 'finished', year: 2013 },
        });
        animeId = anime.id;
    });
    afterAll(async () => {
        await (0, testUtils_1.cleanupDb)();
        await (0, testUtils_1.closeDb)();
    });
    it('POST /me/list should add entry', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/me/list')
            .send({ animeId, status: 'planned' });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.animeId).toBe(animeId);
        entryId = res.body.id;
    });
    it('GET /me/list should return entries', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/me/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('PATCH /me/list/:entryId should update entry', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/me/list/${entryId}`)
            .send({ status: 'watching', episodesWatched: 3 });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('watching');
        expect(res.body.episodesWatched).toBe(3);
    });
    it('DELETE /me/list/:entryId should delete entry', async () => {
        const res = await (0, supertest_1.default)(app_1.default).delete(`/me/list/${entryId}`);
        expect(res.status).toBe(204);
    });
});
//# sourceMappingURL=list.test.js.map
