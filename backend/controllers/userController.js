import asyncHandler from "express-async-handler"; // To handle errors (instead of try & catch)
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Get the user by email
  const user = await User.findOne({ email });
});

export { authUser };
