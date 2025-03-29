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
    let movie = await Movie.findOne({ movieId: String(movieId) });

    if (!movie) {
      const movieData = await fetchMovieFromTMDB(movieId);
      movie = await SaveMovie(movieData);
      console.log("Movie added to the database: ", movie);
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.watchList?.some((item) => item.movie === movieId)) {
      console.error("Movie already in watchlist", movieId);
      throw new Error("Movie already in watchlist");
    }

    if (movie) {
      console.log("Movie found in the database: ", movie);
      user.watchList.push({
        movieId: movie._id,
        movie: movieId,
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
    res.status(201).json({ message: {
      movie: movieId,
      addedAt: new Date(),
      watched: false,
    } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const RemoveFromWatchList = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.watchList.some((item) => item.movie === movieId)) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    user.watchList = user.watchList.filter((item) => item.movie !== movieId);
    if (user.watchList.length === 0) {
      user.watchList = [];
    }

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
      path: "watchList.movieId",
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
      path: "watchList.movieId",
      model: "Movie",
      select: [
        "movieId",
        "title",
        "genres",
        "vote_average",
        "vote_count",
        "overview",
        "poster_path",
        "backdrop_path",
        "release_date",
        "runtime",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }

    const watchList = user.watchList.map((item) => ({
      movieId: item.movieId.movieId,
      title: item.movieId.title,
      genres: item.movieId.genres,
      vote_average: item.movieId.vote_average,
      vote_count: item.movieId.vote_count,
      overview: item.movieId.overview,
      poster_path: item.movieId.poster_path,
      backdrop_path: item.movieId.backdrop_path,
      release_date: item.movieId.release_date,
      runtime: item.movieId.runtime,
      addedAt: item.addedAt,
      watched: item.watched,
    }));

    if (watchList.length === 0) {
      return res.status(404).json({ message: "Watchlist is empty", data: [] });
    }
    res.status(200).json({ message: "Watchlist fetched successfully", data: watchList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export {
  AddToWatchList,
  RemoveFromWatchList,
  MarkAsWatched,
  MarkAsUnwatched,
  GetWatchList,
};
