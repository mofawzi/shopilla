import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add order items
router.route("/").post(protect, addOrderItems);

export default router;
