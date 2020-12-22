import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

// Access environment variables
dotenv.config();

// Connect to database middleware (Mongoose)
connectDB();

const app = express();

// Home Route
app.get("/", (req, res) => res.send("API is running... "));

// Product routes
app.use("/api/products", productRoutes);

// Setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode, on Port: ${PORT}`.yellow
      .bold
  )
);
