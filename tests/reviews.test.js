"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const prisma_1 = require("../src/config/prisma");
const testUtils_1 = require("./testUtils");
describe('Reviews API', () => {
    let animeId;
    beforeAll(async () => {
        await (0, testUtils_1.cleanupDb)();
        const anime = await prisma_1.prisma.anime.create({
            data: { title: 'Jujutsu Kaisen', status: 'ongoing', year: 2020 },
        });
        animeId = anime.id;
    });
    afterAll(async () => {
        await (0, testUtils_1.cleanupDb)();
        await (0, testUtils_1.closeDb)();
    });
    it('POST /anime/:id/reviews should create review', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post(`/anime/${animeId}/reviews`)
            .send({ rating: 9, text: 'Very good anime' });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.rating).toBe(9);
    });
    it('GET /anime/:id/reviews should list reviews', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get(`/anime/${animeId}/reviews`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('POST /anime/:id/reviews should return 409 on duplicate', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post(`/anime/${animeId}/reviews`)
            .send({ rating: 8, text: 'Second review' });
        expect(res.status).toBe(409);
        expect(res.body.error).toBe('conflict');
    });
});
//# sourceMappingURL=reviews.test.js.map