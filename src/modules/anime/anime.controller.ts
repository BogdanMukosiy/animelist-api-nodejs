import type { RequestHandler } from 'express';
import { asyncHandler } from '../../common/utils/asyncHandler';
import * as service from './anime.service';

type ParamsId = { id: string };

export const list: RequestHandler = asyncHandler(async (req, res) => {
  const data = await service.listAnime(req.query as any);
  res.json(data);
});

export const getById: RequestHandler<ParamsId> = asyncHandler(async (req, res) => {
  const item = await service.getAnime(req.params.id);
  res.json(item);
});

export const create: RequestHandler = asyncHandler(async (req, res) => {
  const item = await service.createAnime(req.body);
  res.status(201).json(item);
});

export const patch: RequestHandler<ParamsId> = asyncHandler(async (req, res) => {
  const item = await service.updateAnime(req.params.id, req.body);
  res.json(item); // повертаємо оновлений об'єкт
});

export const remove: RequestHandler<ParamsId> = asyncHandler(async (req, res) => {
  await service.deleteAnime(req.params.id);
  res.status(204).send();
});
