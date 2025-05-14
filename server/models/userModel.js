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
    school: { type: String, default: null },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    achievements: {
      quiz: { type: Number, default: 0 },
      flashcard: { type: Number, default: 0 },
      summary: { type: Number, default: 0 },
      community_resource: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      resource: { type: Number, default: 0 },
      totalSharesReceived: { type: Number, default: 0 }, // when others add their resource
    },
    equippedAchievement: {
      type: String,
      enum: [
        "quiz",
        "flashcard",
        "summary",
        "community_resource",
        "streak",
        "resource",
        null,
      ],
      default: null,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
// export default userModel
module.exports = userModel;
