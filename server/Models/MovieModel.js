import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: [true, "Movie ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    genres: [
      {
        id: {
          type: Number,
          required: [true, "Genre ID is required"],
        },
        name: {
          type: String,
          required: [true, "Genre name is required"],
        },
      }
    ],
    vote_average: {
      type: Number,
      default: 0,
    },
    vote_count: {
      type: Number,
      default: 0,
    },
    overview: {
      type: String,
      default: "",
    },
    poster_path: {
      type: String,
      default: "",
    },
    backdrop_path: {
      type: String,
      default: "",
    },
    release_date: {
      type: Date,
      default: Date.now,
    },
    runtime: {
      type: Number,
    },
    seasons: {
      length: {
        type: Number,
      },
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;