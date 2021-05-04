import express from "express";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add order items
router.route("/").post(protect, addOrderItems);

// @desc    Get order by ID
router.route("/:id").get(protect, getOrderById);

export default router;
