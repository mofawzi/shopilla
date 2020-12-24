import asyncHandler from "express-async-handler"; // To handle errors (instead of try & catch)
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Get the user by email
  const user = await User.findOne({ email });

  // Check if user exists and check password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    // If user not found or password is wrong
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

export { authUser };
