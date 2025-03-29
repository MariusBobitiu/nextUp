import express from "express";
const router = express.Router();
import { SignIn, SignUp } from "../Controllers/AuthController.js";
import userVerification from "../Middlewares/userVerification.js";

// Sign up
router.post("/sign-up", SignUp);

// Sign in
router.post("/sign-in", SignIn);

// User Verification
router.post("/", userVerification);

export default router;
