export type MovieCardProps = {
  onClick: () => void
  id?: number | undefined
  title: string
  name?: string | undefined
  media_type?: 'movie' | 'tv' | 'person' | undefined
  overview: string
  backdrop_path: string
  poster_path: string
  genre_ids: number[]
}

export type MovieProps = {
  movieId: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: {
    id: number,
    name: string;
  }[];
};