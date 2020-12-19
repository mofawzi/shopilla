import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

// Access environment variables
dotenv.config();

// Connect to database middleware (Mongoose)
connectDB();

const app = express();

app.get("/", (req, res) => res.send("API is running... "));

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product with id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// Setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode, on Port: ${PORT}`.yellow
      .bold
  )
);
