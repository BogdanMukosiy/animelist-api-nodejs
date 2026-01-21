import { Request, Response } from 'express';
import * as service from './anime.service';

type ParamsId = { id: string };

export function list(req: Request, res: Response) {
    const data = service.listAnime(req.query as any);
    res.json(data);
}

export function getById(req: Request<ParamsId>, res: Response) {
    const item = service.getAnime(req.params.id);
    res.json(item);
}

export function create(req: Request, res: Response) {
    const item = service.createAnime(req.body);
    res.status(201).json(item);
}

export function patch(req: Request<ParamsId>, res: Response) {
    const item = service.updateAnime(req.params.id, req.body);
    res.json({ id: item.id, message: 'Anime updated' });
}

export function remove(req: Request<ParamsId>, res: Response) {
    service.deleteAnime(req.params.id);
    res.status(204).send();
}
