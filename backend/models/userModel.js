import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // To get createdAt and updatedAt automatically
  {
    timestamps: true,
  }
);

// Check the user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  // Only happens when creating a new password or when modifying
  if (!this.isModified("password")) {
    // if modifying other data(name, email, ...)
    next();
  }
  // Add salt for hashing
  const salt = await bcrypt.genSalt(10);
  // reset password to be a hashed one
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
