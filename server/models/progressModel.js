const mongoose = require("mongoose");

/**
 * Mongoose schema for tracking user progress on a resource.
 *
 * @typedef {Object} Progress
 * @property {mongoose.Types.ObjectId} userId - Reference to the user
 * @property {mongoose.Types.ObjectId} resourceId - Reference to the resource
 * @property {number|null} quizScore - User's quiz score (0–100)
 * @property {number|null} flashcardScore - User's flashcard score (0–100)
 * @property {boolean} summaryCompletion - Whether the summary task was completed
 */
const ProgressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "resource" },
  quizScore: { type: Number, default: null },
  flashcardScore: { type: Number, default: null },
  summaryCompletion: { type: Boolean, default: false },
},
  { _id: true, timestamps: true });
module.exports = mongoose.model("progress", ProgressSchema);
