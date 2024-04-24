import User from "../Models/UserModel.js";
import Movie from "../Models/MovieModel.js";
import SaveMovie from "../util/SaveMovie.js";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const fetchMovieFromTMDB = async (movieId) => {
  const url = `${process.env.TMDB_API_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-UK`;
  console.log(url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching movies from TMDB: ", err);
    throw err;
  }
};

const AddToWatchList = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    let movie = await Movie.findOne({ movieId });

    if (!movie) {
      const movieData = await fetchMovieFromTMDB(movieId);
      movie = await SaveMovie(movieData);
      console.log("Movie added to the database: ", movie);
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.watchList.some((item) => item.movie.equals(movieId))) {
      throw new Error("Movie already in watchlist");
    }

    if (movie) {
      user.watchList.push({
        movie: movie._id, // Referencing the MongoDB ID of the movie
        addedAt: new Date(),
        watched: false,
      });
    } else {
      console.error("Movie not found in the database");
      return res
        .status(404)
        .json({ message: "Movie not found in the database" });
    }

    await user.save();
    res.status(201).json({ message: "Movie added to watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const RemoveFromWatchList = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    const user = await User.findOne({ username }).populate({
      path: "watchList.movie",
      model: "Movie",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findOne({ movieId });

    user.watchList = user.watchList.filter((item) => !item.movie.equals(movie));

    await user.save();
    res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const MarkAsWatched = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    const user = await User.findOne({ username }).populate({
      path: "watchList.movie",
      model: "Movie",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findOne({ movieId });

    let found = false;
    user.watchList.forEach((item) => {
      if (item.movie.equals(movie)) {
        item.watched = true;
        found = true;
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    await user.save();
    res.status(200).json({ message: "Movie marked as watched" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const MarkAsUnwatched = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    const user = await User.findOne({ username }).populate({
      path: "watchList.movie",
      model: "Movie",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findOne({ movieId });

    let found = false;
    user.watchList.forEach((item) => {
      if (item.movie.equals(movie)) {
        item.watched = false;
        found = true;
      }
    });

    if (!found) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    await user.save();
    res.status(200).json({ message: "Movie marked as unwatched" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const GetWatchList = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).populate({
      path: "watchList.movie",
      model: "Movie",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const watchList = user.watchList.map((item) => ({
      movieId: item.movie.movieId,
      title: item.movie.title,
      genres: item.movie.genres,
      vote_average: item.movie.vote_average,
      vote_count: item.movie.vote_count,
      overview: item.movie.overview,
      poster_path: item.movie.poster_path,
      backdrop_path: item.movie.backdrop_path,
      release_date: item.movie.release_date,
      runtime: item.movie.runtime,
      addedAt: item.addedAt,
      watched: item.watched,
    }));

    res.status(200).json({ watchList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  AddToWatchList,
  RemoveFromWatchList,
  MarkAsWatched,
  MarkAsUnwatched,
  GetWatchList,
};
