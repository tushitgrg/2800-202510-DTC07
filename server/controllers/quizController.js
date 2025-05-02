
// const Quiz = require("../models/Quiz");
const {processFile} = require("../utils/fileHandler");
const {getGeminiOutput} = require("../utils/geminiClient");

const createQuiz = async (req, res) => {
  const { title, difficulty, type, numQuestions } = req.body;
  const resourceType = "quiz"
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const file = await processFile(req.file);
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const promptMessage = `
  I am uploading a study material document (PDF). Based on the content, generate a multiple-choice quiz in JSON format. Each question should have:
  IMPORTANT: Your response MUST be ONLY the JSON object with no additional text, explanations, or commentary before or after. Return ONLY valid JSON.
      DONOT ADD anything extra, return the JSON as PLAIN TEXT NO FORMATING NO NEWLINE CHARACTERS ETC

A "question" string

A "choices" array of 4 options

A "correctAnswer" field (matching one of the choices)

Please generate 5 questions only.
  `;

  try {
    const quiz = await getGeminiOutput(file, promptMessage);
    res.json(quiz)
    // const savedQuiz = await Quiz.create({
    //   questions: quiz.questions,
    //   difficulty,
    //   type,
    //   title,
    // });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to process quiz!" });
  
  }
};
const getQuiz = async (req, res) => {
    res.send("get")
}
const deleteQuiz = async (req, res) => {
res.send("delete")
}


module.exports = { createQuiz, getQuiz, deleteQuiz };
