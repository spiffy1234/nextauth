import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Must provide firstname"],
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "Its required"],
    unique: [true, "Email already exist"],
  },
  password: {
    type: String,
    required: [true, "Its must required"],
  },
  mobile: {
    type: String,
    required: [true, "Its must required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
