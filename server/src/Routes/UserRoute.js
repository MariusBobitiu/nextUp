import express from "express";
const router = express.Router();
import { 
  ForgotPassword, 
  ResetPassword,
  UpdateUser,
  UpdatePassword,
  VerifyToken,
  DeleteUser,
  Logout
} from "../Controllers/UserController.js";

// Forgot Password
router.post("/forgot-password", ForgotPassword);

// Reset Password
router.post("/reset-password", ResetPassword);

// Update User
router.put("/:username/update-user", UpdateUser);

// Update Password
router.put("/:username/update-password", UpdatePassword);

// Verify Token
router.post("/verify-token", VerifyToken);

// Delete User
router.delete("/:username", DeleteUser);

// Logout
router.get("/:username/logout", Logout);

export default router;