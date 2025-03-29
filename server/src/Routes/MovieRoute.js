import express from "express";
const router = express.Router();
import { AddToWatchList, RemoveFromWatchList, MarkAsWatched, MarkAsUnwatched, GetWatchList } from "../Controllers/MoviesController.js";

// Get WatchList
router.get("/:username/watchlist", GetWatchList);

// Add to watchList
router.post("/:username/watchlist", AddToWatchList);

// Remove from watchList
router.delete("/:username/watchlist", RemoveFromWatchList);

// Mark as watched
router.put("/:username/watchlist/watched", MarkAsWatched);

// Mark as unwatched
router.put("/:username/watchlist/unwatched", MarkAsUnwatched);

export default router;

