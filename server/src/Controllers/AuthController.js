import User from "../Models/UserModel.js";
import createSecretToken from "../util/SecretToken.js";
import bcrypt from "bcrypt";

const SignUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser || existingUsername) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, username });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: parseInt(process.env.COOKIE_EXPIRATION),
      secure: true,
      sameSite: "none",
    });


    return res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const SignIn = async (req, res) => {
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
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.status = 400;
        throw error;
      }

      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_EXPIRATION),
        secure: true,
        sameSite: "none",
      });

      res
        .status(200)
        .json({ message: "User signed in successfully", success: true, user });

    } else {
      // Username
      const user = await User.findOne({ username });
      if (!user) {
        const error = new Error("Invalid credentials");
        error.status = 400;
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_EXPIRATION),
        secure: true,
        sameSite: "none",
      });

      return res
        .status(200)
        .json({ message: "User signed in successfully", success: true, user });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { SignUp, SignIn };
