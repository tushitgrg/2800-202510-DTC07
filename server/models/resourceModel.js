const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
  quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  flashcardID: { type: mongoose.Schema.Types.ObjectId, ref: "Flashcard" },
  summaryID: { type: mongoose.Schema.Types.ObjectId, ref: "Summary" },
});
module.exports = mongoose.model("Resource", resourceSchema);
