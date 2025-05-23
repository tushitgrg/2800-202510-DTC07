const flashcardSetModel = require("../models/flashcardModel");

/**
 * Adds a new flashcard entry to the database.
 *
 * @async
 * @function addFlashcardEntry
 * @param {Object} flashcard - Flashcard data object
 * @returns {Promise<string>} Promise resolving to the new flashcard's document ID
 */
const addFlashcardEntry = async (flashcard) => {
  // Create and save new flashcard
  const newFlashcard = await flashcardSetModel.create(flashcard);

  // Return the id of the flashcard
  return newFlashcard._id;
};

module.exports = addFlashcardEntry;
