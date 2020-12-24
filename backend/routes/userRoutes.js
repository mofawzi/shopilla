import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Authenticate user
router.post("/login", authUser);
// @desc    Get user profile
router.route("/profile").get(protect, getUserProfile);

export default router;
