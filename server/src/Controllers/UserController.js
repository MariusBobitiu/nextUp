import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';
import sendEmail from '../util/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

// Forgot Password 
const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`[${new Date().toISOString()}] [POST] /forgot-password - User not found: email: ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a secret token
    const token = jwt.sign({ email: user.email, issued: Date.now() }, process.env.JWT_SECRET, {
      expiresIn: '15m'
    }); 

    // Update user's reset link
    user.resetLink = token;
    await user.save();

    // Send email
    await sendEmail(user, token);

    console.log(`[${new Date().toISOString()}] [POST] /forgot-password - Reset link sent successfully: email: ${email}`);
    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [POST] /forgot-password - Error sending reset link: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

// Verify Token
const VerifyToken = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication error' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    try {
      const user = await User.findOne({ resetLink: token });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Token verified successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
}

// Reset Password
const ResetPassword = async (req, res) => {
  const {token, newPassword } = req.body;

  if (!token) {
    console.error(`[${new Date().toISOString()}] [POST] /reset-password - No token provided`);
    return res.status(401).json({ message: 'Authentication error' });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] [POST] /reset-password - Token expired or invalid: ${err.message}`);
        return res.status(401).json({ message: 'Token expired or invalid' });
      }

      try {
        const user = await User.findOne({ resetLink: token });
        if (!user) {
          console.error(`[${new Date().toISOString()}] [POST] /reset-password - User not found for token: ${token}`);
          return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS) || 10);
        user.password = hashedPassword;
        user.resetLink = '';

        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
      } catch (error) {
        console.error(`[${new Date().toISOString()}] [POST] /reset-password - Error resetting password: ${error.message}`);
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    console.error(`[${new Date().toISOString()}] [POST] /reset-password - No token provided`);
    return res.status(401).json({ message: 'Authentication error' });
  }
}

// Update User
const UpdateUser = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });

  try {
    const { email, username } = req.body;

    if (!user) {
      console.error(`[${new Date().toISOString()}] [PUT] /:username/update-user - User not found: username: ${username}`);
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) user.email = email;
    if (username) user.username = username;

    await user.save();

    console.log(`[${new Date().toISOString()}] [PUT] /:username/update-user - User updated successfully: username: ${username}`);
    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [PUT] /:username/update-user - Error updating user: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

// Update Password
const UpdatePassword = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  try {
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      console.error(`[${new Date().toISOString()}] [PUT] /:username/update-password - User not found: username: ${username}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.password = bcrypt.hashSync(newPassword, Number(process.env.SALT_ROUNDS) || 10);

    await user.save();

    console.log(`[${new Date().toISOString()}] [PUT] /:username/update-password - Password updated successfully: username: ${username}`);
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [PUT] /:username/update-password - Error updating password: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

// Delete User
const DeleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ username: req.params.username });
    if (result.deletedCount === 0) {
      console.error(`[${new Date().toISOString()}] [DELETE] /:username - User not found: username: ${req.params.username}`);
      return res.status(404).json({ message: 'User not found' });
    } else {
      console.log(`[${new Date().toISOString()}] [DELETE] /:username - User deleted successfully: username: ${req.params.username}`);
      return res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [DELETE] /:username - Error deleting user: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

// Logout
const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    console.log(`[${new Date().toISOString()}] [POST] /:username/logout - User logged out successfully: username: ${req.params.username}`);
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [POST] /:username/logout - Error logging out user: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
}

export { ForgotPassword, ResetPassword, UpdateUser, UpdatePassword, VerifyToken, DeleteUser, Logout };