export type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export type VideoData = {
    id: number;
    results: Video[];
}

export type AuthorDetails = {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
}

export type Review = {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

export type ReviewData = {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
}