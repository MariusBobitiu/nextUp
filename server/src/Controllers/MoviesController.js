import User from "../Models/UserModel.js";
import Movie from "../Models/MovieModel.js";
import SaveMovie from "../util/SaveMovie.js";
import dotenv from "dotenv";

dotenv.config();

const fetchMovieFromTMDB = async (movieId) => {
  const url = `${process.env.TMDB_API_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-UK`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
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
    }

    const user = await User.findOne({ username });

    if (!user) {
      console.error(`[${new Date().toISOString()}] [POST] /:username/watchlist - User not found: username: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.watchList?.some((item) => item.movie === movieId)) {
      console.error(`[${new Date().toISOString()}] [POST] /:username/watchlist - Movie already in watchlist: movieId: ${movieId}`);
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    if (movie) {
      user.watchList.push({
        movieId: movie._id,
        movie: movieId,
        addedAt: new Date(),
        watched: false,
      });
    } else {
      console.error(`[${new Date().toISOString()}] [POST] /:username/watchlist - Movie not found in the database: movieId: ${movieId}`);
      return res
        .status(404)
        .json({ message: "Movie not found in the database" });
    }

    await user.save();

    console.log(`[${new Date().toISOString()}] [POST] /:username/watchlist - Movie added to watchlist successfully: movieId: ${movieId}, username: ${username}`);
    res.status(201).json({ message: {
      movie: movieId,
      addedAt: new Date(),
      watched: false,
    } });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [POST] /:username/watchlist - Error adding movie to watchlist: ${err.message}`);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const RemoveFromWatchList = async (req, res) => {
  const { username, movieId } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.error(`[${new Date().toISOString()}] [DELETE] /:username/watchlist/:movieId - User not found: username: ${username}`);

      return res.status(404).json({ message: "User not found" });
    }

    if (!user.watchList.some((item) => item.movie === movieId)) {
      console.error(`[${new Date().toISOString()}] [DELETE] /:username/watchlist/:movieId - Movie not found in watchlist: movieId: ${movieId}`);
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    user.watchList = user.watchList.filter((item) => item.movie !== movieId);
    if (user.watchList.length === 0) {
      user.watchList = [];
    }

    await user.save();
    console.log(`[${new Date().toISOString()}] [DELETE] /:username/watchlist/:movieId - Movie removed from watchlist successfully: movieId: ${movieId}, username: ${username}`);
    return res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [DELETE] /:username/watchlist/:movieId - Error removing movie from watchlist: ${err.message}`);
    return res.status(500).json({ message: "Server error" });
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
      return res.status(200).json({ message: "Watchlist is empty", data: [] });
    }
    return res.status(200).json({ message: "Watchlist fetched successfully", data: watchList });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

const ClearWatchList = async (req, res) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.watchList = [];
    await user.save();

    return res.status(200).json({ message: "Watchlist cleared successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}

export {
  AddToWatchList,
  RemoveFromWatchList,
  GetWatchList,
  ClearWatchList,
};
