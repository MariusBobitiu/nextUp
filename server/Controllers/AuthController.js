import User from "../Models/UserModel.js";
import createSecretToken from "../util/SecretToken.js";
import bcrypt from "bcrypt";

const SignUp = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser || existingUsername) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });

    next();
  } catch (err) {
    console.error(err);
  }
};

const SignIn = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Double check if email or username is provided - Frontend also checking this
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }

    // Double check if password is provided - Frontend also checking this
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!username) {
      // Email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
      });

      res
        .status(200)
        .json({ message: "User signed in successfully", success: true });

      next();
    } else {
      // Username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
      });

      res
        .status(200)
        .json({ message: "User signed in successfully", success: true });

      next();
    }
  } catch (err) {
    console.error(err);
  }
};

export { SignUp, SignIn };