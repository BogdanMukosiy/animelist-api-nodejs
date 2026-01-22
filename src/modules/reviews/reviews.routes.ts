import { Router } from 'express';
import * as c from './reviews.controller';

export const reviewsRouter = Router({ mergeParams: true });

reviewsRouter.get('/', c.listByAnime);
reviewsRouter.post('/', c.createForAnime);
