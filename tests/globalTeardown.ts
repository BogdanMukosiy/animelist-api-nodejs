import { prisma, pool } from '../src/config/prisma';

export default async function globalTeardown() {
  await prisma.$disconnect();
  await pool.end();
}
