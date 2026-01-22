import { prisma } from '../../config/prisma';
import { ApiError } from '../../common/errors/ApiError';

/** Максимальний ліміт, щоб не можна було "вбити" сервер */
const MAX_LIMIT = 50;

function normalizePagination(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), MAX_LIMIT);
  return { page, limit };
}

export async function listAnime(query: any) {
  const { page, limit } = normalizePagination(query);

  const where: any = {};

  if (query.status) where.status = String(query.status);
  if (query.year !== undefined) {
    const year = Number(query.year);
    if (Number.isNaN(year)) throw ApiError.badRequest('year must be a number');
    where.year = year;
  }

  if (query.q) {
    where.title = {
      contains: String(query.q),
      mode: 'insensitive',
    };
  }

  const [items, total] = await Promise.all([
    prisma.anime.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      // orderBy: { createdAt: 'desc' }, // увімкни якщо є поле createdAt в схемі
    }),
    prisma.anime.count({ where }),
  ]);

  return { items, page, limit, total };
}

export async function getAnime(id: string) {
  const anime = await prisma.anime.findUnique({ where: { id } });
  if (!anime) throw ApiError.notFound('Anime not found');
  return anime;
}

export async function createAnime(data: any) {
  const title = String(data?.title ?? '').trim();
  const status = String(data?.status ?? '').trim();
  const yearRaw = data?.year;

  if (!title) throw ApiError.badRequest('title is required');
  if (!status) throw ApiError.badRequest('status is required');

  let year: number | null = null;
  if (yearRaw !== undefined && yearRaw !== null && yearRaw !== '') {
    const y = Number(yearRaw);
    if (Number.isNaN(y)) throw ApiError.badRequest('year must be a number');
    year = y;
  }

  return prisma.anime.create({
    data: {
      title,
      status,
      year,
    },
  });
}

export async function updateAnime(id: string, data: any) {
  await getAnime(id);

  const updateData: any = {};

  if (data?.title !== undefined) {
    const title = String(data.title).trim();
    if (!title) throw ApiError.badRequest('title cannot be empty');
    updateData.title = title;
  }

  if (data?.status !== undefined) {
    const status = String(data.status).trim();
    if (!status) throw ApiError.badRequest('status cannot be empty');
    updateData.status = status;
  }

  if (data?.year !== undefined) {
    if (data.year === null || data.year === '') {
      updateData.year = null;
    } else {
      const year = Number(data.year);
      if (Number.isNaN(year)) throw ApiError.badRequest('year must be a number');
      updateData.year = year;
    }
  }

  // якщо нічого не передали на оновлення
  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest('No fields to update');
  }

  return prisma.anime.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteAnime(id: string) {
  await getAnime(id);
  return prisma.anime.delete({ where: { id } });
}
