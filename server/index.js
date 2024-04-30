import express from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/AuthRoute.js";
import movieRoute from "./Routes/MovieRoute.js";
import userRoute from "./Routes/UserRoute.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 8081;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "server is running" });
});

export default app;
