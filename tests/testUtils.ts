import { prisma, pool } from '../src/config/prisma';

export async function cleanupDb() {
    await prisma.review.deleteMany({});
    await prisma.userAnimeEntry.deleteMany({});
    await prisma.anime.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function closeDb() {
    await prisma.$disconnect();
    await pool.end();
}
