import Movie from '../Models/MovieModel.js';

const saveMovie = async (movie) => {
  try {
    const newMovie = new Movie({
      movieId: movie.id,
      title: movie.title,
      genres: movie.genres.map(genre => ({ id: genre.id, name: genre.name })),
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: new Date(movie.release_date),
      runtime: movie.runtime,
    });

    await newMovie.save();
    return newMovie;
  } catch (err) {
    console.error(err);
  }
}

export default saveMovie;