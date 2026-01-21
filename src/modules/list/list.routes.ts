import { Router } from 'express';
import * as c from './list.controller';

export const listRouter = Router();

listRouter.get('/', c.getMyList);
listRouter.post('/', c.add);
listRouter.patch('/:entryId', c.patch);
listRouter.delete('/:entryId', c.remove);
