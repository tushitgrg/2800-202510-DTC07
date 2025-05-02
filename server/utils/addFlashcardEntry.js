const flashcardSetModel = require("../models/flashcardModel");

const addFlashcardEntry = async (flashcard) => {
  // Create and save new flashcard
  const newFlashcard = await flashcardSetModel.create(flashcard);

  // Return the id of the flashcard
  return newFlashcard._id;
};

module.exports = addFlashcardEntry;