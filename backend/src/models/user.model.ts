import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength : 6,
    },
    ProfileImage: {
      type: String,
      required: true,
      default : "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User" , userSchema)

export default User;