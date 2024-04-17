import { getTrendingMovies } from './lib/getMovies';

export async function moviesLoader() {
    const movies = await getTrendingMovies();
    return movies;
}