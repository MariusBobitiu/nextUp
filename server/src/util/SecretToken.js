import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;
