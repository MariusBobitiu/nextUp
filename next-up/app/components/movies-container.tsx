'use client';

import React, { useEffect, useState } from "react";
import MovieCard from "./movie-card";
import { getTrendingMovies } from "../lib/getMovies";
import { useQuery } from "react-query";
import Loading from "../loading";

const fetchMovies = async () => {
  const data = await getTrendingMovies();
  console.log(data);
  return data;
};

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
};


const MoviesContainer = () => {
  const { data: movies, error, isLoading } = useQuery("movies", fetchMovies);
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  
  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error fetching movies.</div>;
  

    return (
      <div className='flex flex-wrap gap-2 overflow-scroll h-full w-full'>
        {moviesList.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
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