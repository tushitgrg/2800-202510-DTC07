// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    avatar: {
      type: String,
      required: true,
    },
    displayName: String,
    firstName: String, // optional, user could add on profile page
    lastName: String,
    school: String,
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    achievements: {
      badges: {
        gold: { type: Number, default: 0 },
        silver: { type: Number, default: 0 },
        bronze: { type: Number, default: 0 },
      },
      totalSharesReceived: { type: Number, default: 0 }, // when others add their resource
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
// export default userModel
module.exports = userModel;
