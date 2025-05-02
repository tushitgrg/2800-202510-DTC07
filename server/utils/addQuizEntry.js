const quizCollectionModel = require("../models/quizModel");

const addQuizEntry = async (quiz) => {
  // Create abd save new quiz
  const newQuiz = await quizCollectionModel.create(quiz);

  // Return the id of the quiz
  return newQuiz._id;
};

module.exports = addQuizEntry;