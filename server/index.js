import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js";
import movieRoute from "./Routes/MovieRoute.js";
import userRoute from "./Routes/UserRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
