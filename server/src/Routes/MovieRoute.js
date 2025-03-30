import express from "express";
const router = express.Router();
import { AddToWatchList, RemoveFromWatchList, GetWatchList, ClearWatchList } from "../Controllers/MoviesController.js";

// Get WatchList
router.get("/:username/watchlist", GetWatchList);

// Add to watchList
router.post("/:username/watchlist", AddToWatchList);

// Remove from watchList
router.delete("/:username/watchlist", RemoveFromWatchList);

router.delete("/:username/watchlist/clear", ClearWatchList)

export default router;

