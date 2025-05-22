const mongoose = require("mongoose");

/**
 * Mongoose schema for a learning resource.
 * A resource can include quiz, flashcard, and summary links,
 * as well as sharing and visibility metadata.
 *
 * @typedef {Object} Resource
 * @property {string} title - Resource title
 * @property {mongoose.Types.ObjectId} quizID - Reference to a quiz
 * @property {mongoose.Types.ObjectId} flashcardID - Reference to flashcards
 * @property {mongoose.Types.ObjectId} summaryID - Reference to a summary
 * @property {Array<string>} tags - Optional tags for filtering/search
 * @property {boolean} isPublic - Whether the resource is publicly visible
 * @property {number} shareCount - How many times the resource has been shared
 * @property {Array<mongoose.Types.ObjectId>} likes - Users who liked the resource
 * @property {string|null} course - Optional course label
 * @property {string|null} school - Optional school label
 * @property {mongoose.Types.ObjectId} author - Creator of the resource
 * @property {mongoose.Types.ObjectId|null} originalResourceId - Source of a shared copy
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
const resourceSchema = new mongoose.Schema(
  {
    title: String,
    quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    flashcardID: { type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" },
    summaryID: { type: mongoose.Schema.Types.ObjectId, ref: "Summary" },
    tags: { type: Array, default: [] },
    isPublic: { type: Boolean, default: false },
    shareCount: { type: Number, default: 0 },
    likes: {
      type: Array,
      default: [],
    },
    likesCount: { type: Number, default: 0 },
    course: { type: String, default: null },
    school: { type: String, default: null },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    originalResourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
