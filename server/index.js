import express from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute.js";
import movieRoute from "./Routes/MovieRoute.js";
import userRoute from "./Routes/UserRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 8081;

app.use(cookieParser());
app.use(express.json());

// Allow CORS
app.use(cors({
  origin: process.env.CLIENT_URL,  // Allow requests from your frontend URL
  credentials: true,        // If you're using cookies or authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
}));

app.use("/auth", authRoute);
app.use("/movies", movieRoute);
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "server is running" });
});

export default app;
