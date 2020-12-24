import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

// @desc    Authenticate user
router.post("/login", authUser);
// @desc    Get user profile
router.route("/profile").get(getUserProfile);

export default router;
