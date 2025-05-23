const quizCollectionModel = require("../models/quizModel");

/**
 * Adds a new quiz entry to the database.
 *
 * @async
 * @function addQuizEntry
 * @param {Object} quiz - Quiz data object
 * @returns {Promise<string>} Promise resolving to the new quiz's document ID
 */
const addQuizEntry = async (quiz) => {
  // Create and save new quiz
  const newQuiz = await quizCollectionModel.create(quiz);

  // Return the id of the quiz
  return newQuiz._id;
};

module.exports = addQuizEntry;
