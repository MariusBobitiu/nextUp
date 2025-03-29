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

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: parseInt(process.env.COOKIE_EXPIRATION),
      secure: true,
      sameSite: "none",
    });

    console.log("User created successfully", JSON.stringify(user, null, 2));
    console.log("Token: ", token);

    return res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Double check if email or username is provided - Frontend also checking this
    if (!email && !username) {
      console.log("Email or username is required")
      return res.status(400).json({ message: "Email or username is required" });
    }

    // Double check if password is provided - Frontend also checking this
    if (!password) {
      console.log("Password is required")
      return res.status(400).json({ message: "Password is required" });
    }

    if (!username) {
      // Email
      const user = await User.findOne({ email });
      console.log("User found: ", user)
      if (!user) {
        console.log("Email: User not found")
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("IsMatch: ", isMatch)
      if (!isMatch) {
        console.log("Email: Invalid credentials")
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);
      console.log(token);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_EXPIRATION),
        secure: true,
        sameSite: "none",
      });

      console.log("Email: User signed in successfully");
      res
        .status(200)
        .json({ message: "User signed in successfully", success: true, user });

    } else {
      // Username
      const user = await User.findOne({ username });
      console.log("Username: User found: ", user)

      if (!user) {
        console.log("Username: User not found")
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Username: Invalid credentials")
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createSecretToken(user._id);
      console.log(token);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: parseInt(process.env.COOKIE_EXPIRATION),
        secure: true,
        sameSite: "none",
      });

      console.log("Username: User signed in successfully");
      return res
        .status(200)
        .json({ message: "User signed in successfully", success: true, user });

    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { SignUp, SignIn };
