import type { RequestHandler } from 'express';
import { asyncHandler } from '../../common/utils/asyncHandler';
import * as service from './reviews.service';

type ParamsAnimeId = { id: string };

export const listByAnime: RequestHandler<ParamsAnimeId> = asyncHandler(async (req, res) => {
  const data = await service.listReviewsByAnime(req.params.id);
  res.json(data);
});

export const createForAnime: RequestHandler<ParamsAnimeId> = asyncHandler(async (req, res) => {
  const item = await service.createReview(req.params.id, req.body);
  res.status(201).json(item);
});
