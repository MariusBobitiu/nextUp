import express from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute.js";
import movieRoute from "./Routes/MovieRoute.js";
import userRoute from "./Routes/UserRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import logRequest from "./Middlewares/logger.js";
import cors from "cors";

dotenv.config();

console.log(`[${new Date().toISOString()}] Server is starting...`);

await connectDB();
const app = express();

const PORT = process.env.PORT || 8081;

console.log(`[${new Date().toISOString()}] [index.js] Setting up middleware...`);
app.use(cookieParser());
app.use(express.json());
app.use(logRequest);
app.use(express.urlencoded({ extended: true }));

console.log(`[${new Date().toISOString()}] [index.js] Middleware setup complete.`);
console.log(`[${new Date().toISOString()}] [index.js] Setting up CORS with origin: ${process.env.CLIENT_URL}`);
// Allow CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use("/auth", authRoute);
app.use("/movies", movieRoute);
app.use("/users", userRoute);

console.log(`[${new Date().toISOString()}] [index.js] Routes setup complete. Starting server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] [index.js] Server is running on port ${PORT}`);
}, (err) => {
  if (err) {
    console.error(`[${new Date().toISOString()}] [index.js] Error starting server:`, err);
  }
});

console.log(`[${new Date().toISOString()}] [index.js] Server setup complete. Awaiting requests...\n\n`);

app.get("/", (req, res) => {
  console.log(`[${new Date().toISOString()}] [index.js] Root endpoint called`);
  res.status(200).json({ message: "Welcome to the Movie API" });
});

app.get('/health', (req, res) => {
  console.log(`[${new Date().toISOString()}] [index.js] Health check endpoint called`);
  res.status(200).json({ status: 'ok' });
});

export default app;
