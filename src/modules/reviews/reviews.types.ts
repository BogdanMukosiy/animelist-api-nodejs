export type Review = {
    id: string;
    animeId: string;
    userId: string;
    rating: number; // 1..10
    text: string;
    createdAt: string;
};

export type CreateReviewDto = {
    rating: number;
    text: string;
};
