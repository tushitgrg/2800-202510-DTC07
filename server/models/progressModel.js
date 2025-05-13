const mongoose = require("mongoose");

const ProgressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "resource" },
  quizScore: { type: Number, default: null },
  flashcardScore: { type: Number, default: null },
  summaryCompletion: { type: Boolean, default: false },
});
module.exports = mongoose.model("progress", ProgressSchema);
