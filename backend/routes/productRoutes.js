import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// @desc    Fetch all products
router.route("/").get(getProducts);

// @desc    Fetch single product
router.route("/:id").get(getProductById);

export default router;
