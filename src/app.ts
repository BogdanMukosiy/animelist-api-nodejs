import express from 'express';
import { animeRouter } from './modules/anime/anime.routes';
import { reviewsRouter } from './modules/reviews/reviews.routes';

import { listRouter } from './modules/list/list.routes';
import { errorHandler } from './common/errors/errorHandler';
import { notFound } from './common/errors/notFound';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Animelist API is running' });
});

// Anime
app.use('/anime', animeRouter);

// Reviews
app.use('/anime/:id/reviews', reviewsRouter);
// List
app.use('/me/list', listRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
