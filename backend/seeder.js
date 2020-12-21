// This is only used for data seeding (importing, destroying)
// Not connected to the server at all

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// Access dotenv data
dotenv.config();
// Connect the DB
connectDB();

// Import all data
const importData = async () => {
  try {
    // Clear all models
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Import all users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Set the admin user to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // All product data including the admin user within it
    await Product.insertMany(products);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    // Exit with failure
    process.exit(1);
  }
};

// Destroy all data
const destroyData = async () => {
  try {
    // Clear all models
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    // Exit with failure
    process.exit(1);
  }
};

// Make it easy to use in the console ( -d for destroying)
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
