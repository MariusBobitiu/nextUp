import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id);

    if (user) {
      return res.status(200).json({ status: true, message: "Authorized" });
    } else
      return res.status(401).json({ status: false, message: "Unauthorized" });
  });
};

export default userVerification;
