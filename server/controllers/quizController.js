const User = require("../models/User");
// const Quiz = require("../models/Quiz");
const processFile = require("./utils/fileHandler");
const geminiClient = require("../utils/getGeminiOutput");

const createQuiz = async (req, res) => {
  const { title, difficulty, type, numQuestions } = req.body;
  const resourceType = "quiz"
  const file = await processFile(req.file);
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const promptMessage = "{ difficulty, type, numQuestions, resourceType }";

  try {
    const quiz = await geminiClient(file, promptMessage);
    // const savedQuiz = await Quiz.create({
    //   questions: quiz.questions,
    //   difficulty,
    //   type,
    //   title,
    // });
  } catch (err) {
    res.status(500).json({ error: "Failed to process quiz!" });
  }
};

module.exports = { createQuiz, getQuiz, deleteQuiz };
