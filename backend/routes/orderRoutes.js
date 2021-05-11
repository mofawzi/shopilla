import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// @desc    Get order of the logged in user
router.route("/myorders").get(protect, getMyOrders);
// @desc    Get order by ID
router.route("/:id").get(protect, getOrderById);
// @desc    Pay an order
router.route("/:id/pay").put(protect, updateOrderToPaid);
// @desc    Deliver an order
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliverd);

export default router;
