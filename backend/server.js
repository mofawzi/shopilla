import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";

// Access environment variables
dotenv.config();

// Connect to database middleware (Mongoose)
connectDB();

const app = express();

// Home Route
app.get("/", (req, res) => res.send("API is running... "));

// Product routes middleware
app.use("/api/products", productRoutes);

// Accept json data in req body (instead of body parser)
app.use(express.json());

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
