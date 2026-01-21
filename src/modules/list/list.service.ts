import { ApiError } from '../../common/errors/ApiError';
import { newId } from '../../common/utils/id';
import { getAnime } from '../anime/anime.service';
import { listStore } from './list.store';
import { CreateEntryDto, ListStatus, UpdateEntryDto, UserAnimeEntry } from './list.types';

const now = () => new Date().toISOString();
const DEMO_USER_ID = 'user-1';

const allowedStatuses: ListStatus[] = ['planned', 'watching', 'completed', 'dropped', 'on_hold'];

export function getMyList(params: { status?: string; page?: string; limit?: string }) {
    let items = listStore.filter(e => e.userId === DEMO_USER_ID);

    if (params.status) {
        items = items.filter(e => e.status === params.status);
    }

    const page = Math.max(1, Number(params.page ?? 1) || 1);
    const limit = Math.min(100, Math.max(1, Number(params.limit ?? 20) || 20));

    const total = items.length;
    const start = (page - 1) * limit;

    return { items: items.slice(start, start + limit), page, limit, total };
}

export function addToMyList(dto: CreateEntryDto): UserAnimeEntry {
    const details = [];
    if (!dto.animeId) details.push({ field: 'animeId', issue: 'required' });
    if (!dto.status || !allowedStatuses.includes(dto.status)) {
        details.push({ field: 'status', issue: `must be ${allowedStatuses.join('|')}` });
    }
    if (details.length) throw ApiError.validation('Validation failed', details);

    getAnime(dto.animeId);

    const exists = listStore.find(e => e.userId === DEMO_USER_ID && e.animeId === dto.animeId);
    if (exists) throw ApiError.conflict('Anime already exists in user list');

    const entry: UserAnimeEntry = {
        id: newId(),
        userId: DEMO_USER_ID,
        animeId: dto.animeId,
        status: dto.status,
        score: 0,
        episodesWatched: 0,
        updatedAt: now()
    };

    if (dto.status === 'watching') entry.startedAt = now();
    if (dto.status === 'completed') entry.finishedAt = now();

    listStore.push(entry);
    return entry;
}

export function updateMyEntry(entryId: string, dto: UpdateEntryDto) {
    const entry = listStore.find(e => e.id === entryId && e.userId === DEMO_USER_ID);
    if (!entry) throw ApiError.notFound('List entry not found');

    if (dto.status && !allowedStatuses.includes(dto.status)) {
        throw ApiError.validation('Validation failed', [{ field: 'status', issue: `must be ${allowedStatuses.join('|')}` }]);
    }
    if (dto.score !== undefined && (typeof dto.score !== 'number' || dto.score < 0 || dto.score > 10)) {
        throw ApiError.validation('Validation failed', [{ field: 'score', issue: 'must be 0..10' }]);
    }
    if (dto.episodesWatched !== undefined && (typeof dto.episodesWatched !== 'number' || dto.episodesWatched < 0)) {
        throw ApiError.validation('Validation failed', [{ field: 'episodesWatched', issue: 'must be >= 0' }]);
    }

    if (dto.status) {
        entry.status = dto.status;
        if (dto.status === 'watching' && !entry.startedAt) entry.startedAt = now();
        if (dto.status === 'completed') entry.finishedAt = now();
    }
    if (dto.score !== undefined) entry.score = dto.score;
    if (dto.episodesWatched !== undefined) entry.episodesWatched = dto.episodesWatched;
    if (dto.notes !== undefined) entry.notes = dto.notes;

    entry.updatedAt = now();

    return entry;
}

export function removeMyEntry(entryId: string) {
    const idx = listStore.findIndex(e => e.id === entryId && e.userId === DEMO_USER_ID);
    if (idx === -1) throw ApiError.notFound('List entry not found');
    listStore.splice(idx, 1);
}
