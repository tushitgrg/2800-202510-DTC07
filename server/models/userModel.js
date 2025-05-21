// import mongoose from 'mongoose';
const mongoose = require("mongoose");

/**
 * Mongoose schema for a user profile.
 * Stores identity, profile data, linked resources, and achievements.
 *
 * @typedef {Object} User
 * @property {string} name - Full name of the user
 * @property {string} email - Unique email address
 * @property {string} avatar - URL to user's avatar image
 * @property {string} [displayName] - Optional display name
 * @property {string} [firstName] - Optional first name
 * @property {string} [lastName] - Optional last name
 * @property {string|null} [school] - Optional school name
 * @property {Array<mongoose.Types.ObjectId>} resources - User's saved resources
 * @property {Object} achievements - Stats for earned badges and progress
 * @property {string|null} equippedAchievement - Selected badge type
 * @property {Date} createdAt - Timestamp of account creation
 * @property {Date} updatedAt - Timestamp of last update
 */
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
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
