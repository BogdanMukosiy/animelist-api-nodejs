import { ApiError } from '../../common/errors/ApiError';
import { animeStore } from './anime.store';
import { Anime, CreateAnimeDto, UpdateAnimeDto } from './anime.types';
import { newId } from '../../common/utils/id';

const now = () => new Date().toISOString();

export function listAnime(params: {
    q?: string;
    status?: string;
    year?: string;
    sort?: string;
    page?: string;
    limit?: string;
}) {
    let items = [...animeStore];

    if (params.q) {
        const q = params.q.toLowerCase();
        items = items.filter(a => a.title.toLowerCase().includes(q));
    }

    if (params.status) {
        items = items.filter(a => a.status === params.status);
    }

    if (params.year) {
        const y = Number(params.year);
        if (!Number.isNaN(y)) items = items.filter(a => a.year === y);
    }

    if (params.sort === 'year') items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (params.sort === 'title') items.sort((a, b) => a.title.localeCompare(b.title));

    const page = Math.max(1, Number(params.page ?? 1) || 1);
    const limit = Math.min(100, Math.max(1, Number(params.limit ?? 20) || 20));

    const total = items.length;
    const start = (page - 1) * limit;

    return {
        items: items.slice(start, start + limit),
        page,
        limit,
        total
    };
}

export function getAnime(id: string): Anime {
    console.log('[getAnime] id =', id, 'all ids=', animeStore.map(a => a.id));
    const item = animeStore.find(a => a.id === id);
    if (!item) throw ApiError.notFound('Anime not found');
    return item;
}

export function createAnime(dto: CreateAnimeDto): Anime {
    const details = [];

    if (!dto.title || dto.title.trim().length === 0) {
        details.push({ field: 'title', issue: 'required' });
    }
    if (!dto.status || (dto.status !== 'ongoing' && dto.status !== 'finished')) {
        details.push({ field: 'status', issue: 'must be ongoing|finished' });
    }
    if (dto.year !== undefined && (typeof dto.year !== 'number' || dto.year < 1900 || dto.year > 2100)) {
        details.push({ field: 'year', issue: 'must be between 1900 and 2100' });
    }
    if (details.length) throw ApiError.validation('Validation failed', details);

    const item: Anime = {
        id: newId(),
        createdAt: now(),
        ...dto,
        title: dto.title.trim()
    };

    animeStore.push(item);
    return item;
}

export function updateAnime(id: string, dto: UpdateAnimeDto): Anime {
    const item = getAnime(id);

    if (dto.status && dto.status !== 'ongoing' && dto.status !== 'finished') {
        throw ApiError.validation('Validation failed', [{ field: 'status', issue: 'must be ongoing|finished' }]);
    }

    Object.assign(item, dto);
    if (dto.title !== undefined) item.title = dto.title.trim();

    return item;
}

export function deleteAnime(id: string): void {
    const idx = animeStore.findIndex(a => a.id === id);
    if (idx === -1) throw ApiError.notFound('Anime not found');
    animeStore.splice(idx, 1);
}
