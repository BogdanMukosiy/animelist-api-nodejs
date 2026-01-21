import { Request, Response } from 'express';
import * as service from './reviews.service';

type ParamsAnimeId = { id: string };

export function listByAnime(req: Request<ParamsAnimeId>, res: Response) {
    const data = service.listReviewsByAnime(req.params.id);
    res.json(data);
}

export function createForAnime(req: Request<ParamsAnimeId>, res: Response) {
    const item = service.createReview(req.params.id, req.body);
    res.status(201).json(item);
}
