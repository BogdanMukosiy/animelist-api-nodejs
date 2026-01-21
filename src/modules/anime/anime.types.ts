export type AnimeStatus = 'ongoing' | 'finished';

export type Anime = {
    id: string;
    title: string;
    titleEn?: string;
    titleJp?: string;
    synopsis?: string;
    status: AnimeStatus;
    year?: number;
    season?: string;
    ageRating?: string;
    posterUrl?: string;
    createdAt: string;
};

export type CreateAnimeDto = Omit<Anime, 'id' | 'createdAt'>;
export type UpdateAnimeDto = Partial<CreateAnimeDto>;
