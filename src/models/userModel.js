import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "provide a email"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
console.log("usermodal 32");

const User = mongoose.models.users || mongoose.model("users", userSchema); // 4 modal

export default User;
