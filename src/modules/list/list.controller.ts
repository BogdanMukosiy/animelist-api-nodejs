import type { RequestHandler } from 'express';
import { asyncHandler } from '../../common/utils/asyncHandler';
import * as service from './list.service';

type ParamsEntryId = { entryId: string };

export const getMyList: RequestHandler = asyncHandler(async (req, res) => {
    const data = await service.getMyList();
    res.json(data);
});

export const add: RequestHandler = asyncHandler(async (req, res) => {
    const entry = await service.addToMyList(req.body);
    res.status(201).json(entry);
});

export const patch: RequestHandler<ParamsEntryId> = asyncHandler(async (req, res) => {
    const entry = await service.updateMyEntry(req.params.entryId, req.body);
    res.json(entry); // повертаємо оновлений запис
});

export const remove: RequestHandler<ParamsEntryId> = asyncHandler(async (req, res) => {
    await service.removeMyEntry(req.params.entryId);
    res.status(204).send();
});
