import { Router } from 'express';
import * as c from './anime.controller';

export const animeRouter = Router();

animeRouter.get('/', c.list);
animeRouter.post('/', c.create);
animeRouter.get('/:id', c.getById);
animeRouter.patch('/:id', c.patch);
animeRouter.delete('/:id', c.remove);
