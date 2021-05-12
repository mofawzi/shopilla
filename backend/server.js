import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Access environment variables
dotenv.config();

// Connect to database middleware (Mongoose)
connectDB();

const app = express();

// Accept json data in req body (instead of body parser)
app.use(express.json());

// Add Morgan middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Product routes middleware
app.use("/api/products", productRoutes);

// User routes middleware
app.use("/api/users", userRoutes);

// Order routes middleware
app.use("/api/orders", orderRoutes);

// Upload routes middleware
app.use("/api/upload", uploadRoutes);

// Get paypal's client ID
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Make Uploads folder static (Getting loaded in the browser)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Handle Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Take any foreign route to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Home Route
  app.get("/", (req, res) => res.send("API is running... "));
}

// Error middleware 404
app.use(notFound);

// Error middleware wrong id
app.use(errorHandler);

// Setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode, on Port: ${PORT}`.yellow
      .bold
  )
);
