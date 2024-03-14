export type Prompt = {
    id: string;
    title: string;
    description: string;
    topic: string;
    section: string;
    tags: string[];
    rating?: number;
    ratings_count?: number;
};

export type PromptSorting = { sortBy: 'created_at' | 'rating'; sortOrder: 'ASC' | 'DESC' };
