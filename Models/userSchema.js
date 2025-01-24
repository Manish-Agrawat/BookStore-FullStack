import mongoose from "mongoose"

// user schema for login or reg

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default is a regular user
  },

  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.model("User", userSchema);

export default User;