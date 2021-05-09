import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add order items
router.route("/").post(protect, addOrderItems);

// @desc    Get order of the logged in user
router.route("/myorders").get(protect, getMyOrders);

// @desc    Get order by ID
router.route("/:id").get(protect, getOrderById);

// @desc    Pay an order
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
