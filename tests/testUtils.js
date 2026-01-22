'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.cleanupDb = cleanupDb;
exports.closeDb = closeDb;
const prisma_1 = require('../src/config/prisma');
async function cleanupDb() {
  await prisma_1.prisma.review.deleteMany({});
  await prisma_1.prisma.userAnimeEntry.deleteMany({});
  await prisma_1.prisma.anime.deleteMany({});
  await prisma_1.prisma.user.deleteMany({});
}
async function closeDb() {
  await prisma_1.prisma.$disconnect();
  await prisma_1.pool.end();
}
//# sourceMappingURL=testUtils.js.map
