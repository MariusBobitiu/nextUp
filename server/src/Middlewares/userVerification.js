import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    console.error(`[${new Date().toISOString()}] [POST] / - No token provided`);
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] [POST] / - Invalid token: ${err.message}`);
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id);

    if (user) {
      console.log(`[${new Date().toISOString()}] [POST] / - User verified successfully: userId: ${decoded.id}`);
      return res.status(200).json({ status: true, message: "Authorized" });
    } else
      console.error(`[${new Date().toISOString()}] [POST] / - User not found for token: userId: ${decoded.id}`);
      return res.status(401).json({ status: false, message: "Unauthorized" });
  });
};

export default userVerification;
