import express from "express";
import asyncHandler from "express-async-handler"; // To handle errors (instead of try & catch)
import Product from "../models/productModel.js";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", asyncHandler((req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    res.json(product)
  } else {
    res.status(404).json({message: 'Product not found'})
  }
}));

export default router;
