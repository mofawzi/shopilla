import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    register a new user
router.route("/").post(registerUser).get(protect, admin, getUsers);
// @desc    Authenticate user
router.post("/login", authUser);
// @desc    Get user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
