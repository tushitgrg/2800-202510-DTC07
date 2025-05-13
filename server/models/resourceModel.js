const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema(
  {
    title: String,
    quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    flashcardID: { type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" },
    summaryID: { type: mongoose.Schema.Types.ObjectId, ref: "Summary" },
    tags: { type: Array, default: [] },
    isPublic: { type: Boolean, default: false },
    shareCount: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Resource", resourceSchema);
