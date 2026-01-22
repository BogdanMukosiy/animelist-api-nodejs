import { prisma } from '../../config/prisma';
import { ApiError } from '../../common/errors/ApiError';
import type { CreateEntryDto, ListStatus, UpdateEntryDto } from './list.types';

const DEMO_USER_ID = 'demo-user';

const ALLOWED_STATUSES: ListStatus[] = ['planned', 'watching', 'completed', 'dropped', 'on_hold'];

function isValidStatus(value: any): value is ListStatus {
  return ALLOWED_STATUSES.includes(value);
}

async function ensureDemoUser() {
  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: { id: DEMO_USER_ID },
  });
}

export async function getMyList() {
  return prisma.userAnimeEntry.findMany({
    where: { userId: DEMO_USER_ID },
    include: { anime: true },
  });
}

export async function addToMyList(data: CreateEntryDto) {
  const animeId = String((data as any)?.animeId ?? '').trim();
  const status = (data as any)?.status;

  if (!animeId) throw ApiError.badRequest('animeId is required');
  if (!isValidStatus(status)) throw ApiError.badRequest('Invalid status');

  await ensureDemoUser();

  const anime = await prisma.anime.findUnique({ where: { id: animeId } });
  if (!anime) throw ApiError.notFound('Anime not found');

  const existing = await prisma.userAnimeEntry.findFirst({
    where: { userId: DEMO_USER_ID, animeId },
  });
  if (existing) throw ApiError.conflict('Anime already in your list');

  return prisma.userAnimeEntry.create({
    data: {
      userId: DEMO_USER_ID,
      animeId,
      status,
      episodesWatched: 0,
    },
    include: { anime: true },
  });
}

export async function updateMyEntry(entryId: string, data: UpdateEntryDto) {
  const id = String(entryId ?? '').trim();
  if (!id) throw ApiError.badRequest('entryId is required');

  const existing = await prisma.userAnimeEntry.findFirst({
    where: { id, userId: DEMO_USER_ID },
  });
  if (!existing) throw ApiError.notFound('List entry not found');

  const updateData: any = {};

  if ((data as any)?.status !== undefined) {
    const status = (data as any).status;
    if (!isValidStatus(status)) throw ApiError.badRequest('Invalid status');
    updateData.status = status;
  }

  if ((data as any)?.episodesWatched !== undefined) {
    const eps = Number((data as any).episodesWatched);
    if (Number.isNaN(eps) || eps < 0) {
      throw ApiError.badRequest('episodesWatched must be a non-negative number');
    }
    updateData.episodesWatched = eps;
  }

  if (Object.keys(updateData).length === 0) {
    throw ApiError.badRequest('No fields to update');
  }

  return prisma.userAnimeEntry.update({
    where: { id },
    data: updateData,
    include: { anime: true },
  });
}

export async function removeMyEntry(entryId: string) {
  const id = String(entryId ?? '').trim();
  if (!id) throw ApiError.badRequest('entryId is required');

  const existing = await prisma.userAnimeEntry.findFirst({
    where: { id, userId: DEMO_USER_ID },
  });
  if (!existing) throw ApiError.notFound('List entry not found');

  await prisma.userAnimeEntry.delete({ where: { id } });
}
