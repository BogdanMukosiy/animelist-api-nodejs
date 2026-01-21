import { Request, Response } from 'express';
import * as service from './list.service';

type ParamsEntryId = { entryId: string };

export function getMyList(req: Request, res: Response) {
    const data = service.getMyList(req.query as any);
    res.json(data);
}

export function add(req: Request, res: Response) {
    const entry = service.addToMyList(req.body);
    res.status(201).json(entry);
}

export function patch(req: Request<ParamsEntryId>, res: Response) {
    const entry = service.updateMyEntry(req.params.entryId, req.body);
    res.json({ id: entry.id, message: 'List entry updated' });
}

export function remove(req: Request<ParamsEntryId>, res: Response) {
    service.removeMyEntry(req.params.entryId);
    res.status(204).send();
}
