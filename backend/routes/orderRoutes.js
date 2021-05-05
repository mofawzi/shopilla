import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add order items
router.route("/").post(protect, addOrderItems);

// @desc    Get order by ID
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").get(protect, updateOrderToPaid);

export default router;
