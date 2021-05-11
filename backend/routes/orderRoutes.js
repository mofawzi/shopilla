import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add order items
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

// @desc    Get order of the logged in user
router.route("/myorders").get(protect, getMyOrders);

// @desc    Get order by ID
router.route("/:id").get(protect, getOrderById);

// @desc    Pay an order
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
