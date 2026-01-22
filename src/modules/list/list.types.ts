export type ListStatus = 'planned' | 'watching' | 'completed' | 'dropped' | 'on_hold';

export type CreateEntryDto = {
    animeId: string;
    status: ListStatus;
};

export type UpdateEntryDto = Partial<{
    status: ListStatus;
    episodesWatched: number;
}>;
