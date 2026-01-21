export type ListStatus = 'planned' | 'watching' | 'completed' | 'dropped' | 'on_hold';

export type UserAnimeEntry = {
    id: string;
    userId: string;
    animeId: string;
    status: ListStatus;
    score: number; // 0..10
    episodesWatched: number;
    startedAt?: string;
    finishedAt?: string;
    notes?: string;
    updatedAt: string;
};

export type CreateEntryDto = {
    animeId: string;
    status: ListStatus;
};

export type UpdateEntryDto = Partial<{
    status: ListStatus;
    score: number;
    episodesWatched: number;
    notes: string;
}>;
