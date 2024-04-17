import MovieCard from "./movie-card";

type MoviesProps = {
    movies: {
        title: string;
        backdrop_path: string;
        overview: string;
        genre_ids: number[];
    }[];
};

const MoviesContainer = ({ movies }: MoviesProps) => {
    return (
      <div className='flex flex-wrap gap-2 overflow-scroll h-full w-full'>
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            backdrop_path={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/${movie.backdrop_path}`}
            overview={movie.overview}
            genre_ids={movie.genre_ids}
          />
        ))}
      </div>
    );
  };

export default MoviesContainer;